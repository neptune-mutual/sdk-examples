import { ChainId, governance } from '@neptunemutual/sdk'
import { getProvider } from './provider.js'
import { weiAsNep } from './bn.js'

const getMinStake = async () => {
  try {
    const provider = getProvider()

    const response = await governance.getMinStake(ChainId.Mumbai, provider)
    console.info('Minimum Reporting Stake: %s', weiAsNep(response.result))
  } catch (error) {
    console.error(error)
  }
}

getMinStake()
