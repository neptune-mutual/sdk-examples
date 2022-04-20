import { ChainId, governance } from '../../sdk/dist/index.js'
import { getProvider } from '../provider.js'
import { weiAsNpm } from '../bn.js'
import { info } from '../configs/info.js'

const getMinStake = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const response = await governance.getMinStake(ChainId.Mumbai, key, provider)
    console.info('Minimum Reporting Stake: %s', weiAsNpm(response.result))
  } catch (error) {
    console.error(error)
  }
}

getMinStake()
