import type { Metadata } from 'next'
import { Suspense } from 'react'
import BookingFlow from '@/components/BookingFlow'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agendar sessão',
  description: 'Agende sua sessão de terapia integrativa com Martha Angelo. Escolha o tipo, o horário e pague com segurança.',
}

export default function AgendarPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-sage-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-sage-300 mb-4">Agendamento</span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-cream-100 mb-4">
            Reserve sua sessão
          </h1>
          <p className="text-cream-200/60 font-light">
            Preencha os passos abaixo. Todo o processo leva menos de 3 minutos.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream-100">
        <div className="max-w-2xl mx-auto px-5">
          <Suspense fallback={<div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-sage-400" /></div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </>
  )
}
