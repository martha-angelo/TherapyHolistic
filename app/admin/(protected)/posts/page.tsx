import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import DeletePostButton from '@/components/admin/DeletePostButton'

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-sage-700">Posts</h1>
          <p className="text-stone-400 text-sm mt-1">{posts.length} artigo(s) no total</p>
        </div>
        <Link href="/admin/posts/novo" className="btn-primary !py-2.5 !px-5 !text-sm">
          <Plus size={15} /> Novo post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-50 text-stone-400 text-xs font-medium">
              <th className="text-left px-6 py-3">Título</th>
              <th className="text-left px-6 py-3">Categoria</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Data</th>
              <th className="text-left px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-stone-700 line-clamp-1">{post.title}</p>
                  <p className="text-stone-400 text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-1 bg-sage-50 text-sage-600 rounded-full capitalize">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${post.published ? 'text-sage-600' : 'text-stone-400'}`}>
                    {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {post.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-400 text-xs">{formatDate(post.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="flex items-center gap-1 text-xs text-sage-500 hover:text-sage-700 font-medium transition-colors"
                    >
                      <Edit size={13} /> Editar
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                  Nenhum post ainda.{' '}
                  <Link href="/admin/posts/novo" className="text-sage-500 hover:underline">Criar o primeiro</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
