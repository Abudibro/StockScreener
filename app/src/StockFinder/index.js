import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import settings from './settings';
import { getStocks } from '../api/stockService';
import FiltersForm from './filter/FiltersForm';
import Spinner from 'react-bootstrap/Spinner';
import StockTable from './stockTable/StockTable';

const StockFinderPage = () => {
  const [stockType, setStockType] = useState(settings.stockType.defaultValue);
  const [minMarketCap, setMinMarketCap] = useState(settings.minMarketCap.defaultValue);
  const [avgStockVolume, setAvgStockVolume] = useState(settings.avgStockVolume.defaultValue);
  const [rsi, setRsi] = useState(settings.RSI.defaultValue);
  const [minIV30, setMinIV30] = useState(settings.minIV30.defaultValue);
  const [price, setPrice] = useState(settings.price.defaultValue);
  const [maTechnicalIndicator, setMATechnicalIndicator] = useState(settings.MATechnicalIndicator.defaultValue)
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const setters =  { setStockType, setAvgStockVolume, setMATechnicalIndicator, setMinIV30, setMinMarketCap, setRsi, setPrice };

  const onSubmitSearch = () => {
    setLoading(true);
    getStocks({
      minMarketCap,
      stockType,
      minIV30, 
      price, 
      avgStockVolume,
      maTechnicalIndicator,
      rsi
    }).then(data => {
      setLoading(false);
      setStocks(data);
    });
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: 'calc(100vh - 64px)'}}>
      <Container className="position-relative">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={3} className=" vw-100" style={{ maxWidth: '850px', minHeight: '408px', margin: '0 auto', justifyContent: loading ? true : false }}>
            <h1 className="heading-3-weight-4 mb-3 text-center gradient-text">Wheel Strategy Stock Finder</h1>
            <FiltersForm setters={setters} onClick={onSubmitSearch} disabled={loading} />
          </Col>
        </Row>
        <div className="position-absolute top-100 start-40  w-100">
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6} lg={3} className="d-flex flex-column align-items-center p-3 rounded-3 w-100">
              {
                loading ? <Spinner animation="grow" size="lg" variant="light" /> :
                stocks.length > 0 ? <StockTable stocks={stocks} /> :
                null
              }
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default StockFinderPage;
