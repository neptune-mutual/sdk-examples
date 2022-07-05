import BigNumber from 'bignumber.js'
import { config } from '@neptunemutual/sdk'

BigNumber.config({ EXPONENTIAL_AT: 99 })

const MULTIPLIER = config.constants.MULTIPLIER

const ether = (x) => new BigNumber((parseFloat(x.toString()) * 10 ** 18).toString()).toString()
const percentage = (x) => new BigNumber((x * MULTIPLIER).toString()).dividedBy(100).toString()
const weiToEther = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(18)).toString()
const formatPercent = (x) => Number(x).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
const formatCurrency = (x, symbol) => Number(x).toLocaleString(undefined, { currency: 'USD', style: 'currency', minimumFractionDigits: 2 })
const formatToken = (x, symbol) => Number(x).toLocaleString(undefined, { minimumFractionDigits: 2 }) + (` ${symbol}` || '')
const weiAsPercent = (x) => formatPercent(weiToEther(x))
const weiAsDollars = (x) => formatCurrency(weiToEther(x))
const weiAsToken = (x, symbol) => formatToken(weiToEther(x), symbol)
const weiAsNpm = (x) => formatToken(weiToEther(x), 'NPM')
const toDate = (x) => new Date(parseInt(x.toString()) * 1000)

const formatUnits = (x, decimals = 18) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(decimals)).toString()
const parseUnits = (x, decimals = 18) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(decimals)).toString()
const unitsAsDollars = (x, decimals) => formatCurrency(formatUnits(x, decimals))
const unitsAsToken = (x, decimals, symbol) => formatToken(formatUnits(x, decimals), symbol)
const toFraction = (x) => new BigNumber(x.toString()).dividedBy(config.constants.MULTIPLIER)

export {
  toFraction,
  formatUnits,
  parseUnits,
  unitsAsDollars,
  unitsAsToken,
  ether,
  percentage,
  weiToEther,
  formatPercent,
  weiAsPercent,
  weiAsDollars,
  weiAsToken,
  weiAsNpm,
  toDate
}
