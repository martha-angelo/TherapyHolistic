import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Wind, Heart, CheckCircle2, Star, Sparkles } from 'lucide-react'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Sessões',
  description: 'Sessões de terapia integrativa online com Martha Angelo. 45min por R$59,90, 1h por R$99,90, 1h40 por R$169,90 ou Jornada Mensal por R$1.000.',
}

const faqs = [
  { q: 'Como acontecem as sessões?', a: 'Todas as sessões são online, via videochamada. Você recebe o link por WhatsApp e e-mail até 30 minutos antes do horário marcado.' },
  { q: 'Preciso ter experiência com terapia?', a: 'Não. As sessões são adaptadas para onde você está — seja sua primeira vez ou não.' },
  { q: 'A sessão de 45 minutos resolve algo?', a: 'Sim! Com foco em um ponto específico, 45 minutos podem trazer clareza real. É também uma ótima forma de dar o primeiro passo.' },
  { q: 'Como funciona o pagamento?', a: 'O pagamento é feito de forma segura via Mercado Pago (PIX ou cartão) no momento do agendamento. A Jornada Mensal é combinada diretamente pelo WhatsApp.' },
  { q: 'Posso cancelar ou reagendar?', a: 'Sim, com pelo menos 24 horas de antecedência. Entre em contato pelo Instagram @marthaangeloo.' },
  { q: 'Você emite nota fiscal?', a: 'Sim, mediante solicitação após a sessão.' },
]

export default function SessoesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-sage-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <span className="section-label text-sage-300">Sessões</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-cream-100 mb-6 leading-tight">
            Sessões que<br />
            <em className="italic text-terra-300">respeitam seu ritmo</em>
          </h1>
          <p className="text-cream-200/60 text-lg font-light max-w-xl mx-auto">
            Online, sem filas, no horário que funciona para você. Terapia integrativa acessível e sem enrolação.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 45min */}
            <RevealOnScroll delay={0}>
              <div className="bg-white border border-sage-100 rounded-3xl p-10 flex flex-col shadow-sm hover:shadow-xl hover:shadow-sage-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-sage-50 rounded-2xl flex items-center justify-center text-sage-600">
                    <Wind size={26} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-medium text-sage-700">Sessão Leve</h2>
                    <p className="text-stone-400 text-xs">45 minutos</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-5xl font-medium text-sage-700">R$ 59</span>
                    <span className="font-serif text-2xl font-medium text-sage-700">,90</span>
                  </div>
                  <p className="text-stone-400 text-sm mt-1">por sessão individual</p>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-1">
                  Ideal para um foco pontual — quando você tem uma situação específica que quer clarear, uma decisão difícil, uma emoção travada ou um padrão que quer entender. 45 minutos com atenção total.
                </p>

                <ul className="space-y-3 mb-10 text-sm text-stone-600">
                  {[
                    'Sessão individual online (videochamada)',
                    'Foco em um tema ou situação central',
                    'Sem compromisso de continuidade',
                    'Link enviado por WhatsApp',
                    'Pagamento via PIX ou cartão',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-sage-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/agendar?tipo=45" className="btn-outline justify-center">
                  Agendar 45 minutos
                  <ArrowRight size={16} />
                </Link>
              </div>
            </RevealOnScroll>

            {/* 1h — Featured */}
            <RevealOnScroll delay={150}>
              <div className="bg-sage-700 rounded-3xl p-10 flex flex-col shadow-xl shadow-sage-700/20 hover:-translate-y-1 transition-all duration-500 relative">
                <div className="absolute top-6 right-6 bg-terra-400 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Mais escolhida
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-sage-600 rounded-2xl flex items-center justify-center text-cream-100">
                    <Heart size={26} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-medium text-cream-100">Sessão Profunda</h2>
                    <p className="text-cream-200/50 text-xs">1 hora</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-5xl font-medium text-cream-100">R$ 99</span>
                    <span className="font-serif text-2xl font-medium text-cream-100">,90</span>
                  </div>
                  <p className="text-cream-200/50 text-sm mt-1">por sessão individual</p>
                </div>

                <p className="text-cream-200/70 text-sm leading-relaxed mb-8 flex-1">
                  Para quem quer ir fundo. Trabalhamos padrões emocionais, memórias que ainda pesam e crenças que limitam. Saímos com clareza, com ferramentas concretas e com um próximo passo real.
                </p>

                <ul className="space-y-3 mb-10 text-sm text-cream-200/70">
                  {[
                    'Sessão individual online (videochamada)',
                    'Trabalho completo e em profundidade',
                    'Material de apoio após a sessão',
                    'Link enviado por WhatsApp + e-mail',
                    'Pagamento via PIX ou cartão',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-sage-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/agendar?tipo=60" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-sage-700 rounded-full font-medium text-sm hover:bg-cream-100 transition-all hover:-translate-y-0.5 duration-300">
                  Agendar 1 hora
                  <ArrowRight size={16} />
                </Link>
              </div>
            </RevealOnScroll>

            {/* 1h40 */}
            <RevealOnScroll delay={250}>
              <div className="bg-white border border-sage-100 rounded-3xl p-10 flex flex-col shadow-sm hover:shadow-xl hover:shadow-sage-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-sage-50 rounded-2xl flex items-center justify-center text-sage-600">
                    <Sparkles size={26} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-medium text-sage-700">Sessão Imersiva</h2>
                    <p className="text-stone-400 text-xs">1 hora e 40 minutos</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-5xl font-medium text-sage-700">R$ 169</span>
                    <span className="font-serif text-2xl font-medium text-sage-700">,90</span>
                  </div>
                  <p className="text-stone-400 text-sm mt-1">por sessão individual</p>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-1">
                  Para momentos de grande transição, bloqueios enraizados ou quando você sente que há muito para ser desvendado. Um espaço expandido para explorar, integrar emoções e sair com uma visão transformada de si mesma — sem pressa.
                </p>

                <ul className="space-y-3 mb-10 text-sm text-stone-600">
                  {[
                    'Sessão individual online (videochamada)',
                    'Trabalho profundo e integrado em camadas',
                    'Material de apoio após a sessão',
                    'Espaço ampliado para desdobrar emoções',
                    'Link enviado por WhatsApp + e-mail',
                    'Pagamento via PIX ou cartão',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-sage-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/agendar?tipo=100" className="btn-outline justify-center">
                  Agendar 1h 40min
                  <ArrowRight size={16} />
                </Link>
              </div>
            </RevealOnScroll>

            {/* Mensal */}
            <RevealOnScroll delay={350}>
              <div className="bg-sage-700 rounded-3xl p-10 flex flex-col shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                {/* Gradiente de fundo decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-600 to-sage-700 pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-terra-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative">
                  <div className="absolute top-0 right-0 bg-terra-400 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Melhor valor
                  </div>

                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-cream-100">
                      <Star size={26} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-medium text-cream-100">Jornada Mensal</h2>
                      <p className="text-cream-200 text-xs opacity-60">4 sessões por mês</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-5xl font-medium text-cream-100">R$ 1.000</span>
                    </div>
                    <p className="text-cream-200 text-sm mt-1 opacity-60">por mês · equivale a R$ 250/sessão</p>
                  </div>

                  <p className="text-cream-100 text-sm leading-relaxed mb-8 flex-1 opacity-80">
                    A regularidade é o que cria transformação real e duradoura. Quatro encontros mensais com acompanhamento contínuo — para quem está pronta para uma mudança profunda na forma como se relaciona consigo mesma e com a vida.
                  </p>

                  <ul className="space-y-3 mb-10 text-sm text-cream-100 opacity-80">
                    {[
                      '4 sessões individuais por mês',
                      'Acompanhamento terapêutico contínuo',
                      'Suporte entre sessões via WhatsApp',
                      'Plano personalizado de trabalho',
                      'Prioridade de agendamento',
                      'Material de apoio após cada sessão',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="text-terra-300 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/agendar?tipo=monthly"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-sage-700 rounded-full font-medium text-sm hover:bg-cream-100 transition-all hover:-translate-y-0.5 duration-300"
                  >
                    Quero a Jornada Mensal
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream-100 border-t border-sage-100">
        <div className="max-w-2xl mx-auto px-5">
          <RevealOnScroll className="text-center mb-12">
            <span className="section-label">Dúvidas frequentes</span>
            <h2 className="section-title">Perguntas frequentes</h2>
          </RevealOnScroll>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-50">
                  <p className="font-medium text-sage-700 mb-2">{faq.q}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="text-center mt-12">
            <p className="text-stone-500 mb-4">Ainda tem dúvidas?</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '5514996746108'}?text=Ol%C3%A1%20Martha!%20Tenho%20uma%20d%C3%BAvida%20sobre%20as%20sess%C3%B5es.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Falar no WhatsApp
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
