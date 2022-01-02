import { ChainId, liquidity } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsDollars } from './bn.js'

const add = async () => {
  try {
    const { key, coverName } = info

    const provider = getProvider()
    const amount = ether(500_000)

    let response = await liquidity.getBalance(ChainId.Ropsten, key, provider)
    console.info('[%s Liquidity] Before: %s', coverName, weiAsDollars(response.result))

    response = await liquidity.approve(ChainId.Ropsten, key, { amount }, provider)
    await response.result.wait()

    response = await liquidity.add(ChainId.Ropsten, key, amount, provider)
    console.info(response)

    await response.result.wait()

    response = await liquidity.getBalance(ChainId.Ropsten, key, provider)
    console.info('[%s Liquidity] After: %s', coverName, weiAsDollars(response.result))
  } catch (error) {
    console.error(error)
  }
}

add()
