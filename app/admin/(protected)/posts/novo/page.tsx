'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

const CATEGORIES = ['reflexoes', 'ansiedade', 'terapia', 'autocuidado', 'padroes']

export default function NovoPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', imageUrl: '', category: 'reflexoes', published: false, featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.excerpt || !form.content) {
      setError('Preencha título, resumo e conteúdo.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      router.push('/admin/posts')
      router.refresh()
    } catch {
      setError('Erro ao salvar o post. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const field = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  })

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={14} /> Voltar
        </Link>
        <h1 className="font-serif text-3xl font-medium text-sage-700">Novo post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Título *</label>
          <input
            type="text"
            {...field('title')}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
            placeholder="Título do post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Resumo (excerpt) *</label>
          <textarea
            {...field('excerpt')}
            rows={2}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors resize-none"
            placeholder="Um resumo curto que aparece nas listagens..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">
            Conteúdo * <span className="text-stone-400 font-normal">(use **texto** para negrito, quebre parágrafos com linhas vazias)</span>
          </label>
          <textarea
            {...field('content')}
            rows={16}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors resize-y font-mono"
            placeholder="Escreva o conteúdo completo aqui...&#10;&#10;Use **negrito** para destacar.&#10;&#10;Quebre linhas para criar parágrafos."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Categoria</label>
          <select {...field('category')} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 bg-white transition-colors capitalize">
            {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
        </div>

        <ImageUpload
          value={form.imageUrl}
          onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
        />

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              className="w-4 h-4 accent-sage-600"
            />
            <span className="text-sm text-stone-600 flex items-center gap-1">
              {form.published ? <Eye size={14} className="text-sage-500" /> : <EyeOff size={14} className="text-stone-400" />}
              Publicar agora
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-terra-500"
            />
            <span className="text-sm text-stone-600">⭐ Destacar no blog</span>
          </label>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary !py-3 !px-7">
            {loading ? <><Loader2 size={15} className="animate-spin" /> Salvando...</> : 'Salvar post'}
          </button>
          <Link href="/admin/posts" className="btn-outline !py-3 !px-7">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
