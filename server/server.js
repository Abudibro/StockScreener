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

app.get('/search', async (req, res) => {
  scrapeMarketChameleon(req.query).then(data => res.json(data));
});

app.get('/suggestions', async (req, res) => {
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

app.get('/history', async (req, res) => {
  const { symbol, interval } = req.query;
  console.log(req.query)
  const stock = await yahooFinance.quote(symbol);

  try {
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
})

app.get('/options', async (req, res) => {
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