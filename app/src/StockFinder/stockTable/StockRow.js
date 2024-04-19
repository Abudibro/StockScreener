import React from 'react';
import { Row, Col } from 'react-bootstrap';

const StockTableRow = ({ stock }) => {

  return (
    <Row className="border-bottom py-2">
      <Col xs={6} md={4} lg={2}>{stock.symbol}</Col>
      <Col xs={6} md={6} lg={3}>{stock.companyName}</Col>
      <Col xs={6} md={2} lg={1}>{stock.price}</Col>
      <Col xs={6} md={2} lg={1}>{stock.percentageChange}</Col>
      <Col xs={6} md={2} lg={2}>{stock.volume}</Col>
      <Col xs={6} md={3} lg={2}>{stock.avgVolume}</Col>
      <Col xs={6} md={2} lg={1}>{stock.marketCap}</Col>
      <Col xs={6} md={2} lg={1}>{stock.movingAvgIndicator}</Col>
    </Row>
  );
};

export default StockTableRow;
