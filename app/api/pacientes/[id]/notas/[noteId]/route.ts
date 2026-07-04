import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/pacientes/[id]/notas/[noteId]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; noteId: string } }
) {
  try {
    const body = await req.json()
    const { sessionDate, whatWasDone, nextPlan, mood } = body

    if (!sessionDate || !whatWasDone?.trim()) {
      return NextResponse.json(
        { error: 'Data e o que foi trabalhado são obrigatórios' },
        { status: 400 }
      )
    }

    const note = await prisma.sessionNote.update({
      where: { id: params.noteId },
      data: {
        sessionDate,
        whatWasDone: whatWasDone.trim(),
        nextPlan: nextPlan?.trim() || null,
        mood: mood?.trim() || null,
      },
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error('PUT /api/pacientes/[id]/notas/[noteId]:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// DELETE /api/pacientes/[id]/notas/[noteId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; noteId: string } }
) {
  try {
    await prisma.sessionNote.delete({ where: { id: params.noteId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/pacientes/[id]/notas/[noteId]:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
