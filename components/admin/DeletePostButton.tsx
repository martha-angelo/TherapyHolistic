'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

export default function DeletePostButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Tem certeza que quer excluir este post?')) return
    setLoading(true)
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
      Excluir
    </button>
  )
}
