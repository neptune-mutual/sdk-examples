import { ChainId, registry } from '../../sdk/dist/index.js';
import { getProvider } from '../provider.js';

const getDAI = async () => {
  const provider = getProvider()
  const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
  console.log('Platform stablecoin', dai.address)
}

getDAI()
