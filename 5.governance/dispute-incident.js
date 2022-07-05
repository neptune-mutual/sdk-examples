import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const payload = {
  title: 'The exploit was wrongly reported',
  proofOfDispute: 'https://etherscan.io/tokenholdings?a=0xA9AD3537C819ae0530623aFb458Fee8456C47d33',
  description: 'DeFi protocol Learn Finance had confirmed that its vault is safe and no funds are lost on Dec 29.',
  stake: info.minReportingStake
}

const dispute = async () => {
  try {
    const { key: coverKey } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    let gasPrice = await provider.getGasPrice()
    let response = await governance.approveStake(ChainId.Mumbai, { amount: payload.stake }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    gasPrice = await provider.getGasPrice()
    response = await governance.dispute(ChainId.Mumbai, coverKey, productKey, payload, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.tx.wait()

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

dispute()

/*****************************************************************************
[info] {
  status: 'Success',
  result: {
    storage: {
      hashBytes32: '0x91c3f49289cbe3dae1dc1514fc5b638498feef8220d5316d0ec54ccf4d49ca01',
      hash: 'QmY9f8UKbXa1UP9rXdPDkYddE3gwk1ukgsRuxwC1kugum2',
      permalink: 'https://ipfs.infura.io/ipfs/QmY9f8UKbXa1UP9rXdPDkYddE3gwk1ukgsRuxwC1kugum2'
    },
    tx: {
      type: 2,
      chainId: 80001,
      nonce: 28,
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasPrice: null,
      gasLimit: [BigNumber],
      to: '0x073580951bBBB22682e6129Fc3D43D963084bCCf',
      value: [BigNumber],
      data: '0xc3faf9ef616e696d617465642d6272616e6473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062c1ae8691c3f49289cbe3dae1dc1514fc5b638498feef8220d5316d0ec54ccf4d49ca010000000000000000000000000000000000000000000000b8507a820728200000',
      accessList: [],
      hash: '0x416b93be28512d2d0df9f2ad5816625d02b1728708c709c06976293a393eac5f',
      v: 1,
      r: '0x8079b3cb08a3d2eac1ccd7bc06ae82d0933632f1b8dfa45ba695d11256d2c508',
      s: '0x2dc51f93bdbd17bb1d394a9dedf25b2820a58ec4b4b27d54bb9f267de8da9fb6',
      from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
      confirmations: 0,
      wait: [Function (anonymous)]
    }
  }
}
*****************************************************************************/
