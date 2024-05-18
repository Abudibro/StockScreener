import React from "react";
import StockTableRow from "./StockRow";
import Table from 'react-bootstrap/Table';

const StockTable = ({ stocks }) => {

    return (
        <div style={{marginBottom: '20px'}} >
            <Table responsive id="stocks-table" striped className="br-2" >
                <thead>
                    <tr style={{ background: 'rgb(45, 0, 208)' }} >
                        <th className="stocks-table-cell" >Symbol</th>
                        <th className="stocks-table-cell" >Company Name</th>
                        <th className="stocks-table-cell" >Price</th>
                        <th className="stocks-table-cell" >% Change</th>
                        <th className="stocks-table-cell" >Avg. Volume</th>
                        <th className="stocks-table-cell" >Market Cap</th>
                        <th className="stocks-table-cell" >Moving Average Indicator</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks?.map((stock, i) => {
                        return <StockTableRow stock={stock} key={i} striped={i % 2 === 0} />
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default StockTable