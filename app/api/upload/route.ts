import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas imagens são permitidas' }, { status: 400 })
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Imagem muito grande (máx. 5MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Unique filename
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filepath = join(uploadDir, filename)

    await writeFile(filepath, buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
  }
}
