const cron = require('node-cron');
const { fetchQuoteFromUniswap } = require('./src/quote.js');

// cron.schedule('*/5 * * * * *', () => {
//     main();
// });

const main = async () => {
    fetchQuoteFromUniswap({tokenIn: 'USDC', tokenOut: 'WETH', poolFees: 500, chain: 'arbitrum', amountIn: 3400 * 10**6});
}
main();




