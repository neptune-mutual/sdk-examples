import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether } from './bn.js'

const dispute = async () => {
  try {
    const { key } = info
    const provider = getProvider(true)

    const stake = ether(250)

    await governance.approveStake(ChainId.Mumbai, {}, provider)
    const response = await governance.dispute(ChainId.Mumbai, key, stake, provider)

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

dispute()
