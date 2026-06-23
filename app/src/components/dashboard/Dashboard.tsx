"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/src/context/AuthContext'
import { getRecipes } from '@/app/src/services/recipeClient'
import RecipeCard from '@/app/src/components/card/card'

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
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard
