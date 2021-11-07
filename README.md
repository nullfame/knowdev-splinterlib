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

* [Wrapped Functions](#wrapped-functions-) 🪄
  * [Async Battle History Iterator](#async-battle-history-iterator) (`battleHistoryAsyncIterator`)
* [Helper Functions](#helper-functions-) 💁
  * [Battle Filter](#battle-filter) (`battleFilter`)
* [Direct API](#direct-api-) 🌐
  * [Battle History](#battle-history) (`battleHistoryApi`)
  * [Card Details](#card-details) (`cardDetailsApi`)
* [Constants](#constants-) 💬
  * [`BATTLE`](#battle)
  * [`CARD`](#card)
  * [`LEAGUE`](#league)
    * [`SUMMONER_CAPS`](#leaguesummoner_caps)
  * [`RULESET`](#ruleset)
  * [`SPLINTER`](#splinter)

### Wrapped Functions 🪄

More convenient set of functions that interact with the underlying API

#### Async Battle History Iterator

``` javascript
/** Returns asyncIterator (see below) */
const battleHistory = await Splinterlib.battleHistoryAsyncIterator(
  player,         // Required string
  {
    beforeBlock,  // Optional integer, starting Hive block to retrieve backwards from (defaults to current block)
    filter,       // Optional function returning true or false as to whether to include this battle in results (see "Battle Filter" below)
    limit,        // Optional integer, number of results per API call
    max,          // Optional integer, maximum results to return
    resultsClass, // Optional class, used to instantiate each result
  }
)

for await (const battle of battleHistory) {
  //
}
```

### Helper Functions 💁

#### Battle Filter

``` javascript
/** Returns function */
const filter = Splinterlib.battleFilter({
  format,           // Optional string, from BATTLE.FORMAT constant (below)
  ignoreSurrender,  // Optional boolean, default true
  league,           // Optional string, from LEAGUE constant (below)
  loser,            // Optional string, losing player
  mana,             // Optional integer, mana cap of match
  manaPlusMinus,    // Optional integer, range around mana to include, default 0
  ruleset,          // Optional array, from RULESET constant (below)
  rulesetAnd,       // Optional boolean, require all rulesets, default false
  splinter,         // Optional array, from SPLINTER constant (below)
  winner,           // Optional string, winning player
})
```

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

#### Card Details

``` javascript
/** Returns array of card details */
const results = await Splinterlib.cardDetailsApi();
```

### Constants 💬

``` javascript
const {
  BATTLE,
  CARD,
  LEAGUE,
  RULESET,
  SPLINTER,
} = require("@knowdev/splinterlib");
```

#### BATTLE

* `BATTLE.FORMAT`
  * `BATTLE.FORMAT.ALPHA`
  * `BATTLE.FORMAT.ALPHA_BETA`
  * `BATTLE.FORMAT.GOLD`
  * `BATTLE.FORMAT.MODERN`
  * `BATTLE.FORMAT.NO_LEGENDARIES`
  * `BATTLE.FORMAT.NO_LEGENDARY_SUMMONERS`
  * `BATTLE.FORMAT.UNTAMED`
  * `BATTLE.FORMAT.UNTAMED_DICE`
  * `BATTLE.FORMAT.WILD`
* `BATTLE.TYPE`
  * `BATTLE.TYPE.BRAWL`
  * `BATTLE.TYPE.RANKED`
  * `BATTLE.TYPE.SURRENDER`
  * `BATTLE.TYPE.TOURNAMENT`

#### CARD

* `CARD.EDITION`
  * `CARD.EDITION.ALPHA`
  * `CARD.EDITION.ALPHA_BETA`
  * `CARD.EDITION.BETA`
  * `CARD.EDITION.PROMO`
  * `CARD.EDITION.REWARD`
  * `CARD.EDITION.UNTAMED`
  * `CARD.EDITION.DICE`
  * `CARD.EDITION.GLADIUS`
* `CARD.RARITY`
  * `CARD.RARITY.COMMON`
  * `CARD.RARITY.RARE`
  * `CARD.RARITY.EPIC`
  * `CARD.RARITY.LEGENDARY`
* `CARD.TYPE`
  * `CARD.TYPE.MONSTER`
  * `CARD.TYPE.SUMMONER`

#### LEAGUE

* `LEAGUE.NOVICE`
* `LEAGUE.BRONZE`
* `LEAGUE.SILVER`
* `LEAGUE.GOLD`
* `LEAGUE.DIAMOND`
* `LEAGUE.CHAMPION`

##### LEAGUE.SUMMONER_CAPS

Each key contains an object with `COMMON`, `RARE`, `EPIC`, and `LEGENDARY`

* `LEAGUE.SUMMONER_CAPS.NOVICE`
* `LEAGUE.SUMMONER_CAPS.BRONZE`
* `LEAGUE.SUMMONER_CAPS.SILVER`
* `LEAGUE.SUMMONER_CAPS.GOLD`
* `LEAGUE.SUMMONER_CAPS.DIAMOND`
* `LEAGUE.SUMMONER_CAPS.CHAMPION`

#### RULESET

* `RULESET.AIM_TRUE`
* `RULESET.ARMORED_UP`
* `RULESET.BACK_TO_BASICS`
* `RULESET.BROKEN_ARROWS`
* `RULESET.CLOSE_RANGE`
* `RULESET.EARTHQUAKE`
* `RULESET.EQUAL_OPPORTUNITY`
* `RULESET.EQUALIZER`
* `RULESET.EVEN_STEVENS`
* `RULESET.EXPLOSIVE_WEAPONRY`
* `RULESET.FOG_OF_WAR`
* `RULESET.HEALED_OUT`
* `RULESET.HEAVY_HITTERS`
* `RULESET.HOLY_PROTECTION`
* `RULESET.KEEP_YOUR_DISTANCE`
* `RULESET.LITTLE_LEAGUE`
* `RULESET.LOST_LEGENDARIES`
* `RULESET.LOST_MAGIC`
* `RULESET.MELEE_MAYHEM`
* `RULESET.NOXIOUS_FUMES`
* `RULESET.ODD_ONES_OUT`
* `RULESET.REVERSE_SPEED`
* `RULESET.RISE_OF_THE_COMMONS`
* `RULESET.SILENCED_SUMMONERS`
* `RULESET.SPREADING_FURY`
* `RULESET.STAMPEDE`
* `RULESET.STANDARD`
* `RULESET.SUPER_SNEAK`
* `RULESET.TAKING_SIDES`
* `RULESET.TARGET_PRACTICE`
* `RULESET.UNPROTECTED`
* `RULESET.UP_CLOSE_AND_PERSONAL`
* `RULESET.WEAK_MAGIC`

#### SPLINTER

* `SPLINTER.DEATH`
* `SPLINTER.DRAGON`
* `SPLINTER.EARTH`
* `SPLINTER.FIRE`
* `SPLINTER.LIFE`
* `SPLINTER.WATER`

## 🚀 Deployment

`npm publish --access=public`

## 📝 Changelog

* 0.3.0: Battle filter
* 0.2.1: Constants
* 0.2.0: Battle history iterator
* 0.1.0: Battle history API

## 🛣 Roadmap

* Card Universe
  * x-Refresh
    * x-API Call
  * x-SPLINTERLIB_FETCH_CARDS
  * x-SPLINTERLIB_FETCH
  * x-Iterator
    * Card Filter
    * Card Sort
  * Card images
    * Crop
* Player collection
  * Card filter
* Battle Summary
  * Mana
  * Rulesets
  * Available splinters
  * Monster
    * Damage
      * Blocked
      * Kills
    * Taken
    * Move (position)
      * Count
    * Killed (round)
      * Position
* Multi-filter

### Wishlist 🌠

All of the APIs! ⚡️🧙‍♂️⚡️

* 🔮 Active quest
* 🛡 Follow
* 🛡 Report

## 📜 License

All rights reserved. Safe for use around pets.
