import { ethers } from 'ethers'
import { ChainId, registry } from '@neptunemutual/sdk'
import { getProvider } from '../provider.js'
import { admins } from '../test-admins.js'

const addRole = async () => {
  try {
    const provider = getProvider(true)

    const protocol = await registry.Protocol.getInstance(ChainId.Mumbai, provider)

    for (const i in admins) {
      const { account, roles } = admins[i]

      for (const j in roles) {
        const role = roles[j]

        await protocol.grantRole(role, account)
        await protocol.grantRole(role, provider.address)

        console.info(account, 'was granted the', ethers.utils.toUtf8String(role), 'role')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

addRole()
