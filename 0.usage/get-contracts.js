import { ChainId, registry } from '@neptunemutual/sdk'
import { info } from '../configs/info.js'
import { getProvider } from '../provider.js'

const get = async () => {
  try {
    const provider = getProvider()
    const { key } = info
    const npm = await registry.NPMToken.getAddress(ChainId.Mumbai, provider)
    const protocol = await registry.Protocol.getAddress(ChainId.Mumbai, provider)
    const claimsProcessor = await registry.ClaimsProcessor.getAddress(ChainId.Mumbai, provider)
    const cover = await registry.Cover.getAddress(ChainId.Mumbai, provider)
    const governance = await registry.Governance.getAddress(ChainId.Mumbai, provider)
    const policy = await registry.PolicyContract.getAddress(ChainId.Mumbai, provider)
    const provision = await registry.ProvisionContract.getAddress(ChainId.Mumbai, provider)
    // const liquidityToken = await registry.LiquidityToken.getAddress(ChainId.Mumbai)
    const reassuranceContract = await registry.Reassurance.getAddress(ChainId.Mumbai, provider)
    const coverStaking = await registry.Staking.getAddress(ChainId.Mumbai, provider)
    const bondPool = await registry.BondPool.getAddress(ChainId.Mumbai, provider)
    const stakingPools = await registry.StakingPools.getAddress(ChainId.Mumbai, provider)
    const vault = await registry.Vault.getAddress(ChainId.Mumbai, key, provider)
    const reassuranceToken = await registry.ReassuranceToken.getAddress(ChainId.Mumbai, key, provider)

    const contracts = {
      npm,
      protocol,
      claimsProcessor,
      cover,
      governance,
      policy,
      provision,
      // liquidityToken,
      reassuranceToken,
      reassuranceContract,
      coverStaking,
      bondPool,
      stakingPools,
      vault
    }

    console.log(contracts)
  } catch (error) {
    console.error(error)
  }
}

get()
