import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsNep } from './bn.js'

const attest = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const stake = ether(100)
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, provider)).result

    let response = await governance.getStakes(ChainId.Mumbai, key, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] Before: %s', coverName, weiAsNep(response.result.yes))

    await governance.approveStake(ChainId.Mumbai, {}, provider)
    response = await governance.attest(ChainId.Mumbai, key, stake, provider)
    console.info(response)

    await response.result.wait()

    response = await governance.getStakes(ChainId.Mumbai, key, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] After: %s', coverName, weiAsNep(response.result.yes))
  } catch (error) {
    console.error(error)
  }
}

attest()
