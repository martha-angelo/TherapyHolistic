export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { title, subtitle, description, price, imageUrl, linkUrl, type, active, featured, sortOrder } = body

    if (!title?.trim() || !description?.trim() || !linkUrl?.trim()) {
      return NextResponse.json({ error: 'Título, descrição e link são obrigatórios' }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title: title.trim(),
        subtitle: subtitle?.trim() || null,
        description: description.trim(),
        price: price ? parseFloat(price) : null,
        imageUrl: imageUrl?.trim() || null,
        linkUrl: linkUrl.trim(),
        type: type || 'ebook',
        active: active ?? true,
        featured: featured ?? false,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      },
    })

    return NextResponse.json(product)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
