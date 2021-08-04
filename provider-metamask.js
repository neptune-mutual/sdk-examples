import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum)
}

export { getProvider }
