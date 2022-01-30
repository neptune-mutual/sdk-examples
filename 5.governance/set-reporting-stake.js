import { ChainId, registry } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const setStake = async () => {
  try {
    const provider = getProvider()

    const governance = await registry.Governance.getInstance(ChainId.Ropsten, provider)
    const response = await governance.setFirstReportingStake(ether(250))
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

setStake()
