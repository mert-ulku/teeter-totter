<template>
  <div id="app">

    <div class="container">

      <GameControls/>
      <GameWindow/>

    </div>

  </div>
</template>

<script>

  import GameControls from './components/app/GameControls'
  import GameWindow from './components/app/GameWindow'

  export default {

    name: "App",
    components: {
      GameControls,
      GameWindow
    }
  }

</script>

<style lang="scss">

  #app {

    display: grid;
    place-items: center;
    height: 100vh;

  }

</style>
