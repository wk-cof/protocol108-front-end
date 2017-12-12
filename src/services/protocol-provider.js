const protocol108Address = "0x35df88a99dd25da942d8d99d9344495b6857eec0";
import protocol108abi from './protocol-abi';

let countdown, execute, initialize;
let retVal = {
    countdown: null,
    countdownFormatted: null,
    cycle: null,
    initialize: null,
    protocolState: null,
    getBalance: null,
    executor: null,
    volume: null,
    validate: null
};

function pad(num, size) {
    var s = num + '';
    while (s.length < size) {
        s = '0' + s;
    }
    return s;
}

if (typeof web3 !== 'undefined') {
    // web3 is deprecated, https://github.com/MetaMask/faq/blob/master/detecting_metamask.md#web3-deprecation
    web3 = new Web3(web3.currentProvider);
    const protocol108 = web3.eth.contract(protocol108abi).at(protocol108Address);
    // console.log("protocol address: " + protocol108Address);

    retVal.version = function() {
        return new Promise(function(resolve, reject) {
            protocol108.version(function(error, result) {
                if(error) {
                    // console.warn("error getting protocol version: " + error);
                    reject(error);
                }
                else {
                    const protocolVersion = result.toNumber();
                    // console.log("protocol version: " + protocolVersion);
                    resolve(protocolVersion);
                }
            });
        });
    };

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
    };

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
        });
    };

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
    };

    retVal.protocolState = function() {
        return retVal.cycle()
            .then(cycleValue => {
                if (cycleValue > 0) {
                    return retVal.countdown()
                        .then(countdownValue => {
                            return countdownValue > 0? "ACTIVE": "TERMINATED"
                        });
                }
                return "INACTIVE";
            });
    };

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
    };

    retVal.countdownFormatted = function() {
        return retVal.countdown()
            .then(countdownValue => {
                let countdownMinutes = countdownValue / 60 | 0;
                let countdownSeconds = countdownValue % 60;

                countdownMinutes = pad(countdownMinutes, 2);
                countdownSeconds = pad(countdownSeconds, 2);

                const countdownFormatted = countdownValue > 0? countdownMinutes + ":" + countdownSeconds: "𓋴𓏲𓍒:𓄿𓏱";
                console.log("countdown formatted: " + countdownFormatted);
                return countdownFormatted;
            });
    };

    retVal.executor = function() {
        return new Promise(function(resolve, reject) {
            protocol108.executor(function(error, result) {
                if(error) {
                    console.warn("error getting last executor: " + error);
                    reject(error);
                }
                else {
                    const lastExecutor = result.toString();
                    console.log("last executor: " + lastExecutor);
                    resolve(lastExecutor);
                }
            });
        });
    };

    retVal.volume = function() {
        return new Promise(function(resolve, reject) {
            protocol108.volume(function(error, result) {
                if(error) {
                    console.warn("error getting protocol volume: " + error);
                    reject(error);
                }
                else {
                    const volumeFormatted = web3.fromWei(result.toNumber(), "ether") + " ETH";
                    console.log("protocol volume: " + volumeFormatted);
                    resolve(volumeFormatted);
                }
            });
        });
    };

    retVal.validate = function(input) {
        return new Promise(function(resolve, reject) {
            protocol108.validate(input, function(error, result) {
                if(error) {
                    console.warn("The input is invalid: " + error);
                    reject(error);
                }
                else {
                    console.log("The input is valid");
                    resolve(result);
                }
            });
        });
    };
}
else {
    // not a web3 browser
    alert('Web3 is not supported in your browser. Did you install <a href="https://metamask.io/">MetaMask Plugin?</a>');
}


export default retVal;
