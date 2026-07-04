import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, date, timeSlot, duration, price, notes } = body

    if (!name || !email || !date || !timeSlot || !duration || !price) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    // Check if slot is already taken
    const existing = await prisma.booking.findFirst({
      where: { date, timeSlot, status: { in: ['pending', 'confirmed', 'paid'] } },
    })
    if (existing) {
      return NextResponse.json({ error: 'Este horário já foi reservado. Escolha outro.' }, { status: 409 })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: { name, email, phone, date, timeSlot, duration, price, notes, status: 'pending' },
    })

    // Try Mercado Pago
    if (process.env.MP_ACCESS_TOKEN && process.env.MP_ACCESS_TOKEN !== 'TEST-xxxx') {
      try {
        const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            items: [{
              title: `Sessão ${duration}min — Martha Angelo`,
              quantity: 1,
              unit_price: price,
              currency_id: 'BRL',
            }],
            payer: { name, email },
            back_urls: {
              success: `${process.env.NEXT_PUBLIC_BASE_URL}/agendar/sucesso?id=${booking.id}`,
              failure: `${process.env.NEXT_PUBLIC_BASE_URL}/agendar?erro=pagamento`,
            },
            auto_return: 'approved',
            external_reference: booking.id,
            notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mp`,
          }),
        })
        const mpData = await mpRes.json()
        if (mpData.init_point) {
          return NextResponse.json({ checkoutUrl: mpData.init_point })
        }
      } catch (mpErr) {
        console.error('MP error:', mpErr)
      }
    }

    // Fallback: no MP configured — confirm directly and send email
    await prisma.booking.update({ where: { id: booking.id }, data: { status: 'confirmed' } })
    await sendBookingConfirmation({ name, email, date, timeSlot, duration, price }).catch(console.error)

    return NextResponse.json({ success: true, bookingId: booking.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin only — checked via simple secret or auth in real usage
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}
