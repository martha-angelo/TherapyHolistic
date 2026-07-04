import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SucessoPage() {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={44} className="text-sage-500" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-4xl font-medium text-sage-700 mb-4">
          Sessão agendada!
        </h1>
        <p className="text-stone-500 leading-relaxed mb-8">
          Pagamento confirmado. Você vai receber todos os detalhes no e-mail e por WhatsApp em breve. Fico feliz em te acompanhar nessa jornada 🌿
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Voltar ao início</Link>
          <a href="https://www.instagram.com/marthaangeloo/" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Me seguir no Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
