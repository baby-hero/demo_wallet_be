// Import Moralis
const Moralis = require("moralis").default;
// Import the EvmChain dataType
const { EvmChain } = require("@moralisweb3/common-evm-utils");

// Import the node-fetch module
// const fetch = require('node-fetch');

// Load environment variables
const bcs_chain = EvmChain.BSC;
// const rpc_api_key = process.env.RPC_API_KEY;
// const rpc_url = process.env.RPC_URL

// class MoralisRPC {
//   constructor() {
//     if (!bcs_chain || !rpc_api_key) {
//       throw new Error("Environment variables BCS_CHAIN and RPC_API_KEY must be set.");
//     }
//     console.log('Connect with chain:', bcs_chain);
//   }

//   async getBalance(address) {
//     if (!address) {
//       throw new Error("Address parameter is required.");
//     }

//     const options = {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "jsonrpc": "2.0",
//         "id": 1,
//         "method": "eth_getBalance",
//         "params": [address, "latest"]
//       })
//     };

//     try {
//       const response = await fetch(`${rpc_url}/${bcs_chain}/${rpc_api_key}/`, options);
//       const jsonResponse = await response.json();
//       console.log(jsonResponse);
//       return jsonResponse;
//     } catch (err) {
//       console.error('Error fetching balance:', err);
//     }
//   }
// }

class MoralisWeb3 {
  async getNativeBalance(address) {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      "chain": bcs_chain,
      "address": address
    });
    console.log(nativeBalance)
    const native = nativeBalance.result.balance.ether;
    return { native };
  }
  async getWalletTokenBalances(address) {
    // Get token balances
    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      "chain": bcs_chain,
      "excludeSpam": true,
      "address": address
    });
    return tokenBalances
  }
  async getWalletTokenBalancesPrice(address) {
    const tokenBalances = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      "chain": bcs_chain,
      "address": address,
      "excludeSpam": true,
      "excludeUnverifiedContracts": true,
      "address": address
    });
    console.log(tokenBalances)
    return tokenBalances
  }

  async getWalletHistory(address, limit = 10) {
    const transactions = await Moralis.EvmApi.wallets.getWalletHistory({
      "chain": bcs_chain,
      "order": "DESC",
      "includeInternalTransactions": true,
      "includeInputData": false,
      "nftMetadata": false,
      "limit": limit,
      "address": address
    });
    console.log(transactions)
    return transactions
  }
}

module.exports = MoralisWeb3