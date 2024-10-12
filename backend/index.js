const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
app.use(cors());

// I created cache instance with will have life of 10 mints, 600 seconds
const cache = new NodeCache({ stdTTL: 600 });

//Api key is comming form env file
const API_KEY = process.env.NEWS_API_KEY;
const PORT = process.env.PORT || 5000;

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;


//an important point here we have a single api that why i'm doing this code in index.js
// if it's a real project where we will have to create many apis there will be routes folder and controllers folder
//we will have sperate file for each module in routes and controllers folder
//we may have a spereate folder for third party apis if an third part api will be used in multiple endpoints then we create a resusebale function for that


app.get('/api/news', async (req, res) => {
  try {
    // when use hits api i check if there is data in 'news' key then i return that because i'm saving the response in chache 
    const cachedNews = cache.get('news');
    if (cachedNews) {
      return res.json(cachedNews);
    }
    // if the api is runing first time or data in chache is experired that we will hit api and save data in chache for the next time
    const response = await axios.get(NEWS_API_URL);
    cache.set('news', response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});