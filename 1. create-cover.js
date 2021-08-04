import { ChainId, cover } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'

const create = async () => {
  try {
    const provider = getProvider()

    await cover.approveAssurance(ChainId.Mumbai, info.assuranceToken.at, { amount: info.assuranceToken.initialAmount }, provider)
    await cover.approveInitialLiquidity(ChainId.Mumbai, { amount: info.initialLiquidity }, provider)
    await cover.approveStakeAndFees(ChainId.Mumbai, { amount: info.stakeWithFees }, provider)

    const response = await cover.createCover(ChainId.Mumbai, info, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
    console.info('Click on the file --> `info.js` and change the key and other details')
  }
}

create()
