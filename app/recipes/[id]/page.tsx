import React from 'react'
import { getRecipeById } from '@/lib/recipes'
import RecipeFavoriteToggle from '@/app/src/components/RecipeFavoriteToggle'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

export default async function RecipePage({ params }: Props) {
  const { id } = await params
  const recipe = await getRecipeById(id)
  
  if (!recipe) {
    return <div className="p-6">Recipe not found.</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{recipe.nombre}</h1>
        <div className="flex items-center gap-2">
          <RecipeFavoriteToggle id={String(recipe._id)} initial={!!recipe.isFavorite} />
          <Link href="/favorites" className="px-3 py-1 bg-blue-500 text-white rounded">Favorites</Link>
        </div>
      </div>

      <img src={recipe.imagen} alt={recipe.nombre} className="w-full h-64 object-cover rounded mb-4" />
      <div className="mb-4 text-sm text-gray-600">⏱️ {recipe.tiempoPreparacion} • {recipe.dificultad}</div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Preparation</h2>
        <p className="whitespace-pre-line">{recipe.preparacion || 'No instructions available.'}</p>
      </div>
    </div>
  )
}
