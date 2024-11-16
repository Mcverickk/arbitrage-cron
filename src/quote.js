const QuoterV2 = require('@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json');
const { ethers } = require('ethers');
const { getChainData } = require('./chainConfigs.js');

const fetchQuoteFromUniswap = async ({tokenIn, tokenOut, poolFees, chain, amountIn}) => {

    const chainConfig = getChainData(chain);

    const { address: tokenInAddress, decimals: tokenInDecimal } = chainConfig.fetchToken(tokenIn);
    const { address: tokenOutAddress, decimals: tokenOutDecimal  } = chainConfig.fetchToken(tokenOut);

    const provider = new ethers.JsonRpcProvider(chainConfig.rpcUrl);

    const quoterContract = new ethers.Contract(
        chainConfig.uniswapQuoterAddress,
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

    const quotedAmountOutInEth = quotedAmountOut.toString()/10**tokenOutDecimal;
    console.log(`UNISWAP(${chain}) || ${amountIn/10**tokenInDecimal} ${tokenIn} ==> ${quotedAmountOutInEth.toString()} ${tokenOut}`);

    return quotedAmountOut.toString();
}

module.exports = { fetchQuoteFromUniswap };
    