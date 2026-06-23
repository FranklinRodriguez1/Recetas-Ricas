import { RecipeDocument } from '@/app/src/models/recipeModel';

export async function getRecipes(): Promise<{ ok: boolean; status: number; data: any }> {
  const res = await fetch('/api/recipes')
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

export async function getRecipeById(id: string): Promise<{ ok: boolean; status: number; data: any }> {
  const res = await fetch(`/api/recipes/${id}`)
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

export type RecipeCard = {
  _id: string
  nombre: string
  imagen: string
  tiempoPreparacion: string
  dificultad: string
  isFavorite?: boolean
}
