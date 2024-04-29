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
                console.log(resp)
                setCalls(resp.options[0]?.calls);
                setPuts(resp.options[0]?.puts);
                setStrikes(resp.strikes);
                setPrice(resp?.quote?.regularMarketPrice)
            }
        })
    }, [symbol])

    const LineBreak = ({hidden, currentPrice}) => <hr className="w-100" style={{ border: 'none', borderTop: `2px solid ${ currentPrice ? 'white' : hidden ? 'transparent' : 'grey'}`, margin: '10px 0 10px 0', padding: '0' }} />;
    const Cell = ({value, heading}) => {
        return (
            <Col className="d-flex align-items-center justify-content-center mt-2 mb-2" >
                <p className={`heading-text-weight-${heading ? '5' : '3'} m-0 p-0 h-100`} >{value}</p>
            </Col>
        )
    }

    const renderOptions = (type) => {
        const isCalls = type === 'calls';
        const data = isCalls ? calls : puts
        return (
            data.map((optn, i) => {
                const currentPrice = i < data.length - 1 && optn?.strike < price && price < data[i+1].strike
                return (
                    <Row key={i} className="text-center">
                        <Cell value={optn?.bid} />
                        <Cell value={optn?.ask} />
                        <Cell value={optn?.volume} />
                        <Cell value={optn?.openInterest} />
                        <LineBreak currentPrice={currentPrice} />
                    </Row>
                )
            })
        )
    }

    const renderStrikes = () => {
        return (
            strikes?.map((strike, i) => {
                const currentPrice = i < strikes.length - 1 && strike.strike < price && price < strikes[i+1].strike
                return (
                    <Row className="text-center">
                        <Cell value={strike} heading />
                        <LineBreak hidden currentPrice={currentPrice} />
                    </Row>
                )
            })
        )
    }

    return (
        <Row className="mt-3 text-white">
            <Col xs={12} md={5} style={{padding: '0'}} >
                <Row><h6 className="heading-8-weight-4 text-center mb-0" >Calls</h6></Row>
                <LineBreak />
                <Row className="text-center">
                    <Cell value={'Bid'} heading />
                    <Cell value={'Ask'} heading />
                    <Cell value={'Delta'} heading />
                    <Cell value={'Volume'} heading />
                </Row>
                <LineBreak />
                {renderOptions('calls')}
            </Col>


            <Col xs={12} md={2} style={{background: 'rgba(45, 0, 208, 1)'}}>
                <Row><h6 className="heading-8-weight-4 text-center mb-0 p-0" >STRIKES</h6></Row>
                <LineBreak hidden />
                {renderStrikes()}
            </Col>


            <Col xs={12} md={5} style={{padding: '0'}}>
                <Row><h6 className="heading-8-weight-4 text-center mb-0" >Puts</h6></Row>
                <LineBreak />
                <Row className="text-center">
                    <Cell value={'Bid'} heading />
                    <Cell value={'Ask'} heading />
                    <Cell value={'Delta'} heading />
                    <Cell value={'Volume'} heading />
                </Row>
                <LineBreak />
                {renderOptions('puts')}
            </Col>
        </Row>
    );
}

export default OptionsChain;
