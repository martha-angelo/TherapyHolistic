export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import UpdateBookingStatus from '@/components/admin/UpdateBookingStatus'
import Link from 'next/link'

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: { arquivados?: string }
}) {
  const mostrarArquivados = searchParams.arquivados === '1'

  const bookings = await prisma.booking.findMany({
    where: mostrarArquivados
      ? { status: 'archived' }
      : { status: { not: 'archived' } },
    orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
  })

  const totalArquivados = await prisma.booking.count({
    where: { status: 'archived' },
  })

  const statusColor: Record<string, string> = {
    pending:  'bg-amber-50 text-amber-700 border border-amber-200',
    confirmed:'bg-sage-50 text-sage-700 border border-sage-200',
    paid:     'bg-sage-100 text-sage-800 border border-sage-300',
    cancelled:'bg-red-50 text-red-600 border border-red-200',
    archived: 'bg-stone-50 text-stone-400 border border-stone-200',
  }
  const statusLabel: Record<string, string> = {
    pending: 'Pendente', confirmed: 'Confirmado', paid: 'Pago',
    cancelled: 'Cancelado', archived: 'Arquivado',
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-sage-700">
            {mostrarArquivados ? 'Agendamentos arquivados' : 'Agenda completa'}
          </h1>
          <p className="text-stone-400 text-sm mt-1">{bookings.length} agendamento(s)</p>
        </div>
        <Link
          href={mostrarArquivados ? '/admin/agenda' : '/admin/agenda?arquivados=1'}
          className="text-sm border border-stone-200 rounded-xl px-4 py-2 text-stone-500 hover:border-stone-300 hover:text-stone-700 transition-all flex items-center gap-2"
        >
          {mostrarArquivados ? '← Voltar à agenda' : `📦 Ver arquivados (${totalArquivados})`}
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 text-stone-400 text-xs font-medium">
                <th className="text-left px-5 py-3">Cliente</th>
                <th className="text-left px-5 py-3">Contato</th>
                <th className="text-left px-5 py-3">Data</th>
                <th className="text-left px-5 py-3">Horário</th>
                <th className="text-left px-5 py-3">Sessão</th>
                <th className="text-left px-5 py-3">Valor</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {bookings.map(b => (
                <tr key={b.id} className={`hover:bg-stone-50 transition-colors ${b.status === 'archived' ? 'opacity-60' : ''}`}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-stone-700">{b.name}</p>
                    {b.notes && <p className="text-stone-400 text-xs mt-0.5 line-clamp-1 italic">"{b.notes}"</p>}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-stone-600 text-xs">{b.email}</p>
                    {b.phone && <p className="text-stone-400 text-xs">{b.phone}</p>}
                  </td>
                  <td className="px-5 py-4 text-stone-600 whitespace-nowrap">{b.date}</td>
                  <td className="px-5 py-4 text-stone-600">{b.timeSlot}</td>
                  <td className="px-5 py-4 text-stone-600">{b.duration}min</td>
                  <td className="px-5 py-4 font-medium text-sage-600">{formatCurrency(b.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[b.status] ?? 'bg-stone-50 text-stone-500'}`}>
                      {statusLabel[b.status] ?? b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <UpdateBookingStatus id={b.id} current={b.status} />
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-stone-400">
                    {mostrarArquivados ? 'Nenhum agendamento arquivado.' : 'Nenhum agendamento ativo.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
