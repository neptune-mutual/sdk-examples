/**
 * This feature is only accessible to Neptune Mutual Governance Contract
 * or administrator
 */

import { ChainId, provision } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsNep } from './bn.js'

const increase = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider(true)
    const amount = ether(25_000)

    let response = await provision.get(ChainId.Mumbai, key, provider)
    console.info('[%s Provision] Before: %s', coverName, weiAsNep(response.result))

    await provision.approve(ChainId.Mumbai, { amount }, provider)
    response = await provision.increase(ChainId.Mumbai, key, amount, provider)

    console.info(response)

    await response.result.wait()

    response = await provision.get(ChainId.Mumbai, key, provider)
    console.info('[%s Provision] After: %s', coverName, weiAsNep(response.result))
  } catch (error) {
    console.error(error)
  }
}

increase()
