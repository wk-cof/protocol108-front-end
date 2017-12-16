<template>
    <div id="app">
    <!-- <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand href="#">
            <b-img src="static/TheSwan.png" alt="" id="brand-image"/>
        </b-navbar-brand>

            <b-navbar-nav>
                <b-nav-item href="#/">Home</b-nav-item>
                <b-nav-item href="#/details">Details</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item right href="https://github.com/vgorin/protocol108" target="_blank">
                    <icon name="github" scale="3"></icon>
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar> -->
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
  width: 100%;
  height: 100%;
}
</style>
