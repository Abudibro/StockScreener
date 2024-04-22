import React, { useEffect, useState } from "react";
import { ChartCanvas, Chart } from 'react-stockcharts';
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime } from 'd3-scale';
import { format } from "d3-format";

import { LineSeries } from "react-stockcharts/lib/series";
import {
	CrossHairCursor,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { getData } from "./utils";

import Spinner from 'react-bootstrap/Spinner';

const ChartComponent = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState();

    useEffect(()=> {
        getData().then(data => {
            setData(data);
            setLoading(false);
        })
    }, [])

    const width = 800;
    const height = 400;

    return (
        loading ? <Spinner animation="grow" size="lg" variant="light" /> :
        <ChartCanvas
            width={width}
            height={height}
            margin={{ left: 70, right: 70, top: 40, bottom: 50 }} // Adjust bottom margin for x-axis labels
            type={"svg"}
            seriesName="MSFT"
            data={data}
            ratio={4 / 3}
            xScale={scaleTime()}
            xAccessor={(d) => d.date}
            xScaleProvider={discontinuousTimeScaleProvider}
            xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}
        >
            <Chart id={1}
                    yExtents={[d => [d.high, d.low]]}>
                <XAxis axisAt="bottom" orient="bottom"/>
                <YAxis axisAt="right" orient="right" ticks={5} />
                <MouseCoordinateY
                    at="right"
                    orient="right"
                    displayFormat={format(".2f")} />
                    <LineSeries yAccessor={d => d.close} />
                <OHLCTooltip origin={[-40, 0]}/>
            </Chart>
            <CrossHairCursor />
        </ChartCanvas> 
    );
}

export default ChartComponent