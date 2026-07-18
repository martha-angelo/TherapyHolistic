export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) notFound()

  return (
    <div className="p-8">
      <Link href="/admin/produtos" className="text-sm text-stone-400 hover:text-stone-600 flex items-center gap-1 mb-6">
        <ChevronLeft size={14} /> Voltar para Produtos
      </Link>
      <h1 className="font-serif text-3xl font-medium text-sage-700 mb-8">Editar produto</h1>
      <ProductForm initial={{
        id: product.id,
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        linkUrl: product.linkUrl,
        type: product.type,
        active: product.active,
        featured: product.featured,
        sortOrder: product.sortOrder,
      }} />
    </div>
  )
}
