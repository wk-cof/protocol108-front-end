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
        <b-input-group left="wei" class="protocol-input" style="max-width: 400px">
            <b-input id="sendAmount" class="bg-dark text-success border-dark" placeholder="1" v-model="sendAmount" />
        </b-input-group>
        <br>
        <b-form-textarea    class="protocol-input bg-dark text-success border-dark"
                            v-model="sequenceInput.staticMessage"
                            :no-resize="true"
                            :rows="2"
                            disabled
                            :max-rows="2"
                            >
        </b-form-textarea>
        <b-form-textarea    class="protocol-input bg-dark text-success border-dark active-input"
                            v-model="sequenceInput.input"
                            :no-resize="true"
                            :rows="5"
                            :max-rows="5"
                            >
        </b-form-textarea>
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
            sequenceInput: {
                state: false,
                staticMessage: '>: Swan Protocol initiated \n>: Enter Sequence',
                input: '>: '
            },
            sendAmount: null,
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
                const parsedInput = this.sanitizeInput(this.sequenceInput.input);
                numberSequence = parseInt(parsedInput) || 0;
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
                    } else {
                        this.sequenceInput.state = 'invalid';
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
        },
        sanitizeInput(input) {
            let regex = /^>?:? ?(\d+)/;
            let results = input.match(regex);
            return results && results[1] ? results[1] : input;
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
<style scoped lang="scss">
.active-input {
    margin-top: -9px;
}

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
