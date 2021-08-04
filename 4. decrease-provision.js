/**
 * This feature is only accessible to Neptune Mutual Governance Contract
 * or administrator
 */

import { ChainId, provision } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsNep } from './bn.js'

const decrease = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider(true)
    const amount = ether(100)

    let response = await provision.get(ChainId.Mumbai, key)
    console.info('[%s Provision] Before: %s', coverName, weiAsNep(response.result))

    response = await provision.decrease(ChainId.Mumbai, key, amount, provider)
    console.info(response)

    // Wait for the transaction to get included in a block
    await response.result.wait()

    response = await provision.get(ChainId.Mumbai, key)
    console.info('[%s Provision] After: %s', coverName, weiAsNep(response.result))
  } catch (error) {
    console.error(error)
  }
}

decrease()
