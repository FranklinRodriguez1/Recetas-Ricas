export type RecipeFavorite = {
  _id: string
  nombre: string
  imagen?: string
  tiempoPreparacion?: string
}

export async function getFavorites() {
  const res = await fetch('/api/favorites')
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

export async function toggleFavorite(id: string) {
  const res = await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}
