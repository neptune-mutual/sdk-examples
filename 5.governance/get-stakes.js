import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { weiAsNpm } from '../bn.js'

const getStakes = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result
    const response = await governance.getStakes(ChainId.Mumbai, key, productKey, incidentDate, provider)
    const { yes, no } = response.result

    console.info('[%s Stakes] Yes: %s. No: %s', coverName, weiAsNpm(yes), weiAsNpm(no))
  } catch (error) {
    console.error(error)
  }
}

getStakes()
