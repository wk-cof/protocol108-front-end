## Setup
[All you need to know](http://truffleframework.com/boxes/webpack)

## Run

### Run truffle
```bash
truffle develop
```
The above starts a local etherium network and creates 10 accounts with 100 etherium in them. E.g.

```
Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

### Run webapp
```bash
npm run dev
```
This wil launch a front-end on http://localhost:8080

### Point metamask to the new accounts
* Switch MetaMask to localhost:9545
* Log out of your current metamask by pressing Lock
* Click on Restore from seed phrase
* Enter the mnemonic from the truffle output above

The above setup should let you launch the dapp.

## Debug contract
Get accounts in truffle console and use the instance of the study you deployed
```
var accounts;
web3.eth.getAccounts(function(err,res) { accounts = res; });
SimpleStudy.deployed().then(instance => instance.getMyUserName.call({from: accounts[2]}))
SimpleStudy.deployed().then(instance => instance.register("222222", {from: accounts[2]}))
```

If you want to re-deploy the contract
```
compile
migrate --reset
```

### If you transactions error out
There is an existing bug in metamask: [#1999](https://github.com/MetaMask/metamask-extension/issues/1999) that
causes transactions to fail. The only workaround I found was to re-install metamask extension.