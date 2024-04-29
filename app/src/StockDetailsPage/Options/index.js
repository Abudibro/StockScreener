import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { getOptions } from "../../api/stockService";

const OptionsChain = ({symbol}) => {
    const [loading, setLoading] = useState(true);
    const [calls, setCalls] = useState([])
    const [puts, setPuts] = useState([])
    const [strikes, setStrikes] = useState([])

    useEffect(() => {
        getOptions(symbol).then(resp => {
            if (!resp.error) {
                console.log(resp)
                setCalls(resp.options[0]?.calls);
                setPuts(resp.options[0]?.puts);
                setStrikes(resp.strikes)
            }
        })
    }, [symbol])

    const lineBreak = () => <hr style={{ border: 'none', borderTop: '2px solid grey', margin: '10px 0 10px 0' }} />;
    const Cell = ({value, weight}) => {
        return (
            <Col className="d-flex align-items-center justify-content-center" >
                <p className={`heading-text-weight-${weight ? '5' : '3'} m-0 p-0 h-100`} >{value}</p>
            </Col>
        )
    }

    const renderOptions = (type) => {
        const isCalls = type === 'calls';
        const data = isCalls ? calls : puts
        return (
            data.map((optn, i) => {
                return (
                    <Row key={i} className="text-center">
                        <Cell value={optn?.bid} />
                        <Cell value={optn?.ask} />
                        <Cell value={optn?.volume} />
                        <Cell value={optn?.openInterest} />
                        {lineBreak()}
                    </Row>
                )
            })
        )
    }

    return (
        <Row className="mt-3 text-white">
            <Col xs={12} md={5} style={{padding: '0'}} >
                <Row><h6 className="heading-8-weight-4 text-center mb-0" >Calls</h6></Row>
                {lineBreak()}
                <Row className="text-center">
                    <Cell value={'Bid'} weight={4} />
                    <Cell value={'Ask'} weight={4} />
                    <Cell value={'Delta'} weight={4} />
                    <Cell value={'Volume'} weight={4} />
                </Row>
                {lineBreak()}
                {renderOptions('calls')}
            </Col>


            <Col xs={12} md={1} style={{background: 'rgba(45, 0, 208, 1)', padding: '2px', margin: '0'}}>
                <Row><h6 className="heading-text-weight-4 text-center mb-0" >STRIKES</h6></Row>
                <Row className="text-center">
                    <Col>Bid</Col>
                    <Col>Ask</Col>
                    <Col>Delta</Col>
                    <Col>Volume</Col>
                </Row>
            </Col>


            <Col xs={12} md={5} style={{padding: '0'}}>
                <Row><h6 className="heading-8-weight-4 text-center mb-0" >Puts</h6></Row>
                {lineBreak()}
                <Row className="text-center">
                    <Cell value={'Bid'} weight={4} />
                    <Cell value={'Ask'} weight={4} />
                    <Cell value={'Delta'} weight={4} />
                    <Cell value={'Volume'} weight={4} />
                </Row>
                {lineBreak()}
                {renderOptions('puts')}
            </Col>
        </Row>
    );
}

export default OptionsChain;
