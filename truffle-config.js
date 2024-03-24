require("dotenv").config()
// const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const PRIVATE_KEY = process.env.PRIVATE_KEY
const SPARK_RPC_URL = process.env.SPARK_RPC_URL
const FUSE_RPC_URL = process.env.FUSE_RPC_URL

module.exports = {
    contracts_build_directory: "./src/abis",

    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 7545, // Standard Ethereum port (default: none)
            network_id: "*", // Any network (default: none)
        },
        fuse: {
            provider: () => new HDWalletProvider(PRIVATE_KEY, FUSE_RPC_URL),
            network_id: "122",
        },
        spark: {
            provider: () => new HDWalletProvider(PRIVATE_KEY, SPARK_RPC_URL),
            network_id: "123",
            confirmations: 2,
            networkCheckTimeout: 10000,
            timeoutBlocks: 200,
            skipDryRun: true,
        },
        sepolia: {
            provider: () => new HDWalletProvider(PRIVATE_KEY, SEPOLIA_RPC_URL),
            network_id: 11155111,
            gasPrice: 10000000000, // # of confirmations to wait between deployments. (default: 0)
            confirmations: 2,
            timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
        },

        // goerli: {
        //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
        //   network_id: 5,       // Goerli's id
        //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
        //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
        //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        // },
    },

    // Set default mocha options here, use special reporters, etc.
    mocha: {
        timeout: 100000,
    },

    // plugins: ["truffle-plugin-verify"],
    // api_keys: {
    //     etherscan: ETHERSCAN_API_KEY,
    // },

    // Configure your compilers
    compilers: {
        solc: {
          version: "0.8.19", // Fetch exact version from solc-bin (default: truffle's version)
          // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
          settings: {          // See the solidity docs for advice about optimization and evmVersion
           optimizer: {
             enabled: true,
             runs: 200,
           },
           viaIR: true,
           evmVersion: "byzantium"
          }
        },
      },
}
