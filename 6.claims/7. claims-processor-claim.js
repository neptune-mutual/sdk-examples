import { ChainId, governance, claimsProcessor, cxToken, utils } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'
import { ether } from '../bn.js'

const getCxToken = async (coverKey, productKey, provider) => {
  const policyDuration = 2 // 2 months
  const expiryDate = utils.date.getExpiryDate(policyDuration, new Date())
  const { result } = await cxToken.getCTokenByExpiryDate(ChainId.Mumbai, coverKey, productKey, expiryDate, provider)

  return result
}

const claim = async () => {
  try {
    const { key } = info
    const productKey = utils.keyUtil.toBytes32('')
    const provider = getProvider()
    const amount = ether(20)

    const instance = await getCxToken(key, productKey, provider)

    // Approve the claims processor to spend your cxTokens
    let gasPrice = await provider.getGasPrice()
    let response = await claimsProcessor.approve(ChainId.Mumbai, instance.address, {}, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()

    // Get the incident date and submit a claim
    const incidentDate = (await governance.getIncidentDate(ChainId.Mumbai, key, productKey, provider)).result

    gasPrice = await provider.getGasPrice()
    response = await claimsProcessor.claim(ChainId.Mumbai, instance.address, key, productKey, incidentDate, amount, provider, { gasPrice: gasPrice.mul(2) })
    await response.result.wait()
    console.info('We\'ve sent you the payout')
  } catch (error) {
    console.error(error)
  }
}

claim()

/*****************************************************************************
[info] We've sent you the payout
*****************************************************************************/
