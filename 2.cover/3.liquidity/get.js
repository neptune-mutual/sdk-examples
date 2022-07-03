import { ChainId, liquidity } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { weiAsDollars } from '../../bn.js'
import { getDecimals } from '../../utils/helper.js'

const get = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()
    const { daiDecimals } = await getDecimals()

    const response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
    console.info('[%s Liquidity] %s', coverName, weiAsDollars(response.result, daiDecimals))
  } catch (error) {
    console.error(error)
  }
}

get()
