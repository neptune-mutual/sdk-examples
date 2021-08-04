import { ethers } from 'ethers'
import { ChainId, cover } from '@neptunemutual/sdk'

const myProvider = () => {
  /**
   * The private key entered below is for demo purpose only.
   * Do not use this private key or store any tokens or cryptocurrency
   * using this private key.
   */
  const fakePrivateKey = '0586782a6b30a2526f960bfde45db0470c51919c0ac2ae9ad5ad39b847955109'
  const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')

  return new ethers.Wallet(fakePrivateKey, provider) // Do not use this wallet
}

const readCoverInfo = async () => {
  try {
    const key = '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000001'
    const provider = myProvider()

    const coverInfo = await cover.getCoverInfo(ChainId.Mumbai, key, provider)
    console.log(coverInfo)
  } catch (error) {
    console.error(error)
  }
}

readCoverInfo()
