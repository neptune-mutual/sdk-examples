import { utils } from '@neptunemutual/sdk'
const acl = utils.keyUtil.ACCESS_CONTROL

const admins = [{
  account: '0xA96813969437F3bad7B59335934aa75933670615',
  roles: [
    acl.ADMIN,
    acl.COVER_MANAGER,
    acl.LIQUIDITY_MANAGER,
    acl.GOVERNANCE_ADMIN,
    acl.RECOVERY_AGENT,
    acl.UNPAUSE_AGENT
  ]
}]

export { admins }
