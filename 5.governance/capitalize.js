/**
 * This feature is only accessible to Neptune Mutual Liquidity Manager
 */

import { ChainId, governance, registry, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { toDate } from '../bn.js'

const acl = utils.keyUtil.ACCESS_CONTROL

const capitalizePool = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const ownerProvider = getProvider(true)
    const provider = getProvider()

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result
    console.info('[%s] Incident Date: %s', coverName, toDate(incidentDate).toUTCString())

    // Grant required role
    const protocol = await registry.Protocol.getInstance(ChainId.Mumbai, ownerProvider)
    let gasPrice = await ownerProvider.getGasPrice()
    const tx = await protocol.grantRole(acl.LIQUIDITY_MANAGER, provider.address, { gasPrice: gasPrice.mul(2) })
    await tx.wait()

    const reassurance = await registry.Reassurance.getInstance(ChainId.Mumbai, provider)
    gasPrice = await provider.getGasPrice()
    const response = await reassurance.capitalizePool(key, productKey, incidentDate, { gasPrice: gasPrice.mul(2) })
    await response.wait()
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

capitalizePool()

/*****************************************************************************
[info] [Animated Brands] Incident Date: Sun, 03 Jul 2022 14:58:14 GMT
*****************************************************************************/
