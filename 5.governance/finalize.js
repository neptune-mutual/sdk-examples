/**
 * This feature is only accessible to Neptune Mutual Governance Contract
 * or administrator
 */

import { ChainId, governance, resolution, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { toDate } from '../bn.js'

const finalize = async () => {
  try {
    const { key, coverName } = newCover
    const provider = getProvider(true)
    const productKey = utils.keyUtil.toBytes32("")

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result
    console.info('[%s] Incident Date: %s', coverName, toDate(incidentDate).toUTCString())

    const response = await resolution.finalize(ChainId.Mumbai, key, productKey, incidentDate, provider)

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

finalize()
