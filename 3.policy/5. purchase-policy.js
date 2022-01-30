import { ChainId, policy } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const purcahse = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const args = {
      duration: 2,
      amount: ether(50_000) // <-- Amount to Cover (In DAI)
    }

    // First approve the Policy contract to spend your DAI or BUSD
    let response = await policy.approve(ChainId.Ropsten, {}, provider)
    await response.result.wait()

    response = await policy.purchaseCover(ChainId.Ropsten, key, args, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

purcahse()
