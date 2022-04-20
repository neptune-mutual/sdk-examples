import { ChainId, cover, registry } from '../../../sdk/dist/index.js'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'

const create = async (coverInfo) => {
  try {
    const provider = getProvider()

    const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
    await cover.approveReassurance(ChainId.Mumbai, dai.address, { amount: coverInfo.reassurance }, provider)
    // await cover.approveInitialLiquidity(ChainId.Mumbai, { amount: coverInfo.initialLiquidity }, provider)
    await cover.approveStakeAndFees(ChainId.Mumbai, { amount: coverInfo.stakeWithFees }, provider)

    /**
    If you encounter ERC-20 transfer error during cover on the next line, you may need to wait for the previous transactions to mine.

    Example:
    let tx = await cover.approveReassurance(ChainId.Mumbai, info.reassuranceToken.at, { amount: info.reassuranceToken.initialAmount }, provider)
    tx.result.wait()
   */

    // make yourself a whitelisted cover creator
    const coverCreator = provider.address;
    await cover.whitelistCoverCreator(ChainId.Mumbai, coverCreator, provider)

    const response = await cover.createCover(ChainId.Mumbai, coverInfo, provider);
    console.info(response)
  } catch (error) {
    console.error(error)
    console.info('Click on the file --> `info.js` and change the key and other details')
  }
}

create(info)
