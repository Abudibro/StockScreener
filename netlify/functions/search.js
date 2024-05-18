import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { scrapeMarketChameleon } from './screener.js';

const app = express();

app.use(cors());

app.get('/.netlify/functions/search', async (req, res) => {
  let response;
  res.setHeader('Cache-Control', 'no-store');
  try {
    response = await scrapeMarketChameleon(req.query);
  } catch (e) {
    res.status(400).send(ErrorMessage("Something went wrong..."))
  }

  res.status(200).send(response);
});

const ErrorMessage = (msg) => {
  return ({
    error: {
      message: msg
    }
  })
}

export const handler = serverless(app);