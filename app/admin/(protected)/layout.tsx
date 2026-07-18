import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Leaf, LayoutDashboard, FileText, Calendar, Users, Package } from 'lucide-react'
import SignOutButton from '@/components/admin/SignOutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Sidebar */}
      <aside className="w-60 bg-sage-700 flex flex-col fixed h-full z-40">
        <div className="px-6 py-6 border-b border-sage-600">
          <div className="flex items-center gap-2 mb-1">
            <Leaf size={18} className="text-sage-300" strokeWidth={1.5} />
            <span className="font-serif text-lg text-cream-100 font-medium">Martha Angelo</span>
          </div>
          <span className="text-sage-400 text-xs">Painel administrativo</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
            { href: '/admin/posts', label: 'Posts', icon: <FileText size={16} /> },
            { href: '/admin/agenda', label: 'Agenda', icon: <Calendar size={16} /> },
            { href: '/admin/pacientes', label: 'Pacientes', icon: <Users size={16} /> },
            { href: '/admin/produtos', label: 'Produtos', icon: <Package size={16} /> },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream-200/70 hover:text-cream-100 hover:bg-sage-600/50 transition-all text-sm font-medium"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-6 border-t border-sage-600 pt-4">
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-60 flex-1 min-h-screen">
        {children}
      </div>
    </div>
  )
}
