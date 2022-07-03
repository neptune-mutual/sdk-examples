import { ChainId, provision } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { weiAsNpm } from '../../bn.js'

const get = async () => {
  try {
    const { key, coverName } = info
    const response = await provision.get(ChainId.Mumbai, key)

    console.info('[%s Provision] %s', coverName, weiAsNpm(response.result))
  } catch (error) {
    console.error(error)
  }
}

get()
