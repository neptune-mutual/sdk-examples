import { ChainId, reassurance } from '@neptunemutual/sdk'
import { info } from './info.js'
import { weiAsToken } from './bn.js'

const get = async () => {
  try {
    const { key, coverName, reassuranceToken } = info

    console.info(key, coverName, reassuranceToken)
    const { symbol } = reassuranceToken

    const response = await reassurance.get(ChainId.Ropsten, key)
    console.info('[%s Reassurance] %s', coverName, weiAsToken(response.result, symbol))
  } catch (error) {
    console.error(error)
  }
}

get()
