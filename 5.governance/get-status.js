import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const getStatus = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const response = await governance.getStatus(ChainId.Mumbai, key, provider)
    console.info('[%s] Status: %s', coverName, JSON.stringify(response.result))
  } catch (error) {
    console.error(error)
  }
}

getStatus()
