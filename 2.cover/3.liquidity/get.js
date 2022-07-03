import { ChainId, liquidity, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { unitsAsDollars } from '../../bn.js'

const get = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()
    const daiAddress = await registry.Stablecoin.getAddress(ChainId.Mumbai, provider)
    const dai = await registry.IERC20.getInstance(daiAddress, provider)

    const response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
    console.info('[%s Liquidity] %s', coverName, unitsAsDollars(response.result, await dai.decimals()))
  } catch (error) {
    console.error(error)
  }
}

get()
