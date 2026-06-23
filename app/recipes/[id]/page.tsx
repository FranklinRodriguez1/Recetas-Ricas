import React from 'react'
import { getRecipeById } from '@/lib/recipes'
import RecipeFavoriteToggle from '@/app/src/components/RecipeFavoriteToggle'
import BackButton from '@/app/src/components/BackButton'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

export default async function RecipePage({ params }: Props) {
  const { id } = await params
  const recipe = await getRecipeById(id)
  
  if (!recipe) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>
        <div>Recipe not found.</div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-2xl font-bold">{recipe.nombre}</h1>
        </div>
        <div className="flex items-center gap-2">
          <RecipeFavoriteToggle id={String(recipe._id)} initial={!!recipe.isFavorite} />
          <Link href="/favorites" className="px-3 py-1 bg-blue-500 text-white rounded">Favorites</Link>
        </div>
      </div>

      <img src={recipe.imagen} alt={recipe.nombre} className="w-full h-64 object-cover rounded mb-4" />
      <div className="mb-4 text-sm text-gray-600">⏱️ {recipe.tiempoPreparacion} • {recipe.dificultad}</div>

      <div className="grid gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          {recipe.ingredientes && recipe.ingredientes.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredientes.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No ingredients available.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Preparation</h2>
          {recipe.preparacion && Array.isArray(recipe.preparacion) && recipe.preparacion.length > 0 ? (
            <ol className="list-decimal list-inside text-gray-700">
              {recipe.preparacion.map((step: string, index: number) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">Paso {index + 1}:</span> {step.replace(/^Paso \d+: ?/, '')}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No instructions available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
