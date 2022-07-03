import { ChainId, policy, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'
import { getDecimals } from '../utils/helper.js'

const purcahse = async () => {
  try {
    const { key } = info
    const provider = getProvider()
    const productKey = utils.keyUtil.toBytes32("");
    const { daiDecimals } = await getDecimals();

    const args = {
      duration: 2,
      amount: ether(200, daiDecimals), // <-- Amount to Cover (In DAI)
      referralCode: utils.keyUtil.toBytes32(""),
      onBehalfOf: provider.address
    }

    // First approve the Policy contract to spend your DAI or BUSD
    let response = await policy.approve(ChainId.Mumbai, { amount: args.amount}, provider)
    await response.result.wait()

    response = await policy.purchaseCover(ChainId.Mumbai, key, productKey, args, provider)
    await response.result.wait();
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

purcahse()
