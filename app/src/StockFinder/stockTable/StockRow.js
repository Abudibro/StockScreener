import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

const StockTableRow = ({ stock, striped }) => {
    const trClassName = "vw-100 py-2 stocks-table-row" + (striped ? ' stocks-table-row-striped' : '');
    const isPriceUp = stock.percentageChange.charAt(0) === '+';
    const caretClassName = isPriceUp ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'

    return (
        <tr className={trClassName} >
            <td className='stocks-table-cell heading-text-weight-3' >{stock.symbol}</td>
            <td className='stocks-table-cell heading-text-weight-3' >{stock.companyName}</td>
            <td className='stocks-table-cell heading-text-weight-3' >{stock.price}</td>
            <td className='stocks-table-cell heading-text-weight-3' style={{color: isPriceUp ? '#00ff00' : '#ff2727'}} >
                <i className={caretClassName} ></i>
                {stock.percentageChange}
            </td>
            <td className='stocks-table-cell heading-text-weight-3' >{stock.avgVolume}</td>
            <td className='stocks-table-cell heading-text-weight-3' >{stock.marketCap}</td>
            <td className='stocks-table-cell heading-text-weight-3' >{stock.movingAvgIndicator}</td>
        </tr>
  );
};

export default StockTableRow;
