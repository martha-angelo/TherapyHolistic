import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Users, Plus, ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PacientesPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { sessions: true } },
      sessions: { orderBy: { sessionDate: 'desc' }, take: 1 },
    },
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-800 font-semibold">Pacientes</h1>
          <p className="text-stone-500 text-sm mt-1">{patients.length} paciente{patients.length !== 1 ? 's' : ''} cadastrado{patients.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/pacientes/novo"
          className="flex items-center gap-2 bg-sage-600 text-white px-4 py-2.5 rounded-xl hover:bg-sage-700 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Novo paciente
        </Link>
      </div>

      {/* Lista */}
      {patients.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-stone-200">
          <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-sage-400" />
          </div>
          <h3 className="text-stone-700 font-medium mb-2">Nenhum paciente ainda</h3>
          <p className="text-stone-400 text-sm mb-6">Cadastre seu primeiro paciente para começar a registrar as sessões.</p>
          <Link
            href="/admin/pacientes/novo"
            className="inline-flex items-center gap-2 bg-sage-600 text-white px-4 py-2.5 rounded-xl hover:bg-sage-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            Cadastrar paciente
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {patients.map((p) => {
            const lastSession = p.sessions[0]
            const initials = p.name
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')
              .toUpperCase()

            return (
              <Link
                key={p.id}
                href={`/admin/pacientes/${p.id}`}
                className="flex items-center gap-4 bg-white border border-stone-200 rounded-2xl p-5 hover:border-sage-300 hover:shadow-sm transition-all group"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sage-700 font-semibold text-sm">{initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 truncate">{p.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {p.email && <span className="text-stone-400 text-xs truncate">{p.email}</span>}
                    {p.phone && <span className="text-stone-400 text-xs">{p.phone}</span>}
                  </div>
                </div>

                {/* Meta */}
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-medium text-sage-700">
                    {p._count.sessions} sessão{p._count.sessions !== 1 ? 'ões' : ''}
                  </span>
                  {lastSession && (
                    <p className="text-xs text-stone-400 mt-0.5">
                      Última: {new Date(lastSession.sessionDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>

                <ChevronRight size={16} className="text-stone-300 group-hover:text-sage-500 transition-colors flex-shrink-0" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
