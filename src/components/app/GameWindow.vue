<template>

   <div class="flex-center">
        <div ref="balancer" class="balancer-animation" :style="{transform: `rotate(${-currentBending}deg)`}">
          <div class="shape-renderer">
            <ShapeRenderer :shapes="leftSide" :has-transition="true"/>
            <ShapeRenderer :shapes="rightSide" :has-transition="false"/>
          </div>
          <div class="bar"></div>
        </div>
        <div class="balancer triangle"></div>
    </div>

</template>

<script>

    import { mapGetters, mapActions } from 'vuex'
    import ShapeRenderer from '../weights/ShapeRenderer'

    export default {
        name: 'GameWindow',
        components: {
            ShapeRenderer
        },
          data(){
            return {
                shapeTypes: [
                    {
                        type: 'CircleWeight', 
                        width: 75
                    },
                    {
                        type: 'RectangleWeight',
                        width: 120
                    },
                    {
                        type: 'TriangleWeight',
                        width: 80
                    }
                ],
                maxDifference: 20,
                maxBending: 30,
                isObjectFalling: false
            }
        },
        computed: {
            ...mapGetters({      

                leftSide: 'leftSide',
                rightSide: 'rightSide',
                gameStarted: 'isGameStarted',
                gamePaused: 'isGamePaused',
                gameOver: 'isGameOver',
                currentBending: 'getCurrentBending'

            })
        },
        methods: {
            ...mapActions({

                setGameOver: 'setGameOver',
                addWeightToLeftSide: 'addWeightToLeftSide',
                addWeightToRightSide: 'addWeightToRightSide',
                repositionMovingObject: 'repositionMovingObject',
                changeBalance: 'changeBalance'

            }),
            async addWeightLeft(){

                this.isObjectFalling = true

                const newObject = this.pickRandomObject()
                newObject.position = 0

                await this.addWeightToLeftSide(newObject)

                setTimeout(() => {

                    this.isObjectFalling = false

                    /* if(!this.gamePaused) {
                        this.changeBalance()
                    } */

                }, 2500)

            },
            async addWeightRight(){

                this.isObjectFalling = true

                const newObject = this.pickRandomObject()
                newObject.position = Math.floor(Math.random() * ( 400 - newObject.width )) + 1

                await this.addWeightToRightSide(newObject)

                this.changeBalance()
                this.isObjectFalling = false

            },
            pickRandomObject(){

                const foundType = this.shapeTypes[Math.floor(Math.random() * 3)]

                return {
                    type: foundType.type,
                    weight: Math.floor(Math.random() * 10) + 1,
                    width: foundType.width
                }

            },
            async moveObject(direction){

                const leftSideCopy = [...this.leftSide]
                const lastObject = leftSideCopy[leftSideCopy.length - 1]
                let newPosition = lastObject.position + (20 * direction)

                if(newPosition < 0) {
                    newPosition = 0
                }

                if(newPosition > 400 - lastObject.width)  {
                    newPosition = 400 - lastObject.width
                } 

                await this.repositionMovingObject(Object.assign({}, {...lastObject, position: newPosition }))

            }
        },
        mounted(){

            document.onkeydown = e => {

                if(this.gameOver || this.gamePaused || !this.gameStarted) return;

                switch(e.which) {

                    case 37: // left

                        if(!this.isObjectFalling){
                            this.addWeightLeft()
                        } else {
                            this.moveObject(-1)
                        }

                        break;

                    case 39: // right

                        if(!this.isObjectFalling){
                            this.addWeightRight()
                        } else {
                            this.moveObject(1)
                        }

                        break;

                    default: return
                }
                e.preventDefault()
            }
        }
        
    }


</script>

<style lang="scss" scoped>

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }


  .balancer-animation {
    transition: all 1s ease;
  }

  .shape-renderer {
      display: flex;
      width: 100%;
      align-items: flex-end;
      justify-content: space-between;
  }

  .triangle {
    width: 0; 
    height: 0; 
    border-left: 75px solid transparent;
    border-right: 75px solid transparent; 
    border-bottom: 150px solid black;
  }

  .bar {
    height: 5px;
    width: 800px;
    background: orangered
  }

</style>