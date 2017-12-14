<template>
    <div class="text-success bg-dark">
        <ul>
            <li>Protocol state: {{protocolStats.protocolState}}</li>
            <li>Countdown: {{protocolStats.countdownFormatted}}</li>
            <li>Balance: {{protocolStats.balance}}</li>
            <li>Cycle number: {{protocolStats.cycleNumber}}</li>
            <li>Volume: {{protocolStats.volume}}</li>
            <li>Last executor: {{protocolStats.lastExecutor}}</li>
        </ul>
        <b-button variant="success" @click="getStatistics">Refresh</b-button>
    </div>
</template>

<script>
import ProtocolProvider from '../services/protocol-provider';

export default {
    data: function() {
        return {
            protocolStats: {
                balance: '0 ETH',
                countdownFormatted: '',
                cycleNumber: null,
                protocolState: 'INACTIVE',
                lastExecutor: '',
                volume: '?'
            }
        };
    },
    methods: {
        getStatistics() {
            ProtocolProvider.getBalance()
                .then(result => {
                    this.protocolStats.balance = result;
                });
            ProtocolProvider.protocolState()
                .then(result => {
                    this.protocolStats.protocolState = result;
                });
            ProtocolProvider.countdownFormatted()
                .then(result => {
                    this.protocolStats.countdownFormatted = result;
                });
            ProtocolProvider.cycle()
                .then(result => {
                    this.protocolStats.cycleNumber = result;
                });
            ProtocolProvider.executor()
                .then(result => {
                    this.protocolStats.lastExecutor = result;
                });
            ProtocolProvider.volume()
                .then(result => {
                    this.protocolStats.volume = result;
                });
        }
    },
    created: function() {
        this.getStatistics();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
