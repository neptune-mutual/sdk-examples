import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'

const dispute = async () => {
  try {
    const { key } = info
    const provider = getProvider(true)

    await governance.approveStake(ChainId.Ropsten, {}, provider)
    const response = await governance.dispute(ChainId.Ropsten, key, info.minReportingStake, provider)

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

dispute()
