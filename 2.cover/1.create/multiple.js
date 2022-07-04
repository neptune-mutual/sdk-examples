import { ChainId, cover, registry } from '@neptunemutual/sdk'
import { covers } from '../../configs/covers.js'
import { getProvider } from '../../provider.js'

const create = async (info) => {
  try {
    const provider = getProvider()

    const daiAddress = await registry.Stablecoin.getAddress(ChainId.Mumbai, provider)

    /**
    If you encounter ERC-20 transfer error during cover on the next line, you may need to wait for the previous transactions to mine.

    Stablecoin --> Reassurance Contract
    Stablecoin --> Cover Contract
    NPM --> Cover Staking Contract

    Example:
    let tx = await cover.approveReassurance(ChainId.Mumbai, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
    tx.result.wait()
   */
    let tx = await cover.approveReassurance(ChainId.Mumbai, daiAddress, { amount: info.reassurance }, provider)
    await tx.result.wait()

    tx = await cover.approveStakeAndFees(ChainId.Mumbai, { amount: info.stakeWithFees }, provider)
    await tx.result.wait()

    let res = await cover.whitelistCoverCreator(ChainId.Mumbai, provider.address, provider)
    await res.result.wait()

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
