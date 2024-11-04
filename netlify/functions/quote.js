import express from 'express';
import cors from 'cors'; 
import serverless from 'serverless-http';
import yahooFinance from 'yahoo-finance2';

const app = express();

app.use(cors());

app.get('/.netlify/functions/quote/:stock', async (req, res) => {
    const { stock } = req.params;
    if (!stock) {
      res.send(ErrorMessage("Please provide a ticker symbol"));
      return;
    }
    const queryOptions = { field: ['price', 'summaryProfile', 'summaryDetail'] };

    try {
      const stockInfo = await yahooFinance.quoteSummary(stock, queryOptions);
      console.log(stockInfo);
      if (stock === null || !stockInfo.price.regularMarketPrice || stockInfo.price.quoteType !== 'EQUITY') res.send(ErrorMessage("Please provide a different symbol"))
      else res.send(stockInfo);
    } catch (error) {
      console.log(error)
      res.send(ErrorMessage("Oops... we couldn't find the stock " + stock.toUpperCase()));
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
