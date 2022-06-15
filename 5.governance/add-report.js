import { ChainId, governance } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const payload = {
  title: 'Test Exploit',
  observed: new Date(),
  proofOfIncident: 'https://etherscan.io/tokenholdings?a=0xA9AD3537C819ae0530623aFb458Fee8456C47d33',
  description: 'DeFi protocol Learn Finance has reported that its vault was exploited by a hacker to the tune of $11 million on Dec 25.',
  stake: info.minReportingStake
}

const report = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    let response = await governance.approveStake(ChainId.Mumbai, {}, provider)
    await response.result.wait()

    response = await governance.report(ChainId.Mumbai, key, payload, provider)
    await response.result.wait();
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

report()
