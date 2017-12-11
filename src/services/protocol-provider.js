import protocolArtifacts from '../../build/contracts/Protocol108.json';
import { default as contract } from 'truffle-contract';

let Protocol108 = contract(protocolArtifacts);

Protocol108.setProvider(web3.currentProvider);
let accountsPromise = new Promise(function(resolve, reject) {
    /* global web3 */
    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
            alert('There was an error fetching your accounts.');
            reject('There was an error fetching your accounts.');
        }
        if (accs.length === 0) {
            alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
            reject('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        }
        resolve(accs);
    });
});

let protocolInstancePromise = accountsPromise.then(accs => {
    return Protocol108.deployed().then(instance => {
        return [instance, accs];
    });
});

export default {
    countdown() {
        return protocolInstancePromise.then(([instance, accounts]) => {
            return instance.countdown.call({from: accounts[0]});
        });
    },
    validate(input) {
        return protocolInstancePromise.then(([instance, accounts]) => {
            return instance.validate.call(input, {from: accounts[0]});
        });
    },
    execute(input) {
        return protocolInstancePromise.then(([instance, accounts]) => {
            return instance.execute({from: accounts[0]});
        });
    }
    // accountsPromise,
    // userNamePromise,
    // register(userName) {
    //     return protocolInstancePromise.then(([instance, accounts]) => {
    //         return instance.register(userName, {from: accounts[0]});
    //     });
    // },
    // enrollPatient(patientAddress, firstName, lastName) {
    //     return protocolInstancePromise.then(([instance, accounts]) => {
    //         return instance.enrollPatient(patientAddress, firstName, lastName, {from: accounts[0]});
    //     });
    // },
    // getPatients() {
    //     return protocolInstancePromise.then(([instance, accounts]) => {
    //         return instance.getMyPatients.call({from: accounts[0]});
    //     });
    // },
    // getPatientName(patientAddress) {
    //     return protocolInstancePromise.then(([instance, accounts]) => {
    //         return instance.getMyPatientName.call(patientAddress, {from: accounts[0]});
    //     });
    // },
};
