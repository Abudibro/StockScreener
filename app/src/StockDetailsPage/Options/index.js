import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { getOptions } from "../../api/stockService";

const OptionsChain = ({symbol}) => {
    const [loading, setLoading] = useState(true);
    const [calls, setCalls] = useState([])
    const [puts, setPuts] = useState([])
    const [strikes, setStrikes] = useState([])
    const [price, setPrice] = useState()

    useEffect(() => {
        getOptions(symbol).then(resp => {
            if (!resp.error) {
                setCalls(resp.options[0]?.calls);
                setPuts(resp.options[0]?.puts);
                setStrikes(resp.strikes);
                setPrice(resp?.quote?.regularMarketPrice)
                setLoading(false)
            }
        })
    }, [symbol])

    const LineBreak = ({ isStrikeRow, hidden }) => {
        return (
            <hr className="w-100 mt-1 mb-2" style={{ 
                border: 'none',
                borderTop: `${hidden ? '22' : '2' }px solid ${ isStrikeRow ? 'white' : hidden ? 'transparent' : 'grey'}`,
                margin: hidden ? '0' : '10px 0 10px 0',
                padding: '0',
                opacity: (isStrikeRow || hidden) && '1',
                background: hidden && 'rgb(45, 0, 208)'
            }} />
        )
    };

    const RowSpacing = ({hidden, isStrikeRow}) => {
        const iconClassName = 'm-0 p-0';
        const iconStyle = {
            width: 'fit-content',
            fontSize: 13,
        }
        return (
            isStrikeRow && hidden ? 
            <Row className="w-100" style={{flexWrap: 'nowrap' }}>
                <div className="w-100 m-0 p-0 d-flex align-items-center justify-content-center" style={{background: 'white', height: 18}} >
                    <p className="w-100 m-0 p-0" style={{color:'black', background: 'none', fontSize: 11}}>Current </p>
                </div>
            </Row> :
            <LineBreak hidden={hidden} isStrikeRow={isStrikeRow} />
        )
    }

    const Cell = ({value, heading, bg, isStrikeRow, hidden}) => {
        return (
            <Col className="d-flex align-items-center justify-content-center flex-column w-100" style={{background: bg, margin: bg && '0', padding: '0'}} >
                <p className={`heading-text-weight-${heading ? '5' : '3'} m-0 p-0 h-100`} >{value}</p>
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
                        <Cell value={call?.bid || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={call?.ask|| 0} isStrikeRow={isStrikeRow} />
                        <Cell value={call?.volume || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={call?.openInterest || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={strike} heading bg={'rgb(45, 0, 208)'} isStrikeRow={isStrikeRow} hidden />
                        <Cell value={put?.bid || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={put?.ask || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={put?.volume || 0} isStrikeRow={isStrikeRow} />
                        <Cell value={put?.openInterest || 0} isStrikeRow={isStrikeRow} />
                    </Row>
                </>
            );
        });
    };
    
    const getCallStrikePrice = (strikePrice) => {
        return calls.find(call => call.strike === strikePrice) || '';
    }
    
    const getPutStrikePrice = (strikePrice) => {
        return puts.find(put => put.strike === strikePrice) || '';
    }
    

    return (
        <Container>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Row className="mt-3 text-white">
                    <Col xs={12} md={12}>
                        <Row>
                            <Col><h1 className="heading-8-weight-4 text-center text-white" >Calls</h1></Col>
                            <Col><h1 className="heading-8-weight-4 text-center text-white" >Puts</h1></Col>
                        </Row>
                        <RowSpacing />
                        <Row className="text-center">
                            <Cell value={'Bid'} heading />
                            <Cell value={'Ask'} heading />
                            <Cell value={'Volume'} heading />
                            <Cell value={'Open Interest'} heading />
                            <Cell value={'Strike'} heading bg={'rgb(45, 0, 208)'} hidden />
                            <Cell value={'Bid'} heading />
                            <Cell value={'Ask'} heading />
                            <Cell value={'Volume'} heading />
                            <Cell value={'Open Interest'} heading />
                        </Row>
                        {renderStrikes()}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default OptionsChain;
