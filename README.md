# BillyBucks MiningPool
Tha balanced mining pool for the BillyBuck Framework

This repository contains the code to run the BillyBucks hardware inequality balancing mining pool.
It is based on a fork of the Node-Mining-Pool whose original Readme is included in the repository as OriginaREADME.md

# Pre-Requisites
- The project assumes you are running the Mining Pool on an Ubuntu or similar linux operating system

- Install Node.js
```text
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash
sudo apt-get install -y nodejs
```
- Install Redis
```text
sudo apt-get install redis-server
```
* libssl required for the node-multi-hashing module
  * For Ubuntu: `sudo apt-get install libssl-dev`

* Boost is required for the cryptoforknote-util module
  * For Ubuntu: `sudo apt-get install libboost-all-dev`
  
* libsodium  
  * For Ubuntu: `sudo apt-get install libsodium-dev`

## Create A New User
It is adviced to create a new user for running the mining pool.
```bash
sudo adduser --disabled-password --disabled-login your-user
```
To login with this user : 
```
sudo su - your-user
```

# Build Process of the NPM Dependencies
Using Node.js v12 run the following command from the root directory
> npm rebuild
> npm install

# Config File Changes
A full rundown of the config options are included in the OriginalREADME.md.
This project changes the following:
- Changes to the ports used for communicating with the blockchain. This is in line with the [BillyBucks Blockchain repository](https://github.com/BBThornton/BillyBucksBlockchain)
```sh
"daemon": {
        "host": "127.0.0.1",
        "port": 22222
    },
    "wallet": {
        "host": "127.0.0.1",
        "port": 22223,
        "password": "password"
    },
```
- Changed the apiInterfaces line to BillyBucks

# Start the Mining Pool
To start the BillyBucks mining pool you need to start the [BillyBucks Blockchain](https://github.com/BBThornton/BillyBucksBlockchain)

A BillyBucks Daemon will need to be run on the same machine as the mining pool using the following command:
```sh
./BillyBucksd --allow-local-ip --log-level 4 --enable-blockexplorer
```
Note the use of the --enable-blockexplorer which is required to allow the mining pool to monitor the current block height.

Additionally the wallet-api will also need to be run to allow the mining pool to pay miners:
```sh
./wallet-api --scan-coinbase-transactions --rpc-password password --log-level 4 --log-file apilog --enable-cors "*"
```

Finally a Curl command needs to be made to the wallet-api to open the wallet that will be used for the mining pool.
This assumes that a wallet (that will be used by the mining pool) has already been created using zedwallet.
Where the file name needs to be changed according to the name and location of your mining pools waller.
```sh
curl -X POST "http://127.0.0.1:22223/wallet/open" -H "accept: application/json" -H "X-API-KEY: password" -H "Content-Type: application/json" -d "{ \"daemonHost\": \"127.0.0.1\", \"daemonPort\": 22222, \"filename\": \"/home/billy/BillyBucks/PoolWallet.wallet\", \"password\": \"pool\"}"
```

After all these prerequisites have been met the pool can be started using
> node init.js

