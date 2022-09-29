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

        let tx = await protocol.grantRole(role, account)
        await tx.wait()

        tx = await protocol.grantRole(role, provider.address)
        await tx.wait()

        console.info(account, 'was granted the', ethers.utils.parseBytes32String(role) || 'ADMIN', 'role')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

addRole()
