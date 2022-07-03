import { ChainId, config } from '@neptunemutual/sdk'

const getUniswap = () => {
  const network = config.networks.getChainConfig(ChainId.Mumbai)
  const { uniswap } = network

  return uniswap
}

export { getUniswap }
