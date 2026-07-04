import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/pacientes — lista todos
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { sessions: true } },
      },
    })
    return NextResponse.json(patients)
  } catch (error) {
    console.error('GET /api/pacientes:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// POST /api/pacientes — cria novo paciente
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, birthDate, notes } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })
    }

    const patient = await prisma.patient.create({
      data: {
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        birthDate: birthDate?.trim() || null,
        notes: notes?.trim() || null,
      },
    })

    return NextResponse.json(patient, { status: 201 })
  } catch (error) {
    console.error('POST /api/pacientes:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
