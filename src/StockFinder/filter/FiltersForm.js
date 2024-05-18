import React from "react";
import settings from "../settings";
import { Row, Form, Button } from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';

const FiltersForm = ({setters, onClick, disabled}) => {

    const {setStockType, setAvgStockVolume, setMATechnicalIndicator, setMinIV30, setMinMarketCap, setRsi, setPrice} = setters;
    return (
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
            <Button type="button" disabled={disabled} onClick={onClick} className="w-100 mt-5 bg-gradient-custom" style={{ border: 'none', padding: '1rem 0' }}>
                <p className='heading-text-weight-2 m-0' >Search</p>
            </Button>
        </Form>
    )

};

export default FiltersForm