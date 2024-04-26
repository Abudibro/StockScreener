import Button from 'react-bootstrap/Button';
import { plotDataLengthBarWidth } from 'react-financial-charts';

export const calculateInterval = (period) => {
    if (period === '1d') return '5m';
    else if (period === '1wk') return '90m';
    else if (period === '1mo' || period === '3mo') return '1d'
    else return '5d'
}

export const calculateMin = (selectedPeriod, data) => {
    const today = new Date();
    let startDate = new Date();
    let index = 0;
    
    switch (selectedPeriod) {
        case "1d":
            startDate.setDate(today.getDate() - 1);
            break;
        case "1wk":
            startDate.setDate(today.getDate() - 7);
            break;
        case "1mo":
            startDate.setMonth(today.getMonth() - 1);
            break;
        case "3mo":
            startDate.setMonth(today.getMonth() - 3);
            break;
        case "1yr":
            startDate.setFullYear(today.getFullYear() - 1);
            break;
        default:
            return 0
    }

    for (let i = 0; i < data.length; i++) {
        const candle  = data[i];
        const year1 = candle.date.getFullYear();
        const month1 = candle.date.getMonth();
        const day1 = candle.date.getDate();

        const year2 = startDate.getFullYear();
        const month2 = startDate.getMonth();
        const day2 = startDate.getDate();

        if (year1 >= year2 && month1 >= month2 && day1 >= day2) {
            index = i;
            break;
        }
    }

    return index;
};

export const renderPeriodOptions = (selectedPeriod, changePeriod) => {
    const options = ['1d', '1wk', '1mo', '3mo', '1yr', 'All'];
    const optionLabels = ['1D', '1W', '1M', '3M', '1Y', 'All'];
    return (
        options.map((option, i) => {
            return (
                <Button className='m-2' variant={selectedPeriod === option ? 'light': 'outline-light'} onClick={() => changePeriod(option)} key={i} >{optionLabels[i]}</Button>
            )
        })
    )
}

export const bbOptions = {
    areaClassName: "react-financial-charts-bollinger-band-series-area",
    fillStyle: "rgba(45, 0, 208, 0.05)",
    strokeStyle: {
        top: "rgba(45, 0, 208, 1)",
        middle: "rgba(255, 255, 255, .5)",
        bottom: "rgba(45, 0, 208, 1)",
    },
    yAccessor: (data) => data.bb,
}

export const candlestickOptions = {
    candleStrokeWidth: 0.5,
    clip: true,
    fill: d => (d.close > d.open ? "#26a69a" : "#ef5350"),
    stroke: "none",
    wickStroke: d => (d.close > d.open ? "#26a69a" : "#ef5350"),
    width: plotDataLengthBarWidth,
    widthRatio: 0.8,
    yAccessor: d => ({ open: d.open, high: d.high, low: d.low, close: d.close }),
}

export const axisOptions = {
    getMouseDelta: (startXY, mouseXY) => startXY[0] - mouseXY[0],
    fontSize: 12,
    fontWeight: 500,
    tickLabelFill: "#f4f4f4" ,
}

export default {
    calculateInterval, calculateMin, renderPeriodOptions, bbOptions, candlestickOptions, axisOptions
}