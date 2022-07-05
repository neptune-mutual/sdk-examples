import { ChainId, registry, utils } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const setStake = async () => {
  try {
    const provider = getProvider()

    const governance = await registry.Governance.getInstance(ChainId.Mumbai, provider)
    const response = await governance.setFirstReportingStake(utils.keyUtil.toBytes32(''), ether(250))
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

setStake()
