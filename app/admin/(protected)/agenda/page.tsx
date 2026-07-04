import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import UpdateBookingStatus from '@/components/admin/UpdateBookingStatus'

export default async function AgendaPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
  })

  const statusColor: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    confirmed: 'bg-sage-50 text-sage-700 border border-sage-200',
    paid: 'bg-sage-100 text-sage-800 border border-sage-300',
    cancelled: 'bg-red-50 text-red-600 border border-red-200',
  }
  const statusLabel: Record<string, string> = {
    pending: 'Pendente', confirmed: 'Confirmado', paid: 'Pago', cancelled: 'Cancelado',
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-sage-700">Agenda completa</h1>
        <p className="text-stone-400 text-sm mt-1">{bookings.length} agendamento(s)</p>
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
                <tr key={b.id} className="hover:bg-stone-50 transition-colors">
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
                    Nenhum agendamento ainda.
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
