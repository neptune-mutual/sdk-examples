import { ChainId, governance } from '../../sdk/dist/index.js'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether, weiAsNpm } from '../bn.js'

const attest = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const stake = ether(100)
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, provider)).result

    let response = await governance.getStakes(ChainId.Mumbai, key, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] Before: %s', coverName, weiAsNpm(response.result.yes))

    await governance.approveStake(ChainId.Mumbai, {amount: stake}, provider)
    response = await governance.attest(ChainId.Mumbai, key, stake, provider)
    console.info(response)

    await response.result.wait()

    response = await governance.getStakes(ChainId.Mumbai, key, incidentDate, provider)
    console.info('[%s Reporting Stake: Yes] After: %s', coverName, weiAsNpm(response.result.yes))
  } catch (error) {
    console.error(error)
  }
}

attest()
