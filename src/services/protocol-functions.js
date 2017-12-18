
class Protocol108 {
    constructor(_protocolInstance, _protocolAddress) {
        this.protocolInstance = _protocolInstance;
        this.protocolAddress = _protocolAddress;
    }

    version() {
        return new Promise((resolve, reject) => {
            this.protocolInstance.version((error, result) => {
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

    countdown() {
        return new Promise((resolve, reject) => {
            this.protocolInstance.countdown((error, result) => {
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

    initialize(value) {
        return new Promise((resolve, reject) => {
            web3.eth.sendTransaction({
                to: this.protocolAddress,
                value: value
            }, (error, result) => {
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

    cycle() {
        return new Promise((resolve, reject) => {
            this.protocolInstance.cycle((error, result) => {
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

    protocolState() {
        return this.cycle()
            .then(cycleValue => {
                if (cycleValue > 0) {
                    return this.countdown()
                        .then(countdownValue => {
                            return countdownValue > 0? "ACTIVE": "TERMINATED"
                        });
                }
                return "INACTIVE";
            });
    };

    getBalance(value) {
        return new Promise((resolve, reject) => {
            web3.eth.getBalance(this.protocolAddress, (error, result) => {
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

    countdownFormatted() {
        return this.countdown()
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

    executor() {
        return new Promise((resolve, reject) => {
            this.protocolInstance.executor((error, result) => {
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

    volume() {
        return new Promise((resolve, reject) => {
            this.protocolInstance.volume((error, result) => {
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

    validate(input) {
        return new Promise((resolve, reject) => {
            this.protocolInstance.validate(input, (error, result) => {
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

    pad(num, size) {
        var s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
}

export default Protocol108;