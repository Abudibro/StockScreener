import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';
import { scrapeMarketChameleon } from './screener.js';

const app = express();

app.use(express.json());
app.use(cors());

const port = 8080;

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.get('/quote/:stock', async (req, res) => {
    const { stock } = req.params;
    const stockInfo = await yahooFinance.quote(stock);

    if (!stockInfo) res.send(ErrorMessage("Oops... we couldn't find the stock " + stock.toUpperCase()))
    else if (!stockInfo.regularMarketPrice) res.send(ErrorMessage("Please provide a different symbol"))
    else res.send(stockInfo);
});

app.get('/search', async (req, res) => {
  scrapeMarketChameleon(req.query).then(data => res.json(data));
});

app.get('/history', async (req, res) => {
  const { symbol, interval } = req.query;
  console.log(req.query)
  const stock = await yahooFinance.quote(symbol);

  if (!stock) res.send(ErrorMessage("Oops... we couldn't find the stock " + symbol.toUpperCase()))
  else if (!stock.regularMarketPrice) res.send(ErrorMessage("Please provide a different symbol"))
  else {

    let startDate = stock.firstTradeDateMilliseconds;
    if (interval === '1d' || '1h') startDate = new Date(new Date().setDate(new Date().getDate() - 729))
    if (interval === '90m' || interval === '5m') startDate = new Date(new Date().setDate(new Date().getDate() - 59))

    const options = {
      period1: startDate,
      interval
    }

    const history = await yahooFinance.chart(symbol, {...options});

    if (!history) res.send(ErrorMessage("Oops... we couldn't find the chart data for " + symbol.toUpperCase()))
    else res.send(history);
  }

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const ErrorMessage = (msg) => {
  return ({
    error: {
      message: msg
    }
  })
}