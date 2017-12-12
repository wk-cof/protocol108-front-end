<template>
    <div>
        <h3>Protocol 108</h3>
        <b-alert
                variant="danger"
                dismissible
                :show="!isSequenceValid"
                @dismissed="isSequenceValid=true">
        Invalid Sequence
        </b-alert>
        <b-form inline>
            <label class="sr-only" for="sequenceInput">Sequence</label>
            <b-input id="sequenceInput" placeholder="Sequence" v-model="sequenceInput" />
            <b-button type="submit" variant="primary" @click="execute">Execute protocol</b-button>
        </b-form>
    </div>
</template>

<script>
import ProtocolProvider from '../services/protocol-provider';

export default {
    data: function() {
        return {
            coundown: 0,
            sequenceInput: '',
            isSequenceValid: true,
            errorMessage: ''
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
        execute() {
            let numberSequence;
            try {
                numberSequence = parseInt(this.sequenceInput) || 0;
            } catch (err) {
                this.isSequenceValid = false;
                this.errorMessage = 'Input is not an integer';
                return;
            }

            ProtocolProvider.validate(numberSequence)
                .then(_isValid => {
                    this.isSequenceValid = _isValid;
                    if (_isValid) {
                        return ProtocolProvider.initialize(100);
                    }
                })
                .catch(err => {
                    console.error('Execution failed. ' + err);
                    this.errorMessage = err;
                    this.isSequenceValid = false;
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
