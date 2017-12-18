import protocol108abi from './protocol-abi';
import Protocol108Class from './protocol-functions';

const contractAddresses = {
    rinkeby: {
        v1: '0x35df88a99dd25da942d8d99d9344495b6857eec0',
        v2: '0xba7a129933519ab9aae0f97d5456b76e26fbf7f3',
    },
    ropsten: {
        v1: '0x018b4f94672f015aaA9454B398cb9A50981D88c7',
        v2: '0x9d1F64Df3019eea83D35C350a0FDA1f9563B7cFA',
    }
};

let protocol108Address;
let returnPromise = new Promise(function(resolve, reject) {
    if (typeof web3 !== 'undefined') {
        // web3 is deprecated, https://github.com/MetaMask/faq/blob/master/detecting_metamask.md#web3-deprecation
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                    console.log('This is mainnet');
                    break;
                case "2":
                    console.log('This is the deprecated Morden test network.');
                    break;
                case "3":
                    console.log('This is the ropsten test network.');
                    protocol108Address = contractAddresses.ropsten.v1;
                    break;
                case '4':
                    console.log('This is the rinkeby test network.');
                    protocol108Address = contractAddresses.rinkeby.v1;
                    break;
                default:
                console.log('This is an unknown network.');
            }
            if (!protocol108Address) {
                return reject('Protocol is currently not deployed on this network');
            }
            const protocolInstance = web3.eth.contract(protocol108abi).at(protocol108Address);
            resolve(new Protocol108Class(protocolInstance, protocol108Address));
        });
    }
    else {
        // not a web3 browser
        const errMsg = 'Web3 is not supported in your browser. Did you install <a href="https://metamask.io/">MetaMask Plugin?</a>';
        alert(errMsg);
        reject(errMsg);
    }
});

export default returnPromise;
