import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';
import { sendResponse } from '../util';

const app = express();

app.use(cors());

app.get('/.netlify/functions/suggestions', async (req, res) => {
  const { search } = req.query;

  if (!search) {
    res.status(400).send(ErrorMessage("Search cannot be empty"));
    return;
  }
  try {
    const result = await yahooFinance.search(search, {quotesCount: 4, newsCount: 0, enableNavLinks: false});
    // sendResponse(res, 200, result)
    res.status(200);
    res.end(result);
  } catch (error) {
    res.status(400).send(ErrorMessage("Something went wrong"))
  }
});



export { app as handler }; // Export the Express app as a handler for Netlify function
