import { ChainId, policy, registry, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { weiAsPercent, parseUnits, unitsAsDollars, formatPercent, toFraction } from '../bn.js'

const get = async () => {
  try {
    const { key: coverKey } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()

    const daiAddress = await registry.Stablecoin.getAddress(ChainId.Mumbai, provider)
    const daiToken = await registry.IERC20.getInstance(daiAddress, provider)
    const daiDecimals = await daiToken.decimals()

    const args = {
      duration: 2,
      amount: parseUnits(500, daiDecimals)
    }

    console.info('Getting %s cover for %d months', unitsAsDollars(args.amount, daiDecimals), args.duration)
    console.info('--------------------------------------')

    const response = await policy.getCoverFee(ChainId.Mumbai, coverKey, productKey, args, provider)
    const {
      fee,
      utilizationRatio,
      totalAvailableLiquidity,
      rate
    } = response.result

    console.info('Rate: %s', formatPercent(toFraction(rate.toString())))
    console.info('Fee: %s', unitsAsDollars(fee, daiDecimals))
    console.info('--------------------------------------')
    console.info('Utilization Ratio: %s', weiAsPercent(utilizationRatio))
    console.info('Total Available Liquidity: %s', unitsAsDollars(totalAvailableLiquidity, daiDecimals))
    // console.info('Cover Ratio: %s', weiAsPercent(coverRatio))
  } catch (error) {
    console.error(error)
    console.info('Try adding more liquidity --> `3.\\ add-liquidity.js`')
  }
}

get()

/*****************************************************************************
[info] Getting US$500.00 cover for 1 months
[info] --------------------------------------
[info] Rate: 8.00%
[info] Fee: US$3.07
[info] --------------------------------------
[info] Utilization Ratio: 0.00%
[info] Total Available Liquidity: US$4,076,840.42
*****************************************************************************/
