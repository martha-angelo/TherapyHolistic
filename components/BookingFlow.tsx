'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { format, addDays, startOfMonth, getDaysInMonth, getDay, isBefore, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2, Wind, Heart, Sparkles, Star, MessageCircle } from 'lucide-react'

const STEPS = ['Sessão', 'Data & horário', 'Seus dados', 'Pagamento']

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

type SessionType = '45' | '60' | '100' | 'monthly'

interface Session {
  type: SessionType
  duration: number       // em minutos (0 = mensal)
  price: number
  label: string
  subtitle: string
  icon: React.ReactNode
  isMonthly?: boolean
}

const SESSIONS: Session[] = [
  {
    type: '45',
    duration: 45,
    price: 59.90,
    label: 'Sessão Leve',
    subtitle: '45 minutos · R$ 59,90',
    icon: <Wind size={18} />,
  },
  {
    type: '60',
    duration: 60,
    price: 99.90,
    label: 'Sessão Profunda',
    subtitle: '1 hora · R$ 99,90',
    icon: <Heart size={18} />,
  },
  {
    type: '100',
    duration: 100,
    price: 169.90,
    label: 'Sessão Imersiva',
    subtitle: '1h 40min · R$ 169,90',
    icon: <Sparkles size={18} />,
  },
  {
    type: 'monthly',
    duration: 0,
    price: 1000,
    label: 'Jornada Mensal',
    subtitle: '4 sessões / mês · R$ 1.000',
    icon: <Star size={18} />,
    isMonthly: true,
  },
]

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '5514996746108'

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function BookingFlow() {
  const searchParams = useSearchParams()

  const getInitialSession = () => {
    const tipo = searchParams.get('tipo')
    return SESSIONS.find(s => s.type === tipo) ?? SESSIONS[0]
  }

  const [step, setStep] = useState(1)
  const [session, setSession] = useState<Session>(getInitialSession)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!selectedDate) return
    const dateStr = format(selectedDate, 'yyyy-MM-dd')
    fetch(`/api/availability?date=${dateStr}`)
      .then(r => r.json())
      .then(d => setBookedSlots(d.booked || []))
      .catch(() => setBookedSlots([]))
  }, [selectedDate])

  // Calendar helpers
  const monthStart = startOfMonth(currentMonth)
  const totalDays = getDaysInMonth(currentMonth)
  const startDay = getDay(monthStart)
  const today = startOfDay(new Date())

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - startDay + 1
    if (dayNum < 1 || dayNum > totalDays) return null
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum)
  })

  const isDisabled = (d: Date) => isBefore(startOfDay(d), today) || d.getDay() === 0

  const goToStep2 = () => {
    if (session.isMonthly) {
      // Pacote mensal → pula calendário, vai para dados pessoais
      setStep(3)
    } else {
      setStep(2)
    }
  }

  const handleBook = async () => {
    if (session.isMonthly) {
      // Redireciona ao WhatsApp com mensagem pré-preenchida
      const msg = encodeURIComponent(
        `Olá Martha! Me chamo ${form.name} e tenho interesse na *Jornada Mensal* (R$ 1.000/mês). Podemos conversar?`
      )
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      setSuccess(true)
      return
    }

    if (!selectedDate || !selectedSlot) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date: format(selectedDate, 'yyyy-MM-dd'),
          timeSlot: selectedSlot,
          duration: session.duration,
          price: session.price,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao agendar')

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        setSuccess(true)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao processar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-sage-500" />
        </div>
        <h2 className="font-serif text-3xl font-medium text-sage-700 mb-3">
          {session.isMonthly ? 'Mensagem enviada!' : 'Sessão agendada!'}
        </h2>
        <p className="text-stone-500 mb-8">
          {session.isMonthly
            ? 'Você foi redirecionada ao WhatsApp. Martha retornará em breve para combinar os detalhes.'
            : 'Você receberá a confirmação por e-mail com todos os detalhes.'}
        </p>
        <a href="/" className="btn-primary">Voltar ao início</a>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-sage-100 shadow-sm overflow-hidden">
      {/* Progress */}
      <div className="px-8 pt-8 pb-6 border-b border-sage-50">
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i + 1 < step ? 'bg-sage-500 text-white' :
                  i + 1 === step ? 'bg-sage-700 text-white ring-4 ring-sage-100' :
                  'bg-sage-50 text-stone-400'
                }`}>
                  {i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium whitespace-nowrap ${i + 1 === step ? 'text-sage-700' : 'text-stone-400'}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 mb-3 transition-all ${i + 1 < step ? 'bg-sage-400' : 'bg-sage-100'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">
        {/* STEP 1: Escolha a sessão */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-2xl font-medium text-sage-700 mb-6">Qual sessão você quer?</h2>
            <div className="space-y-3 mb-8">
              {SESSIONS.map((s) => (
                <button
                  key={s.type}
                  onClick={() => setSession(s)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    session.type === s.type
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-sage-100 hover:border-sage-300'
                  } ${s.isMonthly ? 'relative overflow-hidden' : ''}`}
                >
                  {s.isMonthly && (
                    <div className="absolute top-0 right-0 bg-terra-400 text-white text-[10px] px-3 py-1 rounded-bl-xl font-medium tracking-wide">
                      MELHOR VALOR
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    session.type === s.type ? 'bg-sage-500 text-white' :
                    s.isMonthly ? 'bg-terra-50 text-terra-400' :
                    'bg-sage-50 text-sage-400'
                  }`}>
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sage-700 block">{s.label}</span>
                    <span className="text-stone-400 text-sm">{s.subtitle}</span>
                  </div>
                  <span className={`font-serif text-xl font-medium flex-shrink-0 ${
                    session.type === s.type ? 'text-sage-600' : 'text-stone-400'
                  }`}>
                    R$ {formatPrice(s.price)}
                  </span>
                </button>
              ))}
            </div>
            <button onClick={goToStep2} className="btn-primary w-full justify-center">
              {session.isMonthly ? 'Quero a Jornada Mensal' : 'Escolher data e horário'}
            </button>
          </div>
        )}

        {/* STEP 2: Calendário (não aparece para Mensal) */}
        {step === 2 && !session.isMonthly && (
          <div>
            <button onClick={() => setStep(1)} className="text-sm text-stone-400 hover:text-stone-600 mb-5 flex items-center gap-1">
              <ChevronLeft size={14} /> Voltar
            </button>
            <h2 className="font-serif text-2xl font-medium text-sage-700 mb-6">Escolha a data</h2>

            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentMonth(m => addDays(startOfMonth(m), -1))} className="p-1 hover:text-sage-600 text-stone-400 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="font-medium text-sage-700 capitalize">
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button onClick={() => setCurrentMonth(m => addDays(startOfMonth(m), 32))} className="p-1 hover:text-sage-600 text-stone-400 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                <div key={d} className="text-center text-xs text-stone-400 py-1 font-medium">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-6">
              {calendarDays.map((d, i) => {
                if (!d) return <div key={i} />
                const disabled = isDisabled(d)
                const isSelected = selectedDate && format(d, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                return (
                  <button
                    key={i}
                    disabled={disabled}
                    onClick={() => { setSelectedDate(d); setSelectedSlot(null) }}
                    className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                      disabled ? 'text-stone-200 cursor-not-allowed' :
                      isSelected ? 'bg-sage-600 text-white' :
                      'hover:bg-sage-50 text-stone-700 hover:text-sage-700'
                    }`}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>

            {selectedDate && (
              <div>
                <p className="text-sm font-medium text-sage-700 mb-3">
                  Horários — {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map(slot => {
                    const booked = bookedSlots.includes(slot)
                    const isSelected = selectedSlot === slot
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                          booked ? 'bg-stone-50 text-stone-300 cursor-not-allowed' :
                          isSelected ? 'bg-sage-600 text-white' :
                          'bg-sage-50 text-sage-700 hover:bg-sage-100'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {selectedDate && selectedSlot && (
              <button onClick={() => setStep(3)} className="btn-primary w-full justify-center mt-6">
                Continuar com {selectedSlot}
              </button>
            )}
          </div>
        )}

        {/* STEP 3: Dados pessoais */}
        {step === 3 && (
          <div>
            <button
              onClick={() => setStep(session.isMonthly ? 1 : 2)}
              className="text-sm text-stone-400 hover:text-stone-600 mb-5 flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Voltar
            </button>
            <h2 className="font-serif text-2xl font-medium text-sage-700 mb-2">Seus dados</h2>
            {session.isMonthly && (
              <p className="text-stone-400 text-sm mb-6">
                Vou entrar em contato pelo WhatsApp para combinar os detalhes da sua Jornada Mensal.
              </p>
            )}

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">Nome completo *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">E-mail *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">WhatsApp {session.isMonthly && <span className="text-red-400">*</span>}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
                  placeholder="(14) 9 9000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">O que te trouxe até aqui? (opcional)</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors resize-none"
                  rows={3}
                  placeholder="Conte um pouco do que está sentindo..."
                />
              </div>
            </div>
            <button
              onClick={() => { if (form.name && form.email) setStep(4) }}
              disabled={!form.name || !form.email}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ver resumo
            </button>
          </div>
        )}

        {/* STEP 4: Confirmação + pagamento */}
        {step === 4 && (
          <div>
            <button onClick={() => setStep(3)} className="text-sm text-stone-400 hover:text-stone-600 mb-5 flex items-center gap-1">
              <ChevronLeft size={14} /> Voltar
            </button>
            <h2 className="font-serif text-2xl font-medium text-sage-700 mb-6">Confirmar</h2>

            <div className="bg-sage-50 rounded-2xl p-6 mb-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Sessão</span>
                <span className="font-medium text-sage-700">{session.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Duração</span>
                <span className="font-medium text-sage-700">{session.subtitle.split('·')[0].trim()}</span>
              </div>
              {!session.isMonthly && (
                <>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Data</span>
                    <span className="font-medium text-sage-700">
                      {selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Horário</span>
                    <span className="font-medium text-sage-700">{selectedSlot}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500">Nome</span>
                <span className="font-medium text-sage-700">{form.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">E-mail</span>
                <span className="font-medium text-sage-700">{form.email}</span>
              </div>
              <div className="border-t border-sage-200 pt-3 flex justify-between">
                <span className="font-medium text-sage-700">Total</span>
                <span className="font-serif text-xl font-medium text-sage-600">
                  R$ {formatPrice(session.price)}{session.isMonthly ? '/mês' : ''}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm mb-5">
                {error}
              </div>
            )}

            {session.isMonthly ? (
              <button
                onClick={handleBook}
                disabled={loading}
                className="btn-terra w-full justify-center !py-4 text-base flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Falar no WhatsApp para fechar
              </button>
            ) : (
              <button
                onClick={handleBook}
                disabled={loading}
                className="btn-terra w-full justify-center !py-4 text-base"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Processando...</>
                ) : (
                  <>Pagar R$ {formatPrice(session.price)} com segurança</>
                )}
              </button>
            )}

            <p className="text-center text-xs text-stone-400 mt-4 flex items-center justify-center gap-2">
              {session.isMonthly
                ? '💬 Combinamos os detalhes e horários via WhatsApp'
                : '🔒 Pagamento seguro via Mercado Pago · PIX ou cartão'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
