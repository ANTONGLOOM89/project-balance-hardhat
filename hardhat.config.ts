import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from "dotenv"

// npx hardhat run scripts/deploy.ts --network sepolia
// npx hardhat verify --network sepolia 0x4D262FE58631be2861ef7F81eF156788D969b239
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    tests: "./test",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + process.env.INFURA_RPC_URL_SEPOLIA,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}

export default config
