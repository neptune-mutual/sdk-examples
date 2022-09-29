import { ChainId, policy, registry, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { parseUnits } from '../bn.js'

const purcahse = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
    const decimals = await dai.decimals()

    const args = {
      duration: 2,
      amount: parseUnits(50, decimals), // <-- Amount to Cover (In DAI)
      referralCode: utils.keyUtil.toBytes32(''),
      onBehalfOf: provider.address
    }

    // First approve the Policy contract to spend your DAI or BUSD
    let response = await policy.approve(ChainId.Mumbai, { amount: args.amount }, provider)
    await response.result.wait()

    response = await policy.purchaseCover(ChainId.Mumbai, key, utils.keyUtil.toBytes32(''), args, provider)
    await response.result.wait()
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

purcahse()

/*****************************************************************************
[info] {
  status: 'Success',
  result: {
    type: 2,
    chainId: 80001,
    nonce: 16,
    maxPriorityFeePerGas: BigNumber { _hex: '0x0fa4b452d0', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x0fa4b452d0', _isBigNumber: true },
    gasPrice: null,
    gasLimit: BigNumber { _hex: '0x09c943', _isBigNumber: true },
    to: '0x23099F06e9ABbeE01597F422CDBb9c232D581626',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0x82bdf3bd0000000000000000000000002dac3776b9f4243df6445515ebe6f6cd003b3681616e696d617465642d6272616e6473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000bebc2000000000000000000000000000000000000000000000000000000000000000000',
    accessList: [],
    hash: '0x0402cec1b8fce955bca22c83e1fea5d2c74d711f1ea7fb111c35cce9082e2692',
    v: 0,
    r: '0x81f18c2a43f4f509d4ef3aeebc3f28143910292b53ecced7625256a86b746b87',
    s: '0x04d826825bf61048523b22289c1795eb92353414ed9c8a35acd820740d172b17',
    from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
    confirmations: 0,
    wait: [Function (anonymous)]
  }
}
*****************************************************************************/
