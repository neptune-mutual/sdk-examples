import { ChainId, registry, utils } from '@neptunemutual/sdk'
import { info } from './configs/info.js'
import { getProvider } from './provider.js'

const set = async () => {
  try {
    const { key } = info
    const provider = getProvider()

    const protocol = await registry.Protocol.getInstance(ChainId.Ropsten, provider)
    await protocol.grantRole(utils.keyUtil.ACCESS_CONTROL.LIQUIDITY_MANAGER, provider.address)

    const vault = await registry.Vault.getInstance(ChainId.Ropsten, key, provider)
    const tx = await vault.setMinLiquidityPeriod('1')
    const result = await tx.wait()

    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

set()
