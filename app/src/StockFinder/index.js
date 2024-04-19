import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';
import settings from './settings';
import { getStocks } from '../api/stockService';

const StockFinderPage = () => {
  const [stockType, setStockType] = useState(settings.stockType.defaultValue);
  const [minMarketCap, setMinMarketCap] = useState(settings.minMarketCap.defaultValue);
  const [avgStockVolume, setAvgStockVolume] = useState(settings.avgStockVolume.defaultValue);
  const [rsi, setRsi] = useState(settings.RSI.defaultValue);
  const [minIV30, setMinIV30] = useState(settings.minIV30.defaultValue);
  const [price, setPrice] = useState(settings.price.defaultValue);
  const [maTechnicalIndicator, setMATechnicalIndicator] = useState(settings.MATechnicalIndicator.defaultValue);

  const onSubmitSearch = () => {
    getStocks({
      minMarketCap,
      stockType,
      minIV30, 
      price, 
      avgStockVolume,
      maTechnicalIndicator,
      rsi
    }).then(data => {
      console.log(data)
  });
  }

  console.log({
    minMarketCap,
    stockType,
    minIV30, 
    price, 
    avgStockVolume,
    maTechnicalIndicator,
    rsi
  })

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Container style={{width: 'max-content'}}>
        <h1 className="heading-3-weight-4 mb-3 gradient-text text-center ">Wheel Strategy Stock Finder</h1>
        <Row className="justify-content-center">
          <Col xs={1} sm={12} md={9} lg={7} className='p-3 rounded-3 w-100'>
            <Form>
              <Row>
                <DropdownFilter setting={settings.stockType} onChange={setStockType} />
                <DropdownFilter setting={settings.minMarketCap} onChange={setMinMarketCap} />
                <DropdownFilter setting={settings.avgStockVolume} onChange={setAvgStockVolume} />
                <DropdownFilter setting={settings.RSI} onChange={setRsi} />
              </Row>
              <Row>
                <DropdownFilter setting={settings.minIV30} onChange={setMinIV30} />
                <DropdownFilter setting={settings.price} onChange={setPrice} />
                <DropdownFilter setting={settings.MATechnicalIndicator} onChange={setMATechnicalIndicator} />
              </Row>
              <Button type="button" onClick={onSubmitSearch} className="w-100 mt-5 bg-gradient-custom" style={{ border: 'none', padding: '1rem 0' }}>
                <p className='heading-text-weight-2 m-0' >Search</p>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StockFinderPage;