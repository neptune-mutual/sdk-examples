import { ChainId, resolution, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { toDate } from '../bn.js'

const getResolutionDate = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const response = await resolution.getResolutionDate(ChainId.Mumbai, key, productKey, provider)
    console.info('[%s] Resolution Date: %s', coverName, toDate(response.result).toUTCString())
  } catch (error) {
    console.error(error)
  }
}

getResolutionDate()
