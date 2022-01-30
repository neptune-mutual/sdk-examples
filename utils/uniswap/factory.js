import { ChainId, config, utils } from '@neptunemutual/sdk'
import { getUniswap } from './index.js'

const getFactory = async (provider) => {
  const { factory } = getUniswap()
  return utils.contract.getContract(ChainId.Ropsten, factory, config.abis.IUniswapV2FactoryLike, provider)
}

export { getFactory }
