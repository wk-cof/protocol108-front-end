<template lang="html">
  <div class="flip-clock">
    <div class="countdown-wrapper">
      <div id="countdown" class="countdown"></div>
    </div>
  </div>

</template>

<script lang="js">
/* eslint-disable */
// @import 'flipclock/compiled/flipclock.min.js';
import $ from 'jquery';

window.jQuery = $; // ugh flipclock, you suck
require('flipclock/compiled/flipclock');

  export default  {
    name: 'flip-clock',
    props: ['seconds'],
    mounted() {
      this.init_clock();
      this.set_countdown(new Date());
    },
    created: function() {

    },
    data() {
      return {
        countdown: null
      }
    },
    methods: {
      set_countdown(start) {
        if (this.countdown && this.countdown.running) {
          return;
        }
        let now = new Date;
        start = new Date(start);
        let end = start.getTime() + this.seconds * 1000;
        let left_secs = Math.round((end - now.getTime()) / 1000);
        let elapsed = false;
        if (left_secs < 0) {
          left_secs *= -1;
          elapsed = true;
        }
        this.countdown.setTime(left_secs);
        return this.countdown.start();
      },
      init_clock() {
        this.countdown = $('.countdown').FlipClock({
          clockFace: 'MinuteCounter',
          language: 'en',
          autoStart: false,
          countdown: true,
          showSeconds: true,
          // callbacks: {
          //   start: function() {
          //     return console.log('The clock has started!');
          //   },
          //   stop: function() {
          //     return console.log('The clock has stopped!');
          //   },
          //   interval: function() {
          //     var time;
          //     time = this.factory.getTime().time;
          //     if (time) {
          //       return console.log('Clock interval', time);
          //     }
          //   }
          // }
        });
      }
    }
  }

</script>

<style lang="scss">
.minutes {
  display: none;
}
.seconds > .flip-clock-label {
  display: none;
}
</style>
