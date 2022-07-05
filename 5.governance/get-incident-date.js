import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { toDate } from '../bn.js'

const getIncidentDate = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const response = await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)
    console.info('[%s] Incident Date: %s', coverName, toDate(response.result).toUTCString())
  } catch (error) {
    console.error(error)
  }
}

getIncidentDate()

/*****************************************************************************
[info] [Animated Brands] Incident Date: Tue, 20 Jul 2021 12:32:34 GMT
*****************************************************************************/
