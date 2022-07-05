import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether, weiAsNpm } from '../bn.js'

const attest = async () => {
  try {
    const { key: coverKey, coverName } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const stake = ether(100)
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, coverKey, productKey, provider)).result

    let response = await governance.getStakes(ChainId.Mumbai, coverKey, productKey, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] Before: %s', coverName, weiAsNpm(response.result.yes))

    let gasPrice = await provider.getGasPrice()
    response = await governance.approveStake(ChainId.Mumbai, { amount: stake }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    gasPrice = await provider.getGasPrice()
    response = await governance.attest(ChainId.Mumbai, coverKey, productKey, stake, provider, { gasPrice: gasPrice.mul(2) })
    console.info(response)

    await response.result.wait()

    response = await governance.getStakes(ChainId.Mumbai, coverKey, productKey, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] After: %s', coverName, weiAsNpm(response.result.yes))
  } catch (error) {
    console.error(error)
  }
}

attest()

/*****************************************************************************
[info] [Animated Brands Reporting Stake: Yes] Before: 3,400.00 NPM
[info] {
  status: 'Success',
  result: {
    type: 2,
    chainId: 80001,
    nonce: 26,
    maxPriorityFeePerGas: BigNumber { _hex: '0x0f8a45d534', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x0f8a45d534', _isBigNumber: true },
    gasPrice: null,
    gasLimit: BigNumber { _hex: '0x02ecbe', _isBigNumber: true },
    to: '0x073580951bBBB22682e6129Fc3D43D963084bCCf',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0xd42de68a616e696d617465642d6272616e6473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062c1ae860000000000000000000000000000000000000000000000056bc75e2d63100000',
    accessList: [],
    hash: '0xf736fbdb4ae900d41981ea74267ffa34485f583badeb651bab91463936037313',
    v: 0,
    r: '0xee2a279d31b613f4b42f82117ac866c1c29df1a24fe25e516b169770c7b19155',
    s: '0x0bc5cbf0ff6b07dfa6996aece288bfb2b2ad753630adb67f5a3e1da790f5b2f3',
    from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
    confirmations: 0,
    wait: [Function (anonymous)]
  }
}
[info] [Animated Brands Reporting Stake: Yes] After: 3,500.00 NPM
*****************************************************************************/
