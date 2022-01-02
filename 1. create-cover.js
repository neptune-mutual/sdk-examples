import { ChainId, cover } from '@neptunemutual/sdk'
import { info } from './info.js'
import { getProvider } from './provider.js'

const create = async () => {
  try {
    const provider = getProvider()

    await cover.approveReassurance(ChainId.Ropsten, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
    await cover.approveInitialLiquidity(ChainId.Ropsten, { amount: info.initialLiquidity }, provider)
    await cover.approveStakeAndFees(ChainId.Ropsten, { amount: info.stakeWithFees }, provider)

    /**
    If you encounter ERC-20 transfer error during cover on the next line, you may need to wait for the previous transactions to mine.

    Example:
    let tx = await cover.approveReassurance(ChainId.Ropsten, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
    tx.result.wait()
   */

    const response = await cover.createCover(ChainId.Ropsten, info, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
    console.info('Click on the file --> `info.js` and change the key and other details')
  }
}

create()
