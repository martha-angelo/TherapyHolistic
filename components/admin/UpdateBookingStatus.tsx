'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OPTIONS = ['pending', 'confirmed', 'paid', 'cancelled']
const LABELS: Record<string, string> = {
  pending: 'Pendente', confirmed: 'Confirmado', paid: 'Pago', cancelled: 'Cancelado',
}

export default function UpdateBookingStatus({ id, current }: { id: string; current: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const update = async (status: string) => {
    setLoading(true)
    await fetch('/api/bookings/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <select
      value={current}
      onChange={e => update(e.target.value)}
      disabled={loading}
      className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-sage-400 bg-white cursor-pointer disabled:opacity-50"
    >
      {OPTIONS.map(o => <option key={o} value={o}>{LABELS[o]}</option>)}
    </select>
  )
}
