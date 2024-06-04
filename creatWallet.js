const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Define the network
// bitcoin - mainnet
// testnet - testnet
const network = bitcoin.networks.testnet

// HD wallet derivation path
const path = `m/49'/1'/0'/0`

// Generate a mnemonic (seed phrase)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Create the root of the HD wallet
let root = bip32.fromSeed(seed, network)

// Derive the account and node (address)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// Generate a P2PKH address from the node's public key
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

// Output the generated wallet details
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed", mnemonic)
