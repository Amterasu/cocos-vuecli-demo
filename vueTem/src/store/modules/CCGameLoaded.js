import { SET_CCGAME_LOADED } from '../mutation-types'

const state = {
  isloaded: false // 是否cocos已经初始化完毕
}

const mutations = {
  [SET_CCGAME_LOADED] (state, res) {
    state.isloaded = true
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
