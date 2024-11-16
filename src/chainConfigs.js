require('dotenv').config();

const getChainData = (chain) => {
    switch(chain) {
        case 'base':
            return BASE_MAINNET;
        case 'polygon':
            return POLYGON_MAINNET;
        case 'arbitrum':
            return ARBITRUM_MAINNET;
        default:
            return POLYGON_MAINNET;
    }
}

const findToken = (tokenSymbol, tokenArray) => {
    const token = tokenArray.find(token => token.symbol === tokenSymbol);
    if(!token) {
      console.error(`Token with symbol ${tokenSymbol} not found`);
    }
    return token;
}

const ARBITRUM_MAINNET = {
    chainId: 42161,
    rpcUrl: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    uniswapQuoterAddress: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    fetchToken(tokenSymbol) {
        return findToken(tokenSymbol, ARBITRUM_MAINNET_TOKENS);
    }
}

const BASE_MAINNET = {
    chainId: 8453,
    rpcUrl: `https://base-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    uniswapQuoterAddress: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    fetchToken(tokenSymbol) {
        return findToken(tokenSymbol, BASE_MAINNET_TOKENS);
    }
}

const POLYGON_MAINNET = {
    chainId: 137,
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    uniswapQuoterAddress: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    fetchToken(tokenSymbol) {
        return findToken(tokenSymbol, POLYGON_MAINNET_TOKENS);
    }
}

const BASE_MAINNET_TOKENS = [
    { name: 'Brett' ,symbol: 'BRETT', address: '0x532f27101965dd16442E59d40670FaF5eBB142E4', decimals: 18 },
    { name: 'USD Coin' ,symbol: 'USDC', address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
    { name: 'Degen' ,symbol: 'DEGEN', address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed', decimals: 18 },
    { name: 'Bamboo on Base' ,symbol: 'BAMBOO', address: '0x689644b86075ed61c647596862c7403e1c474dbf', decimals: 18},
    { name: 'Wrapped Ether' ,symbol: 'WETH', address: '0x4200000000000000000000000000000000000006', decimals: 18 },
];

const POLYGON_MAINNET_TOKENS = [
    { name: 'Wrapped Ether' ,symbol: 'WETH', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' , decimals: 18 },
    { name: 'USD Coin' ,symbol: 'USDC', address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', decimals: 6 },
]

const ARBITRUM_MAINNET_TOKENS = [
    { name: 'Wrapped Ether' ,symbol: 'WETH', address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' , decimals: 18 },
    { name: 'USD Coin' ,symbol: 'USDC', address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6 },
    { name: 'Pepe', symbol: 'PEPE', address: '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00', decimals: 18 },
    { name: 'Chainlink Token', symbol: 'LINK', address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4', decimals: 18 },
    { name: 'Pendle', symbol: 'PENDLE', address: '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8', decimals: 18 },
]

module.exports = { getChainData };