import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const getReporter = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result

    const response = await governance.getReporter(ChainId.Mumbai, key, productKey, incidentDate, provider)
    console.info('[%s] Reporter: %s', coverName, response.result)
  } catch (error) {
    console.error(error)
  }
}

getReporter()

/*****************************************************************************
[info] [Animated Brands] Reporter: 0x076F91C0A411197e6Fce476F37c6385CCeacd26D
*****************************************************************************/
