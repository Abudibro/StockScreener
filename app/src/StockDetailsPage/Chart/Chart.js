import React, { useEffect, useState } from "react";
import { 
    calculateInterval,
    calculateMin, 
    renderPeriodOptions, 
    bbOptions,
    candlestickOptions,
    axisOptions,
    lineOptions,
    renderChartOptions,
} from "./utils";
import { getHistory } from "../../api/stockService";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import {
    elderRay,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    BollingerSeries,
    CrossHairCursor,
    bollingerBand,
    CandlestickSeries,
    MouseCoordinateY,
    MouseCoordinateX,
    LineSeries
} from "react-financial-charts";

import Spinner from 'react-bootstrap/Spinner';

const ChartComponent = ({ symbol, height, width }) => {
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("1mo");
    const [interval, setInterval] = useState('1d');
    const [indicator, setIndicator] = useState('line')
    const [isBBVisible, setIsBBVisible] = useState(true);

    useEffect(() => {
        getHistory(symbol, interval).then(resp => {
            const withDatePrices = resp.quotes.map(pricePoint => {
                return { ...pricePoint, date: new Date(pricePoint.date) }; 
            })
            setInitialData(withDatePrices)
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

    const changeIndicatorStyle = (newIndicator) => {
        if (indicator === newIndicator) return;
        else setIndicator(newIndicator);
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
    const min = xAccessor(data[calculateMin(selectedPeriod, calculatedData)]);
    const xExtents = [min, max];

    const timeDisplayFormat = timeFormat("%d %b");

    const ratio = 5/4;

    return (
        <div className="d-flex align-items-center justify-content-center" style={{width, height: height}}>
            {
                loading ? <Spinner animation="grow" size="lg" variant="light" /> :
                <div>
                    <ChartCanvas
                        height={height-54}
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
                        <Chart id={1} yExtents={(d) => [d.low - (d.low * .01), d.high + (d.high * .01)]} height={height} >
                            <XAxis axisAt="bottom" orient="top" {...axisOptions} />
                            <YAxis tickFormat={pricesDisplayFormat} axisAt={"right"} {...axisOptions} />
                            {
                                indicator === 'candle' ? <CandlestickSeries {...candlestickOptions} />
                                : <LineSeries {...lineOptions} />
                            }
                            {
                                isBBVisible && <BollingerSeries {...bbOptions} />
                            }
                            <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
                            <MouseCoordinateX displayFormat={timeDisplayFormat} />
                        </Chart>
                        <CrossHairCursor />
                    </ChartCanvas>
                    <div className="d-flex align-items-center justify-content-between mt-3" style={{width}} >
                        <div >
                            {renderPeriodOptions(selectedPeriod, changePeriod)}
                        </div>
                        <div>
                            {renderChartOptions(indicator, changeIndicatorStyle, isBBVisible, setIsBBVisible)}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ChartComponent;
