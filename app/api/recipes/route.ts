import { NextResponse } from 'next/server';
import { fetchRecipes, createDefaultRecipes } from '@/app/src/services/recipeService';

export async function GET() {
  try {
    const recipes = await fetchRecipes();
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Unable to load recipes' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const createdRecipes = await createDefaultRecipes();
    return NextResponse.json(
      { 
        message: `${createdRecipes.length} recipes created successfully`,
        recipes: createdRecipes
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating recipes:', error);
    return NextResponse.json({ error: 'Unable to create recipes' }, { status: 500 });
  }
}
