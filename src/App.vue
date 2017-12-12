<template>
    <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#/">Protocol108</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item href="#/">Home</b-nav-item>
                <b-nav-item href="#/details">Details</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item right href="https://github.com/vgorin/protocol108" target="_blank">Github</b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
    <router-view/>
    </div>
</template>

<script>

export default {
    name: 'app'
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
