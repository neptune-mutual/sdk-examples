import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { weiAsNpm } from '../bn.js'

const getStakesOf = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const account = provider.address
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result
    const response = await governance.getStakesOf(ChainId.Mumbai, key, productKey, incidentDate, account, provider)
    const { yes, no } = response.result

    console.info('[%s Stakes Of %s] Yes: %s. No: %s', coverName, account, weiAsNpm(yes), weiAsNpm(no))
  } catch (error) {
    console.error(error)
  }
}

getStakesOf()
