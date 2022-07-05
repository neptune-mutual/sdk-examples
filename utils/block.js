
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

export { minutesToBlocks }
