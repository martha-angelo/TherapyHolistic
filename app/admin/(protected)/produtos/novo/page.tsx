import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function NovoProdutoPage() {
  return (
    <div className="p-8">
      <Link href="/admin/produtos" className="text-sm text-stone-400 hover:text-stone-600 flex items-center gap-1 mb-6">
        <ChevronLeft size={14} /> Voltar para Produtos
      </Link>
      <h1 className="font-serif text-3xl font-medium text-sage-700 mb-8">Novo produto</h1>
      <ProductForm />
    </div>
  )
}
