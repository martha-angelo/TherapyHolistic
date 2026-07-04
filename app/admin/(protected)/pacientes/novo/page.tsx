'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NovoPacientePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('O nome é obrigatório.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao salvar')
      }

      const patient = await res.json()
      router.push(`/admin/pacientes/${patient.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar')
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/pacientes"
          className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-stone-800 font-semibold">Novo paciente</h1>
          <p className="text-stone-500 text-sm mt-0.5">Preencha os dados básicos do paciente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Nome completo <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Ana Lima"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ana@email.com"
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Telefone / WhatsApp</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(14) 9 9000-0000"
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Data de nascimento</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Observações gerais
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Contexto inicial, queixa principal, histórico relevante..."
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/pacientes"
            className="px-4 py-2.5 text-sm text-stone-600 hover:text-stone-800 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-sage-600 text-white px-5 py-2.5 rounded-xl hover:bg-sage-700 transition-colors text-sm font-medium disabled:opacity-60"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Salvando...' : 'Salvar paciente'}
          </button>
        </div>
      </form>
    </div>
  )
}
