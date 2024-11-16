const QuoterV2 = require('@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json');
const { ethers } = require('ethers');
const { getChainData } = require('./chainConfigs.js');

const fetchQuoteFromUniswap = async ({tokenIn, tokenOut, poolFees, chain, amountIn}) => {
    return _fetchQuoteFromUniswapQuoterV2({tokenIn, tokenOut, poolFees, chain, amountIn, exchange: 'uniswap'});
}

const fetchQuoteFromAerodromeFinance = async ({tokenIn, tokenOut, poolFees, amountIn}) => {
    return _fetchQuoteFromUniswapQuoterV2({tokenIn, tokenOut, poolFees, chain: "base", amountIn, exchange: 'aerodrome'});
}


const _fetchQuoteFromUniswapQuoterV2 = async ({tokenIn, tokenOut, poolFees, chain, amountIn, exchange}) => {
    const chainConfig = getChainData(chain);

    const { address: tokenInAddress, decimals: tokenInDecimal } = chainConfig.fetchToken(tokenIn);
    const { address: tokenOutAddress, decimals: tokenOutDecimal  } = chainConfig.fetchToken(tokenOut);

    try{
        const provider = new ethers.JsonRpcProvider(chainConfig.rpcUrl);
    
        const quoterContract = new ethers.Contract(
            chainConfig.getQuoterAddress(exchange),
            QuoterV2.abi,
            provider
        );
        
        const [quotedAmountOut,,,] = await quoterContract.quoteExactInputSingle.staticCallResult([
            tokenInAddress,
            tokenOutAddress,
            BigInt(amountIn),
            poolFees,
            0
        ])
        const amountOutInString = quotedAmountOut.toString();
        const quotedAmountOutInEth = amountOutInString/10**tokenOutDecimal;
        console.log(`${exchange.toUpperCase()}(${chain}) || ${amountIn/10**tokenInDecimal} ${tokenIn} ==> ${quotedAmountOutInEth.toString()} ${tokenOut}`);
        return amountOutInString;
    } catch (error) {
        console.error(`Error fetching quote from ${exchange} on ${chain}: ${error}`);
    }
}

module.exports = { fetchQuoteFromUniswap, fetchQuoteFromAerodromeFinance };
    