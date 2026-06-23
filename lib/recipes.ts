import { getRecipeById as getRecipeByIdService } from '@/app/src/services/recipeService'

export async function getRecipeById(id: string) {
  return getRecipeByIdService(id)
}
