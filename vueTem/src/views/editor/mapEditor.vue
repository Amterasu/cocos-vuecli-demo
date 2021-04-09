<template>
  <div id="GameDiv" class="studentSize">
    <canvas id="GameCanvas"></canvas>
  </div>
</template>

<script>
import GAME_INIT from '../../../static/cocos-loader/creator-load'
import { GAME2WEB_EVENTTYPE, E2G_EVENTTYPE } from '../../const/event'
import { mapState, mapMutations } from 'vuex'
import web2game from './web2game'
export default {
  data() {
    return {
      ratio: 1.2,
      STUDENT_SIZE: {
        width: 960,
        height: 640,
      },
      TEACHER_SIZE: {
        width: 1012,
        height: 455,
      },
    }
  },
  created() {
    setTimeout(() => {
      this.init()
    }, 200)
  },
  computed: {
    ...mapState('CCGameLoaded', ['isloaded']),
  },
  methods: {
    init() {
      GAME_INIT(() => {
        web2game.loadScene('helloworld1').then((scenename) => {
          console.log(123)
          web2game.updateResolution(this.STUDENT_SIZE, this.ratio)
          this.$emit('sceneLoaded') // 发给父组件初始化完毕，这时去掉遮罩
        })
      })
    },
    ...mapMutations('CCGameLoaded', ['SET_CCGAME_LOADED']),
  },
}
</script>

<style lang='scss'>
#GameDiv {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // &.teacherSize {
  //   width: 1012px;
  //   height: 455px;
  // }
  &.studentSize {
    width: 960;
    height: 640px;
  }
}
#GameCanvas {
  display: block;
  touch-action: none;
  user-select: none;
  cursor: default;
  border-radius: 5px;
}
canvas:focus {
  outline: none;
}
</style>
