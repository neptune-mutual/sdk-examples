import { ChainId, cover, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'

const create = async (coverInfo) => {
  try {
    const provider = getProvider()

    const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)

    // approve reassurance amount
    let gasPrice = await provider.getGasPrice()
    let response = await cover.approveReassurance(ChainId.Mumbai, dai.address, { amount: coverInfo.reassurance }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    // approve npm stake and fees
    gasPrice = await provider.getGasPrice()
    response = await cover.approveStakeAndFees(ChainId.Mumbai, { amount: coverInfo.stakeWithFees }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    /**
      If you encounter ERC-20 transfer error during cover creation on the next line, you may need to wait for the previous transactions to mine.

      Example:
      let tx = await cover.approveReassurance(ChainId.Mumbai, dai.address, { amount: coverInfo.reassurance }, provider, { gasPrice: gasPrice.mul(2) })
      tx.result.wait()
     */

    // make yourself a whitelisted cover creator - only accessible by "Cover Manager"
    const coverCreator = provider.address
    gasPrice = await provider.getGasPrice()
    response = await cover.whitelistCoverCreator(ChainId.Mumbai, coverCreator, provider, { gasPrice: gasPrice.mul(2) })
    response.result.tx.wait()

    gasPrice = await provider.getGasPrice()
    response = await cover.createCover(ChainId.Mumbai, coverInfo, provider, { gasPrice: gasPrice.mul(2) })
    console.info(response)
    await response.result.tx.wait()
  } catch (error) {
    console.error(error)
    console.info('Click on the file --> `info.js` and change the key and other details')
  }
}

create(info)

/*****************************************************************************
[info] {
  status: 'Success',
  result: {
    storage: {
      hash: 'QmNiFNzEPwfhiQzdCgjKRssMqdLoKRNNgF98YuDLUKHB5k',
      permalink: 'https://ipfs.io/ipfs/QmNiFNzEPwfhiQzdCgjKRssMqdLoKRNNgF98YuDLUKHB5k'
    },
    tx: {
      type: 2,
      chainId: 80001,
      nonce: 883,
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasPrice: null,
      gasLimit: [BigNumber],
      to: '0x7293c2956b68AE276Dc3C40c8eB382B588a57C9f',
      value: [BigNumber],
      data: '0x31f007b9000000000000000000000000000000000000000000000000000000000000002078326432000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000a968163f0a57b40000000000000000000000000000000000000000000000000000000000004a817c80000000000000000000000000000000000000000000000010f0cf064dd592000000000000000000000000000000000000000000000000000000000000000000708000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000070800000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000057800000000000000000000000000000000000000000000000000000000000009c40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002e516d4e69464e7a455077666869517a6443676a4b5273734d71644c6f4b524e4e674639385975444c554b4842356b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085832443220504f440000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009583244322d6e4441490000000000000000000000000000000000000000000000',
      accessList: [],
      hash: '0x0a61a1e1065b525afea182910d86653a99615933b6bbcfb46dbe74604d5d3a19',
      v: 1,
      r: '0xd4ce6368e724aeaddc4734bd2925050d2c3db0fe492c949e219c09bc2d16c044',
      s: '0x4f727cad047a69e22b34f352a269ec26fb8b6460ee98df4c62c7d938f837d35c',
      from: '0x201Bcc0d375f10543e585fbB883B36c715c959B3',
      confirmations: 0,
      wait: [Function (anonymous)]
    }
  }
}
*****************************************************************************/
