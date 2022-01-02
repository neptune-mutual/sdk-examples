import { ChainId, registry } from '@neptunemutual/sdk'
import { info } from './info.js'

const get = async () => {
  try {
    const { key } = info

    const npm = await registry.NPMToken.getAddress(ChainId.Ropsten)
    const protocol = await registry.Protocol.getAddress(ChainId.Ropsten)
    const claimsProcessor = await registry.ClaimsProcessor.getAddress(ChainId.Ropsten)
    const cover = await registry.Cover.getAddress(ChainId.Ropsten)
    const governance = await registry.Governance.getAddress(ChainId.Ropsten)
    const policy = await registry.PolicyContract.getAddress(ChainId.Ropsten)
    const provision = await registry.ProvisionContract.getAddress(ChainId.Ropsten)
    const liquidityToken = await registry.LiquidityToken.getAddress(ChainId.Ropsten)
    const reassuranceContract = await registry.Reassurance.getAddress(ChainId.Ropsten)
    const coverStaking = await registry.Staking.getAddress(ChainId.Ropsten)
    const bondPool = await registry.BondPool.getAddress(ChainId.Ropsten)
    const stakingPools = await registry.StakingPools.getAddress(ChainId.Ropsten)
    const vault = await registry.Vault.getAddress(ChainId.Ropsten, key)
    const reassuranceToken = await registry.ReassuranceToken.getAddress(ChainId.Ropsten, key)

    const contracts = {
      npm,
      protocol,
      claimsProcessor,
      cover,
      governance,
      policy,
      provision,
      liquidityToken,
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
