const settings = {
    minMarketCap: {
      label: 'Min Market Cap', 
      defaultValue: '$1 Billion', 
      options: [
        'Any',
        '$1 Billion',
        '$5 Billion',
        '$10 Billion',
        '$20 Billion',
      ]
    },
    stockType: {
      label: 'Stock Type', 
      defaultValue: 'Common', 
      options: [
        'Any', 'Common', 'ETF'
      ]
    },
    minIV30: {
      label: 'Min IV-30', 
      defaultValue: '30.0', 
      options: [
        'Any',
        '5.0',
        '10.0',
        '20.0',
        '30.0',
        '50.0',
        '70.0',
        '90.0',
        '120.0',
      ]
    }, 
    maxIV30: {
      label: 'Max IV-30', 
      defaultValue: 'Any', 
      options: [
        'Any',
        '5.0',
        '10.0',
        '20.0',
        '30.0',
        '50.0',
        '70.0',
        '90.0',
        '120.0',
      ]
    }, 
    avgStockVolume: {
      label: 'Average Stock Volume', 
      defaultValue: 'Over 1 Million', 
      options: [
        'Any',
        'Over 50 Thousand',
        'Over 100 Thousand',
        'Over 500 Thousand',
        'Over 750 Thousand',
        'Over 1 Million',
        'Over 5 Million',
      ]
    },
    MATechnicalIndicator: {
      label: 'MA Technical Indicator', 
      defaultValue: 'Top Pullback', 
      options: [
        'Any', 'Top Pullback', 'Bearish'
      ]
    },
    RSI: {
      label: '14-Day RSI', 
      defaultValue: '30 to 50', 
      options: [
        'Any',
        'Above 90',
        'Above 70 (Overbought)',
        '50 to 70',
        '30 to 70',
        '30 to 50',
        'Below 30 (Oversold)',
        'Below 10'
      ]
    }
  };

export default settings;