'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Archive } from 'lucide-react'

const OPTIONS = ['pending', 'confirmed', 'paid', 'cancelled']
const LABELS: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  paid: 'Pago',
  cancelled: 'Cancelado',
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

  if (current === 'archived') {
    return (
      <button
        onClick={() => update('cancelled')}
        disabled={loading}
        className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors disabled:opacity-50"
        title="Clique para desarquivar"
      >
        <Archive size={12} /> Arquivado
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={current}
        onChange={e => update(e.target.value)}
        disabled={loading}
        className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-sage-400 bg-white cursor-pointer disabled:opacity-50"
      >
        {OPTIONS.map(o => <option key={o} value={o}>{LABELS[o]}</option>)}
      </select>
      <button
        onClick={() => update('archived')}
        disabled={loading}
        title="Arquivar agendamento"
        className="p-1.5 text-stone-300 hover:text-stone-500 hover:bg-stone-100 rounded-lg transition-all disabled:opacity-50"
      >
        <Archive size={13} />
      </button>
    </div>
  )
}
