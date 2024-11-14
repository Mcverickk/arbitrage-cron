const Quoter = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');
const { ethers } = require('ethers');
const { getChainData } = require('./chainConfigs.js');

const fetchQuoteFromUniswap = async ({tokenIn, tokenOut, poolFees, chain, amountIn}) => {

    const chainConfig = getChainData(chain);

    const { address: tokenInAddress } = chainConfig.fetchToken(tokenIn);
    const { address: tokenOutAddress } = chainConfig.fetchToken(tokenOut);

    const provider = new ethers.JsonRpcProvider(chainConfig.rpcUrl);

    const quoterContract = new ethers.Contract(
        chainConfig.uniswapQuoterAddress,
        Quoter.abi,
        provider
    );
    
    const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCallResult(
        tokenInAddress,
        tokenOutAddress,
        poolFees,
        amountIn,
        0
    )

    return quotedAmountOut.toString();
}

module.exports = { fetchQuoteFromUniswap };
    