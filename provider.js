import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

const getProvider = (owner) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC)
    let privateKey = process.env.PRIVATE_KEY

    if (owner) {
      privateKey = process.env.PRIVATE_KEY_OWNER
    }

    return new ethers.Wallet(privateKey, provider)
  } catch (error) {
    console.error(error)
  }
}

export { getProvider }
