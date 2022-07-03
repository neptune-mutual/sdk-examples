import { Contract } from '@ethersproject/contracts'
import { getProvider } from '../../provider.js'
import FakeTokenABI from '../../configs/abis/FakeTokenABI.js'
import { parseUnits } from '../../bn.js'

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
  } catch (error) {
    console.log('Minting failed.')
    console.error(error)
  }
}
