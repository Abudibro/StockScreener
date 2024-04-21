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

        if (stocks.length === 0) {
            return []; // or handle it according to your requirement
        }

        const noItems = stocks[0].querySelector('.dataTables_empty');
        if (noItems) return []

        return stocks.map(stock => {

            const symbolElement = stock.querySelector('.mplink');
            const companyNameElement = stock.querySelector('.wrappablecell');
            const priceElement = stock.querySelector('.rightcelltd:nth-child(3)');
            const percentageChangeElement = stock.querySelector('.rightcelltd:nth-child(4)');
            const volumeElement = stock.querySelector('.rightcelltd:nth-child(5)');
            const avgVolumeElement = stock.querySelector('.rightcelltd:nth-child(6)');
            const marketCapElement = stock.querySelector('.rightcelltd:nth-child(8)');
            const movingAvgIndicatorElement = stock.querySelector('.centercelltd span');
    
            return {
                symbol: symbolElement ? symbolElement.textContent.trim() : null,
                companyName: companyNameElement ? companyNameElement.textContent.trim() : null,
                price: priceElement ? priceElement.textContent.trim() : null,
                percentageChange: percentageChangeElement ? percentageChangeElement.textContent.trim() : null,
                volume: volumeElement ? volumeElement.textContent.trim() : null,
                avgVolume: avgVolumeElement ? avgVolumeElement.textContent.trim() : null,
                marketCap: marketCapElement ? marketCapElement.textContent.trim() : null,
                movingAvgIndicator: movingAvgIndicatorElement ? movingAvgIndicatorElement.textContent.trim() : null,
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
        price
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
        { cNum: 2, prefix: null, value: price },
        
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

const applyFilter = async ({cNum, value}, page) => {
    await page.waitForSelector(`select[name="c${cNum}"]`);
    await page.select(`select[name="c${cNum}"]`, value);
}

export default {
    scrapeMarketChameleon
}