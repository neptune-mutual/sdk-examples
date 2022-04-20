import { ChainId, governance } from '../../sdk/dist/index.js'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const dispute = async () => {
  try {
    const { key } = info
    const provider = getProvider(true)

    await governance.approveStake(ChainId.Mumbai, {amount: info.minReportingStake}, provider)
    const response = await governance.dispute(ChainId.Mumbai, key, info.minReportingStake, provider)

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

dispute()
