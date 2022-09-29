import { ChainId, liquidity, registry, utils } from '@neptunemutual/sdk'
import { info } from '../../configs/info.js'
import { getProvider } from '../../provider.js'
import { parseUnits, unitsAsDollars } from '../../bn.js'

const add = async () => {
  const { key, coverName } = info
  const provider = getProvider()
  const dai = await registry.Stablecoin.getInstance(ChainId.Mumbai, provider)
  const decimals = await dai.decimals()

  const amount = parseUnits(150, decimals)
  const stake = parseUnits(250)
  const referralCode = utils.keyUtil.toBytes32('')

  let response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
  console.info('[%s Liquidity] Before: %s', coverName, unitsAsDollars(response.result, decimals))

  // approve DAI for liquidity
  response = await liquidity.approve(ChainId.Mumbai, key, { amount }, provider)
  await response.result.wait()

  // approve NPM for stake
  response = await liquidity.approveStake(ChainId.Mumbai, key, { amount: stake }, provider)
  await response.result.wait()

  response = await liquidity.add(ChainId.Mumbai, key, amount, stake, provider, referralCode)
  console.info(response)

  await response.result.wait()

  response = await liquidity.getBalance(ChainId.Mumbai, key, provider)
  console.info('[%s Liquidity] After: %s', coverName, unitsAsDollars(response.result, decimals))
}

add()

/*****************************************************************************
[info] [Animated Brands Liquidity] Before: US$3,212,076.42
[info] {
  status: 'Success',
  result: {
    type: 2,
    chainId: 80001,
    nonce: 10,
    maxPriorityFeePerGas: BigNumber { _hex: '0x1c2346ca50', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x1c2346ca50', _isBigNumber: true },
    gasPrice: null,
    gasLimit: BigNumber { _hex: '0x06bed3', _isBigNumber: true },
    to: '0x0b0520Fd470126E6A557e80C45670F7F071fDbFb',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0xb8c06a88616e696d617465642d6272616e647300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008f0d18000000000000000000000000000000000000000000000000d8d726b7177a800000000000000000000000000000000000000000000000000000000000000000000',
    accessList: [],
    hash: '0xff9fedd15548dee9fa89b515614986169922644836db25d770882832cc0d8bc5',
    v: 1,
    r: '0xe94d2aedf18d78dd1fa9432a2595a4c73dfe74abe73936c8ead6975575f4b392',
    s: '0x0f839541af6983e34e9e6422037f559ceee83e3f9a3bd36d9d0e6e7aca15fa68',
    from: '0x2DAc3776B9f4243DF6445515eBE6F6Cd003B3681',
    confirmations: 0,
    wait: [Function (anonymous)]
  }
}
[info] [Animated Brands Liquidity] After: US$3,212,226.42
*****************************************************************************/
