const express = require('express');
const path = require('path');
const { searchAllPlatforms, identifyProductFromImage } = require('./platforms');

const app = express();
app.use(express.json({ limit: '10mb' })); // large-ish limit for base64 photos
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/search', async (req, res) => {
  try {
    const { query, imageBase64 } = req.body;

    let searchTerm = query && query.trim();

    if (!searchTerm && imageBase64) {
      searchTerm = await identifyProductFromImage(imageBase64);
    }

    if (!searchTerm) {
      return res.status(400).json({ error: 'Provide a product name or a photo.' });
    }

    const results = await searchAllPlatforms(searchTerm);
    res.json({ query: searchTerm, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
