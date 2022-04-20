import { ChainId, liquidity } from '../../../sdk/dist/index.js'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { weiAsDollars } from '../../bn.js'

const get = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
    console.info('[%s Liquidity] %s', coverName, weiAsDollars(response.result))
  } catch (error) {
    console.error(error)
  }
}

get()
