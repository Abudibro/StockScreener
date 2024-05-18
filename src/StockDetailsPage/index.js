import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockPrice } from "../api/stockService.js";
import { compactDescription } from './Chart/utils.js'

import ChartComponent from './Chart/Chart'
import OptionsChain from "./Options";

import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";

const StockDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [stock, setStock] = useState(null)
    const [panel, setPanel] = useState('quotes')
    const { symbol } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const roundToTwo = n => (+n).toFixed(2)

    const marketChange = roundToTwo(((stock?.price?.regularMarketPrice - stock?.price?.regularMarketPreviousClose) / stock?.price?.regularMarketPreviousClose) * 100);
    const caretClassName = marketChange >= 0 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'

    const minWidth = 800
    const resultedWidth = Math.min(1196 , Math.max(windowWidth * 0.7, minWidth));
    const panelHeight = 400;

    useEffect(() => {
        getStockPrice(symbol).then(resp => {
            if (resp.error) setMessage(resp.error.message)
            else {
                setMessage(null);
                setStock(resp);
            }
            setPanel('quotes')
            setLoading(false);
        })
    }, [symbol])

    const renderPanelOptions = () => {
        const panelLabels = ['Quotes', 'Options']
        const panelValues = ['quotes', 'options']

        return panelValues.map((p, i) => {
            const isPanel = panel === p;
            return (
                <h1
                    className={`heading-8-weight-${isPanel ? '5' : '4'} text-white m-2 cursor-pointer ${isPanel && 'text-underline '}`}
                    onClick={() => setPanel(p)}
                    style={{cursor: 'pointer'}}
                >
                    {panelLabels[i]}
                </h1>
            )
        })
    }

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{height: (message !== null || loading) && 'calc(100vh - 64px)'}}
        >
            {loading ? <Spinner animation="grow" size="lg" variant="light" /> :
            message !== null ? <h1 className="heading-5-weight-4 mb-3 text-center gradient-text">{message}</h1> :
            <Col style={{ maxWidth: resultedWidth, marginTop: '1vh'}}>
                <h1 className="heading-5-weight-5 gradient-text" style={{width: 'fit-content'}} >{stock?.price?.shortName}</h1>
                <Row style={{marginBottom: '20px'}} >
                    <Col md={8} >
                        <h1 className="heading-6-weight-3 text-white">${roundToTwo(stock?.price?.regularMarketPrice)}</h1>
                        <p className="heading-8-weight-3" style={{color: marketChange >= 0 ? '#00ff00' : '#ff2727'}}>
                            <i className={caretClassName} ></i>
                            {marketChange > 0 ? '+' + marketChange : marketChange}%
                        </p>
                    </Col>
                    <Col md={4}>
                        <div className="d-flex justify-content-center h-100 align-items-center">
                            {renderPanelOptions()}
                        </div>
                    </Col>
                </Row>
                <Row className="mb-2" style={{minHeight: panelHeight}}>
                    {
                        panel === 'quotes' ?
                        <ChartComponent symbol={symbol} height={panelHeight} width={resultedWidth} />
                        : panel === 'options' ?
                        <OptionsChain symbol={symbol} height={panelHeight} width={resultedWidth} />
                        : null
                    }
                </Row>
                <Row className="mt-4">
                    <div>
                        <h1 className="heading-7-weight-5 gradient-text" style={{width: 'fit-content'}} >About {symbol.toUpperCase()}</h1>
                    </div>
                    <Col md={8} >
                        <h1 className="heading-text-weight-3 text-white" > { compactDescription(stock?.summaryProfile?.longBusinessSummary)} </h1>
                    </Col>
                    <Col md={4} className="d-flex">
                        <Col>
                            <h1 className="heading-text-weight-6 text-white" >52W Low:</h1>
                            <h1 className="heading-text-weight-3 text-white" >${roundToTwo(stock?.summaryDetail?.fiftyTwoWeekLow)}</h1>
                        </Col>
                        <Col>
                            <h1 className="heading-text-weight-6 text-white" >52W High:</h1>
                            <h1 className="heading-text-weight-3 text-white" >${roundToTwo(stock?.summaryDetail?.fiftyTwoWeekHigh)} </h1>
                        </Col>
                    </Col>
                </Row>
            </Col>}
        </div>    
    )
}

export default StockDetailsPage;