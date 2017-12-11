const protocol108Address = "0x35df88a99dd25da942d8d99d9344495b6857eec0";
const protocol108abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "cycle",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "executor",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "volume",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "countdown",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "execute",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
];

let countdown, execute, initialize;
let retVal = {};

if (typeof web3 !== 'undefined') {
    // web3 is deprecated, https://github.com/MetaMask/faq/blob/master/detecting_metamask.md#web3-deprecation
    web3 = new Web3(web3.currentProvider);

    const protocol108 = web3.eth.contract(protocol108abi).at(protocol108Address);

    console.log("protocol address: " + protocol108Address);

    retVal.version = function() {
        return new Promise(function(resolve, reject) {
            protocol108.version(function(error, result) {
                if(error) {
                    console.warn("error getting protocol version: " + error);
                    reject(error);
                }
                else {
                    const protocolVersion = result.toNumber();
                    console.log("protocol version: " + protocolVersion);
                    resolve(protocolVersion);
                }
            });
        });
    }

    retVal.countdown = function() {
        return new Promise(function(resolve, reject) {
            protocol108.countdown(function(error, result) {
                if(error) {
                    console.warn("error getting countdown value: " + error);
                    reject(error);
                }
                else {
                    const countdownValue = result.toNumber();
                    resolve(countdownValue);
                }
            });
        });
    }

    retVal.initialize = function(value) {
        return new Promise(function(resolve, reject) {
            web3.eth.sendTransaction({
                to: protocol108Address,
                value: value
            }, function(error, result) {
                if(error) {
                    console.warn("protocol execution error: " + error);
                    reject(error);
                }
                else {
                    console.log("successfully executed the protocol: " + result);
                    resolve(result);
                }
            });
            // protocol108.execute.call(function(error, result) {
            //     if(error) {
            //         console.warn("protocol execution error: " + error);
            //         reject(error);
            //     }
            //     else {
            //         console.log("successfully executed the protocol: " + result);
            //         resolve(result);
            //     }
            // })
        });
    }

    retVal.cycle = function() {
        return new Promise(function(resolve, reject) {
            protocol108.cycle(function(error, result) {
                if(error) {
                    console.warn("error getting cycle value: " + error);
                    reject(error);
                }
                else {
                    const cycleValue = result.toNumber();
                    console.log("cycle count: " + cycleValue);
                    resolve(cycleValue);
                }
            });
        });
    }

    retVal.protocolState = function() {
        return retVal.cycle()
            .then(cycleValue => {
                return cycleValue > 0? countdownValue > 0? "ACTIVE": "TERMINATED" : "INACTIVE"
            });
    }

    retVal.getBalance = function(value) {
        return new Promise(function(resolve, reject) {
            web3.eth.getBalance(protocol108Address, function(error, result) {
                if(error) {
                    console.warn("error getting current reward value: " + error);
                    reject(error);
                }
                else {
                    const rewardFormatted = web3.fromWei(result.toNumber(), "ether") + " ETH";
                    console.log("current reward: " + rewardFormatted);
                    resolve(rewardFormatted);
                }
            });
        });
    }

    // initialize = function() {
    //     return new Promise(function(resolve, reject) {
    //         web3.eth.sendTransaction({
    //             to: protocol108Address,
    //             value: value
    //         }, function(error, result) {
    //             if(error) {
    //                 console.warn("protocol execution error: " + error);
    //                 reject(error);
    //             }
    //             else {
    //                 console.log("successfully executed the protocol: " + result);
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    function update() {
        protocol108.countdown(function(error, result) {
            if(error) {
                console.warn("error getting countdown value: " + error);
            }
            else {
                const countdownValue = result.toNumber();
                console.log("countdown value: " + countdownValue);

                var countdownMinutes = countdownValue / 60 | 0;
                var countdownSeconds = countdownValue % 60;

                countdownMinutes = pad(countdownMinutes, 2);
                countdownSeconds = pad(countdownSeconds, 2);

                const countdownFormatted = countdownValue > 0? countdownMinutes + ":" + countdownSeconds: "𓋴𓏲𓍒:𓄿𓏱";
                console.log("countdown formatted: " + countdownFormatted);


                protocol108.cycle(function(error, result) {
                    if(error) {
                        console.warn("error getting cycle value: " + error);
                    }
                    else {
                        const cycleValue = result.toNumber();
                        console.log("cycle count: " + cycleValue);

                        const protocolState = cycleValue > 0? countdownValue > 0? "ACTIVE": "TERMINATED" : "INACTIVE"
                        console.log("protocol state: " + protocolState);

                    }
                });
            }
        });

        protocol108.executor(function(error, result) {
            if(error) {
                console.warn("error getting last executor: " + error);
            }
            else {
                const lastExecutor = result.toString();
                console.log("last executor: " + lastExecutor);
            }
        });

        web3.eth.getBalance(protocol108Address, function(error, result) {
            if(error) {
                console.warn("error getting current reward value: " + error);
            }
            else {
                const rewardFormatted = web3.fromWei(result.toNumber(), "ether") + " ETH";
                console.log("current reward: " + rewardFormatted);
            }
        });

        protocol108.volume(function(error, result) {
            if(error) {
                console.warn("error getting protocol volume: " + error);
            }
            else {
                const volumeFormatted = web3.fromWei(result.toNumber(), "ether") + " ETH";
                console.log("protocol volume: " + volumeFormatted);
            }
        });
    }
}
else {
    // not a web3 browser
    alert('Web3 is not supported in your browser. Did you install <a href="https://metamask.io/">MetaMask Plugin?</a>');
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

export default retVal;
