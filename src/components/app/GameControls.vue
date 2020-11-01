<template>
    <div class="play-pause">

        <button v-if="isGameOver" @click="resetGame" class="button">
            Restart
        </button>
        <button class="button play" @click="startGame" v-else>
          Start
        </button>
        <button class="button pause" @click="setGamePause">
          {{ pauseText }}
        </button>


      </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'GameControls',
        computed: {
            ...mapGetters({
                isGamePaused: 'isGamePaused',
                isGameOver: 'isGameOver'
            }),
            pauseText(){
                return this.isGamePaused ? 'Resume' : 'Pause'
            },
            
        },
        methods: {
            ...mapActions({
                startGame: 'setGameStart',
                setGamePause: 'setGamePause',
                resetGame: 'resetGame'
            })
        }
    }
    
</script>

<style lang="scss" scoped>

    .play-pause {

        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 100px;

        .button {
            border-radius: 4px;
            color: orange;
            padding: 5px 8px;
            cursor: pointer;
            margin: 0 10px;
        }

    }

</style>