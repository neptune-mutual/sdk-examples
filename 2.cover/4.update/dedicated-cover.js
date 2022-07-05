import { ChainId, cover } from '@neptunemutual/sdk'
import { getProvider } from '../../provider.js'

const update = async () => {
  try {
    const provider = getProvider()

    const coverInfo = {
      key: '0x6262382d65786368616e67650000000000000000000000000000000000000000',
      coverName: 'Bb8 Exchange Cover',
      projectName: 'Bb8 Exchange',
      vault: {
        name: 'Bb8 POD',
        symbol: 'BEC-nDAI'
      },
      requiresWhitelist: false,
      supportsProducts: false,
      leverage: '1',
      tags: [
        'Smart Contract',
        'DeFi',
        'Exchange'
      ],
      about: "BB8 Exchange is a global cryptocurrency exchange that lets users from over 140 countries buy and sell over 1200 different digital currencies and tokens. BB8 Exchange offers a simple buy/sell crypto function for beginners as well as a variety of crypto-earning options, in addition to expert cryptocurrency spot and futures trading platforms. On this platform, both novice and expert traders may find what they're looking for.",
      blockchains: [],
      rules: '1. You must have maintained at least 1 NPM tokens in your wallet during your coverage period.\n    2. During your coverage period, the exchange was exploited which resulted in user assets being stolen and the project was also unable to cover the loss themselves.\n    3. This does not have to be your own loss.',
      exclusions: '',
      links: {
        website: 'https://www.bb8exchange.com',
        documentation: 'https://support.bmx.fund/hc',
        twitter: 'https://twitter.com/BB8Exchange',
        blog: 'https://bb8-exchange.medium.com',
        telegram: 'https://t.me/BB8Exchange'
      },
      pricingFloor: '200',
      pricingCeiling: '1400',
      reportingPeriod: 1800,
      cooldownPeriod: 300,
      claimPeriod: 1800,
      minReportingStake: '5000000000000000000000',
      resolutionSources: [
        'https://twitter.com/BB8Exchange',
        'https://twitter.com/neptunemutual'
      ],
      stakingPool: {
        name: 'Earn BEC',
        settings: {
          31337: {
            rewardToken: {
              symbol: 'BEC'
            },
            uniRewardTokenDollarPair: {
              token: 'BEC'
            },
            stakingTarget: '400000000000000000000000',
            maxStake: '20000000000000000000000',
            rewardPerBlock: 4566764500,
            lockupPeriodInBlocks: 300,
            rewardTokenDeposit: '30000000000000000000000'
          },
          43113: {
            rewardToken: {
              symbol: 'BEC'
            },
            uniRewardTokenDollarPair: {
              token: 'BEC'
            },
            stakingTarget: '400000000000000000000000',
            maxStake: '20000000000000000000000',
            rewardPerBlock: 4566764500,
            lockupPeriodInBlocks: 25,
            rewardTokenDeposit: '15000000000000000000000000'
          },
          80001: {
            rewardToken: {
              symbol: 'BEC'
            },
            uniRewardTokenDollarPair: {
              token: 'BEC'
            },
            stakingTarget: '400000000000000000000000',
            maxStake: '20000000000000000000000',
            rewardPerBlock: 4566764500,
            lockupPeriodInBlocks: 1200,
            rewardTokenDeposit: '18000000000000000000000000'
          }
        }
      },
      stakeWithFees: '50000000000000000000000',
      reassurance: '20000000000',
      reassuranceRate: '2500'
    }

    const gasPrice = await provider.getGasPrice()
    const response = await cover.updateCover(ChainId.Mumbai, coverInfo, provider, { gasPrice: gasPrice.mul(2) })
    console.info(response)
    await response.result.tx.wait()
  } catch (error) {
    console.error(error)
    console.info('Click on the file --> `info.js` and change the key and other details')
  }
}

update()
