import { NextResponse } from 'next/server'
import { getRecipeById } from '@/app/src/services/recipeService'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const recipe = await getRecipeById(id)
    if (!recipe) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ok: true, recipe }, { status: 200 })
  } catch (error) {
    console.error('GET /api/recipes/[id] error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
