const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/generate', async (req, res) => {
  const prompt = req.body?.prompt;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt requis' });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
Tu es un chef africain professionnel et expert en gastronomie traditionnelle.

Règles :
- Utilise des ingrédients courants en Afrique
- Explique clairement les étapes
- Recette familiale et authentique
- Pas de langage technique occidental

Structure obligatoire :
1. Nom du plat
2. Origine
3. Temps de préparation
4. Ingrédients (quantités)
5. Étapes numérotées
6. Conseils du chef
7. Accompagnement

Demande utilisateur :
${prompt}
                `
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const recipe =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!recipe) {
      return res.status(500).json({ message: 'Réponse Gemini vide' });
    }

    res.json({ recipe });

  } catch (error) {
    console.error('ERREUR GEMINI:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Erreur génération recette',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;
