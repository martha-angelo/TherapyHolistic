import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug, published: true } })
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.imageUrl ? [post.imageUrl] : [] },
  }
}

function renderContent(content: string) {
  return content
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<h3>${line.replace(/\*\*/g, '')}</h3>`
      }
      if (line.match(/^\d+\./)) {
        return `<p>${line}</p>`
      }
      if (line.startsWith('- ')) {
        return `<p>${line.replace('- ', '• ')}</p>`
      }
      if (line.trim() === '') return '<br/>'
      // Bold within paragraphs
      const parsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return `<p>${parsed}</p>`
    })
    .join('')
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug, published: true } })
  if (!post) notFound()

  const related = await prisma.post.findMany({
    where: { published: true, category: post.category, id: { not: post.id } },
    take: 2,
  })

  const readTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-sage-700 relative">
        <div className="max-w-4xl mx-auto px-5 pb-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sage-300 hover:text-cream-100 transition-colors text-sm mb-8">
            <ArrowLeft size={14} /> Voltar ao blog
          </Link>
          <div className="inline-block text-xs font-medium text-terra-300 uppercase tracking-widest mb-5 bg-terra-400/20 px-3 py-1 rounded-full">
            {post.category}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-cream-100 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-5 text-cream-200/50 text-sm">
            <span>{formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {readTime} min de leitura</span>
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> Martha Angelo</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.imageUrl && (
        <div className="max-w-5xl mx-auto px-5 -mt-8">
          <div className="aspect-video rounded-3xl overflow-hidden relative shadow-2xl shadow-sage-700/30">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-5 py-16">
        <p className="font-serif text-xl text-stone-600 italic leading-relaxed mb-10 border-l-4 border-sage-300 pl-6">
          {post.excerpt}
        </p>
        <div
          className="prose-martha"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />
      </article>

      {/* Author card */}
      <div className="max-w-3xl mx-auto px-5 pb-16">
        <div className="bg-sage-50 rounded-3xl p-8 flex items-start gap-6 border border-sage-100">
          <div className="w-14 h-14 rounded-2xl bg-sage-200 flex items-center justify-center text-sage-700 font-serif font-medium text-lg flex-shrink-0">
            MA
          </div>
          <div>
            <h4 className="font-medium text-sage-700 mb-1">Martha Angelo</h4>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              Terapeuta integrativa especializada em ansiedade, padrões repetitivos e recomeços conscientes.
            </p>
            <Link href="/agendar" className="btn-primary !py-2 !px-5 !text-xs">
              Agendar sessão →
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream-200/50 py-16">
          <div className="max-w-5xl mx-auto px-5">
            <h3 className="font-serif text-2xl font-medium text-sage-700 mb-8">Você também pode gostar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-sage-100 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-sage-100 relative">
                    {p.imageUrl && <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif text-lg font-medium text-sage-700 group-hover:text-sage-500 transition-colors mb-2">{p.title}</h4>
                    <p className="text-stone-500 text-sm line-clamp-2">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
