import React, { useEffect, useState } from "react";
import { calculateInterval, calculateMin, renderPeriodOptions, bbOptions, candlestickOptions, axisOptions } from "./utils";
import { getHistory } from "../../api/stockService";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import {
    elderRay,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    plotDataLengthBarWidth,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    BollingerSeries,
    CrossHairCursor,
    bollingerBand,
    CandlestickSeries,
    MouseCoordinateY,
    MouseCoordinateX
} from "react-financial-charts";

import Spinner from 'react-bootstrap/Spinner';

const ChartComponent = ({ symbol }) => {
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("1mo");
    const [interval, setInterval] = useState('1d');

    useEffect(() => {
        getHistory(symbol, interval).then(resp => {
            const withDateObject = resp.quotes.map(candlestick => {
                return { ...candlestick, date: new Date(candlestick.date) }; 
            })
            setInitialData(withDateObject)
            setLoading(false);
        })
    }, [symbol, interval])

    const changePeriod = (period) => {
        const needsNewRequest = calculateInterval(period) !== calculateInterval(selectedPeriod)
    
        if (needsNewRequest) {
            setLoading(true);
            setInterval(calculateInterval(period));
        }

        setSelectedPeriod(period)
    }

    const bb = bollingerBand().merge((d, c) => {
            d.bb = c;
        }).accessor((d) => d.bb);

    const elder = elderRay();
    const calculatedData = elder(bb(initialData));

    const margin = { left: 0, right: 48, top: 0, bottom: 0 };
    const pricesDisplayFormat = format(".2f");

    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => d.date,
    );

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[calculateMin(selectedPeriod, data)]);
    const xExtents = [min, max];

    const timeDisplayFormat = timeFormat("%d %b");

    const height = 600;
    const width = 800;
    const ratio = 1;

    return (
        loading ? <Spinner animation="grow" size="lg" variant="light" /> :
        <>
        <ChartCanvas
            height={height}
            width={width}
            ratio={ratio}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName={symbol}
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
            <Chart id={1} yExtents={[d => [d.high - (d.high * .05), d.low + (d.low * .05)]]} height={height} >
                <XAxis axisAt="bottom" orient="top" {...axisOptions}
                />
                <YAxis tickFormat={pricesDisplayFormat} axisAt={"right"} {...axisOptions} />
                <CandlestickSeries {...candlestickOptions} />
                <BollingerSeries {...bbOptions} />
                <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
                <MouseCoordinateX displayFormat={timeDisplayFormat} />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
        <div className='d-flex align-items-center justify-content-space-between' >
            {renderPeriodOptions(selectedPeriod, changePeriod)}
        </div>
        </>
    );
}

export default ChartComponent;
