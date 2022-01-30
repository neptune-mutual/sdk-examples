import { utils } from '@neptunemutual/sdk'
const acl = utils.keyUtil.ACCESS_CONTROL

const admins = [{
  account: '0xb899DCdA5e9291a6F6fE324F44c8C5B3376188da',
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
