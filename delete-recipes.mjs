import mongoose from 'mongoose';

async function deleteRecipes() {
  try {
    const MONGO_URI = 'mongodb+srv://FERC:123prueba@prueba.sfr2md1.mongodb.net/pruebaRutaAvanzadano2?retryWrites=true&w=majority';
    
    await mongoose.connect(MONGO_URI);
    
    const result = await mongoose.connection.db.collection('recipes').deleteMany({});
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteRecipes();
