/**
 * This feature is only accessible to Neptune Mutual Governance Contract
 * or administrator
 */

import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { toDate } from '../bn.js'

const finalize = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider(true)

    const incidentDate = (await governance.getIncidentDate(ChainId.Ropsten, key, provider)).result
    console.info('[%s] Incident Date: %s', coverName, toDate(incidentDate).toUTCString)

    const response = await governance.finalize(ChainId.Ropsten, key, incidentDate, provider)

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

finalize()
