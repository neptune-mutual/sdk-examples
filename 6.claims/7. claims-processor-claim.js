import { ChainId, governance, claimsProcessor, cxToken, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const getCxToken = async (key, provider) => {
  const policyDuration = 2 // 2 months
  const expiryDate = utils.date.getExpiryDate(policyDuration, new Date())
  const { result } = await cxToken.getCTokenByExpiryDate(ChainId.Mumbai, key, expiryDate, provider)

  return result
}

const claim = async () => {
  try {
    const { key } = info
    const provider = getProvider()
    const amount = ether(200)

    const instance = await getCxToken(key, provider)

    // Approve the claims processor to spend your cxTokens
    await claimsProcessor.approve(ChainId.Mumbai, instance.address, {}, provider)

    // Get the incident date and submit a claim
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, provider)).result
    await claimsProcessor.claim(ChainId.Mumbai, instance.address, key, incidentDate, amount, provider)
    console.info('We\'ve sent you the payout')
  } catch (error) {
    console.error(error)
  }
}

claim()
