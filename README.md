# Splinterlib 🔮

Helper library for Splinterlands APIs

## ℹ️ What is Splinterlands?

Splinterlands is a digital NFT collectable card game that runs on the Hive blockchain.
Its a lot like Magic the Gathering.
What makes an NFT/blockchain game different is "true player ownership" of assets.
In other words you can buy, sell, trade, or rent any of your assets with other players.

## 📋 Usage

### Install

``` bash
npm install --save @knowdev/splinterlib
```

### Require

``` javascript
const Splinterlib = require("@knowdev/splinterlib");
```

See "Reference" (below) for a detailed API

### Enable Logging

Requires a separate package which is already installed as a dependency

``` bash
npm install --save @knowdev/log
```

``` javascript
const log = require("@knowdev/log");

Splinterlib.setLogger(log);
```

## 📖 Reference

### Wrapped Functions 🪄

More convenient set of functions that interact with the underlying API

#### Async Battle History Iterator

N/A

### Direct API 🌐

Direct implementations of the Splinterlands API with minimal parsing of encoded types

#### Battle History

``` javascript
/** Returns array of result objects */
const results = await Splinterlib.battleHistoryApi(
  player,         // Required string
  {
    beforeBlock,  // Optional integer, starting Hive block to retrieve backwards from (defaults to current block)
    limit,        // Optional integer, number of results (default 50)
    raw,          // Optional boolean, skip parsing encoded objects and dates in results (default false)
    types,        // Advanced: optional string, defaults to "sm_battle,battle"
    queryParams,  // Advanced: optional object of additional parameters to pass to endpoint
  }
);
```

## 🚀 Deployment

`npm publish --access=public`

## 📝 Changelog

* 0.1.0: Battle history API

## 🛣 Roadmap

* 0.2.0: Battle history iterator

### Wishlist 🌠

* All of the APIs! ⚡️🧙‍♂️⚡️

## 📜 License

All rights reserved. Safe for use around pets.
