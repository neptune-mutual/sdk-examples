import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { weiAsNep } from './bn.js'

const getStakesOf = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const account = provider.address
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, provider)).result
    const response = await governance.getStakesOf(ChainId.Mumbai, key, incidentDate, account, provider)
    const { yes, no } = response.result

    console.info('[%s Stakes Of %s] Yes: %s. No: %s', coverName, account, weiAsNep(yes), weiAsNep(no))
  } catch (error) {
    console.error(error)
  }
}

getStakesOf()
