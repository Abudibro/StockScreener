import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockPrice } from "../api/stockService";

import ChartComponent from './Chart/Chart'

import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";

const StockDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [stock, setStock] = useState(null)
    const [chartData, setChartData] = useState();
    const { symbol } = useParams();

    const isPriceUp = stock && stock.percentageChange >= 0
    const caretClassName = stock && isPriceUp ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'

    useEffect(() => {
        getStockPrice(symbol).then(resp => {
            if (resp.error) setMessage(resp.error.message) 
            else setStock(resp) 
            setLoading(false);
        })
    }, [symbol])

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            {
            loading ? <Spinner animation="grow" size="lg" variant="light" /> :
            message ? <h1 className="heading-5-weight-4 mb-3 text-center gradient-text">{message}</h1> :
            <Col style={{ maxWidth: '650px'}}>
                <Row>
                    <h1 className="heading-6-weight-5 text-white">{stock.shortName}</h1>
                    <h1 className="heading-6-weight-3 text-white">${stock.regularMarketPrice}</h1>
                    <p className="heading-7-weight-3" style={{color: isPriceUp ? '#00ff00' : '#ff2727'}}>
                        <i className={caretClassName} ></i>
                        {Math.round((stock.regularMarketChange + Number.EPSILON) * 100) / 100}%
                    </p>
                </Row>
                <Row style={{minHeight: '400'}}>
                    <ChartComponent symbol={symbol} initialData={chartData} />
                </Row>
            </Col>
            }
        </div>
    )
}

export default StockDetailsPage;