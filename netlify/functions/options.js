import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import yahooFinance from 'yahoo-finance2';

const app = express();

app.use(cors());

app.get('/.netlify/functions/options', async (req, res) => {
  const {symbol} = req.query;

  if (!symbol) {
    res.send(ErrorMessage("Please provide a ticker symbol"));
    return;
  }

  try {
    const queryOptions = { lang: 'en-US', formatted: false, region: 'US' };
    const result = await yahooFinance.options(symbol, queryOptions);
    if (result !== null) res.send(result)
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

export const handler = serverless(app);