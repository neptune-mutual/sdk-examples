import { ChainId, registry } from '@neptunemutual/sdk'

const getDAI = async () => {
  const dai = await registry.LiquidityToken.getInstance(ChainId.Ropsten)
  console.log('Stablecoin', dai)
}

getDAI()
