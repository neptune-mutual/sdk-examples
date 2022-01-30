import { ChainId, config, utils } from '@neptunemutual/sdk'
import { getUniswap } from './index.js'

const getRouter = async (provider) => {
  const { router } = getUniswap()
  return utils.contract.getContract(ChainId.Ropsten, router, config.abis.IUniswapV2RouterLike, provider)
}

export { getRouter }
