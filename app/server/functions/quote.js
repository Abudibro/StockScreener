import express from 'express';
import cors from 'cors'; 
import yahooFinance from 'yahoo-finance2';

const app = express();

app.use(cors());

app.get('/.netlify/functions/quote/:stock', async (req, res) => {
    const { stock } = req.params;
    if (!stock) {
      res.send(ErrorMessage("Please provide a ticker symbol"));
      return;
    }
    const queryOptions = { modules: ['price', 'summaryProfile', 'summaryDetail'] };
    let stockInfo;

    try {
      stockInfo = await yahooFinance.quoteSummary(stock, queryOptions);
    } catch (error) {
      res.send(ErrorMessage("Oops... we couldn't find the stock " + stock.toUpperCase()));
      return;
    }

    if (stock === null || !stockInfo.price.regularMarketPrice || stockInfo.price.quoteType !== 'EQUITY') res.send(ErrorMessage("Please provide a different symbol"))
    else res.send(stockInfo);
});

const ErrorMessage = (msg) => {
  return ({
    error: {
      message: msg
    }
  })
}

export { app as handler };