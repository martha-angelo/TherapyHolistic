export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, ExternalLink, BookOpen, GraduationCap, Users, Package } from 'lucide-react'
import DeleteProduct from '@/components/admin/DeleteProduct'

const TYPE_LABEL: Record<string, string> = {
  ebook: 'Ebook', curso: 'Curso', mentoria: 'Mentoria', outro: 'Outro',
}
const TYPE_ICON: Record<string, React.ReactNode> = {
  ebook: <BookOpen size={14} />,
  curso: <GraduationCap size={14} />,
  mentoria: <Users size={14} />,
  outro: <Package size={14} />,
}

export default async function ProdutosAdminPage() {
  const products = await prisma.product
    .findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
    .catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-sage-700">Produtos</h1>
          <p className="text-stone-400 text-sm mt-1">{products.length} produto(s) cadastrado(s)</p>
        </div>
        <Link href="/admin/produtos/novo" className="btn-primary !py-2.5 !px-5 !text-sm">
          <Plus size={15} /> Novo produto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-16 text-center">
          <Package size={40} className="text-stone-200 mx-auto mb-4" />
          <p className="text-stone-400 mb-4">Nenhum produto cadastrado ainda.</p>
          <Link href="/admin/produtos/novo" className="btn-primary !py-2.5 !px-5 !text-sm">
            <Plus size={15} /> Adicionar primeiro produto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map(p => (
            <div key={p.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${!p.active ? 'opacity-60' : 'border-stone-100'}`}>
              {/* Imagem */}
              <div className="h-44 bg-gradient-to-br from-sage-50 to-sage-100 relative overflow-hidden">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sage-300">
                    {TYPE_ICON[p.type] || <Package size={32} />}
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full text-stone-600 font-medium flex items-center gap-1">
                    {TYPE_ICON[p.type]} {TYPE_LABEL[p.type] || p.type}
                  </span>
                  {p.featured && (
                    <span className="bg-terra-400 text-white text-xs px-2.5 py-1 rounded-full font-medium">Destaque</span>
                  )}
                  {!p.active && (
                    <span className="bg-stone-400 text-white text-xs px-2.5 py-1 rounded-full font-medium">Inativo</span>
                  )}
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-5">
                <h3 className="font-serif font-medium text-sage-700 text-lg leading-snug mb-1">{p.title}</h3>
                {p.subtitle && <p className="text-stone-400 text-xs mb-2">{p.subtitle}</p>}
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                {p.price && (
                  <p className="font-serif text-xl font-medium text-sage-600 mb-4">
                    R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/produtos/${p.id}`}
                    className="flex-1 text-center text-sm border border-sage-200 text-sage-600 rounded-xl py-2 hover:bg-sage-50 transition-colors"
                  >
                    Editar
                  </Link>
                  <a
                    href={p.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-stone-200 rounded-xl text-stone-400 hover:text-stone-600 hover:border-stone-300 transition-colors"
                    title="Ver produto"
                  >
                    <ExternalLink size={15} />
                  </a>
                  <DeleteProduct id={p.id} title={p.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
