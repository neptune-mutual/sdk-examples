import { ChainId, governance } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'
import { weiAsNpm } from '../bn.js'
import { info } from '../configs/info.js'

const getMinStake = async () => {
  try {
    const { key: coverKey } = info
    const provider = getProvider()

    const response = await governance.getMinStake(ChainId.Mumbai, coverKey, provider)
    console.info('Minimum Reporting Stake: %s', weiAsNpm(response.result))
  } catch (error) {
    console.error(error)
  }
}

getMinStake()

/*****************************************************************************
[info] Minimum Reporting Stake: 3,400.00 NPM
*****************************************************************************/
