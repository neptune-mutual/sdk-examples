import { ChainId, reassurance, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { ether, weiAsToken } from '../../bn.js'

const increase = async () => {
  try {
    const { key, coverName } = info

    const provider = getProvider()

    // getting token address from registry Stablecoin
    const tokenAddress = await (await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)).address
    // getting token from IERC20 instance
    const token = await registry.IERC20.getInstance(tokenAddress, provider);
    // getting symbol from the token
    const symbol = await token.callStatic.symbol();

    const amount = ether(100)

    let response = await reassurance.get(ChainId.Mumbai, key, provider)
    console.info('[%s Reassurance] Before: %s', coverName, weiAsToken(response.result, symbol))

    response = await reassurance.approve(ChainId.Mumbai, key, { amount }, provider)
    // Wait for the transaction to get included in a block
    await response.result.wait()

    response = await reassurance.add(ChainId.Mumbai, key, amount, provider)

    // Wait for the transaction to get included in a block
    await response.result.wait()

    response = await reassurance.get(ChainId.Mumbai, key, provider)

    console.info('[%s Reassurance] After: %s', coverName, weiAsToken(response.result, symbol))
  } catch (error) {
    console.error(error)
  }
}

increase()
