import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'
import { ether, weiAsNpm } from './bn.js'

const refute = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const stake = ether(100)
    const incidentDate = (await governance.getIncidentDate(ChainId.Ropsten, key, provider)).result

    let response = await governance.getStakes(ChainId.Ropsten, key, incidentDate, provider)
    console.info('[%s Reporting Stake: No] Before: %s', coverName, weiAsNpm(response.result.no))

    await governance.approveStake(ChainId.Ropsten, {}, provider)
    response = await governance.refute(ChainId.Ropsten, key, stake, provider)
    console.info(response)

    await response.result.wait()

    response = await governance.getStakes(ChainId.Ropsten, key, incidentDate, provider)
    console.info('[%s Reporting Stake: No] After: %s', coverName, weiAsNpm(response.result.no))
  } catch (error) {
    console.error(error)
  }
}

refute()
