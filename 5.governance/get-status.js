import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const getStatus = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const response = await governance.getStatus(ChainId.Mumbai, key, productKey, provider)
    console.info('[%s] Status: %s', coverName, JSON.stringify(response.result))
  } catch (error) {
    console.error(error)
  }
}

getStatus()

/*****************************************************************************
[info] [Animated Brands] Status: {"key":"Normal","value":0}
*****************************************************************************/
