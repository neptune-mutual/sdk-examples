/**
 * This feature is only accessible to Neptune Mutual Governance Agent
 */

import { ChainId, governance, registry, resolution, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { toDate } from '../bn.js'

const acl = utils.keyUtil.ACCESS_CONTROL

const resolve = async () => {
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
    const tx = await protocol.grantRole(acl.GOVERNANCE_AGENT, provider.address, { gasPrice: gasPrice.mul(2) })
    await tx.wait()

    gasPrice = await provider.getGasPrice()
    const response = await resolution.resolve(ChainId.Mumbai, key, productKey, incidentDate, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

resolve()

/*****************************************************************************
[info] [Animated Brands] Incident Date: Sun, 03 Jul 2022 14:58:14 GMT
[info] {
  status: 'Success',
  result: {
    type: 2,
    chainId: 80001,
    nonce: 32,
    maxPriorityFeePerGas: BigNumber { _hex: '0x106d59c8a2', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x106d59c8a2', _isBigNumber: true },
    gasPrice: null,
    gasLimit: BigNumber { _hex: '0x0544cb', _isBigNumber: true },
    to: '0x9365B29C7dbD6980c7D4db6100711BccDCd150fC',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0xc582ff93616e696d617465642d6272616e6473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062c1ae86',
    accessList: [],
    hash: '0x33868ddfbdf6a37fdf001900badaa935b561df540e9bfb5002b27fcf42412bac',
    v: 1,
    r: '0x254e2afdec590a2ea441c27499c7b05bdcaa761c5a32ecf395210df117efb15d',
    s: '0x569a0029d55bb470dc1711e8efa04ea2a91c0da0a22a64f26988d70d1e05170f',
    from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
    confirmations: 0,
    wait: [Function (anonymous)]
  }
}
*****************************************************************************/
