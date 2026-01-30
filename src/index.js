require('dotenv').config();
const express = require('express');
const cors = require('cors');

const recipeRoutes = require('./routes/recipe.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend LLM Gemini OK 🚀');
});

app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
