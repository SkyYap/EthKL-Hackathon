
require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/i4CigjtYBFmaK4j5TXHDPd6R-PTuPCiW",
      accounts: [process.env.PRIVATE_KEY]
    },
    scrollTestnet: {
      url: "https://scroll-sepolia.g.alchemy.com/v2/i4CigjtYBFmaK4j5TXHDPd6R-PTuPCiW",
      accounts: [process.env.PRIVATE_KEY] // Use your private key from .env
    },
    mantaTestnet: {
      url: "https://pacific-rpc.sepolia-testnet.manta.network/http", // RPC URL for Manta
      accounts: [process.env.PRIVATE_KEY] // Use your private key from .env
    }
  },
}