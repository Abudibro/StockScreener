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
    res.send(stockInfo);
});

app.get('/search', async (req, res) => {
  scrapeMarketChameleon(req.query).then(data => res.json(data));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});