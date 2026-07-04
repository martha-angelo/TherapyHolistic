'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Link } from 'lucide-react'

interface Props {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [urlMode, setUrlMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
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
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-stone-600">Imagem do post</label>
        <button
          type="button"
          onClick={() => setUrlMode(!urlMode)}
          className="text-xs text-sage-500 hover:text-sage-700 flex items-center gap-1 transition-colors"
        >
          <Link size={11} />
          {urlMode ? 'Fazer upload' : 'Usar URL'}
        </button>
      </div>

      {urlMode ? (
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage-400 transition-colors"
        />
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="relative border-2 border-dashed border-stone-200 rounded-xl overflow-hidden transition-colors hover:border-sage-300"
        >
          {value ? (
            <div className="relative aspect-video">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover"
              />
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
