<template>
    <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#/">The Button</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item href="https://github.com/vgorin/protocol108" target="_blank">Github</b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
    <router-view/>
    </div>
</template>

<script>
// import SimpleStudy from './services/SimpleStudyProvider';

export default {
    name: 'app',
    data: function() {
        return {
            // accounts: [],
            // userName: ''
        };
    },
    computed: {
        // account: function() {
        //     return this.accounts[0] || 'Undefined';
        // }
    },
    methods: {
        // fetchAccounts() {
        //     return SimpleStudy.accountsPromise.then(accs => {
        //         this.accounts = accs;
        //     });
        // },
        // fetchUserName() {
        //     return SimpleStudy.userNamePromise.then(userName => {
        //         this.userName = userName;
        //     }).catch(e => {
        //         this.userName = 'Not Registered';
        //     });
        // }
    },
    created: function() {
        // this.fetchAccounts();
        // this.fetchUserName();
    }
};
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
