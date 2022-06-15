import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 99 })

const MULTIPLIER = 10_000

const ether = (x) => BigNumber((parseFloat(x.toString()) * 10 ** 18).toString()).toString()
const percentage = (x) => BigNumber((x * MULTIPLIER).toString()).dividedBy(100).toString()
const weiToEther = (x) => parseInt(x.toString()) / 10 ** 18
const formatPercent = (x) => Number(x).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
const formatCurrency = (x, symbol) => Number(x).toLocaleString(undefined, { currency: 'USD', style: 'currency', minimumFractionDigits: 2 })
const formatToken = (x, symbol) => Number(x).toLocaleString(undefined, { minimumFractionDigits: 2 }) + (` ${symbol}` || '')
const weiAsPercent = (x) => formatPercent(weiToEther(x))
const weiAsDollars = (x) => formatCurrency(weiToEther(x))
const weiAsToken = (x, symbol) => formatToken(weiToEther(x), symbol)
const weiAsNpm = (x) => formatToken(weiToEther(x), 'NPM')
const toDate = (x) => new Date(parseInt(x.toString()) * 1000)


const networks = {
  1: {
    approximateBlockTime: 15
  },
  3: {
    approximateBlockTime: 12
  },
  42: {
    approximateBlockTime: 4
  },
  97: {
    approximateBlockTime: 3
  },
  80001: {
    approximateBlockTime: 3

  },
  31337: {
    approximateBlockTime: 1
  }
}

const minutesToBlocks = (chainId, minutes) => {
  const seconds = minutes * 60
  const { approximateBlockTime } = networks[chainId]

  return seconds / approximateBlockTime
}

export {
  ether,
  percentage,
  weiToEther,
  formatPercent,
  weiAsPercent,
  weiAsDollars,
  weiAsToken,
  weiAsNpm,
  toDate,
  minutesToBlocks
}