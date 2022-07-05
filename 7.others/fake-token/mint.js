import { Contract } from '@ethersproject/contracts'
import { getProvider } from '../../provider.js'
import FakeTokenABI from '../../configs/abis/FakeTokenABI.js'
import { parseUnits } from '../../bn.js'
import { ChainId, registry } from '@neptunemutual/sdk'

export const mint = async (tokenAddress) => {
  try {
    console.log('Minting...')

    const provider = getProvider()

    const instance = new Contract(tokenAddress, FakeTokenABI, provider)
    const decimals = await instance.decimals()

    const gasPrice = await provider.getGasPrice()
    const tx = await instance.mint(parseUnits('2000', decimals), {
      gasPrice: gasPrice.mul(2)
    })
    await tx.wait()
    console.log("Minted!")
  } catch (error) {
    console.log('Minting failed.')
    console.error(error)
  }
}

const mintTokens = async () => {
  const provider = getProvider()

  const daiAddress = await registry.Stablecoin.getAddress(ChainId.Mumbai, provider)
  const npmAddress = await registry.NPMToken.getAddress(ChainId.Mumbai, provider)

  await mint(daiAddress)
  await mint(npmAddress)
}

mintTokens()