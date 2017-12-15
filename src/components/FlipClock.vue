<template lang="html">
  <div class="flip-clock">
    <div class="countdown-wrapper">
      <div id="countdown" class="countdown"></div>
    </div>
  </div>

</template>

<script lang="js">
/* eslint-disable */

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
        this.countdown = new FlipClock($('.countdown'), {
          clockFace: 'MinuteCounter',
          language: 'en',
          autoStart: false,
          countdown: true,
          showSeconds: true,
          callbacks: {
            start: function() {
              return console.log('The clock has started!');
            },
            stop: function() {
              return console.log('The clock has stopped!');
            },
            interval: function() {
              var time;
              time = this.factory.getTime().time;
              if (time) {
                return console.log('Clock interval', time);
              }
            }
          }
        });
      }
    }
  }

</script>

<style scoped>
.flip-clock {
}
/* $clock-flip-font-size: 120px;
  $clock-flip-border-radius: 8px;
  $clock-digit-gap: 20px;
  $clock-dot-size: 20px;

  $clock-height: ($clock-flip-font-size * 1.2);
  $clock-flip-width: ($clock-flip-font-size * 0.8);
  $clock-flip-margin: ($clock-digit-gap / 2);
  $clock-flip-section-width: (2 * ($clock-flip-width + 2 * $clock-flip-margin));

  $clock-flip-bg: #607D8B;
  $clock-flip-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
  $clock-flip-font-color: #F44336;
  $clock-flip-font-shadow: 0 1px 2px #000;

  .countdown-wrapper{
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .countdown.flip-clock-wrapper ul {
    height: $clock-height;
    margin: 0 $clock-flip-margin;
    width: $clock-flip-width;
    box-shadow: $clock-flip-shadow;
  }

  .countdown.flip-clock-wrapper ul li {
    line-height: $clock-height;
  }

  .countdown.flip-clock-wrapper ul li a div div.inn {
    background-color: $clock-flip-bg;
    color: $clock-flip-font-color;
    font-size: $clock-flip-font-size;
    text-shadow: $clock-flip-font-shadow;
  }

  .countdown.flip-clock-wrapper ul .countdown.flip-clock-wrapper ul li a div div.inn {
    border-radius: $clock-flip-border-radius;
  }

  // .countdown.flip-clock-wrapper ul li a div.down
  //   border-bottom-left-radius: $clock-flip-border-radius
  //   border-bottom-right-radius: $clock-flip-border-radius

  // .countdown.flip-clock-wrapper ul li a div.up:after
  //   top: (($clock-height / 2) - 1px)

  // .countdown .flip-clock-dot.top
  //   top: ($clock-height / 2 - $clock-flip-font-size * 0.2 - $clock-dot-size / 2)

  // .countdown .flip-clock-dot.bottom
  //   top: ($clock-height / 2 + $clock-flip-font-size * 0.2 - $clock-dot-size / 2)

  // .countdown .flip-clock-dot
  //   height: $clock-dot-size
  //   left: $clock-dot-size
  //   width: $clock-dot-size
  //   background: $clock-flip-bg

  // .countdown .flip-clock-divider
  //   height: $clock-height
  //   width: ($clock-dot-size * 3)
  //   &:first-child
  //     width: 0


  // .countdown .flip-clock-divider.seconds .flip-clock-label,
  // .countdown .flip-clock-divider.minutes .flip-clock-label
  //   right: -1 * $clock-flip-section-width

  // .countdown .flip-clock-divider .flip-clock-label
  //   color: $clock-flip-font-color
  //   font-size: $clock-flip-font-size / 4
  //   width: 2 * $clock-flip-width + 4 * $clock-flip-margin */
</style>
