import express from 'express';
import cors from 'cors';
import { scrapeMarketChameleon } from './screener.js';

const app = express();

app.use(cors());

app.get('/.netlify/functions/search', async (req, res) => {
  try {
    scrapeMarketChameleon(req.query).then(data => {
      const response = res.json(data);
      res.status(200).send(response);
    });
  } catch (e) {
    res.status(400).send(ErrorMessage("Something went wrong..."))
  }
});

const ErrorMessage = (msg) => {
  return ({
    error: {
      message: msg
    }
  })
}

export { app as handler }; // Export the Express app as a handler for Netlify function
