/**
 * This feature is only accessible to Neptune Mutual Governance Contract
 * or administrator
 */

import { ChainId, provision } from '@neptunemutual/sdk'
import { info } from './info.js'
import { weiAsNpm } from './bn.js'

const decrease = async () => {
  try {
    const { key, coverName } = info
    // const provider = getProvider(true)
    // const amount = ether(100)

    let response = await provision.get(ChainId.Ropsten, key)
    console.info('[%s Provision] Before: %s', coverName, weiAsNpm(response.result))

    // Only liquidity manager can decrease provision
    // response = await provision.decrease(ChainId.Ropsten, key, amount, provider)
    // console.info(response)

    response = await provision.get(ChainId.Ropsten, key)
    console.info('[%s Provision] After: %s', coverName, weiAsNpm(response.result))
  } catch (error) {
    console.error(error)
  }
}

decrease()
