"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/src/context/AuthContext'
import { getFavorites, toggleFavorite } from '@/app/src/services/favoriteClient'

type Favorite = { _id: string; nombre: string; imagen?: string; tiempoPreparacion?: string }

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { logout, isLogin } = useAuth()

  useEffect(() => {
    async function load() {
      try {
        const { ok, status, data } = await getFavorites()
        if (status === 401) {
          router.push('/auth/login')
          return
        }
        if (!ok) {
          throw new Error('Error loading favorites')
        }
        setFavorites(data.favorites || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  async function removeFavorite(id: string) {
    try {
      const { ok, status } = await toggleFavorite(id)
      if (status === 401) {
        router.push('/auth/login')
        return
      }
      if (ok) {
        setFavorites((prev) => prev.filter((f) => f._id !== id))
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Favorites</h1>
          {!isLogin && <p className="text-sm text-gray-500">You must sign in to manage favorites.</p>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="px-3 py-1 rounded bg-gray-200 text-gray-800">Back</button>
          <button onClick={() => logout()} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
        </div>
      </div>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((f) => (
            <li key={f._id} className="bg-white rounded p-3 shadow flex items-center gap-3">
              {f.imagen && (
                <a href={`/recipes/${f._id}`} className="block w-16 h-16 flex-shrink-0">
                  <img src={f.imagen} alt={f.nombre} className="w-16 h-16 object-cover rounded" />
                </a>
              )}
              <div className="flex-1">
                <a href={`/recipes/${f._id}`} className="font-semibold hover:underline">{f.nombre}</a>
                <div className="text-sm text-gray-500">{f.tiempoPreparacion}</div>
              </div>
              <button onClick={() => removeFavorite(f._id)} className="px-2 py-1 bg-gray-100 rounded">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
