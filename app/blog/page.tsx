import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Reflexões, práticas e autoconhecimento. Conteúdo sobre ansiedade, emoções e recomeços conscientes.',
}

const CATEGORIES = ['todos', 'ansiedade', 'terapia', 'autocuidado', 'reflexoes', 'padroes']

export default async function BlogPage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams.cat && searchParams.cat !== 'todos' ? searchParams.cat : undefined
  const posts = await prisma.post.findMany({
    where: { published: true, ...(cat ? { category: cat } : {}) },
    orderBy: { createdAt: 'desc' },
  })
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured || cat)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-sage-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <span className="section-label text-sage-300">Blog</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-cream-100 mb-5">
            Reflexões &<br />
            <em className="italic text-terra-300">práticas</em>
          </h1>
          <p className="text-cream-200/60 text-lg font-light">
            Conteúdo para quem quer se entender melhor e viver com mais leveza.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream-100">
        <div className="max-w-6xl mx-auto px-5">
          {/* Category filters */}
          <div className="flex gap-3 flex-wrap mb-12">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={c === 'todos' ? '/blog' : `/blog?cat=${c}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  (cat ?? 'todos') === c
                    ? 'bg-sage-600 text-white'
                    : 'bg-white border border-sage-200 text-stone-600 hover:border-sage-400'
                }`}
              >
                {c}
              </Link>
            ))}
          </div>

          {/* Featured post */}
          {featured && !cat && (
            <RevealOnScroll className="mb-14">
              <Link href={`/blog/${featured.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-sage-100 shadow-sm hover:shadow-xl hover:shadow-sage-500/10 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto relative bg-sage-100">
                    {featured.imageUrl ? (
                      <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sage-400">
                        <BookOpen size={48} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <span className="inline-block text-xs font-medium text-terra-400 uppercase tracking-widest mb-3 bg-terra-50 px-3 py-1 rounded-full self-start">
                      ⭐ Em destaque · {featured.category}
                    </span>
                    <h2 className="font-serif text-3xl font-medium text-sage-700 mb-4 group-hover:text-sage-500 transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-stone-500 leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">{formatDate(featured.createdAt)}</span>
                      <span className="text-sage-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Ler artigo →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          )}

          {/* Post grid */}
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rest.map((post, i) => (
                <RevealOnScroll key={post.id} delay={i * 80}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-video bg-sage-100 rounded-2xl overflow-hidden mb-5 relative">
                      {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sage-400">
                          <BookOpen size={28} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <span className="inline-block text-xs font-medium text-terra-400 uppercase tracking-widest mb-3 bg-terra-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-sage-700 mb-2 group-hover:text-sage-500 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <span className="text-xs text-stone-400">{formatDate(post.createdAt)}</span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-stone-400">
              <BookOpen size={48} strokeWidth={1} className="mx-auto mb-4" />
              <p>Nenhum post nessa categoria ainda.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
