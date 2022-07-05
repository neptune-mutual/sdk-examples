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
    const reassurance = await registry.Reassurance.getAddress(ChainId.Mumbai, provider)
    const reassuranceContract = await registry.Reassurance.getAddress(ChainId.Mumbai, provider)
    const coverStaking = await registry.Staking.getAddress(ChainId.Mumbai, provider)
    const bondPool = await registry.BondPool.getAddress(ChainId.Mumbai, provider)
    const stakingPools = await registry.StakingPools.getAddress(ChainId.Mumbai, provider)
    const vault = await registry.Vault.getAddress(ChainId.Mumbai, key, provider)

    const contracts = {
      npm,
      protocol,
      claimsProcessor,
      cover,
      governance,
      policy,
      reassurance,
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

/*****************************************************************************
[log] {
  npm: '0xF7c352D9d6967Bd916025030E38eA58cF48029f8',
  protocol: '0xB80A3a03193183Ca8ccCeeb5415c4728Fb9243C7',
  claimsProcessor: '0x11C0d1f252a51C96da9a575F383bad3959137413',
  cover: '0xF5C7A5300CC241f5EbE177ed9eCE22bB13C77d23',
  governance: '0x073580951bBBB22682e6129Fc3D43D963084bCCf',
  policy: '0x23099F06e9ABbeE01597F422CDBb9c232D581626',
  reassurance: '0xF105D55aCB6097a3D81f03386cFD3cd30feB5aC1',
  reassuranceContract: '0xF105D55aCB6097a3D81f03386cFD3cd30feB5aC1',
  coverStaking: '0x7312bdd3C98441F2A45b56bBf39aE030bDa6830D',
  bondPool: '0x39ae2f055dd9d1BB8E6977AA0b94Bbb6d0E92De9',
  stakingPools: '0xCa6AAfe69a0A7445E69425043F49E8954a550a98',
  vault: '0x0b0520Fd470126E6A557e80C45670F7F071fDbFb'
}
*****************************************************************************/
