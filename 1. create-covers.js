import { ChainId, cover } from '@neptunemutual/sdk'
import { covers } from './covers.js'
import { getProvider } from './provider.js'

const create = async (info, provider) => {
  try {
    const tx = await cover.approveReassurance(ChainId.Ropsten, info.reassuranceToken.at, { }, provider)
    await tx.result.wait()

    const response = await cover.createCover(ChainId.Ropsten, info, provider)
    console.info(response)
  } catch (error) {
    console.error(error)
  }
}

const createAll = async () => {
  const provider = getProvider()

  let tx = await cover.approveInitialLiquidity(ChainId.Ropsten, { }, provider)
  await tx.result.wait()

  tx = await cover.approveStakeAndFees(ChainId.Ropsten, { }, provider)
  await tx.result.wait()

  for (const i in covers) {
    const info = covers[i]
    console.info(info)
    await create(info, provider)
  }
}

createAll()
