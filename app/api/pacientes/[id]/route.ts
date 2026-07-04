export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/pacientes/[id]
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        sessions: { orderBy: { sessionDate: 'desc' } },
      },
    })

    if (!patient) return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })

    return NextResponse.json(patient)
  } catch (error) {
    console.error('GET /api/pacientes/[id]:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// PUT /api/pacientes/[id] — atualiza dados do paciente
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, email, phone, birthDate, notes } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })
    }

    const patient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        birthDate: birthDate?.trim() || null,
        notes: notes?.trim() || null,
      },
    })

    return NextResponse.json(patient)
  } catch (error) {
    console.error('PUT /api/pacientes/[id]:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// DELETE /api/pacientes/[id]
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.patient.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/pacientes/[id]:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
