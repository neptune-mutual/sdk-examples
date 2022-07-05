import { ChainId, cover } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'

const create = async () => {
  try {
    const provider = getProvider(true)

    const gasPrice = await provider.getGasPrice()
    const response = await cover.whitelistCoverCreator(ChainId.Mumbai, provider.address, provider, { gasPrice: gasPrice.mul(2) })
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

create()
