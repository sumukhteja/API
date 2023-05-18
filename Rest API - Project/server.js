const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/photos', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const photos = response.data;
    res.json(photos);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
