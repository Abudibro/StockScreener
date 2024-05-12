import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';

const app = express();

app.use(cors());

app.get('/.netlify/functions/suggestions', async (req, res) => {
  const { search } = req.query;

  if (!search) {
    res.send(ErrorMessage("Search cannot be empty"));
    return;
  }
  try {
    const result = await yahooFinance.search(search, {quotesCount: 4, newsCount: 0, enableNavLinks: false});
    res.send(result);
  } catch (error) {
    res.send(ErrorMessage("Something went wrong"))
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
