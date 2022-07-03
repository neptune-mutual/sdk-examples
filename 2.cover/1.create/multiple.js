import { ChainId, cover } from '@neptunemutual/sdk'
import { covers } from '../../configs/covers.js'
import { getProvider } from '../../provider.js'

const create = async (info) => {
  try {
    const provider = getProvider()

    /**
    If you encounter ERC-20 transfer error during cover on the next line, you may need to wait for the previous transactions to mine.

    Stablecoin --> Reassurance Contract
    Stablecoin --> Cover Contract
    NPM --> Cover Staking Contract

    Example:
    let tx = await cover.approveReassurance(ChainId.Mumbai, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
    tx.result.wait()
   */
    let tx = await cover.approveReassurance(ChainId.Mumbai, info.reassuranceToken.at, { }, provider)
    tx.result.wait()

    tx = await cover.approveStakeAndFees(ChainId.Mumbai, { }, provider)
    tx.result.wait()

    tx = await cover.approveInitialLiquidity(ChainId.Mumbai, { }, provider)
    tx.result.wait()

    const response = await cover.createCover(ChainId.Mumbai, info, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

const createAll = async () => {
  for (const i in covers) {
    const info = covers[i]
    console.info('Creating', info.coverName)
    await create(info)
  }
}

createAll()
