import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initState = {
  gameStarted: false,
  gamePaused: false,
  gameOver: false,
  leftSide: [],
  rightSide: [],
  maxDifference: 20,
  maxBending: 30,
  currentBending: 0
}

export default new Vuex.Store({
  state: {
   ...initState
  },
  getters: {

    isGameStarted(state){
      return state.gameStarted
    },
    isGamePaused(state){
      return state.gamePaused
    },
    isGameOver(state){
      return state.gameOver
    },
    leftSide(state){
      return state.leftSide
    },
    rightSide(state){
      return state.rightSide
    },
    calculateWeights(state){
      return {
        leftWeight: state.leftSide.reduce((total, shape) => {
            return total + shape.weight
        }, 0),
        rightWeight: state.rightSide.reduce((total, shape) => {
            return total + shape.weight
        }, 0)
      }
    },
    getCurrentBending(state){
      return state.currentBending
    }

  },
  mutations: {

    setGameStart(state){
      state.gameStarted = true
    },
    setGamePause(state){
      state.gamePaused = !state.gamePaused
    },
    setGameOver(state){
      state.gameOver = true
    },
    addWeightToLeftSide(state, payload){
      state.leftSide = [...state.leftSide, payload]
    },
    addWeightToRightSide(state, payload){
      state.rightSide = [...state.rightSide, payload]
    },
    repositionMovingObject(state, payload){
      const copy = [...state.leftSide]
      copy[copy.length - 1] = payload
      state.leftSide = [...copy]
    },
    setCurrentBending(state, payload){
      state.currentBending = payload
    },
    resetGame(state){

      state.gameStarted = false
      state.gamePaused =  false
      state.gameOver = false
      state.leftSide =  []
      state.rightSide =  []
      state.currentBending = 0

    }

  },
  actions: {

    setGameStart({commit}){
      commit('setGameStart')
    },
    resetGame({commit}){
      commit('resetGame')
    },
    setGamePause({commit}){
      commit('setGamePause')
    },
    setGameOver({commit}){
      commit('setGameOver')
    },
    addWeightToLeftSide({commit}, payload){
      commit('addWeightToLeftSide', payload)
    },
    addWeightToRightSide({commit}, payload){
      commit('addWeightToRightSide', payload)
    },
    repositionMovingObject({commit}, payload){
      commit('repositionMovingObject', payload)
    },
    changeBalance({commit, dispatch, state, getters}){

      const { leftWeight, rightWeight } = getters.calculateWeights

      const leftDifference = leftWeight - rightWeight

      if(leftDifference < -state.maxDifference || leftDifference > state.maxDifference) {
        dispatch('setGameOver')
        console.log('game over by weight')
        return false // because we dont want to execute the next lines
      }

      const currentBending = (leftDifference * state.maxBending) / state.maxDifference

      if(currentBending >= state.maxBending || currentBending <= -state.maxBending) {
        dispatch('setGameOver')
        console.log('game over by bending')
        return false // because we dont want to execute the next lines
      }

      commit('setCurrentBending', currentBending)

    },

  },
  modules: {}
});
