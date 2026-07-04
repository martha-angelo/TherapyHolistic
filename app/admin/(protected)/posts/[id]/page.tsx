'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

const CATEGORIES = ['reflexoes', 'ansiedade', 'terapia', 'autocuidado', 'padroes']

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', imageUrl: '', category: 'reflexoes', published: false, featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((posts: { id: string; title: string; excerpt: string; content: string; imageUrl?: string; category: string; published: boolean; featured: boolean }[]) => {
        const post = posts.find((p) => p.id === id)
        if (post) {
          setForm({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            imageUrl: post.imageUrl ?? '',
            category: post.category,
            published: post.published,
            featured: post.featured,
          })
        }
        setFetching(false)
      })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...form }),
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      router.push('/admin/posts')
      router.refresh()
    } catch {
      setError('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="p-8 flex items-center gap-2 text-stone-400">
      <Loader2 size={18} className="animate-spin" /> Carregando...
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={14} /> Voltar
        </Link>
        <h1 className="font-serif text-3xl font-medium text-sage-700">Editar post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Título *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Resumo *</label>
          <textarea
            value={form.excerpt}
            onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            rows={2}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Conteúdo *</label>
          <textarea
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            rows={16}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors resize-y font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Categoria</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 bg-white transition-colors"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <ImageUpload
              value={form.imageUrl}
              onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-sage-600" />
            <span className="text-sm text-stone-600 flex items-center gap-1">
              {form.published ? <Eye size={14} className="text-sage-500" /> : <EyeOff size={14} className="text-stone-400" />}
              Publicado
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-terra-500" />
            <span className="text-sm text-stone-600">⭐ Destacado</span>
          </label>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary !py-3 !px-7">
            {loading ? <><Loader2 size={15} className="animate-spin" /> Salvando...</> : 'Salvar alterações'}
          </button>
          <Link href="/admin/posts" className="btn-outline !py-3 !px-7">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
