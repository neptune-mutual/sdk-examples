/**
 * This feature is only accessible to Neptune Mutual Governance Contract
 * or administrator
 */

import { ChainId, provision } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { ether, weiAsNpm } from '../../bn.js'

const increase = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider(true)
    const amount = ether(25_000)

    let response = await provision.get(ChainId.Ropsten, key, provider)
    console.info('[%s Provision] Before: %s', coverName, weiAsNpm(response.result))

    response = await provision.approve(ChainId.Ropsten, { amount }, provider)
    await response.result.wait()

    // Only liquidity manager can increase provision
    // response = await provision.increase(ChainId.Ropsten, key, amount, provider)
    // await response.result.wait()

    response = await provision.get(ChainId.Ropsten, key, provider)
    console.info('[%s Provision] After: %s', coverName, weiAsNpm(response.result))
  } catch (error) {
    console.error(error)
  }
}

increase()
