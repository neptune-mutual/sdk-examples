import { ChainId, reassurance, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { parseUnits, unitsAsToken } from '../../bn.js'

const increase = async () => {
  try {
    const { key, coverName } = info

    const provider = getProvider()

    const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
    const symbol = await dai.symbol()
    const decimals = await dai.decimals()

    let response = await reassurance.get(ChainId.Mumbai, key, provider)
    console.info('[%s Reassurance] Before: %s', coverName, unitsAsToken(response.result, decimals, symbol))

    const amount = parseUnits(100, decimals)
    response = await reassurance.approve(ChainId.Mumbai, { amount }, provider)
    await response.result.wait() // Wait for the transaction to get included in a block

    response = await reassurance.add(ChainId.Mumbai, key, amount, provider)
    await response.result.wait() // Wait for the transaction to get included in a block

    response = await reassurance.get(ChainId.Mumbai, key, provider)
    console.info('[%s Reassurance] After: %s', coverName, unitsAsToken(response.result, decimals, symbol))
  } catch (error) {
    console.error(error)
  }
}

increase()
