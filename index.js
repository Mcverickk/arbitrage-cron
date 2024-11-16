const cron = require('node-cron');
const { fetchQuoteFromUniswap } = require('./src/quote.js');

// cron.schedule('*/5 * * * * *', () => {
//     main();
// });

const main = async () => {
    fetchQuoteFromUniswap({tokenIn: 'USDC', tokenOut: 'BAMBOO', poolFees: 3000, chain: 'base', amountIn: 1 * 10**6});
    fetchQuoteFromUniswap({tokenIn: 'USDC', tokenOut: 'WETH', poolFees: 500, chain: 'polygon', amountIn: 3500 * 10**6});
    fetchQuoteFromUniswap({tokenIn: 'USDC', tokenOut: 'LINK', poolFees: 3000, chain: 'arbitrum', amountIn: 100 * 10**6});
}
main();




