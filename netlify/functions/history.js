import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import yahooFinance from 'yahoo-finance2';

const app = express();

app.use(cors());

app.get('/.netlify/functions/history', async (req, res) => {
  const { symbol, interval } = req.query;
  
  try {
    const stock = await yahooFinance.quote(symbol);
    if (!stock) res.send(ErrorMessage("Oops... we couldn't find the stock " + symbol.toUpperCase()))
    else if (!stock.regularMarketPrice) res.send(ErrorMessage("Please provide a different symbol"))
    else {
  
      let startDate = stock.firstTradeDateMilliseconds;
      if (interval === '1h') startDate = new Date(new Date().setDate(new Date().getDate() - 729))
      if (interval === '90m' || interval === '5m') startDate = new Date(new Date().setDate(new Date().getDate() - 59))
  
      const options = {
        period1: startDate,
        interval
      }
  
      const history = await yahooFinance.chart(symbol, {...options});
  
      if (!history) res.send(ErrorMessage("Oops... we couldn't find the chart data for " + symbol.toUpperCase()))
      else res.send(history);
    }
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