import React, { useEffect, useState, useRef } from "react";
import { getOptions } from "../../api/stockService.js";

import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Container } from 'react-bootstrap';

const OptionsChain = ({symbol, height, width}) => {
    const [loading, setLoading] = useState(true);
    const [calls, setCalls] = useState([])
    const [puts, setPuts] = useState([])
    const [strikes, setStrikes] = useState([])
    const [price, setPrice] = useState()
    const optionsChainRef = useRef(null);

    useEffect(() => {
        getOptions(symbol).then(resp => {
            if (!resp.error) {
                setCalls(resp.options[0]?.calls);
                setPuts(resp.options[0]?.puts);
                setLoading(false)
                setPrice(resp?.quote?.regularMarketPrice)
                setStrikes(resp.strikes);
            }
        })
    }, [symbol])

    useEffect(() => {
        if (optionsChainRef.current) {
            let currentPriceRowIndex = strikes.findIndex((strike, i) => i < strikes.length - 1 && strike < price && price < strikes[i + 1]);
            console.log(currentPriceRowIndex)
            let scroll = (Math.max(0, currentPriceRowIndex - 1) * 67);
            optionsChainRef.current.scrollTop = scroll
        }
    }, [ strikes ]);

    const LineBreak = ({ isStrikeRow, hidden, noMarginBottom }) => {
        return (
            <hr className="w-100 mt-3 mb-3" style={{ 
                border: 'none',
                borderTop: `${hidden ? '11' : '2'}px solid ${ isStrikeRow ? 'white' : hidden ? 'transparent' : 'grey'}`,
                borderBottom: hidden && '11px',
                margin: hidden ? '0' : '10px 0 10px 0',
                marginBottom: noMarginBottom && '0',
                padding: '0',
                opacity: (isStrikeRow || hidden) && '1',
                background: hidden && 'rgb(45, 0, 208)'
            }} />
        )
    };

    const RowSpacing = ({hidden, isStrikeRow, noMarginBottom}) => {
        return (
            isStrikeRow && hidden ? 
            <Row className="w-100" style={{flexWrap: 'nowrap', margin: '15px 0 10px 0' }}>
                <div className="w-100 m-0 p-0 d-flex align-items-center justify-content-center" style={{background: 'white', height: 18}} >
                    <p className="w-100 m-0 p-0" style={{color:'black', background: 'none', fontSize: 11}}>Current </p>
                </div>
            </Row> :
            <LineBreak hidden={hidden} isStrikeRow={isStrikeRow} noMarginBottom={noMarginBottom} />
        )
    }

    const Cell = ({value, heading, bg, isStrikeRow, hidden, paddingTop, color}) => {
        return (
            <Col className="d-flex align-items-center justify-content-center flex-column w-100" 
                style={{
                    background: bg ? bg : paddingTop && '#030216' ,
                    margin: bg && '0',
                    padding: '0', paddingTop: paddingTop && '16px',
                    borderRadius: paddingTop && '10px 10px 0 0'
                }}
            >
                <p className={`heading-text-weight-${heading ? '5' : '3'} m-0 p-0 h-100`}
                    style={{
                        color: color,  
                    }}
                >{value}</p>
                <RowSpacing isStrikeRow={isStrikeRow} hidden={hidden} />
            </Col>

        )
    }

    const renderStrikes = () => {
        return strikes.map((strike, i) => {
            const call = calls.find(call => call.strike === strike);
            const put = puts.find(put => put.strike === strike);
            const isStrikeRow = i < strikes.length - 1 && strike < price && price < strikes[i+1];
    
            return (
                <>
                    <Row key={i} className="text-center">
                        <Cell value={call?.bid || 0} isStrikeRow={isStrikeRow} color={'rgba(255,0,232,1)'} />
                        <Cell value={call?.ask|| 0} isStrikeRow={isStrikeRow} color={'rgba(0,255,192,1)'} />
                        <Cell value={call?.volume || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={call?.openInterest || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={strike} heading bg={'rgb(45, 0, 208)'} isStrikeRow={isStrikeRow} hidden />
                        <Cell value={put?.bid || 0} isStrikeRow={isStrikeRow} color={'rgba(255,0,232,1)'} />
                        <Cell value={put?.ask || 0} isStrikeRow={isStrikeRow} color={'rgba(0,255,192,1)'} />
                        <Cell value={put?.volume || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={put?.openInterest || 0} isStrikeRow={isStrikeRow} />
                    </Row>
                </>
            );
        });
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{width: width, height: height+54 }}>
            {
            loading ? <Spinner animation="grow" size="lg" variant="light" /> :
            <Row className="mt-3 text-white w-100" >
                <Col xs={12} md={12} style={{
                    overflow: 'hidden',
                    position: 'relative'
                }} >
                    <Container style={{position: 'sticky', top: '0'}} >
                        <Row>
                            <Col style={{background: '#030216'}} ><h1 className="heading-8-weight-4 text-center text-white" >Calls</h1></Col>
                            <Col style={{background: '#030216'}} ><h1 className="heading-8-weight-4 text-center text-white" >Puts</h1></Col>
                        </Row>
                        <RowSpacing  noMarginBottom />
                        <Row className="text-center" >
                            <Cell value={'Bid'} heading paddingTop color={'rgba(255,0,232,1)'} />
                            <Cell value={'Ask'} heading paddingTop color={'rgba(0,255,192,1)'} />
                            <Cell value={'Volume'} heading paddingTop />
                            <Cell value={'Open Interest'} heading paddingTop />
                            <Cell value={'Strike'} heading bg={'rgb(45, 0, 208)'} paddingTop hidden />
                            <Cell value={'Bid'} heading paddingTop color={'rgba(255,0,232,1)'} />
                            <Cell value={'Ask'} heading paddingTop color={'rgba(0,255,192,1)'} />
                            <Cell value={'Volume'} heading paddingTop />
                            <Cell value={'Open Interest'} heading paddingTop/>
                        </Row>
                    </Container>
                    <Container style={{
                        maxHeight: height-99,
                        overflowY: 'auto'
                    }} id='option-chain-scroll' ref={optionsChainRef} >
                        {renderStrikes()}
                    </Container>
                </Col>
            </Row>
            }
        </div>
    );
}

export default OptionsChain;
