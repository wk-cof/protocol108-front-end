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
        <div>{{time}}</div>
        <b-form inline>
            <label class="sr-only" for="sequenceInput">Sequence</label>
            <b-input id="sequenceInput" placeholder="Sequence" v-model="sequenceInput" />
            <b-input-group left="wei" class="mb-2 mr-sm-2 mb-sm-0">
                <b-input id="sendAmount" placeholder="1" v-model="sendAmount" />
            </b-input-group>
            <b-button type="submit" variant="primary" @click="execute">Execute protocol</b-button>
        </b-form>

    </div>
</template>

<script>
import ProtocolProvider from '../services/protocol-provider';
import Timer from 'easytimer/dist/easytimer.min';

let timer = new Timer();

export default {
    data: function() {
        return {
            coundown: 0,
            sequenceInput: '',
            sendAmount: 1,
            isSequenceValid: true,
            errorMessage: '',
            time: 'Loading timer'
        };
    },
    methods: {
        countdown() {
            ProtocolProvider.countdown()
                .then(result => {
                    // console.log(result);
                    // this.countdown = result;
                    timer.start({countdown: true, startValues: {seconds: result}});
                    timer.addEventListener('secondsUpdated', (e) => {
                        // $('#basicUsage').html(timer.getTimeValues().toString());
                        this.updateTimer(timer.getTimeValues().toString());
                    });
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
        },
        updateTimer(newTime) {
            this.time = newTime;
        }
    },
    created: function() {
        this.countdown();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sendAmount {
    width: 70px;
}
</style>
