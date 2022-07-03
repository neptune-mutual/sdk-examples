import { registry, ChainId } from "../../sdk/dist/index.js"
import { weiAsToken } from "../bn.js"
import { getProvider } from "../provider.js"

const getBaseError = (error) => {
  if (error.error) {
    return getBaseError(error.error)
  }

  return error
}

const getDecimals = async () => {
  const provider = getProvider()
  const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
  let token = await registry.IERC20.getInstance(await dai.address, provider);
  const daiDecimals = await token.decimals()

  const npm = await registry.NPMToken.getInstance(ChainId.Mumbai, provider)
  token = await registry.IERC20.getInstance(await npm.address, provider);
  const npmDecimals = await token.decimals()

  return { daiDecimals, npmDecimals }
}

const getBalances = async () => {
  const provider = getProvider()
  const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
  const daiBalance = await dai.callStatic.balanceOf(provider.address)

  const npm = await registry.NPMToken.getInstance(ChainId.Mumbai, provider)
  const npmBalance = await npm.callStatic.balanceOf(provider.address)

  const {daiDecimals, npmDecimals} = await getDecimals();

  return { daiBalance: weiAsToken(daiBalance, 'DAI', daiDecimals), npmBalance: weiAsToken(npmBalance, 'NPM', npmDecimals) }
}

export {
  getBaseError,
  getBalances,
  getDecimals
}
