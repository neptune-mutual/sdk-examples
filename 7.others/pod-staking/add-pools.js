import { ChainId, registry } from '@neptunemutual/sdk'
import { getProvider } from '../../provider.js'
import { pools } from '../../configs/pod-staking.js'
import { approve } from '../../utils/erc-20.js'

const addPodStaking = async (info) => {
  const provider = getProvider(true)

  const { key, name, poolType } = info
  const { stakingToken, uniStakingTokenDollarPair, rewardToken, uniRewardTokenDollarPair } = info
  const { stakingTarget, maxStake, platformFee, rewardPerBlock, lockupPeriod, rewardTokenDeposit } = info

  const stakingPools = await registry.StakingPools.getInstance(ChainId.Ropsten, provider)
  await approve(rewardToken, stakingPools.address, provider)

  const addresses = [stakingToken, uniStakingTokenDollarPair, rewardToken, uniRewardTokenDollarPair]
  const values = [stakingTarget, maxStake, platformFee, rewardPerBlock, lockupPeriod, rewardTokenDeposit]

  const tx = await stakingPools.addOrEditPool(key, name, poolType, addresses, values)
  await tx.wait()
}

const addPools = async () => {
  console.log('Wait')

  for (const i in pools) {
    const pool = pools[i]
    console.log('Task %s:%s | %s', parseInt(i) + 1, pools.length, pool.name)

    await addPodStaking(pool)
  }

  console.log('Done')
}

addPools()
