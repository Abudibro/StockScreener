import { get } from "./index";
const BASE_URL = 'http://localhost:8080';

export function getStockPrice (stockName) {
    return get(`${BASE_URL}/quote/${stockName}`);
}

export function getStocks (filters) {
    let query = '';
    for (const key in filters) {
        query += `${key}=${encodeURIComponent(filters[key])}&`
    }

    return get(`${BASE_URL}/search?${query}`);
}

export function getHistory(symbol, interval) {
    return get(`${BASE_URL}/history?symbol=${symbol}&interval=${interval}`);
}

export function getSuggestions(search) {
    return get(`${BASE_URL}/suggestions?search=${search}`)
}