import { ChainId, governance } from '@neptunemutual/sdk'
import { getProvider } from './provider.js'
import { weiAsNpm } from './bn.js'
import { info } from './info.js'

const getMinStake = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const response = await governance.getMinStake(ChainId.Ropsten, key, provider)
    console.info('Minimum Reporting Stake: %s', weiAsNpm(response.result))
  } catch (error) {
    console.error(error)
  }
}

getMinStake()
