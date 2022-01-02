import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 99 })

const ether = (x) => BigNumber((parseFloat(x.toString()) * 10 ** 18).toString()).toString()
const weiToEther = (x) => parseInt(x.toString()) / 10 ** 18
const formatPercent = (x) => Number(x).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
const formatCurrency = (x, symbol) => Number(x).toLocaleString(undefined, { currency: 'USD', style: 'currency', minimumFractionDigits: 2 })
const formatToken = (x, symbol) => Number(x).toLocaleString(undefined, { minimumFractionDigits: 2 }) + (` ${symbol}` || '')
const weiAsPercent = (x) => formatPercent(weiToEther(x))
const weiAsDollars = (x) => formatCurrency(weiToEther(x))
const weiAsToken = (x, symbol) => formatToken(weiToEther(x), symbol)
const weiAsNpm = (x) => formatToken(weiToEther(x), 'NPM')
const toDate = (x) => new Date(parseInt(x.toString()) * 1000)

export {
  ether,
  weiToEther,
  formatPercent,
  weiAsPercent,
  weiAsDollars,
  weiAsToken,
  weiAsNpm,
  toDate
}
