export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas imagens são permitidas' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Imagem muito grande (máx. 5MB)' }, { status: 400 })
    }

    // Opção 1: Vercel Blob (requer BLOB_READ_WRITE_TOKEN no painel Vercel)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const ext = file.name.split('.').pop() || 'jpg'
      const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const blob = await put(filename, file, { access: 'public' })
      return NextResponse.json({ url: blob.url })
    }

    // Opção 2: Cloudinary (requer CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET no painel Vercel)
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_UPLOAD_PRESET) {
      const cloudForm = new FormData()
      cloudForm.append('file', file)
      cloudForm.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
      cloudForm.append('folder', 'martha-angelo')

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: cloudForm }
      )
      const data = await res.json()
      if (data.secure_url) {
        return NextResponse.json({ url: data.secure_url })
      }
      throw new Error(data.error?.message || 'Erro no Cloudinary')
    }

    // Nenhum provider configurado
    return NextResponse.json(
      { error: 'Upload não configurado no servidor. Use a opção "Usar URL" para inserir imagens por enquanto.' },
      { status: 503 }
    )
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
  }
}
