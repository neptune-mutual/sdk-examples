import { ChainId, governance, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const dispute = async () => {
  try {
    const { key } = info
    const provider = getProvider(true)
    const productKey = utils.keyUtil.toBytes32("")

    const tx = await governance.approveStake(ChainId.Mumbai, {amount: info.minReportingStake}, provider)
    await tx.result.wait();
    const response = await governance.dispute(ChainId.Mumbai, key, productKey, info.minReportingStake, provider)

    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

dispute()
