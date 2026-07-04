import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  if (!date) return NextResponse.json({ booked: [] })

  const bookings = await prisma.booking.findMany({
    where: { date, status: { in: ['pending', 'confirmed', 'paid'] } },
    select: { timeSlot: true },
  })

  return NextResponse.json({ booked: bookings.map(b => b.timeSlot) })
}
