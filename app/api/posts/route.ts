export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, excerpt, content, imageUrl, category, published, featured } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const slug = slugify(title) + '-' + Date.now().toString(36)
    const post = await prisma.post.create({
      data: { title, slug, excerpt, content, imageUrl: imageUrl || null, category, published: !!published, featured: !!featured },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro ao criar post' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, excerpt, content, imageUrl, category, published, featured } = body

    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    const post = await prisma.post.update({
      where: { id },
      data: { title, excerpt, content, imageUrl: imageUrl || null, category, published: !!published, featured: !!featured },
    })

    return NextResponse.json(post)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    await prisma.post.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro ao excluir post' }, { status: 500 })
  }
}
