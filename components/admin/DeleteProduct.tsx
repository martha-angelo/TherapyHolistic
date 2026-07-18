'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteProduct({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)) return
    setLoading(true)
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 border border-red-100 rounded-xl text-red-300 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Excluir produto"
    >
      <Trash2 size={15} />
    </button>
  )
}
