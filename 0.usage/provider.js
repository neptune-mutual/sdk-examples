import { ethers } from 'ethers'
import { ChainId, cover } from '@neptunemutual/sdk'
import { covers } from '../configs/covers.js'
import dotenv from 'dotenv'

/**
  * The following are a sample of environment variables
  * RPC=https://matic-mumbai.chainstacklabs.com
  * NPM_MUMBAI_STORE=0x85193e801c845f1f2949cc96b3fb00041d0a1b84
  */
dotenv.config()

const myProvider = () => {
  /**
   * The private key entered below is for demo purpose only.
   * Do not use this private key or store any tokens or cryptocurrency
   * using this private key.
   */
  const fakePrivateKey = '0586782a6b30a2526f960bfde45db0470c51919c0ac2ae9ad5ad39b847955109'
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC)

  return (new ethers.Wallet(fakePrivateKey, provider)).provider // Do not use this wallet
}

const readCoverInfo = async () => {
  try {
    const key = covers[0].key
    const provider = myProvider()

    const coverInfo = await cover.getCoverInfo(ChainId.Mumbai, key, provider)
    console.log(coverInfo)
  } catch (error) {
    console.error(error)
  }
}

readCoverInfo()
