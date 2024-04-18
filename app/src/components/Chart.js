import React, { useState, useEffect } from "react";
import { getStockPrice } from "../api/stockService";

const Chart = ({ stockName }) => {
    const [stock, setStock] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        getStockPrice(stockName).then(data => {
            if (data === 'GET_ERROR') setError(true);
            setStock(data);
        });
    }, [stockName]);
    
    if (!stock) {
        return <div>Loading...</div>;
    }

    if (error) return (
        <h1>ERROR</h1>
    )

    return (
        <h1>
            {stock.regularMarketPrice}
        </h1>
    );
}

export default Chart;
