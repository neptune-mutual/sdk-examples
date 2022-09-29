import { ChainId, cover } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'

/**
 * Adds a user to Cover Creator Whitelist
 * Only accessible by "Cover Manager"
 */
const create = async () => {
  try {
    const provider = getProvider(true)

    const gasPrice = await provider.getGasPrice()
    const response = await cover.whitelistCoverCreator(ChainId.Mumbai, provider.address, provider, { gasPrice: gasPrice.mul(2) })
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

create()

/*****************************************************************************
{
  status: 'Success',
  result: {
    tx: {
      type: 2,
      chainId: 43113,
      nonce: 25,
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasPrice: null,
      gasLimit: [BigNumber],
      to: '0x7293c2956b68AE276Dc3C40c8eB382B588a57C9f',
      value: [BigNumber],
      data: '0x1fcedd8a000000000000000000000000201bcc0d375f10543e585fbb883b36c715c959b30000000000000000000000000000000000000000000000000000000000000001',
      accessList: [],
      hash: '0xf1f38bf881417322e533dce1693ecd3dc3b2ea2f38621b93729b098ecee6ffd6',
      v: 1,
      r: '0x497da359587fedeb0d9be96c48f7da820024e47bb148ef07b5f22f662c08db0f',
      s: '0x3303c40a6197eb22c93495a78a87e508d4bafaa1d05bfc8645c37be21341bb4e',
      from: '0xA96813969437F3bad7B59335934aa75933670615',
      confirmations: 0,
      wait: [Function (anonymous)]
    }
  }
}
*****************************************************************************/
