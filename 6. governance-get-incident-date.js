import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { toDate } from './bn.js'

const getIncidentDate = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const response = await governance.getIncidentDate(ChainId.Mumbai, key, provider)
    console.info('[%s] Incident Date: %s', coverName, toDate(response.result).toUTCString())
  } catch (error) {
    console.error(error)
  }
}

getIncidentDate()
