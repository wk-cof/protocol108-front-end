<template>
    <div class="protocol-vue">
        <b-alert    class="popup-alert"
                    variant="danger"
                    dismissible
                    :show="toasts.displayError"
                    @dismissed="toasts.displayError=false">
        {{sequenceInput.errorMessage}}
        </b-alert>
        <b-alert    class="popup-alert"
                    variant="success"
                    dismissible
                    :show="isExecutionSuccessful"
                    @dismissed="isExecutionSuccessful=false">
        Execution Successful
        </b-alert>
        <div class="text-success" id="protocol-component">
            <flip-clock v-bind:seconds="timer.coundown" v-if="timer.display"></flip-clock>
            <b-input-group left="wei" class="protocol-input" style="max-width: 400px">
                <b-input id="sendAmount" class="bg-dark text-success border-dark" placeholder="1" v-model="sendAmount" />
            </b-input-group>
            <br>
            <b-form-textarea    class="protocol-input bg-dark text-success border-dark"
                                v-model="sequenceInput.staticMessage"
                                :no-resize="true"
                                :rows="7"
                                disabled
                                :max-rows="7"
                                >
            </b-form-textarea>
            <b-form-textarea    class="protocol-input bg-dark text-success border-dark active-input"
                                v-model="sequenceInput.input"
                                :no-resize="true"
                                :rows="5"
                                :max-rows="5"
                                v-if="sequenceInput.display"
                                >
            </b-form-textarea>
            <b-button class="execute-button" type="submit" variant="success" @click="execute">Execute protocol</b-button>
        </div>
    </div>
</template>

<script>
import ProtocolPromise from '../services/protocol-provider';
import FlipClock from './FlipClock';

export default {
    data: function() {
        return {
            timer: {
                coundown: 0,
                display: false
            },
            sequenceInput: {
                display: false,
                staticMessage: '',
                input: '>: ',
                waiting: null,
                errorMessage: ''
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
            this.startWaiting('Loading SWAN protocol...');
            return ProtocolPromise.then(methods => methods.countdown())
                .then(result => {
                    this.stopWaiting('Success');
                    this.timer.display = true;
                    this.timer.coundown = result;
                })
                .catch(err => {
                    this.stopWaiting('Failure');
                    console.log(err);
                });
        },
        execute() {
            this.startWaiting();
            let numberSequence, weiAmount;
            try {
                const parsedInput = this.sanitizeInput(this.sequenceInput.input);
                numberSequence = parseInt(parsedInput) || 0;
                weiAmount = parseInt(this.sendAmount) || 1;
            } catch (err) {
                this.toasts.displayError = true;
                this.sequenceInput.errorMessage = 'Input is not an integer';
                return;
            }

            ProtocolPromise.then(methods => methods.validate(numberSequence))
                .then(_isValid => {
                    if (_isValid) {
                        return ProtocolPromise.then(methods => methods.initialize(weiAmount))
                            .then(() => {
                                this.stopWaiting();
                                this.isExecutionSuccessful = true;
                            });
                    } else {
                        this.sequenceInput.errorMessage = 'Invalid Sequence!';
                        this.toasts.displayError = true;
                        this.stopWaiting();
                    }
                })
                .catch(err => {
                    this.sequenceInput.errorMessage = err.toString();
                    console.error('Execution failed. ' + err);
                    this.toasts.displayError = true;
                    this.stopWaiting();
                });
        },
        protocolState() {
            ProtocolPromise.then(methods => methods.protocolState())
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
        },
        startWaiting(startMessage) {
            if (!startMessage) {
                return;
            }
            if (this.sequenceInput.staticMessage.length > 0) {
                this.sequenceInput.staticMessage += '\n';
            }
            this.sequenceInput.staticMessage += '>: ' + startMessage;
            this.sequenceInput.waiting = setInterval(() => {
                this.sequenceInput.staticMessage += '.';
            }, 500);
        },
        stopWaiting(stopMessage) {
            if (this.sequenceInput.waiting) {
                if (stopMessage) {
                    this.sequenceInput.staticMessage += '  ' + stopMessage;
                }
                clearInterval(this.sequenceInput.waiting);
                this.sequenceInput.waiting = null;
            }
        },
        getStatistics() {
            this.startWaiting('Loading protocol state...');
            return ProtocolPromise.then(methods => methods.protocolState())
                .then(protocolState => {
                    this.stopWaiting(protocolState);
                    this.startWaiting('Loading protocol balance...');
                    return ProtocolPromise.then(methods => methods.getBalance());
                })
                .then(result => {
                    this.stopWaiting(result);
                    this.startWaiting('Loading cycle number...');
                    return ProtocolPromise.then(methods => methods.cycle());
                })
                .then(result => {
                    this.stopWaiting(result);
                    this.startWaiting('Loading last executor ID...');
                    return ProtocolPromise.then(methods => methods.executor());
                })
                .then(result => {
                    this.stopWaiting(result);
                    this.startWaiting('Loading volume...');
                    return ProtocolPromise.then(methods => methods.volume());
                })
                .then(result => {
                    this.stopWaiting(result);
                    this.startWaiting('Enter Sequence');
                    this.stopWaiting('');
                    this.sequenceInput.display = true;
                })
                .catch(failure => {
                    this.stopWaiting('Error: ' + failure.toString());
                });
        }
    },
    created: function() {
        this.countdown()
            .then(() => {
                this.getStatistics();
            });
    },
    components: {
        'flip-clock': FlipClock
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.protocol-vue {
    flex: 1;
    height: 100%;
}
.active-input {
    margin-top: -9px;
}

.popup-alert {
    position: absolute;
    width: 100%;
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
    height: calc(100% - 100px);
}

.protocol-input {
    width: 70%;
}

.execute-button {
    margin-top: 100px;
}
</style>
