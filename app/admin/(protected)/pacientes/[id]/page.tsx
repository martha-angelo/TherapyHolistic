'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Plus, Save, Trash2, Loader2,
  Calendar, Brain, ArrowRight, Edit2, X, Check
} from 'lucide-react'

interface SessionNote {
  id: string
  sessionDate: string
  whatWasDone: string
  nextPlan: string | null
  mood: string | null
  createdAt: string
}

interface Patient {
  id: string
  name: string
  email: string | null
  phone: string | null
  birthDate: string | null
  notes: string | null
  sessions: SessionNote[]
}

const MOODS = ['Aberta', 'Ansiosa', 'Resistente', 'Emocionada', 'Reflexiva', 'Cansada', 'Leve', 'Outro']

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

function today() {
  return new Date().toISOString().split('T')[0]
}

export default function PacienteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  // Formulário de nova nota
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [noteForm, setNoteForm] = useState({ sessionDate: today(), whatWasDone: '', nextPlan: '', mood: '' })
  const [savingNote, setSavingNote] = useState(false)

  // Edição de nota existente
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editNoteForm, setEditNoteForm] = useState({ sessionDate: '', whatWasDone: '', nextPlan: '', mood: '' })

  // Edição dos dados do paciente
  const [editingPatient, setEditingPatient] = useState(false)
  const [patientForm, setPatientForm] = useState({ name: '', email: '', phone: '', birthDate: '', notes: '' })
  const [savingPatient, setSavingPatient] = useState(false)

  const loadPatient = useCallback(async () => {
    const res = await fetch(`/api/pacientes/${id}`)
    if (!res.ok) { router.push('/admin/pacientes'); return }
    const data = await res.json()
    setPatient(data)
    setPatientForm({
      name: data.name,
      email: data.email || '',
      phone: data.phone || '',
      birthDate: data.birthDate || '',
      notes: data.notes || '',
    })
    setLoading(false)
  }, [id, router])

  useEffect(() => { loadPatient() }, [loadPatient])

  // ─── Salvar dados do paciente ──────────────────────────────────────────────
  const handleSavePatient = async () => {
    setSavingPatient(true)
    await fetch(`/api/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientForm),
    })
    await loadPatient()
    setSavingPatient(false)
    setEditingPatient(false)
  }

  // ─── Excluir paciente ──────────────────────────────────────────────────────
  const handleDeletePatient = async () => {
    if (!confirm(`Excluir ${patient?.name}? Esta ação não pode ser desfeita.`)) return
    await fetch(`/api/pacientes/${id}`, { method: 'DELETE' })
    router.push('/admin/pacientes')
  }

  // ─── Salvar nova nota ──────────────────────────────────────────────────────
  const handleSaveNote = async () => {
    if (!noteForm.sessionDate || !noteForm.whatWasDone.trim()) return
    setSavingNote(true)
    await fetch(`/api/pacientes/${id}/notas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteForm),
    })
    setNoteForm({ sessionDate: today(), whatWasDone: '', nextPlan: '', mood: '' })
    setShowNoteForm(false)
    await loadPatient()
    setSavingNote(false)
  }

  // ─── Editar nota ──────────────────────────────────────────────────────────
  const startEditNote = (note: SessionNote) => {
    setEditingNoteId(note.id)
    setEditNoteForm({
      sessionDate: note.sessionDate,
      whatWasDone: note.whatWasDone,
      nextPlan: note.nextPlan || '',
      mood: note.mood || '',
    })
  }

  const handleUpdateNote = async (noteId: string) => {
    await fetch(`/api/pacientes/${id}/notas/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editNoteForm),
    })
    setEditingNoteId(null)
    await loadPatient()
  }

  // ─── Excluir nota ─────────────────────────────────────────────────────────
  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Excluir esta nota de sessão?')) return
    await fetch(`/api/pacientes/${id}/notas/${noteId}`, { method: 'DELETE' })
    await loadPatient()
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-sage-500" />
      </div>
    )
  }

  if (!patient) return null

  const initials = patient.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/pacientes" className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-serif text-stone-800 font-semibold flex-1">{patient.name}</h1>
        <button
          onClick={handleDeletePatient}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          <Trash2 size={13} />
          Excluir paciente
        </button>
      </div>

      {/* Card do paciente */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sage-700 font-bold text-lg">{initials}</span>
          </div>

          {editingPatient ? (
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-stone-500 mb-1">Nome</label>
                  <input
                    value={patientForm.name}
                    onChange={e => setPatientForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={patientForm.email}
                    onChange={e => setPatientForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Telefone</label>
                  <input
                    value={patientForm.phone}
                    onChange={e => setPatientForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Data de nascimento</label>
                  <input
                    type="date"
                    value={patientForm.birthDate}
                    onChange={e => setPatientForm(p => ({ ...p, birthDate: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-stone-500 mb-1">Observações gerais</label>
                  <textarea
                    value={patientForm.notes}
                    onChange={e => setPatientForm(p => ({ ...p, notes: e.target.value }))}
                    rows={3}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSavePatient}
                  disabled={savingPatient}
                  className="flex items-center gap-1.5 bg-sage-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-700 transition-colors disabled:opacity-60"
                >
                  {savingPatient ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                  Salvar
                </button>
                <button
                  onClick={() => setEditingPatient(false)}
                  className="flex items-center gap-1.5 text-stone-500 px-4 py-2 rounded-xl text-sm hover:bg-stone-50 transition-colors"
                >
                  <X size={13} /> Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-stone-800 text-lg">{patient.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                    {patient.email && <span className="text-stone-500 text-sm">{patient.email}</span>}
                    {patient.phone && <span className="text-stone-500 text-sm">{patient.phone}</span>}
                    {patient.birthDate && (
                      <span className="text-stone-400 text-sm">
                        Nasc. {formatDate(patient.birthDate)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setEditingPatient(true)}
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-sage-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-sage-50"
                >
                  <Edit2 size={13} /> Editar
                </button>
              </div>
              {patient.notes && (
                <div className="mt-3 bg-stone-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-medium text-stone-500 mb-1">Observações gerais</p>
                  <p className="text-sm text-stone-700 whitespace-pre-line">{patient.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notas de sessão */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-serif font-semibold text-stone-800">
            Notas de sessão
            <span className="ml-2 text-sm font-sans font-normal text-stone-400">
              ({patient.sessions.length})
            </span>
          </h2>
          {!showNoteForm && (
            <button
              onClick={() => setShowNoteForm(true)}
              className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium px-3 py-1.5 rounded-xl hover:bg-sage-50 transition-colors"
            >
              <Plus size={15} /> Nova nota
            </button>
          )}
        </div>

        {/* Formulário nova nota */}
        {showNoteForm && (
          <div className="bg-white rounded-2xl border-2 border-sage-200 p-5 mb-4">
            <h3 className="font-medium text-stone-700 mb-4 text-sm">Registrar sessão</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Data da sessão</label>
                  <input
                    type="date"
                    value={noteForm.sessionDate}
                    onChange={e => setNoteForm(p => ({ ...p, sessionDate: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Estado emocional observado</label>
                  <select
                    value={noteForm.mood}
                    onChange={e => setNoteForm(p => ({ ...p, mood: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  >
                    <option value="">Selecionar...</option>
                    {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">
                  O que foi trabalhado / feito nesta sessão <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={noteForm.whatWasDone}
                  onChange={e => setNoteForm(p => ({ ...p, whatWasDone: e.target.value }))}
                  rows={4}
                  placeholder="Descreva o que foi abordado, técnicas usadas, percepções da sessão..."
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Plano / intenção para a próxima sessão</label>
                <textarea
                  value={noteForm.nextPlan}
                  onChange={e => setNoteForm(p => ({ ...p, nextPlan: e.target.value }))}
                  rows={3}
                  placeholder="O que pretende trabalhar na próxima sessão, exercícios para casa..."
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNoteForm(false)}
                  className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveNote}
                  disabled={savingNote || !noteForm.whatWasDone.trim()}
                  className="flex items-center gap-2 bg-sage-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-sage-700 transition-colors disabled:opacity-50"
                >
                  {savingNote ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  Salvar nota
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de notas */}
        {patient.sessions.length === 0 && !showNoteForm ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center">
            <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain size={22} className="text-sage-400" />
            </div>
            <p className="text-stone-500 text-sm">Nenhuma sessão registrada ainda.</p>
            <button
              onClick={() => setShowNoteForm(true)}
              className="mt-3 text-sage-600 text-sm font-medium hover:text-sage-700"
            >
              Registrar primeira sessão →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {patient.sessions.map((note) => (
              <div key={note.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                {editingNoteId === note.id ? (
                  /* Modo edição */
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-500 mb-1">Data</label>
                        <input
                          type="date"
                          value={editNoteForm.sessionDate}
                          onChange={e => setEditNoteForm(p => ({ ...p, sessionDate: e.target.value }))}
                          className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-500 mb-1">Estado emocional</label>
                        <select
                          value={editNoteForm.mood}
                          onChange={e => setEditNoteForm(p => ({ ...p, mood: e.target.value }))}
                          className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                        >
                          <option value="">Selecionar...</option>
                          {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">O que foi trabalhado</label>
                      <textarea
                        value={editNoteForm.whatWasDone}
                        onChange={e => setEditNoteForm(p => ({ ...p, whatWasDone: e.target.value }))}
                        rows={4}
                        className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">Plano próxima sessão</label>
                      <textarea
                        value={editNoteForm.nextPlan}
                        onChange={e => setEditNoteForm(p => ({ ...p, nextPlan: e.target.value }))}
                        rows={3}
                        className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleUpdateNote(note.id)}
                        className="flex items-center gap-1.5 bg-sage-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-700 transition-colors"
                      >
                        <Check size={13} /> Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Modo leitura */
                  <div>
                    {/* Cabeçalho da nota */}
                    <div className="flex items-center justify-between px-5 py-3 bg-stone-50 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-sage-500" />
                        <span className="text-sm font-medium text-stone-700">
                          {formatDate(note.sessionDate)}
                        </span>
                        {note.mood && (
                          <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                            {note.mood}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditNote(note)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-sage-600 hover:bg-sage-50 transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Corpo da nota */}
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <Brain size={11} /> O que foi trabalhado
                        </p>
                        <p className="text-sm text-stone-700 whitespace-pre-line leading-relaxed">
                          {note.whatWasDone}
                        </p>
                      </div>

                      {note.nextPlan && (
                        <div className="border-t border-stone-100 pt-4">
                          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                            <ArrowRight size={11} /> Plano para a próxima sessão
                          </p>
                          <p className="text-sm text-stone-600 whitespace-pre-line leading-relaxed">
                            {note.nextPlan}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
