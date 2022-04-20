import { ChainId, governance } from '../../sdk/dist/index.js'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const getReporter = async () => {
  try {
    const { key, coverName } = info
    const provider = getProvider()

    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, provider)).result

    const response = await governance.getReporter(ChainId.Mumbai, key, incidentDate, provider)
    console.info('[%s] Reporter: %s', coverName, response.result)
  } catch (error) {
    console.error(error)
  }
}

getReporter()
