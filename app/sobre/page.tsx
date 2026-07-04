import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Leaf, Heart, BookOpen, CheckCircle2 } from 'lucide-react'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Sobre mim',
  description: 'Conheça Martha Angelo, terapeuta integrativa especializada em ansiedade, padrões repetitivos e recomeços conscientes.',
}

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-sage-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <span className="section-label text-sage-300">Sobre mim</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-cream-100 mb-6 leading-tight">
            Quem está do<br />
            <em className="italic text-terra-300">outro lado da tela</em>
          </h1>
          <p className="text-cream-200/70 text-xl font-light max-w-2xl mx-auto">
            Uma terapeuta que acredita que cuidar de si mesma não é luxo — é a coisa mais corajosa que você pode fazer.
          </p>
        </div>
      </section>

      {/* Minha história */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div className="aspect-square bg-gradient-to-br from-sage-100 to-sage-200 rounded-[2.5rem] flex items-center justify-center relative">
              <div className="text-center text-sage-400">
                <Leaf size={64} strokeWidth={1} />
                <p className="text-sm mt-4 text-sage-400/70 px-12">Sua foto aqui — adicione via painel admin</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-sage-100">
                <p className="font-serif text-lg font-medium text-sage-700">Martha Angelo</p>
                <p className="text-xs text-stone-500">Terapeuta Integrativa</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <span className="section-label">Minha história</span>
            <h2 className="section-title mb-6">
              De dentro<br />para fora
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                Minha caminhada com a terapia integrativa começou quando eu mesma percebi que vivia repetindo padrões que não faziam sentido — mas que eu não conseguia parar de repetir. Essa experiência me fez querer entender mais sobre como a mente, as emoções e o corpo se conectam.
              </p>
              <p>
                Me formei em terapia integrativa e ao longo de mais de 5 anos de prática, atendi centenas de mulheres em momentos de transição, crise e recomeço. O que aprendi nesse tempo é que cada pessoa carrega dentro de si as respostas que procura — o trabalho terapêutico é criar o espaço para encontrá-las.
              </p>
              <p>
                Acredito numa terapia sem pressa e sem fórmulas prontas. Uma que respeita o ritmo de cada uma e que usa linguagem real — sem termos técnicos que afastam em vez de aproximar.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-5xl mx-auto px-5">
          <RevealOnScroll className="text-center mb-16">
            <span className="section-label">Como trabalho</span>
            <h2 className="section-title">Meus pilares</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Heart size={24} />, title: 'Acolhimento real', desc: 'Nenhuma emoção é errada. Nenhuma história é pequena. Você chega como está.' },
              { icon: <Leaf size={24} />, title: 'Sem fórmulas mágicas', desc: 'A transformação é real, mas pede tempo e presença. Trabalho com honestidade e sem promessas vazias.' },
              { icon: <BookOpen size={24} />, title: 'Prática e reflexão', desc: 'Cada sessão tem sentido concreto — saímos com clareza e, quando faz sentido, com ferramentas para o dia a dia.' },
            ].map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 100}>
                <div className="card-hover bg-white rounded-3xl p-8 border border-sage-100">
                  <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center text-sage-600 mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-sage-700 mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Formação */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-4xl mx-auto px-5">
          <RevealOnScroll className="text-center mb-12">
            <span className="section-label">Formação</span>
            <h2 className="section-title">Minha trajetória</h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {[
              { year: '2019', title: 'Formação em Terapia Integrativa', desc: 'Instituto de desenvolvimento humano e emocional' },
              { year: '2020', title: 'Especialização em Ansiedade e Padrões Emocionais', desc: 'Aprofundamento em técnicas somáticas e cognitivas' },
              { year: '2021', title: 'Publicação do Ebook "Conhecendo o Meu Eu Interior"', desc: 'Guia prático para recomeços — disponível na Hotmart' },
              { year: '2024', title: '+200 sessões realizadas', desc: 'Acompanhamento de mulheres em momentos de transição e recomeço' },
            ].map((item, i) => (
              <RevealOnScroll key={item.year + item.title} delay={i * 80}>
                <div className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-sage-100">
                  <span className="font-serif text-2xl font-medium text-terra-400 whitespace-nowrap">{item.year}</span>
                  <div>
                    <h4 className="font-medium text-sage-700 mb-1">{item.title}</h4>
                    <p className="text-stone-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sage-700">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-cream-100 mb-5">
              Quer me conhecer<br />na prática?
            </h2>
            <p className="text-cream-200/60 mb-8 font-light">
              A melhor forma de entender a terapia integrativa é experimentar. Agende uma sessão e veja como se sente.
            </p>
            <Link href="/agendar" className="btn-terra">
              Agendar sessão <ArrowRight size={16} />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
