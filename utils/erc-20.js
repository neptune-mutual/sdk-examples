import { ethers } from 'ethers'
import { registry } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'

const approve = async (tokenAddress, spender, provider) => {
  if (!provider) {
    provider = await getProvider(true)
  }

  const token = await registry.IERC20.getInstance(tokenAddress, provider)

  const allowance = await token.callStatic.allowance(provider.address, spender)
  const symbol = await token.callStatic.symbol()

  if (allowance.gt(0)) {
    console.info('Spender %s already approved to spend %s from account %s', spender, symbol, provider.address)
    return
  }

  console.info('Approving %s to spend your tokens', spender)
  const tx = await token.approve(spender, ethers.constants.MaxUint256)
  console.log('tx submitted')
  await tx.wait()
}

export { approve }
