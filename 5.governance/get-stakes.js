import { ChainId, governance } from '../../sdk/dist/index.js'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { weiAsNpm } from '../bn.js'

const getStakes = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, provider)).result
    const response = await governance.getStakes(ChainId.Mumbai, key, incidentDate, provider)
    const { yes, no } = response.result

    console.info('[%s Stakes] Yes: %s. No: %s', coverName, weiAsNpm(yes), weiAsNpm(no))
  } catch (error) {
    console.error(error)
  }
}

getStakes()
