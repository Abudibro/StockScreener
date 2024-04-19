import React from "react";
import StockTableRow from "./StockRow";

const StockTable = ({ stocks }) => {
    return (
        <div>
            {stocks.map((stock, i) => {
                return <StockTableRow stock={stock} key={i} />
            })}
        </div>
    )
}

export default StockTable