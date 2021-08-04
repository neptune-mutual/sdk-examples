import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { toDate } from './bn.js'

const getResolutionDate = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const response = await governance.getResolutionDate(ChainId.Mumbai, key, provider)
    console.info('[%s] Resolution Date: %s', coverName, toDate(response.result).toUTCString())
  } catch (error) {
    console.error(error)
  }
}

getResolutionDate()
