const cron = require('node-cron');
const { fetchQuoteFromUniswap } = require('./src/quote.js');

// cron.schedule('*/5 * * * * *', () => {
//     console.log('Running a task every 5 seconds');
// });

const main = async () => {
    const amountOut = await fetchQuoteFromUniswap({tokenIn: 'USDC', tokenOut: 'WETH', poolFees: 500, chain: 'arbitrum', amountIn: 3400000000});
    console.log({amountOut});
}
main();




