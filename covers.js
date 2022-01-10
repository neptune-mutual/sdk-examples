import './utils/logger.js'
import { ether } from './bn.js'

const DAYS = 86400

export const covers = [
  {
    id: '1',
    name: 'Clearpool',
    imgSrc: '/covers/clearpool.png',
    coverFees: {
      min: 5,
      max: 7
    },
    apr: 12.03,
    utilizationRatio: 25,
    protection: 800000,
    liquidity: 11010000,
    key: '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000001',
    reportingPeriod: 7 * DAYS,
    resolutionSources: ['https://twitter.com/compoundfinance', 'https://medium.com/compound-finance', 'https://twitter.com/neptunemutual'],
    reassuranceToken: {
      at: '0xe8BAb5ca5eA0Fc93b2a4E1aD22376726ED209ed5',
      name: 'DAI Stablecoin',
      symbol: 'DAI',
      initialAmount: ether(50_000)
    },
    stakeWithFees: ether(50_000),
    initialLiquidity: ether(50_000),
    minReportingStake: ether(500)
  },
  {
    id: '2',
    name: 'coinbase',
    imgSrc: '/covers/clearpool.png',
    coverFees: {
      min: 5,
      max: 7
    },
    apr: 12.03,
    utilizationRatio: 65,
    protection: 800000,
    liquidity: 11010000,
    key: '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000002',
    reportingPeriod: 7 * DAYS,
    resolutionSources: ['https://twitter.com/compoundfinance', 'https://medium.com/compound-finance', 'https://twitter.com/neptunemutual'],
    reassuranceToken: {
      at: '0xe8BAb5ca5eA0Fc93b2a4E1aD22376726ED209ed5',
      name: 'DAI Stablecoin',
      symbol: 'DAI',
      initialAmount: ether(50_000)
    },
    stakeWithFees: ether(50_000),
    initialLiquidity: ether(50_000),
    minReportingStake: ether(500)
  },
  {
    id: '3',
    name: 'hex trust',
    imgSrc: '/covers/clearpool.png',
    coverFees: {
      min: 5,
      max: 7
    },
    apr: 12.03,
    utilizationRatio: 85,
    protection: 800000,
    liquidity: 11010000,
    key: '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000003',
    reportingPeriod: 7 * DAYS,
    resolutionSources: ['https://twitter.com/compoundfinance', 'https://medium.com/compound-finance', 'https://twitter.com/neptunemutual'],
    reassuranceToken: {
      at: '0xe8BAb5ca5eA0Fc93b2a4E1aD22376726ED209ed5',
      name: 'DAI Stablecoin',
      symbol: 'DAI',
      initialAmount: ether(50_000)
    },
    stakeWithFees: ether(50_000),
    initialLiquidity: ether(50_000),
    minReportingStake: ether(500)
  },
  {
    id: '4',
    name: 'okex',
    imgSrc: '/covers/clearpool.png',
    coverFees: {
      min: 5,
      max: 7
    },
    apr: 12.03,
    utilizationRatio: 15,
    protection: 800000,
    liquidity: 11010000,
    key: '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000004',
    reportingPeriod: 7 * DAYS,
    resolutionSources: ['https://twitter.com/compoundfinance', 'https://medium.com/compound-finance', 'https://twitter.com/neptunemutual'],
    reassuranceToken: {
      at: '0xe8BAb5ca5eA0Fc93b2a4E1aD22376726ED209ed5',
      name: 'DAI Stablecoin',
      symbol: 'DAI',
      initialAmount: ether(50_000)
    },
    stakeWithFees: ether(50_000),
    initialLiquidity: ether(50_000),
    minReportingStake: ether(500)
  },
  {
    id: '5',
    name: 'huobi',
    imgSrc: '/covers/clearpool.png',
    coverFees: {
      min: 5,
      max: 7
    },
    apr: 12.03,
    utilizationRatio: 25,
    protection: 800000,
    liquidity: 11010000,
    key: '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000005',
    reportingPeriod: 7 * DAYS,
    resolutionSources: ['https://twitter.com/compoundfinance', 'https://medium.com/compound-finance', 'https://twitter.com/neptunemutual'],
    reassuranceToken: {
      at: '0xe8BAb5ca5eA0Fc93b2a4E1aD22376726ED209ed5',
      name: 'DAI Stablecoin',
      symbol: 'DAI',
      initialAmount: ether(50_000)
    },
    stakeWithFees: ether(50_000),
    initialLiquidity: ether(50_000),
    minReportingStake: ether(500)
  },
  {
    id: '6',
    name: 'axie',
    imgSrc: '/covers/clearpool.png',
    coverFees: {
      min: 5,
      max: 7
    },
    apr: 12.03,
    utilizationRatio: 0,
    protection: 800000,
    liquidity: 11010000,
    key: '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000006',
    reportingPeriod: 7 * DAYS,
    resolutionSources: ['https://twitter.com/compoundfinance', 'https://medium.com/compound-finance', 'https://twitter.com/neptunemutual'],
    reassuranceToken: {
      at: '0xe8BAb5ca5eA0Fc93b2a4E1aD22376726ED209ed5',
      name: 'DAI Stablecoin',
      symbol: 'DAI',
      initialAmount: ether(50_000)
    },
    stakeWithFees: ether(50_000),
    initialLiquidity: ether(50_000),
    minReportingStake: ether(500)
  }
]
