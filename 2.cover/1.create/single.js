import { ChainId, cover, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'

/**
 * Only accessible by whitelisted cover creators
 * @param {*} coverInfo Cover Info Object
 */
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
      hash: 'QmWNe7gj8qQUeiUSbUKRWEhaakpGJH4Zdy3QSLoPq1maZ8',
      permalink: 'https://ipfs.io/ipfs/QmWNe7gj8qQUeiUSbUKRWEhaakpGJH4Zdy3QSLoPq1maZ8'
    },
    tx: {
      type: 2,
      chainId: 43113,
      nonce: 293,
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasPrice: null,
      gasLimit: [BigNumber],
      to: '0x7293c2956b68AE276Dc3C40c8eB382B588a57C9f',
      value: [BigNumber],
      data: '0x31f007b9000000000000000000000000000000000000000000000000000000000000002078326432000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a968163f0a57b40000000000000000000000000000000000000000000000000000000000004a817c80000000000000000000000000000000000000000000000010f0cf064dd592000000000000000000000000000000000000000000000000000000000000000000708000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000070800000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000057800000000000000000000000000000000000000000000000000000000000009c40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002e516d574e6537676a387151556569555362554b5257456861616b70474a48345a64793351534c6f5071316d615a3800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085832443220504f440000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009583244322d6e4441490000000000000000000000000000000000000000000000',
      accessList: [],
      hash: '0x6aa2ca5b273b42eee339d3986e1debe0e40424594726049ccc270f07d8e2533e',
      v: 0,
      r: '0x8ddb3fdda1ec1e96bbf0d5d10fcc74c9e92fcbf6417de856bb8be62ee2ecda9e',
      s: '0x08468565984a4347a769bd177b7d96d08b446b64f0e22c88706f1065e321a5bb',
      from: '0x201Bcc0d375f10543e585fbB883B36c715c959B3',
      confirmations: 0,
      wait: [Function (anonymous)]
    }
  }
}
*****************************************************************************/
