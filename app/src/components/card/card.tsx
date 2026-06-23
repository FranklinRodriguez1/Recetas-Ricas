"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/src/context/AuthContext'
import { toggleFavorite } from '@/app/src/services/favoriteClient'
import type { RecipeCard as RecipeCardType } from '@/app/src/services/recipeClient'

type Props = {
  recipe: RecipeCardType
}

export default function RecipeCard({ recipe }: Props) {
  const router = useRouter()
  const { isLogin } = useAuth()
  const [isFav, setIsFav] = useState(!!recipe.isFavorite)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsFav(!!recipe.isFavorite)
  }, [recipe.isFavorite])

  async function handleToggleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    if (!isLogin) {
      router.push('/auth/login')
      return
    }

    setLoading(true)
    try {
      const { ok, status, data } = await toggleFavorite(recipe._id)
      if (status === 401) {
        router.push('/auth/login')
        return
      }
      if (ok) {
        setIsFav(data?.recipe?.isFavorite ?? !isFav)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleOpenRecipe() {
    router.push(`/recipes/${recipe._id}`)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenRecipe}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleOpenRecipe()
        }
      }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative w-full h-64 overflow-hidden bg-gray-200">
        <img
          src={recipe.imagen}
          alt={recipe.nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={loading}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {isFav ? (
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.09C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {recipe.dificultad}
        </div>
      </div>

      <div className="p-4 flex flex-col h-40">
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{recipe.nombre}</h3>
          <p className="text-sm text-gray-500">⏱️ {recipe.tiempoPreparacion}</p>
        </div>
        
      </div>
    </div>
  )
}
