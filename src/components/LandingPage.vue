<template>
    <div>
        <h3>Welcome to THE BUTTON</h3>

        <b-button type="submit" variant="primary">Press me</b-button>
    </div>
</template>

<script>
import ProtocolProvider from '../services/protocol-provider';

export default {
    data: function() {
        return {
            isRegistered: false
        };
    },
    methods: {
        countdown() {
            ProtocolProvider.countdown()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        validate(input) {
            ProtocolProvider.validate(input)
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log('invalid' + err);
                });
        },
        execute(input) {
            ProtocolProvider.execute()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log('invalid' + err);
            });
        }
    },
    created: function() {
        this.countdown();
        // this.validate(0);
        // this.execute(0);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
