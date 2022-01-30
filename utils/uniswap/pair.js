import moment from 'moment'
import { config } from '@neptunemutual/sdk'
import { getProvider } from '../../provider.js'
import { ether } from '../../bn.js'
import { approve } from '../erc-20.js'
import { getFactory } from './factory.js'
import { getRouter } from './router.js'

const createPair = async (info, provider) => {
  const { token0, token1 } = info
  const { liquidity0, liquidity1 } = info
  const router = await getRouter(provider)

  await approve(token0, router.address)
  await approve(token1, router.address)

  const deadline = moment(new Date()).add(1, 'month').unix()
  const tx = await router.addLiquidity(
    token0, token1,
    liquidity0, liquidity1,
    liquidity0, liquidity1,
    provider.address, deadline
  )

  await tx.wait()
}

const findOrCreatePair = async (info) => {
  const provider = getProvider(true)
  const factory = await getFactory(provider)

  const { name, token0, token1 } = info

  if (token0 === token1) {
    throw new Error('Invalid pair')
  }

  const pair = await factory.getPair(token0, token1)

  if (pair === config.constants.ZERO_ADDRESS) {
    console.info('%s pair not found. Creating new', name)
    return createPair(info)
  }

  console.info('%s pair found at %s', name, pair)
  return pair
}

const p = {
  name: 'CPOOL/NPM',
  token0: '0xa2F795CB8cdCa83f8D3d5F2D84BFC45c9b3A4197',
  token1: '0x9912B6Fc42675DC940313551b20c022219b98Adb',
  liquidity0: ether(20),
  liquidity1: ether(10)
}

findOrCreatePair(p)
