import { ChainId, policy } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { weiAsPercent, weiAsDollars, ether } from '../bn.js'

const get = async () => {
  try {
    const { key } = info
    const provider = getProvider()
    const args = {
      duration: 2,
      amount: ether(100_000)
    }

    console.info('Getting %s cover for %d months', weiAsDollars(args.amount), args.duration)
    console.info('--------------------------------------')

    const response = await policy.getCoverFee(ChainId.Ropsten, key, args, provider)
    const {
      fee,
      utilizationRatio,
      totalAvailableLiquidity,
      coverRatio,
      rate
    } = response.result

    console.info('Rate: %s', weiAsPercent(rate))
    console.info('Fee: %s', weiAsDollars(fee, 'xYZ'))
    console.info('--------------------------------------')
    console.info('Utilization Ratio: %s', weiAsPercent(utilizationRatio))
    console.info('Total Available Liquidity: %s', weiAsDollars(totalAvailableLiquidity))
    console.info('Cover Ratio: %s', weiAsPercent(coverRatio))
  } catch (error) {
    console.error(error)
    console.info('Try adding more liquidity --> `3.\\ add-liquidity.js`')
  }
}

get()
