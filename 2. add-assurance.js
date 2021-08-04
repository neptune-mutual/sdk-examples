import { ChainId, assurance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsToken } from './bn.js'

const increase = async () => {
  try {
    const { key, coverName, assuranceToken } = info
    const { symbol } = assuranceToken

    const provider = getProvider()
    const amount = ether(100_000)

    let response = await assurance.get(ChainId.Mumbai, key)
    console.info('[%s Assurance] Before: %s', coverName, weiAsToken(response.result, symbol))

    await assurance.approve(ChainId.Mumbai, key, { amount }, provider)
    response = await assurance.add(ChainId.Mumbai, key, amount, provider)

    console.info(response)

    // Wait for the transaction to get included in a block
    await response.result.wait()

    response = await assurance.get(ChainId.Mumbai, key)

    console.info('[%s Assurance] After: %s', coverName, weiAsToken(response.result, symbol))
  } catch (error) {
    console.error(error)
  }
}

increase()
