# Quickstart

Welcome to the Neptune Mutual SDK quick-start guide. If you are new to Neptune Mutual, you might want to first read the documentation.

After completing these initial steps, you will be ready to start developing on top of Neptune Mutual protocol using Typescript or Javascript. We assume that you have fundamental understanding of javascript, node, git, solidity, evm, ethers/web3, and other related technologies.

> Join our telegram channel [@neptunemutualchat](https://t.me/neptunemutualchat) if you have questions or need support.

## Install SDK

The Cover SDK is an NPM package that requires Node 12.14.1 or above.

```
npm install @neptunemutual/sdk
```

## About the SDK

The Cover SDK assists developers to build on top of Neptune Mutual protocol. The SDK is built using Typescript and is intended to work on both browser and node environments. If you encounter an issue, create a new Github issue and let us know.

**Import the package**

```javascript
import sdk from "@neptunemutual/sdk";
```

**Import required features only**

```javascript
import {
  ChainId,
  cover,
  provision,
  assurance,
  liquidity,
  policy,
  cToken,
  registry,
  types,
  entities,
  config,
} from "@neptunemutual/sdk";
```

## Usage Guides

[https://docs.neptunemutual.com/sdk/quickstart](https://docs.neptunemutual.com/sdk/quickstart)
