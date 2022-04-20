import { ChainId, policy, utils } from '../../sdk/dist/index.js'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const purcahse = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const args = {
      duration: 2,
      amount: ether(200) // <-- Amount to Cover (In DAI)
    }
    const referralCode = utils.keyUtil.toBytes32("")

    // First approve the Policy contract to spend your DAI or BUSD
    let response = await policy.approve(ChainId.Mumbai, { amount: args.amount}, provider)
    await response.result.wait()

    response = await policy.purchaseCover(ChainId.Mumbai, key, args, provider, referralCode)
    await response.result.wait();
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

purcahse()
