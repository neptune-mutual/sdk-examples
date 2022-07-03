import { ChainId, policy, utils } from "../../sdk/dist/index.js";
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { weiAsPercent, weiAsDollars, ether } from '../bn.js'
import { getDecimals } from "../utils/helper.js";

const get = async () => {
  try {
    const { key } = info
    const provider = getProvider()
    const productKey = utils.keyUtil.toBytes32("");
    const { daiDecimals } = await getDecimals();
    const args = {
      duration: 2,
      amount: ether(500, daiDecimals),
    }

    console.info('Getting %s cover for %d months', weiAsDollars(args.amount), args.duration)
    console.info('--------------------------------------')

    const response = await policy.getCoverFee(ChainId.Mumbai, key, productKey, args, provider)
    const {
      fee,
      utilizationRatio,
      totalAvailableLiquidity,
      // coverRatio,
      rate
    } = response.result

    console.info('Rate: %s', weiAsPercent(rate, daiDecimals))
    console.info('Fee: %s', weiAsDollars(fee, daiDecimals))
    console.info('--------------------------------------')
    console.info('Utilization Ratio: %s', weiAsPercent(utilizationRatio, daiDecimals))
    console.info('Total Available Liquidity: %s', weiAsDollars(totalAvailableLiquidity, daiDecimals))
    // console.info('Cover Ratio: %s', weiAsPercent(coverRatio))
  } catch (error) {
    console.error(error)
    console.info('Try adding more liquidity --> `3.\\ add-liquidity.js`')
  }
}

get()
