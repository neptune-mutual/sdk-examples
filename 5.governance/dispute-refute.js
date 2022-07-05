import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether, weiAsNpm } from '../bn.js'

const refute = async () => {
  try {
    const { key, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const stake = ether(100)
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result

    let response = await governance.getStakes(ChainId.Mumbai, key, productKey, incidentDate, provider)
    console.info('[%s Reporting Stake: No] Before: %s', coverName, weiAsNpm(response.result.no))

    let gasPrice = await provider.getGasPrice()
    response = await governance.approveStake(ChainId.Mumbai, { amount: stake }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    gasPrice = await provider.getGasPrice()
    response = await governance.refute(ChainId.Mumbai, key, productKey, stake, provider, { gasPrice: gasPrice.mul(2) })
    console.info(response)

    await response.result.wait()

    response = await governance.getStakes(ChainId.Mumbai, key, productKey, incidentDate, provider)
    console.info('[%s Reporting Stake: No] After: %s', coverName, weiAsNpm(response.result.no))
  } catch (error) {
    console.error(error)
  }
}

refute()

/*****************************************************************************
[info] [Animated Brands Reporting Stake: No] Before: 3,400.00 NPM
[info] {
  status: 'Success',
  result: {
    type: 2,
    chainId: 80001,
    nonce: 31,
    maxPriorityFeePerGas: BigNumber { _hex: '0x1bf08eb000', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x1bf08eb000', _isBigNumber: true },
    gasPrice: null,
    gasLimit: BigNumber { _hex: '0x0422dc', _isBigNumber: true },
    to: '0x073580951bBBB22682e6129Fc3D43D963084bCCf',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0x2c11e1d4616e696d617465642d6272616e6473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062c1ae860000000000000000000000000000000000000000000000056bc75e2d63100000',
    accessList: [],
    hash: '0x724121dd03690380c18fd0eaf1e7570538b86f1871d6cae2ca0aace50186fb58',
    v: 0,
    r: '0xe465976ddc833dc6a7c1210d3a02a8eb1e102477c132fac548702b75ea1ab247',
    s: '0x1f4d56397c8e9065fb7cf37b494a70abb3257a33982dbbad3f4482deab8042c3',
    from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
    confirmations: 0,
    wait: [Function (anonymous)]
  }
}
[info] [Animated Brands Reporting Stake: No] After: 3,500.00 NPM
*****************************************************************************/
