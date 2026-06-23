"use client"

import React, { useState } from 'react'
import { useAuth } from '@/app/src/context/AuthContext'
import { toggleFavorite } from '@/app/src/services/favoriteClient'
import { useRouter } from 'next/navigation'

export default function RecipeFavoriteToggle({ id, initial }: { id: string; initial?: boolean }) {
  const { isLogin } = useAuth()
  const router = useRouter()
  const [isFav, setIsFav] = useState(!!initial)
  const [loading, setLoading] = useState(false)

  if (!isLogin) {
    return (
      <button
        type="button"
        onClick={() => router.push('/auth/login')}
        className="px-2 py-1 rounded bg-gray-200 text-gray-500"
      >
        Favorite
      </button>
    )
  }

  async function onToggle() {
    setLoading(true)
    try {
      const { ok, status, data } = await toggleFavorite(id)
      if (status === 401) {
        router.push('/auth/login')
        return
      }
      if (ok) setIsFav(!!data.recipe?.isFavorite)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={onToggle} disabled={loading} className="px-2 py-1 rounded bg-red-500 text-white">{isFav ? 'Favorite' : 'Mark favorite'}</button>
  )
}
