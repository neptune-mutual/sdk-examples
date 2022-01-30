import { approve } from '../utils/erc-20.js'
import { getProvider } from '../provider.js'

const dai = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD' // Kovan Aave DAI
const cDaiDelegator = '0xF49eBE5A0d62cc8f0318AD14620D17dcc2D53935' // Kovan Compound cDAI delegator

const approveDai = async () => {
  const provider = getProvider()

  approve(dai, cDaiDelegator, provider)
}

approveDai()
