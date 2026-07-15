import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Leaf, Heart, Wind, Sparkles, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import RevealOnScroll from '@/components/RevealOnScroll'
import Butterfly from '@/components/Butterfly'

async function getData() {
  const [testimonials, posts] = await Promise.all([
    prisma.testimonial.findMany({ where: { active: true }, take: 4 }),
    prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
  ])
  return { testimonials, posts }
}

export default async function HomePage() {
  const { testimonials, posts } = await getData()

  return (
    <>
      {/* ──────────── HERO ──────────── */}
      <section className="relative min-h-screen bg-sage-700 overflow-hidden flex items-center">
        {/* Organic background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-sage-600/40 blob animate-blob" />
          <div className="absolute bottom-[-5%] left-[-8%] w-[400px] h-[400px] bg-sage-500/20 blob animate-blob"
            style={{ animationDelay: '3s' }} />
          <div className="absolute top-[-10%] left-[30%] w-[300px] h-[300px] bg-terra-400/10 blob animate-blob"
            style={{ animationDelay: '6s' }} />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Borboletas decorativas — flutuam suavemente */}
          <Butterfly className="top-[18%] left-[8%]" size={56} opacity={0.22} delay="0s" />
          <Butterfly className="top-[55%] right-[12%]" size={40} opacity={0.16} delay="7s" />
          <Butterfly className="bottom-[20%] left-[35%]" size={32} opacity={0.13} delay="13s" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="animate-fade-up">
            <span className="section-label text-sage-300 mb-6 block">
              Terapia Integrativa · @marthaangeloo
            </span>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-cream-100 leading-[1.05] mb-8">
              Solte o<br />
              que pesa.<br />
              <em className="text-sage-300 not-italic">Viva com</em><br />
              <em className="italic text-terra-300">leveza.</em>
            </h1>

            <p className="text-cream-200/70 text-lg leading-relaxed mb-10 max-w-md font-light">
              Ajudo mulheres a desbloquear emoções, sair dos padrões que limitam e reconectar com quem elas realmente são — com acolhimento real e sem fórmulas mágicas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/agendar" className="btn-terra text-base !py-4 !px-8">
                Agendar sessão
                <ArrowRight size={18} />
              </Link>
              <Link href="/sobre" className="btn-outline !border-cream-100/30 !text-cream-100 hover:!bg-cream-100/10 text-base !py-4 !px-8">
                Conhecer meu trabalho
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 mt-12 pt-12 border-t border-cream-100/10">
              <div className="flex -space-x-2">
                {['AP', 'JM', 'CR', 'FL'].map((i) => (
                  <div key={i}
                    className="w-9 h-9 rounded-full bg-sage-500 border-2 border-sage-700 flex items-center justify-center text-xs font-medium text-cream-100">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-terra-300 fill-terra-300" />
                  ))}
                </div>
                <p className="text-cream-200/60 text-xs">+200 mulheres transformadas</p>
              </div>
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="hidden lg:flex justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main card */}
              <div className="relative w-80 h-[420px] bg-cream-100/10 backdrop-blur-sm border border-cream-100/20 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sage-600/20 to-sage-700/60" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf size={16} className="text-sage-300" />
                    <span className="text-sage-300 text-xs font-medium tracking-widest uppercase">Terapia Integrativa</span>
                  </div>
                  <p className="font-serif text-2xl text-cream-100 leading-snug mb-4">
                    "A transformação começa de dentro para fora."
                  </p>
                  <p className="text-cream-200/60 text-sm">— Martha Angelo</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -right-8 bg-terra-400 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-lg shadow-terra-400/30 animate-float">
                Sessão 45min · R$ 59,90
              </div>
              <div className="absolute -bottom-4 -left-8 bg-cream-100 text-sage-700 px-4 py-2 rounded-2xl text-sm font-medium shadow-lg animate-float-slow">
                ✨ Sessão 1h · R$ 99,90
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-100/40 animate-bounce">
          <div className="w-px h-12 bg-cream-100/20" />
          <span className="text-xs tracking-widest uppercase">scroll</span>
        </div>
      </section>

      {/* ──────────── STRIP ──────────── */}
      <section className="bg-terra-400 py-5">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 items-center text-white text-sm font-medium">
            {[
              { icon: <Wind size={15} />, label: 'Ansiedade & padrões repetitivos' },
              { icon: <Heart size={15} />, label: 'Autoestima & autoconhecimento' },
              { icon: <Leaf size={15} />, label: 'Recomeços conscientes' },
              { icon: <Sparkles size={15} />, label: 'Equilíbrio emocional' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SOBRE ──────────── */}
      <section className="py-28 bg-cream-100">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <RevealOnScroll className="relative">
            <div className="relative">
              {/* Background blob */}
              <div className="absolute -inset-4 bg-sage-50 blob -z-10" />
              {/* Foto da Martha */}
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-sage-900/20">
                <Image
                  src="/martha-foto.jpg"
                  alt="Martha Angelo — Terapeuta Integrativa"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl shadow-sage-500/10 px-6 py-4 border border-sage-100">
                <p className="font-serif text-xl font-medium text-sage-700">+5 anos</p>
                <p className="text-xs text-stone-500 mt-0.5">de prática integrativa</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Text side */}
          <RevealOnScroll delay={200}>
            <span className="section-label">Sobre mim</span>
            <h2 className="section-title mb-6">
              Um espaço seguro<br />para ser quem<br />
              <em className="italic text-terra-400">você realmente é</em>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-5 text-lg font-light">
              Sou Martha Angelo, terapeuta integrativa especializada em ajudar mulheres que vivem no piloto automático —
              repetindo padrões, carregando emoções não processadas e sentindo que falta algo, mesmo quando tudo parece "certo".
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              Acredito que a transformação verdadeira começa de dentro para fora. Por isso, trabalho com uma abordagem que combina
              diferentes ferramentas terapêuticas — adaptadas para o que <em>você</em> precisa, no ritmo que <em>você</em> consegue.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                'Terapia integrativa com abordagem humanista',
                'Trabalho com ansiedade e padrões emocionais',
                'Sessões individuais online, com hora marcada',
                'Linguagem acolhedora, sem termos complicados',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-600 text-sm">
                  <CheckCircle2 size={16} className="text-sage-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/sobre" className="btn-primary">
              Minha história completa
              <ArrowRight size={16} />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* ──────────── SESSÕES ──────────── */}
      <section className="py-28 bg-sage-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-6xl mx-auto px-5">
          <RevealOnScroll className="text-center mb-16">
            <span className="section-label text-sage-300">Sessões</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-cream-100 mb-4">
              Escolha como quer<br />começar
            </h2>
            <p className="text-cream-200/60 max-w-lg mx-auto text-lg font-light">
              As sessões acontecem online, no horário que combinamos. Você não precisa de nada além de um lugar tranquilo.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">

            {/* 45min */}
            <RevealOnScroll delay={100}>
              <div className="card-hover bg-cream-100/5 border border-cream-100/15 rounded-3xl p-7 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-sage-500/30 rounded-2xl flex items-center justify-center">
                    <Wind size={20} className="text-sage-300" />
                  </div>
                  <span className="text-sage-300 font-medium text-xs tracking-widest uppercase">Sessão Leve</span>
                </div>
                <div className="mb-3">
                  <span className="font-serif text-4xl text-cream-100 font-medium">R$ 59</span>
                  <span className="font-serif text-2xl text-cream-100 font-medium">,90</span>
                  <span className="text-cream-200/50 text-xs ml-2 block mt-0.5">/ 45 minutos</span>
                </div>
                <p className="text-cream-200/60 text-sm leading-relaxed mb-6 flex-1">
                  Ideal para um foco pontual — quando você precisa de clareza sobre uma situação específica ou quer dar o primeiro passo com a terapia integrativa.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-cream-200/60">
                  {['Sessão individual online', 'Foco em um tema central', 'Link enviado por WhatsApp'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-sage-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/agendar?tipo=45" className="btn-outline !border-cream-100/20 !text-cream-100 hover:!bg-cream-100/10 justify-center text-sm">
                  Agendar 45 min
                </Link>
              </div>
            </RevealOnScroll>

            {/* 1h — Featured */}
            <RevealOnScroll delay={200}>
              <div className="card-hover bg-terra-400 rounded-3xl p-7 flex flex-col relative overflow-hidden h-full">
                <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                  Mais escolhida
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Heart size={20} className="text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs tracking-widest uppercase">Sessão Profunda</span>
                </div>
                <div className="mb-3">
                  <span className="font-serif text-4xl text-white font-medium">R$ 99</span>
                  <span className="font-serif text-2xl text-white font-medium">,90</span>
                  <span className="text-white/60 text-xs ml-2 block mt-0.5">/ 1 hora</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">
                  Para quem quer ir fundo. Trabalhamos padrões emocionais, desbloqueamos o que está represado e saímos com clareza e passos concretos.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-white/70">
                  {['Sessão individual online', 'Trabalho completo e profundo', 'Material de apoio após a sessão', 'Link enviado por WhatsApp'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-white/80 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/agendar?tipo=60" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-terra-500 rounded-full font-medium text-sm hover:bg-cream-100 transition-all hover:-translate-y-0.5 duration-300">
                  Agendar 1 hora
                  <ArrowRight size={15} />
                </Link>
              </div>
            </RevealOnScroll>

            {/* 1h40 */}
            <RevealOnScroll delay={300}>
              <div className="card-hover bg-cream-100/5 border border-cream-100/15 rounded-3xl p-7 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-sage-500/30 rounded-2xl flex items-center justify-center">
                    <Sparkles size={20} className="text-sage-300" />
                  </div>
                  <span className="text-sage-300 font-medium text-xs tracking-widest uppercase">Sessão Imersiva</span>
                </div>
                <div className="mb-3">
                  <span className="font-serif text-4xl text-cream-100 font-medium">R$ 169</span>
                  <span className="font-serif text-2xl text-cream-100 font-medium">,90</span>
                  <span className="text-cream-200/50 text-xs ml-2 block mt-0.5">/ 1h 40 minutos</span>
                </div>
                <p className="text-cream-200/60 text-sm leading-relaxed mb-6 flex-1">
                  Para momentos de grande transição ou bloqueios enraizados. Um espaço expandido para explorar, integrar emoções e sair com uma visão transformada de si mesma.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-cream-200/60">
                  {['Sessão individual online', 'Trabalho profundo e integrado', 'Material de apoio após a sessão', 'Espaço para desdobrar camadas', 'Link enviado por WhatsApp'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-sage-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/agendar?tipo=100" className="btn-outline !border-cream-100/20 !text-cream-100 hover:!bg-cream-100/10 justify-center text-sm">
                  Agendar 1h 40min
                </Link>
              </div>
            </RevealOnScroll>

            {/* Mensal */}
            <RevealOnScroll delay={400}>
              <div className="card-hover bg-sage-800/60 border border-sage-300/20 rounded-3xl p-7 flex flex-col relative overflow-hidden h-full">
                <div className="absolute top-4 right-4 bg-sage-300/20 text-sage-200 text-[10px] px-2.5 py-1 rounded-full font-medium">
                  Melhor valor
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-sage-300/20 rounded-2xl flex items-center justify-center">
                    <Star size={20} className="text-sage-300" />
                  </div>
                  <span className="text-sage-300 font-medium text-xs tracking-widest uppercase">Jornada Mensal</span>
                </div>
                <div className="mb-3">
                  <span className="font-serif text-4xl text-cream-100 font-medium">R$ 1.000</span>
                  <span className="text-cream-200/50 text-xs ml-2 block mt-0.5">/ 4 sessões por mês</span>
                </div>
                <p className="text-cream-200/60 text-sm leading-relaxed mb-6 flex-1">
                  A regularidade é o que cria transformação real. Quatro encontros mensais com acompanhamento contínuo — para quem está pronta para uma mudança profunda e duradoura.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-cream-200/60">
                  {['4 sessões individuais por mês', 'Acompanhamento contínuo', 'Suporte entre sessões via WhatsApp', 'Plano personalizado de trabalho', 'Prioridade de agendamento'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-sage-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/agendar?tipo=monthly" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage-300/20 border border-sage-300/30 text-cream-100 rounded-full font-medium text-sm hover:bg-sage-300/30 transition-all hover:-translate-y-0.5 duration-300">
                  Quero a Jornada Mensal
                  <ArrowRight size={15} />
                </Link>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* ──────────── COMO FUNCIONA ──────────── */}
      <section className="py-28 bg-cream-100">
        <div className="max-w-5xl mx-auto px-5">
          <RevealOnScroll className="text-center mb-16">
            <span className="section-label">Como funciona</span>
            <h2 className="section-title">
              Simples, seguro<br />e no seu tempo
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Line connector */}
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-sage-100 z-0" />

            {[
              { n: '01', label: 'Escolha', desc: 'Selecione o tipo de sessão e o horário que funciona para você.', icon: <Sparkles size={20} /> },
              { n: '02', label: 'Pague', desc: 'Pagamento seguro por PIX ou cartão via Mercado Pago.', icon: <Heart size={20} /> },
              { n: '03', label: 'Confirme', desc: 'Você recebe a confirmação e o link da sessão por e-mail e WhatsApp.', icon: <CheckCircle2 size={20} /> },
              { n: '04', label: 'Transforme', desc: 'Nossa sessão acontece online. Você só precisa de um lugar tranquilo.', icon: <Leaf size={20} /> },
            ].map((step, i) => (
              <RevealOnScroll key={step.n} delay={i * 120} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-sage-600 text-cream-100 flex items-center justify-center mb-4 shadow-lg shadow-sage-500/20">
                  {step.icon}
                </div>
                <span className="text-xs font-medium text-terra-400 tracking-widest mb-1">{step.n}</span>
                <h3 className="font-serif text-xl font-medium text-sage-700 mb-2">{step.label}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── DEPOIMENTOS ──────────── */}
      {testimonials.length > 0 && (
        <section className="py-28 bg-sage-50">
          <div className="max-w-6xl mx-auto px-5">
            <RevealOnScroll className="text-center mb-16">
              <span className="section-label">Depoimentos</span>
              <h2 className="section-title">
                O que elas dizem
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <RevealOnScroll key={t.id} delay={i * 100}>
                  <div className="card-hover bg-white rounded-3xl p-8 border border-sage-100 shadow-sm">
                    <div className="flex gap-0.5 mb-6">
                      {[...Array(t.stars)].map((_, j) => (
                        <Star key={j} size={14} className="text-terra-400 fill-terra-400" />
                      ))}
                    </div>
                    <p className="font-serif text-lg text-stone-700 leading-relaxed mb-6 italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 font-medium text-sm">
                        {t.initials}
                      </div>
                      <span className="text-stone-500 text-sm font-medium">{t.name}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────── BLOG ──────────── */}
      {posts.length > 0 && (
        <section className="py-28 bg-cream-100">
          <div className="max-w-6xl mx-auto px-5">
            <RevealOnScroll className="flex items-end justify-between mb-14">
              <div>
                <span className="section-label">Blog</span>
                <h2 className="section-title">Reflexões & práticas</h2>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-1 text-sage-500 hover:text-sage-600 font-medium text-sm transition-colors">
                Ver todos <ChevronRight size={16} />
              </Link>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <RevealOnScroll key={post.id} delay={i * 100}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-video bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl overflow-hidden mb-5 relative">
                      {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sage-400">
                          <BookOpen size={32} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className="inline-block text-xs font-medium text-terra-400 uppercase tracking-widest mb-3 bg-terra-50 px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                    <h3 className="font-serif text-xl font-medium text-sage-700 mb-2 group-hover:text-sage-500 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <span className="text-xs text-stone-400">{formatDate(post.createdAt)}</span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>

            <div className="md:hidden text-center mt-10">
              <Link href="/blog" className="btn-outline">Ver todos os posts</Link>
            </div>
          </div>
        </section>
      )}

      {/* ──────────── EBOOK ──────────── */}
      <section className="py-28 bg-terra-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-gradient-to-br from-terra-400 to-terra-500 rounded-[2.5rem] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Text */}
              <RevealOnScroll className="p-12 lg:p-16 flex flex-col justify-center">
                <span className="inline-block text-white/60 text-xs font-medium tracking-widest uppercase mb-4">Ebook Digital</span>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
                  Conhecendo o Meu<br />
                  <em className="italic">Eu Interior</em>
                </h2>
                <p className="text-white/75 leading-relaxed mb-8 font-light">
                  Um guia rápido para recomeçar com força e clareza. Para quem sente que precisa mudar,
                  mas não sabe por onde começar.
                </p>
                <a
                  href="https://hotmart.com/pt-br/marketplace/produtos/conhecendo-o-meu-eu-interior-um-guia-rapido-para-recomecar-com-forca-e-clareza/T104825108D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white text-terra-500 rounded-full font-medium text-sm hover:bg-cream-100 transition-all hover:-translate-y-0.5 duration-300 self-start"
                >
                  <BookOpen size={16} />
                  Quero o ebook
                  <ArrowRight size={16} />
                </a>
              </RevealOnScroll>

              {/* Capa do livro */}
              <RevealOnScroll delay={200} className="hidden lg:flex items-center justify-center p-12 relative">
                <div className="relative w-52 animate-float drop-shadow-2xl">
                  {/* Sombra decorativa */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-black/25 blur-xl rounded-full" />
                  <Image
                    src="https://hotmart.s3.amazonaws.com/product_pictures/83b6b68e-00e0-4326-ba65-58234f9dec16/cd0fe37a5b15498a9804c58a7b840cee.jpg"
                    alt="Conhecendo o Meu Eu Interior — ebook Martha Angelo"
                    width={208}
                    height={294}
                    className="w-full rounded-2xl rotate-3 shadow-2xl"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── CTA FINAL ──────────── */}
      <section className="py-28 bg-cream-100">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <RevealOnScroll>
            <span className="section-label">Vamos começar?</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-sage-700 mb-6 leading-tight">
              O primeiro passo é<br />
              <em className="italic text-terra-400">decidir se conhecer</em>
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-10 font-light">
              Você não precisa ter tudo resolvido para começar. Só precisa de um espaço seguro — e essa é exatamente a proposta de cada sessão.
            </p>
            <Link href="/agendar" className="btn-terra text-base !py-4 !px-10">
              Agendar minha primeira sessão
              <ArrowRight size={18} />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
