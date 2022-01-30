import { ChainId, governance, claimsProcessor, cxToken, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const getCxToken = async (key) => {
  const policyDuration = 2 // 2 months
  const expiryDate = utils.date.getExpiryDate(policyDuration, new Date())
  const { result } = await cxToken.getCxTokenByExpiryDate(ChainId.Ropsten, key, expiryDate)

  return result
}

const claim = async () => {
  try {
    const { key } = info
    const provider = getProvider()
    const amount = ether(50_000)

    const instance = await getCxToken(key)

    // Approve the claims processor to spend your cxTokens
    await claimsProcessor.approve(ChainId.Ropsten, instance.address, {}, provider)

    // Get the incident date and submit a claim
    const incidentDate = (await governance.getIncidentDate(ChainId.Ropsten, key, provider)).result
    await claimsProcessor.claim(ChainId.Ropsten, instance.address, key, incidentDate, amount, provider)

    console.info('We\'ve sent you the payout')
  } catch (error) {
    console.error(error)
  }
}

claim()
