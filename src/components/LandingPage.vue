<template>
    <div>
        <h3>Welcome to THE BUTTON</h3>
        <p>Countdown</p>
        <b-button type="submit" variant="primary" @click="execute">Press me</b-button>
    </div>
</template>

<script>
import ProtocolProvider from '../services/protocol-provider';

export default {
    data: function() {
        return {
            coundown: 0
        };
    },
    methods: {
        countdown() {
            ProtocolProvider.countdown()
                .then(result => {
                    console.log(result);
                    this.countdown = result;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        execute(input) {
            ProtocolProvider.initialize(100)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log('invalid' + err);
            });
        },
        getBalance() {
            ProtocolProvider.getBalance()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.error(err);
            });
        },
        protocolState() {
            ProtocolProvider.protocolState()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    created: function() {
        // this.countdown();
        // this.validate(0);
        // this.execute(0);
        // this.getBalance();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
