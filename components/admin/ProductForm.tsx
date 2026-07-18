'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ProductFormProps {
  initial?: {
    id: string
    title: string
    subtitle: string | null
    description: string
    price: number | null
    imageUrl: string | null
    linkUrl: string
    type: string
    active: boolean
    featured: boolean
    sortOrder: number
  }
}

export default function ProductForm({ initial }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    subtitle: initial?.subtitle ?? '',
    description: initial?.description ?? '',
    price: initial?.price?.toString() ?? '',
    imageUrl: initial?.imageUrl ?? '',
    linkUrl: initial?.linkUrl ?? '',
    type: initial?.type ?? 'ebook',
    active: initial?.active ?? true,
    featured: initial?.featured ?? false,
    sortOrder: initial?.sortOrder?.toString() ?? '0',
  })

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = initial ? `/api/produtos/${initial.id}` : '/api/produtos'
      const method = initial ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Erro ao salvar')
      }
      router.push('/admin/produtos')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Título *</label>
          <input
            value={form.title}
            onChange={e => set('title', e.target.value)}
            required
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
            placeholder="Ex: Conhecendo o Meu Eu Interior"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Subtítulo (opcional)</label>
          <input
            value={form.subtitle}
            onChange={e => set('subtitle', e.target.value)}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
            placeholder="Ex: Um guia rápido para recomeçar com força e clareza"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Descrição *</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            required
            rows={3}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors resize-none"
            placeholder="Descreva o produto brevemente..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Tipo</label>
          <select
            value={form.type}
            onChange={e => set('type', e.target.value)}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors bg-white"
          >
            <option value="ebook">Ebook</option>
            <option value="curso">Curso</option>
            <option value="mentoria">Mentoria</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={e => set('price', e.target.value)}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
            placeholder="Ex: 47.00"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Link do produto (Hotmart ou outro) *</label>
          <input
            value={form.linkUrl}
            onChange={e => set('linkUrl', e.target.value)}
            required
            type="url"
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
            placeholder="https://hotmart.com/..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-600 mb-1.5">URL da imagem de capa</label>
          <input
            value={form.imageUrl}
            onChange={e => set('imageUrl', e.target.value)}
            type="url"
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
            placeholder="https://hotmart.s3.amazonaws.com/..."
          />
          {form.imageUrl && (
            <div className="mt-2 w-24 h-32 rounded-xl overflow-hidden border border-sage-100 relative">
              <Image src={form.imageUrl} alt="preview" fill className="object-cover" />
            </div>
          )}
          <p className="text-xs text-stone-400 mt-1">
            Cole a URL da imagem do Hotmart ou de outro lugar.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Ordem de exibição</label>
          <input
            type="number"
            min="0"
            value={form.sortOrder}
            onChange={e => set('sortOrder', e.target.value)}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
          />
          <p className="text-xs text-stone-400 mt-1">Menor número = aparece primeiro</p>
        </div>

        <div className="flex flex-col gap-3 justify-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('active', !form.active)}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.active ? 'bg-sage-500' : 'bg-stone-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.active ? 'left-5' : 'left-1'}`} />
            </div>
            <span className="text-sm text-stone-600">Produto ativo (visível no site)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('featured', !form.featured)}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-terra-400' : 'bg-stone-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.featured ? 'left-5' : 'left-1'}`} />
            </div>
            <span className="text-sm text-stone-600">Produto em destaque</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Salvando...' : (initial ? 'Salvar alterações' : 'Criar produto')}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
