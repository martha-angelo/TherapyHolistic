'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Link as LinkIcon } from 'lucide-react'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Imagem' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  // URL mode é o padrão — upload direto não funciona no Vercel (filesystem read-only)
  // Quando BLOB_READ_WRITE_TOKEN estiver configurado, o upload volta a funcionar
  const blobConfigured = false // mude para true após configurar Vercel Blob
  const [urlMode, setUrlMode] = useState(!blobConfigured)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro no upload')
      onChange(data.url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro no upload')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-stone-600">{label}</label>
        {blobConfigured && (
          <button
            type="button"
            onClick={() => setUrlMode(!urlMode)}
            className="text-xs text-sage-500 hover:text-sage-700 flex items-center gap-1 transition-colors"
          >
            <LinkIcon size={11} />
            {urlMode ? 'Fazer upload' : 'Usar URL'}
          </button>
        )}
      </div>

      {urlMode ? (
        <div>
          <input
            type="url"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://hotmart.s3.amazonaws.com/... ou qualquer URL de imagem"
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
          />
          <p className="text-xs text-stone-400 mt-1.5">
            Cole a URL de uma imagem (do Hotmart, Unsplash, etc.)
          </p>
          {value && (
            <div className="mt-3 relative aspect-video rounded-xl overflow-hidden border border-stone-100 max-w-sm">
              <Image src={value} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="relative border-2 border-dashed border-stone-200 rounded-xl overflow-hidden transition-colors hover:border-sage-300"
        >
          {value ? (
            <div className="relative aspect-video">
              <Image src={value} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-10 cursor-pointer text-stone-400 hover:text-sage-600 transition-colors"
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? (
                <Loader2 size={28} className="animate-spin mb-2 text-sage-400" />
              ) : (
                <Upload size={28} className="mb-2" />
              )}
              <p className="text-sm font-medium">
                {uploading ? 'Enviando...' : 'Clique ou arraste uma imagem'}
              </p>
              <p className="text-xs mt-1">PNG, JPG, WEBP — máx. 5MB</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  )
}
