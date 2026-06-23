import { NextResponse } from 'next/server';
import { verifyTokenFromHeader } from '@/app/src/services/favoritesService';
import { getRecipeModel } from '@/app/src/models/recipeModel';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const user = verifyTokenFromHeader(cookieHeader);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const Recipe = await getRecipeModel();
    const favorites = await Recipe.find({ isFavorite: true }).lean();
    return NextResponse.json({ ok: true, favorites, user }, { status: 200 });
  } catch (error) {
    console.error('Favorites error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const user = verifyTokenFromHeader(cookieHeader);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body || {};
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const Recipe = await getRecipeModel();
    const doc = await Recipe.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    doc.isFavorite = !doc.isFavorite;
    await doc.save();

    return NextResponse.json({ ok: true, recipe: doc }, { status: 200 });
  } catch (error) {
    console.error('Favorites POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
