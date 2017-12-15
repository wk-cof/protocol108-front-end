<template>
    <div class="text-success" id="protocol-component">
        <!-- <h3>Protocol 108</h3> -->
        <b-alert    variant="danger"
                    dismissible
                    :show="toasts.displayError"
                    @dismissed="toasts.displayError=false">
        Invalid Sequence
        </b-alert>
        <b-alert    variant="success"
                    dismissible
                    :show="isExecutionSuccessful"
                    @dismissed="isExecutionSuccessful=false">
        Execution Successful
        </b-alert>

        <flip-clock v-bind:seconds="timer.coundown" v-if="timer.display"></flip-clock>
        <b-input-group left="wei" class="protocol-input">
            <b-input id="sendAmount" placeholder="1" v-model="sendAmount" />
        </b-input-group>
        <b-input id="sequenceInput"  class="protocol-input" placeholder="Sequence" v-model="sequenceInput" />
        <b-button class="execute-button" type="submit" variant="success" @click="execute">Execute protocol</b-button>
    </div>
</template>

<script>
import ProtocolProvider from '../services/protocol-provider';
import FlipClock from './FlipClock';

export default {
    data: function() {
        return {
            timer: {
                coundown: 0,
                display: false
            },
            sequenceInput: '',
            sendAmount: 1,
            toasts: {
                displayError: false
            },
            isExecutionSuccessful: false,
            errorMessage: ''
        };
    },
    methods: {
        countdown() {
            ProtocolProvider.countdown()
                .then(result => {
                    this.timer.display = true;
                    this.timer.coundown = result;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        execute() {
            let numberSequence, weiAmount;
            try {
                numberSequence = parseInt(this.sequenceInput) || 0;
                weiAmount = parseInt(this.sendAmount) || 1;
            } catch (err) {
                this.toasts.displayError = true;
                this.errorMessage = 'Input is not an integer';
                return;
            }

            ProtocolProvider.validate(numberSequence)
                .then(_isValid => {
                    this.toasts.displayError = !_isValid;
                    if (_isValid) {
                        return ProtocolProvider.initialize(weiAmount)
                            .then(() => {
                                this.isExecutionSuccessful = true;
                            });
                    }
                })
                .catch(err => {
                    console.error('Execution failed. ' + err);
                    this.errorMessage = err;
                    this.toasts.displayError = true;
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
        this.countdown();
    },
    components: {
        'flip-clock': FlipClock
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sendAmount {
    width: 70px;
}
#protocol-component {
    display: flex;           /* establish flex container */
    flex-direction: column;  /* make main axis vertical */
    justify-content: center; /* center items vertically, in this case */
    align-items: center;
    align-items: center;     /* center items horizontally, in this case */
    height: 100%;
}

.protocol-input {
    width: 70%;
}

.execute-button {
    margin-top: 100px;
}
</style>
