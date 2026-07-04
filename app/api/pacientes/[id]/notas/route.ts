import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/pacientes/[id]/notas
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notes = await prisma.sessionNote.findMany({
      where: { patientId: params.id },
      orderBy: { sessionDate: 'desc' },
    })
    return NextResponse.json(notes)
  } catch (error) {
    console.error('GET /api/pacientes/[id]/notas:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// POST /api/pacientes/[id]/notas — adiciona nota de sessão
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { sessionDate, whatWasDone, nextPlan, mood } = body

    if (!sessionDate || !whatWasDone?.trim()) {
      return NextResponse.json(
        { error: 'Data da sessão e o que foi trabalhado são obrigatórios' },
        { status: 400 }
      )
    }

    const note = await prisma.sessionNote.create({
      data: {
        patientId: params.id,
        sessionDate,
        whatWasDone: whatWasDone.trim(),
        nextPlan: nextPlan?.trim() || null,
        mood: mood?.trim() || null,
      },
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error('POST /api/pacientes/[id]/notas:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
