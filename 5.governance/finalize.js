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
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result
    console.info('[%s] Incident Date: %s', coverName, toDate(incidentDate).toUTCString())

    const gasPrice = await provider.getGasPrice()
    const response = await resolution.finalize(ChainId.Mumbai, key, productKey, incidentDate, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

finalize()

/*****************************************************************************
[info] [Animated Brands] Incident Date: Sun, 03 Jul 2022 14:58:14 GMT
[info] {
  status: 'Success',
  result: {
    type: 2,
    chainId: 80001,
    nonce: 34,
    maxPriorityFeePerGas: BigNumber { _hex: '0x07c1bee61e', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x07c1bee61e', _isBigNumber: true },
    gasPrice: null,
    gasLimit: BigNumber { _hex: '0x04becb', _isBigNumber: true },
    to: '0x9365B29C7dbD6980c7D4db6100711BccDCd150fC',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0x64eb8209616e696d617465642d6272616e6473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062c1ae86',
    accessList: [],
    hash: '0x5317548664b40a44b6a3d38e32efbc7ae49006b248f539b26cf56814a42b0c50',
    v: 1,
    r: '0x147f31b938027ae0e6917eda2d79ff355c66be6a9980583178227ab44e1ed9eb',
    s: '0x18b66e4f5ea3a5af819e34bb231d902cb43a851cc282e91a6163064600183830',
    from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
    confirmations: 0,
    wait: [Function (anonymous)]
  }
}
*****************************************************************************/
