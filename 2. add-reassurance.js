import { ChainId, reassurance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsToken } from './bn.js'

const increase = async () => {
  try {
    const { key, coverName, reassuranceToken } = info
    const { symbol } = reassuranceToken

    const provider = getProvider()
    const amount = ether(100_000)

    let response = await reassurance.get(ChainId.Ropsten, key)
    console.info('[%s Reassurance] Before: %s', coverName, weiAsToken(response.result, symbol))

    response = await reassurance.approve(ChainId.Ropsten, key, { amount }, provider)
    // Wait for the transaction to get included in a block
    await response.result.wait()

    response = await reassurance.add(ChainId.Ropsten, key, amount, provider)

    // Wait for the transaction to get included in a block
    await response.result.wait()

    response = await reassurance.get(ChainId.Ropsten, key)

    console.info('[%s Reassurance] After: %s', coverName, weiAsToken(response.result, symbol))
  } catch (error) {
    console.error(error)
  }
}

increase()
