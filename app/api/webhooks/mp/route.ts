import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type === 'payment' && data?.id) {
      // Fetch payment from MP
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      })
      const payment = await mpRes.json()

      if (payment.status === 'approved' && payment.external_reference) {
        const booking = await prisma.booking.update({
          where: { id: payment.external_reference },
          data: { status: 'paid', paymentId: String(data.id) },
        })

        // Send confirmation email
        await sendBookingConfirmation({
          name: booking.name,
          email: booking.email,
          date: booking.date,
          timeSlot: booking.timeSlot,
          duration: booking.duration,
          price: booking.price,
        }).catch(console.error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (e) {
    console.error('Webhook error:', e)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
