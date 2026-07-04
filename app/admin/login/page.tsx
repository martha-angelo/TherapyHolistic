'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Leaf, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('E-mail ou senha incorretos.')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-sage-700 flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl shadow-2xl shadow-sage-700/30 p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-50 rounded-2xl mb-4">
            <Leaf className="text-sage-600" size={22} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-2xl font-medium text-sage-700">Martha Angelo</h1>
          <p className="text-stone-400 text-sm mt-1">Área administrativa</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center !py-3 mt-2"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Entrando...</> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
