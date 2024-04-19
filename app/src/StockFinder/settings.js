const settings = {
  minMarketCap: {
    label: 'Min Market Cap', 
    defaultValue: 'Over 1000000000', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: '$1 Billion', value: 'Over 1000000000' },
      { label: '$5 Billion', value: 'Over 5000000000' },
      { label: '$10 Billion', value: 'Over 10000000000' },
      { label: '$20 Billion', value: 'Over 20000000000' },
    ]
  },
  stockType: {
    label: 'Stock Type', 
    defaultValue: 'Common', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: 'Common', value: 'Common' },
      { label: 'ETF', value: 'ETF' }
    ]
  },
  minIV30: {
    label: 'Min IV-30', 
    defaultValue: 'Above 30.0', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: '5.0', value: 'Above 5.0' },
      { label: '10.0', value: 'Above 10.0' },
      { label: '20.0', value: 'Above 20.0' },
      { label: '30.0', value: 'Above 30.0' },
      { label: '50.0', value: 'Above 50.0' },
      { label: '70.0', value: 'Above 70.0' },
      { label: '90.0', value: 'Above 90.0' },
      { label: '120.0', value: 'Above 120.0' },
    ]
  }, 
  price: {
    label: 'Price', 
    defaultValue: 'Any', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: 'Below 5', value: 'Below 5.00' },
      { label: 'Below 10', value: 'Below 10.00' },
      { label: 'Below 25', value: 'Below 25.00' },
      { label: 'Below 40', value: 'Below 40.00' },
      { label: 'Below 60', value: 'Below 60.00' },
      { label: 'Below 100', value: 'Below 100.00' },
      { label: '5 to 25', value: '5.00 To 25.00' },
      { label: '10 to 30', value: '10.00 To 30.00' },
      { label: '10 to 60', value: '10.00 To 60.00' },
      { label: '20 to 50', value: '20.00 To 50.00' },
      { label: '50 to 100', value: '50.00 To 100.00' },
      { label: 'Above 5', value: 'Above 5.00' },
      { label: 'Above 10', value: 'Above 10.00' },
      { label: 'Above 25', value: 'Above 25.00' },
      { label: 'Above 40', value: 'Above 40.00' },
      { label: 'Above 60', value: 'Above 60.00' },
      { label: 'Above 100', value: 'Above 100.00' },
    ]
  }, 
  avgStockVolume: {
    label: 'Average Stock Volume', 
    defaultValue: 'Over 1000000', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: 'Over 50 Thousand', value: 'Over 50000' },
      { label: 'Over 100 Thousand', value: 'Over 100000' },
      { label: 'Over 500 Thousand', value: 'Over 500000' },
      { label: 'Over 750 Thousand', value: 'Over 750000' },
      { label: 'Over 1 Million', value: 'Over 1000000' },
      { label: 'Over 5 Million', value: 'Over 5000000' },
    ]
  },
  MATechnicalIndicator: {
    label: 'MA Technical Indicator', 
    defaultValue: 'Top Pullback', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: 'Top Pullback', value: 'Top Pullback' },
      { label: 'Bearish', value: 'Bearish' }
    ]
  },
  RSI: {
    label: '14-Day RSI', 
    defaultValue: '30.0 To 50.0', 
    options: [
      { label: 'Any', value: 'Any' },
      { label: 'Above 90', value: 'Above 90.0' },
      { label: 'Above 70 (Overbought)', value: 'Above 70.0' },
      { label: '50 to 70', value: '50.0 To 70.0' },
      { label: '30 to 70', value: '30.0 To 70.0' },
      { label: '30 to 50', value: '30.0 To 50.0' },
      { label: 'Below 30 (Oversold)', value: 'Below 30.0' },
      { label: 'Below 10', value: 'Below 10.0' }
    ]
  }
};


export default settings;