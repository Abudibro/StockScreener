import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockPrice } from "../api/stockService";
import { compactDescription } from './Chart/utils'

import ChartComponent from './Chart/Chart'

import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";

const StockDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [stock, setStock] = useState(null)
    const { symbol } = useParams();

    const isPriceUp = stock && stock.percentageChange >= 0
    const caretClassName = stock && isPriceUp ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'

    useEffect(() => {
        getStockPrice(symbol).then(resp => {
            if (resp.error) setMessage(resp.error.message)
            else {
                setMessage(null);
                setStock(resp);
            } 
            setLoading(false);
        })
    }, [symbol])

    const width = 800
    const height = 400;
    const outerDivClassName = `d-flex justify-content-center ${message !== null && 'align-items-center'}`

    const roundToTwo = n => (+n).toFixed(2)

    return (
        <div className={outerDivClassName} style={{height: message !== null && 'calc(100vh - 64px)'}} >
            {
            loading ? <Spinner animation="grow" size="lg" variant="light" /> :
            message !== null ? <h1 className="heading-5-weight-4 mb-3 text-center gradient-text">{message}</h1> :
            <Col style={{ maxWidth: `${width}px`, marginTop: '3vh'}}>
                <h1 className="heading-5-weight-5 gradient-text" style={{width: 'fit-content'}} >{stock.price.shortName}</h1>
                <Row style={{marginBottom: '20px'}} >
                    <h1 className="heading-6-weight-3 text-white">{stock.price.regularMarketPrice && `\$${roundToTwo(stock.price.regularMarketPrice)}`}</h1>
                    <p className="heading-8-weight-3" style={{color: isPriceUp ? '#00ff00' : '#ff2727'}}>
                        <i className={caretClassName} ></i>
                        {roundToTwo(stock.price.regularMarketChange)}%
                    </p>
                </Row>
                <Row className="mt-2 mb-2" style={{minHeight: height}}>
                    <ChartComponent symbol={symbol} height={height} width={width} />
                </Row>
                <Row className="mt-4">
                    <div>
                        <h1 className="heading-7-weight-5 gradient-text" style={{width: 'fit-content'}} >About {symbol.toUpperCase()}</h1>
                    </div>
                    <Col md={8} >
                        <h1 className="heading-text-weight-3 text-white" > {stock.summaryProfile.longBusinessSummary && compactDescription(stock.summaryProfile.longBusinessSummary)} </h1>
                    </Col>
                    <Col md={4} className="d-flex">
                        <Col>
                            <h1 className="heading-text-weight-6 text-white" >52W Low:</h1>
                            <h1 className="heading-text-weight-3 text-white" >{stock.summaryDetail.fiftyTwoWeekLow && `\$${roundToTwo(stock.summaryDetail.fiftyTwoWeekLow)}` }</h1>
                        </Col>
                        <Col>
                            <h1 className="heading-text-weight-6 text-white" >52W High:</h1>
                            <h1 className="heading-text-weight-3 text-white" >{stock.summaryDetail.fiftyTwoWeekHigh && `\$${roundToTwo(stock.summaryDetail.fiftyTwoWeekHigh)}`} </h1>
                        </Col>
                    </Col>
                </Row>
            </Col>
            }
        </div>
    )
}

export default StockDetailsPage;