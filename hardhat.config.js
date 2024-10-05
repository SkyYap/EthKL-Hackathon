require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
      accounts: [process.env.PRIVATE_KEY]
    },
    scrollTestnet: {
      url: "https://scroll-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
      accounts: [process.env.PRIVATE_KEY]
    },
    mantaTestnet: {
      url: "https://pacific-rpc.sepolia-testnet.manta.network/http", 
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    // apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: process.env.SCROLL_API_KEY,
    customChains: [
      {
        network: "scrollTestnet",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        }
      }
    ]
  }
};
