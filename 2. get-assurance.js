import { ChainId, assurance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { weiAsNep } from './bn.js'

const get = async () => {
  try {
    const { key, coverName, assuranceToken } = info
    const { symbol } = assuranceToken

    const response = await assurance.get(ChainId.Mumbai, key)
    console.info('[%s Assurance] %s', coverName, weiAsNep(response.result, symbol))
  } catch (error) {
    console.error(error)
  }
}

get()
