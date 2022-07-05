import { ChainId, reassurance, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { unitsAsToken } from '../../bn.js'
import { getProvider } from '../../provider.js'

const get = async () => {
  try {
    const { key, coverName } = info

    const provider = getProvider()

    // getting token address from registry Stablecoin
    const tokenAddress = await (await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)).address
    // getting token from IERC20 instance
    const token = await registry.IERC20.getInstance(tokenAddress, provider)
    // getting symbol from the token
    const symbol = await token.symbol()
    // getting token decimals
    const decimals = await token.decimals()

    const response = await reassurance.get(ChainId.Mumbai, key, provider)
    console.info('[%s Reassurance] %s', coverName, unitsAsToken(response.result, decimals, symbol))
  } catch (error) {
    console.error(error)
  }
}

get()
