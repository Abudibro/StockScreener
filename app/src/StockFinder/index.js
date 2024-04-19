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

  console.log(stocks)

  return (
    // <div className="d-flex align-items-center justify-content-center vh-100">
    //   <Container >
    //     <h1 className="heading-3-weight-4 mb-3 gradient-text text-center ">Wheel Strategy Stock Finder</h1>
    //     <Row className="justify-content-center">
    //       <Col xs={12} md={6} lg={3} style={{ maxWidth: '850px', minHeight: '408px', margin: '0 auto', justifyContent: loading ? true : false }} className='d-flex flex-column align-items-center p-3 rounded-3 w-100'>
    //         {!loading ?
    //           <>
    //             <FiltersForm setters={setters} onClick={onSubmitSearch} />
    //             <StockTable stocks={stocks} />
    //           </>
    //           : <Spinner animation="grow" size='lg' variant='light' />
    //         }
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>

    <div className="d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '100vh', overflowY: 'hidden' }}>
      <div style={{ marginTop: '10%', flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container>
          <h1 className="heading-3-weight-4 mb-3 gradient-text text-center">Wheel Strategy Stock Finder</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={3} style={{ maxWidth: '850px', margin: 'auto' }} className='vw-100'>
              <FiltersForm setters={setters} onClick={onSubmitSearch} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={3} style={{ maxWidth: '850px', margin: 'auto' }} className='vw-100'>
            {!loading ? (
              <StockTable stocks={stocks} />
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="grow" size="lg" variant="light" />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>


  );
};

export default StockFinderPage;