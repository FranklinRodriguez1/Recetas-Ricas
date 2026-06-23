import mongoose from 'mongoose';

async function deleteRecipes() {
  try {
    const MONGO_URI = 'mongodb+srv://FERC:123prueba@prueba.sfr2md1.mongodb.net/pruebaRutaAvanzadano2?retryWrites=true&w=majority';
    
    console.log('🔗 Conectando a MongoDB...');
    await mongoose.connect(MONGO_URI);
    
    console.log('📊 Eliminando todas las recetas...');
    const result = await mongoose.connection.db.collection('recipes').deleteMany({});
    console.log(`✅ ${result.deletedCount} recetas eliminadas`);
    
    await mongoose.disconnect();
    console.log('✅ Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteRecipes();
