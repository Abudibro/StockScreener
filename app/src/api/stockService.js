import { get } from "./index";

export function getStockPrice (stockName) {
    return get(`/quote/${stockName}`);
}

export function getStocks (filters) {
    let query = '';
    for (const key in filters) {
        query += `${key}=${encodeURIComponent(filters[key])}&`
    }

    return get(`/search?${query}`);
}

export function getHistory(symbol, interval) {
    return get(`/history?symbol=${encodeURIComponent(symbol)}&interval=${encodeURIComponent(interval)}`);
}

export function getSuggestions(search) {
    return get(`/suggestions?search=${encodeURIComponent(search)}`)
}

export function getOptions(symbol) {
    return get(`/options?symbol=${encodeURIComponent(symbol)}`)
}