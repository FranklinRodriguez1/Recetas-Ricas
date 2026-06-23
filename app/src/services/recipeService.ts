import { getRecipeModel, RecipeDocument } from '@/app/src/models/recipeModel';

const defaultRecipes = [
  {
    nombre: "Pasta Carbonara",
    imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    tiempoPreparacion: "20 minutos",
    dificultad: "Fácil",
    ingredientes: ["200 g de pasta", "100 g de panceta", "2 huevos", "50 g de queso parmesano", "Pimienta negra al gusto"],
    preparacion: [
      "Paso 1: Llena una olla con 2 litros de agua y añade 1 cucharada de sal. Lleva a ebullición a fuego alto.",
      "Paso 2: Añade 200 g de pasta y cuece 8–10 minutos hasta que esté al dente. Reserva 100 ml del agua de cocción antes de escurrir.",
      "Paso 3: Mientras tanto, bate 2 huevos con 50 g de queso parmesano rallado y una buena pizca de pimienta negra.",
      "Paso 4: Corta 100 g de panceta en tiras y dora en una sartén a fuego medio-alto hasta que esté crujiente. Retira del fuego.",
      "Paso 5: Mezcla la pasta caliente con la panceta en la sartén fuera del fuego; añade la mezcla de huevo y queso removiendo enérgicamente. Si queda demasiado espeso, incorpora un chorrito del agua de cocción hasta emulsionar la salsa.",
      "Paso 6: Sirve inmediatamente con más parmesano y pimienta al gusto."
    ]
  },
  {
    nombre: "Ceviche Peruano",
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
    tiempoPreparacion: "30 minutos",
    dificultad: "Medio",
    ingredientes: ["300 g de pescado fresco", "Jugo de 4 limones", "1 cebolla roja", "Ají limo", "Cilantro al gusto"],
    preparacion: [
      "Paso 1: Corta 300 g de pescado fresco en cubos de 1–2 cm y colócalos en un bol frío.",
      "Paso 2: Exprime 4 limones y vierte el zumo sobre el pescado hasta cubrirlo. Añade 1 cucharadita de sal y mezcla.",
      "Paso 3: Deja marinar en la nevera 10–15 minutos, hasta que el pescado se torne opaco.",
      "Paso 4: Incorpora 1 cebolla roja en plumas, ají limo al gusto y cilantro picado. Ajusta de sal y sirve frío con batata cocida o maíz.",
    ]
  },
  {
    nombre: "Tacos al Pastor",
    imagen: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop",
    tiempoPreparacion: "45 minutos",
    dificultad: "Medio",
    ingredientes: ["400 g de carne de cerdo", "Achiote", "Naranja", "Piña (rodajas)", "Tortillas de maíz"],
    preparacion: [
      "Paso 1: Prepara la marinada mezclando pasta de achiote con el jugo de 1 naranja, 2 dientes de ajo triturados y sal.",
      "Paso 2: Corta la carne en tiras finas y marina al menos 30 minutos (mejor 2 horas) en la mezcla.",
      "Paso 3: Cocina la carne en una sartén bien caliente 10–12 minutos hasta que se dore y caramelice.",
      "Paso 4: Asa 2–3 rodajas de piña hasta que estén doradas y córtalas en trozos pequeños.",
      "Paso 5: Calienta tortillas de maíz, monta con carne, piña, cebolla picada y cilantro. Añade salsa al gusto."
    ]
  },
  {
    nombre: "Ramen Japonés",
    imagen: "https://cocina-casera.com/wp-content/uploads/2023/03/ramen-receta-casera-770x485.jpg",
    tiempoPreparacion: "60 minutos",
    dificultad: "Difícil",
    ingredientes: ["200 g de fideos ramen", "1 litro de caldo (pollo o cerdo)", "Salsa de soja", "Miso", "1 huevo cocido"],
    preparacion: [
      "Paso 1: Si haces caldo casero, hierve huesos con cebolla, jengibre y ajo 45–60 minutos; cuela y reserva caliente.",
      "Paso 2: Cocina 200 g de fideos ramen 3–4 minutos hasta que estén tiernos; escurre.",
      "Paso 3: En un bol grande coloca los fideos, vierte el caldo caliente y añade 1 cucharada de miso y salsa de soja al gusto.",
      "Paso 4: Añade toppings: huevo cocido partido por la mitad, lonchas de cerdo chashu y brotes de bambú. Sirve caliente."
    ]
  },
  {
    nombre: "Pad Thai",
    imagen: "https://www.seriouseats.com/thmb/39tEWLaqBdtwixGlb2caIMbkq9g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250214-SEA-PadThai-AmandaSuarez-hero-4251c730d61a40ba935f2d43153d6862.jpg",
    tiempoPreparacion: "25 minutos",
    dificultad: "Fácil",
    ingredientes: ["Fideos de arroz", "Tofu", "Camarones", "Pasta de tamarindo", "Cacahuetes"],
    preparacion: [
      "Paso 1: Remoja los fideos de arroz en agua caliente 20–30 minutos hasta que estén flexibles. Escurre.",
      "Paso 2: En una sartén grande saltea 1 diente de ajo picado, 150 g de tofu en cubos y 100 g de camarones hasta que estén cocinados.",
      "Paso 3: Añade los fideos, 2 cucharadas de pasta de tamarindo, 1 cucharada de salsa de pescado y 1 cucharada de azúcar. Saltea para mezclar.",
      "Paso 4: Empuja los ingredientes a un lado, añade 1 huevo batido y revuelve hasta cocer. Termina con cacahuetes tostados y brotes de soja."
    ]
  },
  {
    nombre: "Ensalada Griega",
    imagen: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&h=400&fit=crop",
    tiempoPreparacion: "15 minutos",
    dificultad: "Fácil",
    ingredientes: ["Tomate", "Pepino", "Cebolla morada", "Queso feta", "Aceitunas negras"],
    preparacion: [
      "Paso 1: Lava y corta 2 tomates en cubos, corta 1 pepino en medias lunas y lamina 1/2 cebolla morada.",
      "Paso 2: Mezcla en un bol con 100 g de queso feta desmenuzado y aceitunas negras al gusto.",
      "Paso 3: Aliña con 3 cucharadas de aceite de oliva, 1 cucharadita de orégano, sal y pimienta. Mezcla suavemente y sirve fría."
    ]
  },
  {
    nombre: "Paella Valenciana",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    tiempoPreparacion: "55 minutos",
    dificultad: "Medio",
    ingredientes: ["Arroz", "Pollo", "Conejo", "Azafrán", "Verduras"],
    preparacion: [
      "Paso 1: Dora trozos de pollo y conejo en la paellera con un chorrito de aceite hasta que estén bien sellados.",
      "Paso 2: Añade verduras picadas y sofríe 5 minutos. Incorpora 300 g de arroz y mezcla 2 minutos para tostar ligeramente.",
      "Paso 3: Vierte caldo caliente infusionado con un pellizco de azafrán (aprox. 900 ml), distribuye el arroz uniformemente.",
      "Paso 4: Cocina a fuego medio 18–22 minutos sin remover; deja reposar 5–10 minutos antes de servir."
    ]
  },
  {
    nombre: "Pollo al Curry",
    imagen: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&h=400&fit=crop",
    tiempoPreparacion: "40 minutos",
    dificultad: "Medio",
    ingredientes: ["Pollo", "Curry en polvo", "Leche de coco", "Cebolla", "Ajo"],
    preparacion: [
      "Paso 1: Trocea 600 g de pollo en dados y salpimienta. Dora en una cazuela con 1 cucharada de aceite 5–7 minutos hasta sellar.",
      "Paso 2: Añade 1 cebolla picada y 2 dientes de ajo; cocina hasta que estén transparentes.",
      "Paso 3: Incorpora 1–2 cucharadas de curry en polvo y mezcla 1 minuto para tostar las especias.",
      "Paso 4: Añade 400 ml de leche de coco y 200 g de tomate troceado; cocina a fuego lento 20–25 minutos hasta que el pollo esté tierno y la salsa reduzca."
    ]
  },
  {
    nombre: "Gazpacho Andaluz",
    imagen: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&h=400&fit=crop",
    tiempoPreparacion: "20 minutos",
    dificultad: "Fácil",
    ingredientes: ["Tomate", "Pepino", "Pimiento", "Ajo", "Aceite de oliva"],
    preparacion: [
      "Paso 1: Lava y trocea 1 kg de tomates maduros, 1 pepino pelado, 1 pimiento rojo y 1 diente de ajo.",
      "Paso 2: Tritura todos los vegetales en una batidora hasta obtener una mezcla homogénea.",
      "Paso 3: Cuela la mezcla para eliminar pieles y semillas; añade 3 cucharadas de aceite de oliva, sal y vinagre al gusto.",
      "Paso 4: Refrigera al menos 2 horas antes de servir. Acompaña con picatostes y huevo duro picado."
    ]
  },
  {
    nombre: "Hamburguesa Casera",
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
    tiempoPreparacion: "30 minutos",
    dificultad: "Fácil",
    ingredientes: ["Carne molida", "Pan para hamburguesa", "Lechuga", "Tomate", "Queso"],
    preparacion: [
      "Paso 1: Forma 4 hamburguesas de 120–150 g con carne molida; sazona con sal y pimienta justo antes de cocinar.",
      "Paso 2: Calienta una sartén o parrilla a fuego alto y cocina las hamburguesas 3–4 minutos por lado para término medio (ajusta al gusto).",
      "Paso 3: Coloca una loncha de queso sobre la carne 1 minuto antes de terminar para que se funda.",
      "Paso 4: Tuesta ligeramente los panes, monta la hamburguesa con lechuga, tomate y salsa preferida y sirve caliente."
    ]
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