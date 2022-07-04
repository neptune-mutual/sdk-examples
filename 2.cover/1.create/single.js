import { ChainId, cover, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'

const create = async (coverInfo) => {
  try {
    const provider = getProvider()

    const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)

    let gasPrice = await provider.getGasPrice()
    let response = await cover.approveReassurance(ChainId.Mumbai, dai.address, { amount: coverInfo.reassurance }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    gasPrice = await provider.getGasPrice()
    response = await cover.approveStakeAndFees(ChainId.Mumbai, { amount: coverInfo.stakeWithFees }, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    /**
      If you encounter ERC-20 transfer error during cover on the next line, you may need to wait for the previous transactions to mine.

      Example:
      let tx = await cover.approveReassurance(ChainId.Mumbai, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
      tx.result.wait()
     */

    // make yourself a whitelisted cover creator
    const coverCreator = provider.address
    gasPrice = await provider.getGasPrice()
    response = await cover.whitelistCoverCreator(ChainId.Mumbai, coverCreator, provider, { gasPrice: gasPrice.mul(2) })
    response.result.wait()

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
      hashBytes32: '0x67f76439ce971a3c30099fcbdc314129223c98609e44c5ca9f7428fc7f21c852',
      hash: 'QmVLVVmBmak7nq98m6mKgKwk4S6AR3fhPu7QShJffxZDGD',
      permalink: 'https://ipfs.infura.io/ipfs/QmVLVVmBmak7nq98m6mKgKwk4S6AR3fhPu7QShJffxZDGD'
    },
    tx: {
      type: 2,
      chainId: 80001,
      nonce: 38,
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasPrice: null,
      gasLimit: [BigNumber],
      to: '0xF5C7A5300CC241f5EbE177ed9eCE22bB13C77d23',
      value: [BigNumber],
      data: '0xb2992c80616e696d617465642d6272616e64732d3200000000000000000000000000000067f76439ce971a3c30099fcbdc314129223c98609e44c5ca9f7428fc7f21c85200000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000013416e696d61746564204272616e647320504f4400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000741422d6e44414900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000a968163f0a57b40000000000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000b8507a8207282000000000000000000000000000000000000000000000000000000000000000000708000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000070800000000000000000000000000000000000000000000000000000000000002bc000000000000000000000000000000000000000000000000000000000000096000000000000000000000000000000000000000000000000000000000000009c40000000000000000000000000000000000000000000000000000000000000001',
      accessList: [],
      hash: '0x624c58225452872d247a4a5c836875cc747dac6b96852d7f9745708114c8359a',
      v: 0,
      r: '0x283fdf56d9184208883da2c73b3d655240cfa799fc10f2a4c991f8af2eabefb0',
      s: '0x669c8e5a26e1c9b53bcd8e57e4a8ba33a6d9a9a94cfcac4dadd471d41988ccce',
      from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
      confirmations: 0,
      wait: [Function (anonymous)]
    }
  }
}
*****************************************************************************/
