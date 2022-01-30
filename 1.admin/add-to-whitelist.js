import { ChainId, cover } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'

const create = async () => {
  try {
    const provider = getProvider(true)
    const response = await cover.addToWhitelist(ChainId.Ropsten, provider.address, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

create()
