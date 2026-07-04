export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, Calendar, DollarSign, Users, Plus, ArrowRight } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default async function AdminDashboard() {
  const [totalBookings, confirmedBookings, totalPosts, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: { in: ['confirmed', 'paid'] } } }),
    prisma.post.count({ where: { published: true } }),
    prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  // patient.count() só disponível após rodar: npx prisma migrate dev --name add_patients
  const totalPatients = await (prisma as any).patient?.count?.() ?? 0

  const revenue = await prisma.booking.aggregate({
    where: { status: { in: ['confirmed', 'paid'] } },
    _sum: { price: true },
  })

  const metrics = [
    { label: 'Agendamentos totais', value: totalBookings, icon: <Calendar size={20} />, color: 'bg-sage-50 text-sage-600' },
    { label: 'Sessões confirmadas', value: confirmedBookings, icon: <Users size={20} />, color: 'bg-terra-50 text-terra-500' },
    { label: 'Pacientes cadastrados', value: totalPatients, icon: <Users size={20} />, color: 'bg-sage-50 text-sage-600' },
    { label: 'Posts publicados', value: totalPosts, icon: <FileText size={20} />, color: 'bg-sage-50 text-sage-600' },
    { label: 'Receita confirmada', value: formatCurrency(revenue._sum.price ?? 0), icon: <DollarSign size={20} />, color: 'bg-terra-50 text-terra-500' },
  ]

  const statusColor: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    confirmed: 'bg-sage-50 text-sage-700',
    paid: 'bg-sage-100 text-sage-800',
    cancelled: 'bg-red-50 text-red-600',
  }
  const statusLabel: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    paid: 'Pago',
    cancelled: 'Cancelado',
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-sage-700">Dashboard</h1>
          <p className="text-stone-400 text-sm mt-1">Bem-vinda de volta, Martha 🌿</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/posts/novo" className="btn-primary !py-2.5 !px-5 !text-sm">
            <Plus size={15} /> Novo post
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map(m => (
          <div key={m.label} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${m.color}`}>
              {m.icon}
            </div>
            <p className="font-serif text-2xl font-medium text-stone-800">{m.value}</p>
            <p className="text-stone-400 text-xs mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-50">
          <h2 className="font-medium text-stone-700">Agendamentos recentes</h2>
          <Link href="/admin/agenda" className="text-sage-500 hover:text-sage-600 text-sm flex items-center gap-1">
            Ver todos <ArrowRight size={13} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 text-stone-400 text-xs font-medium">
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-6 py-3">Data</th>
                <th className="text-left px-6 py-3">Horário</th>
                <th className="text-left px-6 py-3">Sessão</th>
                <th className="text-left px-6 py-3">Valor</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {recentBookings.map(b => (
                <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-700">{b.name}</p>
                    <p className="text-stone-400 text-xs">{b.email}</p>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{b.date}</td>
                  <td className="px-6 py-4 text-stone-600">{b.timeSlot}</td>
                  <td className="px-6 py-4 text-stone-600">{b.duration}min</td>
                  <td className="px-6 py-4 font-medium text-sage-600">{formatCurrency(b.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[b.status] ?? 'bg-stone-100 text-stone-500'}`}>
                      {statusLabel[b.status] ?? b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-stone-400 text-sm">
                    Nenhum agendamento ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/posts" className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-sage-200 transition-all group flex items-center gap-4">
          <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center text-sage-600 group-hover:bg-sage-100 transition-colors">
            <FileText size={18} />
          </div>
          <div>
            <p className="font-medium text-stone-700">Gerenciar posts</p>
            <p className="text-stone-400 text-xs">Criar, editar e publicar artigos</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-stone-300 group-hover:text-sage-400 transition-colors" />
        </Link>
        <Link href="/admin/agenda" className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-sage-200 transition-all group flex items-center gap-4">
          <div className="w-10 h-10 bg-terra-50 rounded-xl flex items-center justify-center text-terra-500 group-hover:bg-terra-100 transition-colors">
            <Calendar size={18} />
          </div>
          <div>
            <p className="font-medium text-stone-700">Ver agenda completa</p>
            <p className="text-stone-400 text-xs">Todos os agendamentos e status</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-stone-300 group-hover:text-terra-400 transition-colors" />
        </Link>
      </div>
    </div>
  )
}
