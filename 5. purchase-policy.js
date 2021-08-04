import { ChainId, policy } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether } from './bn.js'

const purcahse = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const args = {
      duration: 2,
      amount: ether(50_000) // <-- Amount to Cover (In DAI)
    }

    // First approve the Policy contract to spend your DAI or BUSD
    await policy.approve(ChainId.Mumbai, {}, provider)

    const response = await policy.purchaseCover(ChainId.Mumbai, key, args, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

purcahse()
