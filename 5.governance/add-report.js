import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const payload = {
  title: 'Test Exploit',
  observed: new Date(),
  proofOfIncident: 'https://etherscan.io/tokenholdings?a=0xA9AD3537C819ae0530623aFb458Fee8456C47d33',
  description: 'DeFi protocol Learn Finance has reported that its vault was exploited by a hacker to the tune of $11 million on Dec 25.',
  stake: info.minReportingStake
}

const report = async () => {
  try {
    const { key: coverKey } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    let gasPrice = await provider.getGasPrice()
    let response = await governance.approveStake(ChainId.Mumbai, { amount: payload.stake }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    gasPrice = await provider.getGasPrice()
    response = await governance.report(ChainId.Mumbai, coverKey, productKey, payload, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.tx.wait()
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

report()

/*****************************************************************************
[info] {
  status: 'Success',
  result: {
    storage: {
      hash: 'QmNTpNuTjzQivpCGrAi1HixmbP2smwQ7KjH2uVFkD8s8Hh',
      permalink: 'https://ipfs.io/ipfs/QmNTpNuTjzQivpCGrAi1HixmbP2smwQ7KjH2uVFkD8s8Hh'
    },
    tx: {
      type: 2,
      chainId: 80001,
      nonce: 24,
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasPrice: null,
      gasLimit: [BigNumber],
      to: '0x073580951bBBB22682e6129Fc3D43D963084bCCf',
      value: [BigNumber],
      data: '0x73bbb1a5616e696d617465642d6272616e64730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001d5ff954cff5d1c5e3de56676599eee60f75a539c6bba1ef3b6a20dac6da2440000000000000000000000000000000000000000000000b8507a820728200000',
      accessList: [],
      hash: '0x57855253aa90f0ec2a159eed3f9375698f83c9f358c351616f088eaef396e1b6',
      v: 1,
      r: '0xc708122ab0b17553fbaecaa53b547447cd728ef080e956d1f7ad089489586ddd',
      s: '0x1d7f82fb4e5e4f856a4e33102d901b522fcd80a7a93ab3e1c1a5ca198d37a63d',
      from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
      confirmations: 0,
      wait: [Function (anonymous)]
    }
  }
}
*****************************************************************************/
