import { ChainId, reassurance, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { unitsAsToken } from '../../bn.js'
import { getProvider } from '../../provider.js'

const get = async () => {
  try {
    const { key, coverName } = info

    const provider = getProvider()

    const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
    const symbol = await dai.symbol()
    const decimals = await dai.decimals()

    const response = await reassurance.get(ChainId.Mumbai, key, provider)
    console.info('[%s Reassurance] %s', coverName, unitsAsToken(response.result, decimals, symbol))
  } catch (error) {
    console.error(error)
  }
}

get()

/*****************************************************************************
[info] [X2D2 Exchange Cover Reassurance] 20,000.00 DAI
*****************************************************************************/
