import { ChainId, cover } from '@neptunemutual/sdk'
import { covers } from './covers.js'
import { getProvider } from './provider.js'

const create = async (coverInfo) => {
  try {
    const provider = getProvider()

    /**
    If you encounter ERC-20 transfer error during cover on the next line, you may need to wait for the previous transactions to mine.

    Example:
    let tx = await cover.approveReassurance(ChainId.Ropsten, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
    tx.result.wait()
   */

    const response = await cover.createCover(ChainId.Ropsten, coverInfo, provider)
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
