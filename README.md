# PIVXTipBot

This is the official repository for /u/pivxtipbot. More info about its use and integration will soon be added.

[![Build Status](https://travis-ci.com/CameraLucida/PIVXRedditTipBot.svg?branch=master)](https://travis-ci.com/CameraLucida/PIVXRedditTipBot)

# How to use it

The PIVX Reddit Tip Bot allows Reddit.com users to perform basic PIVX transactions between fellow redditors.

The bot interfaces with you via /u/pivxtipbot which will respond to the following commands via DM:

`!deposit` - this command generates a **one time** deposit address for your account. This address will therefore only be associated with your account for **one** transaction. You must generate a new deposit address every time you wish to reload your account. Every time you generate a new deposit address all previous addresses are invalidated, 

`!withdraw [the amount of piv] [your PIVX address]` - this command withdraws your PIVX to any PIVX address. The minimum amount of PIVX to withdraw is 0.1 PIV.

`!balance` - this command displays your account's balance in PIVX.

`!history` - this command lists all the tips you've ever either received or sent.

`!transactions` - this command displays the list of all the deposits and withdrawals of your Reddit TipBot account. 

To transfer funds or "tip" an user within Reddit you must reply `!pivxtip [the amount of piv]` to a thread or comment of the desired recipient within a supported Sub-Reddit (see below for list).
 
 
When you first engage with the bot - whether you receive a tip, send it a private message it or try to tip someone for the first time, you'll be greeted with a one-time DM from /u/pivxtipbot 


# Run it yourself

1. Install the required dependencies ([tutorial](https://nodesource.com/blog/installing-node-js-tutorial-ubuntu/)):

sudo apt-get update && sudo apt-get upgrade

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
Check the nodejs version:
    
    node -v
    
Install NPM globally

    sudo npm install npm --global

Prepare your machine for the bot

    sudo apt-get install mongodb
    sudo apt-get install make build-essential
    
2. Download and install the PIVX client ([official walkthrough](https://pivx.freshdesk.com/support/solutions/articles/30000024630-how-to-use-the-command-line-to-install-or-upgrade-pivx-and-start-staking-on-linux)):

Please check the latest PIVX client release at https://github.com/pivx-project/pivx/releases

    wget https://github.com/PIVX-Project/PIVX/releases/download/v3.1.1/pivx-3.1.1-x86_64-linux-gnu.tar.gz
    tar -xvzf pivx-3.1.1-x86_64-linux-gnu.tar.gz
    
We must now edit the pivx.config file to add the rpc settings to use on the config.json file of the bot

    mkdir ~/.pivx
    nano ~/.pivx/pivx.conf

Add the following lines to the file.  For the X's, press 16+ random keys on the keyboard.  You wil need to report these values to the config.json file of the bot:
    
    rpcuser=XXXXXXXXXXXXXXXX
    rpcpassword=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    rpcport=33333 //you can chose your preferred port
    enablezeromint=0 //the bot can't do zpiv yet!

Start the daemon

    ~/pivx-3.1.1/bin/pivxd -daemon
    
Encrypt wallet.dat

    ~/pivx-3.1.1/bin/pivx-cli encryptwallet mysupercomplexpasswordhere
    
Start the daemon again and unlock it with staking and anonymization off. The syntax is `walletpassphrase <passphrase> <unlock time> <for staking/anonymization only true/false>`

    ~/pivx-3.1.1/bin/pivx-cli walletpassphrase <passphrase>  0 false
    
 
Let the wallet sync


3. Set the PIVX Reddit Tip Bot up:

Git clone this repository and extract its content

    wget https://github.com/CameraLucida/PIVXRedditTipBot/archive/master.zip
    unzip master.zip

You must now customize your config.json file with your custom variables

    nano ~/master/src/data/config-example.json //save as config.json
    
Once the codebase is up to date to your preferences you must install npm


Git clone this repository, then run `npm install`. Make sure you have:

- A PIVX daemon (latest version) running on port 33333
- A MongoDB service running on default port

Then, run `npm start`.


LIST OF SUPPORTED SUBREDDITS (Please contact me if you'd like your subreddit to be listed or removed from this list):
/r/pivx
/
