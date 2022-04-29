import { ChainId, liquidity, utils, registry } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { ether, weiAsDollars } from '../../bn.js'

const add = async () => {
  try {
    const { key, coverName } = info

    const provider = getProvider()
    const amount = ether(500)
    const stake = ether(250)

    const arg = utils.keyUtil.toBytes32("");

    let response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
    console.info('[%s Liquidity] Before: %s', coverName, weiAsDollars(response.result))

    response = await liquidity.approve(ChainId.Mumbai, key, { amount }, provider)
    await response.result.wait()

    // getting vault address (spender)
    const spender = await registry.Vault.getAddress(ChainId.Mumbai, key, provider);

    // getting NPM token token address 
    const tokenAddress = await registry.NPMToken.getAddress(ChainId.Mumbai, provider);

    // getting token from IERC20 instance
    const token = await registry.IERC20.getInstance(tokenAddress, provider);

    // approve npm tokens
    const res = await token.approve(spender, stake)
    await res.wait();

    response = await liquidity.add(ChainId.Mumbai, key, amount, stake, provider, arg)
    // console.info(response)

    await response.result.wait()

    response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
    console.info('[%s Liquidity] After: %s', coverName, weiAsDollars(response.result))
  } catch (error) {
    console.error(error)
  }
}

add()
