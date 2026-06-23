import { getRecipeModel, RecipeDocument } from '@/app/src/models/recipeModel';

const defaultRecipes = [
  {
    nombre: "Pasta Carbonara",
    imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    tiempoPreparacion: "20 minutos",
    dificultad: "Fácil",
    preparacion: "Cuece la pasta al dente. Bate huevos con queso parmesano y pimienta negra. Dora la panceta hasta que esté crujiente. Mezcla la pasta caliente con la panceta y la mezcla de huevos fuera del fuego, sirve de inmediato."
  },
  {
    nombre: "Ceviche Peruano",
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
    tiempoPreparacion: "30 minutos",
    dificultad: "Medio",
    preparacion: "Corta pescado fresco en cubos pequeños. Mezcla con zumo de limón, sal, ají limo y cebolla roja en rodajas finas. Deja marinar hasta que el pescado cambie de color. Sirve frío con cilantro y batata."
  },
  {
    nombre: "Tacos al Pastor",
    imagen: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop",
    tiempoPreparacion: "45 minutos",
    dificultad: "Medio",
    preparacion: "Marina la carne de cerdo con achiote, naranja, ajo y especias. Cocina en una sartén caliente hasta que esté bien dorada. Calienta tortillas de maíz, sirve con carne, piña asada, cebolla picada y cilantro."
  },
  {
    nombre: "Ramen Japonés",
    imagen: "https://cocina-casera.com/wp-content/uploads/2023/03/ramen-receta-casera-770x485.jpg",
    tiempoPreparacion: "60 minutos",
    dificultad: "Difícil",
    preparacion: "Prepara un caldo concentrado con huesos, salsa de soja y miso. Cocina los fideos ramen al dente. En un bol, coloca fideos, caldo caliente y acompaña con huevo cocido, cerdo chashu y brotes de bambú."
  },
  {
    nombre: "Pad Thai",
    imagen: "https://www.seriouseats.com/thmb/39tEWLaqBdtwixGlb2caIMbkq9g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250214-SEA-PadThai-AmandaSuarez-hero-4251c730d61a40ba935f2d43153d6862.jpg",
    tiempoPreparacion: "25 minutos",
    dificultad: "Fácil",
    preparacion: "Remoja los fideos de arroz. Saltea ajo, tofu y camarones. Añade los fideos, tamarindo, salsa de pescado y azúcar. Incorpora huevo batido y termina con cacahuetes tostados y brotes de soja."
  },
  {
    nombre: "Ensalada Griega",
    imagen: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&h=400&fit=crop",
    tiempoPreparacion: "15 minutos",
    dificultad: "Fácil",
    preparacion: "Corta tomate, pepino, cebolla morada y pimiento. Añade aceitunas negras y queso feta. Aliña con aceite de oliva, orégano, sal y pimienta. Mezcla y sirve fresca."
  },
  {
    nombre: "Paella Valenciana",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    tiempoPreparacion: "55 minutos",
    dificultad: "Medio",
    preparacion: "Sofríe pollo y conejo con arroz. Añade caldo, azafrán y verduras. Cocina a fuego medio sin remover hasta que el arroz absorba el líquido. Deja reposar antes de servir."
  },
  {
    nombre: "Pollo al Curry",
    imagen: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&h=400&fit=crop",
    tiempoPreparacion: "40 minutos",
    dificultad: "Medio",
    preparacion: "Dora trozos de pollo con cebolla y ajo. Añade curry en polvo, tomate y leche de coco. Cocina hasta que la salsa espese y el pollo esté tierno. Sirve con arroz blanco."
  },
  {
    nombre: "Gazpacho Andaluz",
    imagen: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&h=400&fit=crop",
    tiempoPreparacion: "20 minutos",
    dificultad: "Fácil",
    preparacion: "Mezcla tomate maduro, pepino, pimiento, ajo y aceite de oliva en una batidora. Cuela y refrigera. Sirve frío con picatostes y huevo duro."
  },
  {
    nombre: "Hamburguesa Casera",
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
    tiempoPreparacion: "30 minutos",
    dificultad: "Fácil",
    preparacion: "Forma hamburguesas con carne molida, sal y pimienta. Asa en la parrilla o sartén. Sirve en pan con lechuga, tomate, queso y salsa al gusto."
  }
];

export async function getRecipeById(id: string) {
  try {
    const Recipe = await getRecipeModel();
    const doc = await Recipe.findById(id).lean();
    return doc;
  } catch (error) {
    console.error('getRecipeById error', error);
    throw error;
  }
}

export async function fetchRecipes(): Promise<RecipeDocument[]> {
  try {
    // Get the recipe model
    const Recipe = await getRecipeModel();

    // Check whether there are any documents in the collection
    const count = await Recipe.countDocuments();

    // If the collection is empty, create 10 default recipes
    if (count === 0) {
      console.log('Recipe collection is empty. Inserting 10 default recipes...');
      await createDefaultRecipes();
    }

    // Fetch and return all recipes
    const recipes = await Recipe.find().lean();
    console.log(`✅ Returning ${recipes.length} recipes`);
    return recipes;
  } catch (error) {
    console.error('Error in fetchRecipes:', error);
    throw error;
  }
}

// Function to create 5 default recipes
export async function createDefaultRecipes(): Promise<RecipeDocument[]> {
  try {
    console.log('🔍 Starting createDefaultRecipes...');
    const Recipe = await getRecipeModel();
    console.log('✅ Recipe model acquired');
    
    console.log(`📝 Attempting to insert ${defaultRecipes.length} recipes...`);
    console.log('📋 Recipes to insert:', JSON.stringify(defaultRecipes, null, 2));
    
    const createdRecipes = await Recipe.insertMany(defaultRecipes, { 
      ordered: false 
    });
    
    console.log(`✅ insertMany completed`);
    console.log(`📊 Recipes inserted: ${createdRecipes.length}`);
    console.log('📌 Generated IDs:', createdRecipes.map(r => r._id));
    
    // Verify the documents were saved
    const count = await Recipe.countDocuments();
    console.log(`🔢 Total documents in DB after insert: ${count}`);
    
    // Retrieve all recipes for verification
    const allRecipes = await Recipe.find().lean();
    console.log(`📦 Recipes in DB: ${allRecipes.length}`);
    
    return createdRecipes;
  } catch (error) {
    console.error('❌ Error creating recipes:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}