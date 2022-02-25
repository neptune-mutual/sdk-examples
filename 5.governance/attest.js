import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether, weiAsNpm } from '../bn.js'

const attest = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const stake = ether(100)
    const incidentDate = (await governance.getIncidentDate(ChainId.Ropsten, key, provider)).result

    let response = await governance.getStakes(ChainId.Ropsten, key, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] Before: %s', coverName, weiAsNpm(response.result.yes))

    await governance.approveStake(ChainId.Ropsten, {}, provider)
    response = await governance.attest(ChainId.Ropsten, key, stake, provider)
    console.info(response)

    await response.result.wait()

    response = await governance.getStakes(ChainId.Ropsten, key, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] After: %s', coverName, weiAsNpm(response.result.yes))
  } catch (error) {
    console.error(error)
  }
}

attest()