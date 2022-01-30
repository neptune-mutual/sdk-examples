import fs from 'fs/promises'
import { covers } from '../../configs/covers.js'
import { ChainId, registry, config } from '@neptunemutual/sdk'
import { percentage } from '../../bn.js'

const getVault = async (key) => {
  return registry.Vault.getInstance(ChainId.Ropsten, key)
}

const all = async () => {
  const pools = []

  console.log('Wait')

  for (const i in covers) {
    const cover = covers[i]

    console.log('Working %s:%s | %s', parseInt(i) + 1, covers.length, cover.projectName)

    const { stakingPool, key } = cover
    if (!stakingPool) {
      continue
    }

    const pod = await getVault(key)

    if (pod.address === config.constants.ZERO_ADDRESS) {
      console.log('There is no vault available for', cover.coverName)
      continue
    }

    const { rewardToken, uniRewardTokenDollarPair, stakingTarget, maxStake, rewardPerBlock, lockupPeriod, rewardTokenDeposit } = stakingPool.settings[ChainId.Ropsten]

    pools.push({
      key,
      name: stakingPool.name,
      poolType: '1',
      stakingToken: pod.address,
      uniStakingTokenDollarPair: config.constants.ZERO_ADDRESS,
      rewardToken,
      uniRewardTokenDollarPair,
      stakingTarget,
      maxStake,
      platformFee: percentage(0.25),
      rewardPerBlock,
      lockupPeriod: lockupPeriod.toString(),
      rewardTokenDeposit
    })
    //
  }

  console.log('Saving ...')
  const contents = `const pools = ${JSON.stringify(pools, null, 2).trim()} \n\nexport { pools }\n`

  await fs.writeFile('./configs/pod-staking.js', contents)
  console.log('Done')
}

all()
