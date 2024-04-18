import puppeteer from 'puppeteer';

export const scrapeMarketChameleon = async (filters) => { 
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.setUserAgent(ua);
  
    await page.goto('https://marketchameleon.com/Screeners/Stocks');

    await applyFilters(filters, page);

    await page.waitForSelector('#eq_screener_tbl tbody tr');

    const data = await page.evaluate(() => {
        const stocks = Array.from(document.querySelectorAll('#eq_screener_tbl tbody tr'));
        return stocks.map(stock => {
            const movingAvgIndicatorElement = stock.querySelector('.centercelltd span');
            const movingAvgIndicator = movingAvgIndicatorElement ? movingAvgIndicatorElement.textContent.trim() : null;
    
            return {
                symbol: stock.querySelector('.mplink').textContent.trim(),
                companyName: stock.querySelector('.wrappablecell').textContent.trim(),
                price: stock.querySelector('.rightcelltd:nth-child(3)').textContent.trim(),
                percentageChange: stock.querySelector('.rightcelltd:nth-child(4)').textContent.trim(),
                volume: stock.querySelector('.rightcelltd:nth-child(5)').textContent.trim(),
                avgVolume: stock.querySelector('.rightcelltd:nth-child(6)').textContent.trim(),
                marketCap: stock.querySelector('.rightcelltd:nth-child(8)').textContent.trim(),
                movingAvgIndicator
            };
        });
    });

    await browser.close();
    
    return data;

};

const applyFilters = async (filters, page) => {
    
    const {
        minMarketCap,
        stockType,
        minIV30, 
        avgStockVolume,
        maTechnicalIndicator,
        rsi,
        // minprice
    } = filters;

    const stockAttributes = [
        { cNum: 8, prefix: 'Over', value: minMarketCap },
        { cNum: 21, prefix: 'Above', value: minIV30 },
        { cNum: 28, prefix: null, value: stockType },
        { cNum: 31, prefix: null, value: 'Has Options' },
    ]

    const technicalAttributes = [
        { cNum: 51, prefix: null, value: avgStockVolume },
        { cNum: 59, prefix: null, value: maTechnicalIndicator },
        { cNum: 45, prefix: null, value: rsi },
        { cNum: 31, prefix: null, value: 'Has Options' },
        { cNum: 2, prefix: null, value: 'Below 25.00' },
        
    ]

    stockAttributes.map(attribute => {
        if (attribute.value === 'Any') return;
        applyFilter(attribute, page)
    })

    await page.click('#eq_scr_pricetech');

    technicalAttributes.map(attribute => {
        if (attribute.value === 'Any') return;
        applyFilter(attribute, page)
    })

}

const applyFilter = async ({cNum, prefix, value}, page) => {
    await page.waitForSelector(`select[name="c${cNum}"]`);
    await page.select(`select[name="c${cNum}"]`, prefix ? `${prefix} ${value}` : value);
}

export default {
    scrapeMarketChameleon
}