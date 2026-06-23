"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/src/context/AuthContext'
import { getRecipes } from '@/app/src/services/recipeClient'
import { toggleFavorite } from '@/app/src/services/favoriteClient'

type Recipe = {
  _id: string;
  nombre: string;
  imagen: string;
  tiempoPreparacion: string;
  dificultad: string;
  isFavorite?: boolean;
};

const Dashboard = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter()
  const { logout, isLogin, user } = useAuth()

  useEffect(() => {
    async function loadRecipes() {
      try {
        const { ok, data } = await getRecipes()
        if (!ok) {
          throw new Error('Error loading recipes')
        }
        setRecipes(data)
      } catch (err) {
        setError('Unable to load recipes.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recipe Catalog</h1>
            <p className="text-gray-600">Browse recipes from the collection</p>
          </div>
          <div className="flex items-center gap-3">
            {isLogin && user ? (
              <>
                <span className="text-gray-700">Hello, {user.email}</span>
                <button
                  onClick={() => router.push('/favorites')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Favorites
                </button>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/auth/login')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-600">Loading recipes...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : recipes.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">No recipes available.</div>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe._id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/recipes/${recipe._id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    router.push(`/recipes/${recipe._id}`)
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
                  <FavoriteButton recipe={recipe} />
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {recipe.dificultad}
                  </div>
                </div>

                <div className="p-4 flex flex-col h-40">
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{recipe.nombre}</h3>
                    <p className="text-sm text-gray-500">⏱️ {recipe.tiempoPreparacion}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      {recipe.dificultad}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard

function FavoriteButton({ recipe }: { recipe: any }) {
  const { isLogin } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isFav, setIsFav] = useState(!!recipe.isFavorite)

  useEffect(() => {
    setIsFav(!!recipe.isFavorite)
  }, [recipe.isFavorite])

  useEffect(() => {
    if (!isLogin) {
      setIsFav(false)
    }
  }, [isLogin])

  async function toggleFav(e: React.MouseEvent) {
    e.stopPropagation()
    if (!isLogin) {
      router.push('/auth/login')
      return
    }
    setLoading(true)
    try {
      const { ok, data, status } = await toggleFavorite(recipe._id)
      if (status === 401) {
        router.push('/auth/login')
        return
      }
      if (ok) {
        const nextValue = data?.isFavorite ?? !isFav
        setIsFav(nextValue)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFav}
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
  )
}
