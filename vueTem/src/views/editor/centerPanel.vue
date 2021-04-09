<template>
  <div class="centerEditor">
    <div class="centerEditorContainer">
      <div class="loading" v-show="gameLoadingStatus">
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            transform="translate(1 1)"
            stroke-width="2"
          >
            <circle cx="22" cy="22" r="6" stroke-opacity="0">
              <animate
                attributeName="r"
                begin="1.5s"
                dur="3s"
                values="6;22"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="1.5s"
                dur="3s"
                values="1;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                begin="1.5s"
                dur="3s"
                values="2;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="6" stroke-opacity="0">
              <animate
                attributeName="r"
                begin="3s"
                dur="3s"
                values="6;22"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="3s"
                dur="3s"
                values="1;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                begin="3s"
                dur="3s"
                values="2;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="8">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.5s"
                values="6;1;2;3;4;5;6"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
      <div>
        <div class="base-filter-block">
          <ul class="group-list">
            <li class="group-item">
              <label class="group-label"
                ><span class="label-name">游戏类型</span
                ><span class="colon">：</span></label
              >
              <div class="group-options">
                <div
                  class="option-item"
                  :class="{ 'is-actived': !GameSyncTypeEnumSelect }"
                  @click="selectFilter('GameSyncTypeEnum', null)"
                >
                  <span>全部</span>
                </div>
                <div
                  class="option-item"
                  :class="{ 'is-actived': GameSyncTypeEnumSelect == item }"
                  v-for="(item, index) in GameSyncTypeEnum"
                  :key="index"
                  @click="selectFilter('GameSyncTypeEnum', item)"
                >
                  <span> {{ item }} </span>
                </div>
              </div>
            </li>

            <li class="group-item">
              <label class="group-label"
                ><span class="label-name">年级</span
                ><span class="colon">：</span></label
              >
              <div class="group-options">
                <div
                  class="option-item"
                  :class="{ 'is-actived': !GradeEnumSelect }"
                  @click="selectFilter('GradeEnum', null)"
                >
                  <span>全部</span>
                </div>
                <div
                  class="option-item"
                  :class="{ 'is-actived': GradeEnumSelect == item }"
                  v-for="(item, index) in GradeEnum"
                  :key="index"
                  @click="selectFilter('GradeEnum', item)"
                >
                  <span> {{ item }}年级 </span>
                </div>
              </div>
            </li>

            <li class="group-item">
              <label class="group-label"
                ><span class="label-name">所属环节</span
                ><span class="colon">：</span></label
              >
              <div class="group-options">
                <div
                  class="option-item"
                  :class="{ 'is-actived': !CourseStepEnumSelect }"
                  @click="selectFilter('CourseStepEnum', null)"
                >
                  <span>全部</span>
                </div>
                <div
                  class="option-item"
                  :class="{ 'is-actived': CourseStepEnumSelect == item }"
                  v-for="(item, index) in CourseStepEnum"
                  :key="index"
                  @click="selectFilter('CourseStepEnum', item)"
                >
                  <span> {{ item }} </span>
                </div>
              </div>
            </li>

            <li class="group-item">
              <label class="group-label"
                ><span class="label-name">研发者</span
                ><span class="colon">：</span></label
              >
              <div class="group-options">
                <div
                  class="option-item"
                  :class="{ 'is-actived': !AuthorEnumSelect }"
                  @click="selectFilter('AuthorEnum', null)"
                >
                  <span>全部</span>
                </div>
                <div
                  class="option-item"
                  :class="{ 'is-actived': AuthorEnumSelect == item }"
                  v-for="(item, index) in AuthorEnum"
                  :key="index"
                  @click="selectFilter('AuthorEnum', item)"
                >
                  <span> {{ item }} </span>
                </div>
              </div>
            </li>
            <li class="group-item">
              <label class="group-label"
                ><span class="label-name">学科</span
                ><span class="colon">：</span></label
              >
              <div class="group-options">
                <div
                  class="option-item"
                  :class="{ 'is-actived': !SubjectEnumSelect }"
                  @click="selectFilter('SubjectEnum', null)"
                >
                  <span>全部</span>
                </div>
                <div
                  class="option-item"
                  :class="{ 'is-actived': SubjectEnumSelect == item }"
                  v-for="(item, index) in SubjectEnum"
                  :key="index"
                  @click="selectFilter('SubjectEnum', item)"
                >
                  <span> {{ item }} </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p class="result-num">
        共 <b>{{ sampleData.length }}</b> 个游戏
      </p>
      <div class="no-data" v-if="!sampleData.length">
        <img src="/static/img/nodata.png" class="no-data-bg" />
        <p class="no-data-text">未找到相应内容</p>
      </div>
      <div class="itemList">
        <div
          class="itemContainer"
          v-for="item in sampleData"
          :key="item.name"
          @click="showGameModel(item)"
        >
          <span><img :src="'/static/img/cover/' + item.name + '.jpg'" /></span>
          <div class="cover-info">
            <span>
              <h4>{{ item.title }}</h4>
            </span>
            <small>{{ item.description }}</small>
          </div>
          <div class="cover-fields">
            <i class="fa fa-list-ul"></i> &nbsp;
            {{ item.type }}
          </div>
          <div class="cover-stat">
            <i class="fa fa-eye"></i
            ><span class="f10"> &nbsp;{{ item.tip }}</span>
            <i class="fa fa-heart"></i
            ><span class="f10"> &nbsp;{{ item.grade.join(',') }}年级</span>
            <div class="cover-yh">
              {{ item.author }}
            </div>
          </div>
        </div>
      </div>

      <div class="modalMask" v-show="gameShowStatus">
        <div class="modalContainer">
          <map-editor ref="editor" @sceneLoaded="sceneLoaded"> </map-editor>
          <div class="game-details-block">
            <div class="block-top">
              <p class="game-name text-overflow">
                <span> {{ selectSample.title }} </span>
              </p>
              <div class="game-datas">
                <!-- <div class="game-use-count"><span class="use-num">使用 0</span><span class="answer-num">作答 0</span><span class="correct-rate">正确率 0%</span></div> -->
              </div>
              <div class="tool-btns">
                <div
                  class="game-add-button iconfont icon-car larger"
                  :class="{ disabled: disabledStartBtn }"
                  @click="gameBegin"
                >
                  开始游戏
                </div>
              </div>
            </div>
            <ul class="block-main overflow">
              <li>
                <label class="label-name">游戏类型：</label>
                <div class="game-id">
                  <em>{{ selectSample.type }}</em>
                </div>
              </li>
              <li>
                <label class="label-name">年级：</label>
                <div class="game-url">
                  <em>{{ selectSample.grade.join(',') }}年级</em>
                </div>
              </li>
              <li>
                <label class="label-name">游戏简介：</label>
                <p class="game-desc">{{ selectSample.description }}</p>
              </li>
              <li>
                <label class="label-name">游戏标签：</label>
                <ul class="game-label-list">
                  <li><span>思维逻辑</span></li>
                  <li><span>逆向思维</span></li>
                  <li><span>鸡蛋灌饼</span></li>
                </ul>
              </li>
              <li class="game-label">
                <label class="label-name">程序id：</label>
                <ul class="knowledge-label-list">
                  <li>{{ selectSample.name }}</li>
                </ul>
              </li>
              <li class="upload-name">
                <label class="label-name">研发：</label
                ><span>{{ selectSample.author }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="fa fa-close iconClose"
          aria-hidden="true"
          @click="closeGameModel"
        ></div>
      </div>
      <transition name="fade">
        <div class="yyMask" v-show="yyLoadingStatus">
          <img src="/static/img/loading-yy.gif" />
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
import mapEditor from './mapEditor'
import {
  sampleData,
  GameSyncTypeEnum,
  GradeEnum,
  CourseStepEnum,
  AuthorEnum,
  SubjectEnum,
} from '@/config/configSample'
import web2game from './web2game'

import { GAME2WEB_EVENTTYPE, E2G_EVENTTYPE } from '../../const/event'
export default {
  created() {
    this.sampleData = sampleData
    this.oriSampleData = this.sampleData
    // eventBus.on(GAME2WEB_EVENTTYPE.ON_PAGE_CHANGE_SUCCESS, () => {
    //   this.gameLoadingStatus = false
    //   this.gameShowStatus = true
    //   setTimeout(() => {
    //     // 改变位置后
    //     const myEvent = new Event('resize')
    //     window.dispatchEvent(myEvent)
    //   }, 200)
    // })

  },
  components: {
    mapEditor,
  },
  data() {
    return {
      gameShowStatus: false,
      gameLoadingStatus: false,
      isFirstCreate: true,
      yyLoadingStatus: false,
      disabledStartBtn: false,
      GameSyncTypeEnum,
      GradeEnum,
      CourseStepEnum,
      AuthorEnum,
      SubjectEnum,
      GameSyncTypeEnumSelect: null,
      GradeEnumSelect: null,
      CourseStepEnumSelect: null,
      AuthorEnumSelect: null,
      SubjectEnumSelect: null,
      sampleData: [],
      oriSampleData: [],
      selectSample: {
        name: 'game_labyrinth',
        title: '迷宫',
        description: '使小球走道终点，可以用aswd或者上下左右的键盘进行控制',
        grade: [1, 2, 3],
        tip: '大游戏',
        author: '靳国强',
        type: '分发',
      },
      ratio: 2.5,
      STUDENT_SIZE: {
        width: 2048,
        height: 1152,
      },
    }
  },
  methods: {
    sceneLoaded() {
      // this.gameShowStatus = false
      this.yyLoadingStatus = false
    },
    showGameModel(selectSample) {
      this.gameLoadingStatus = true
      this.selectSample = selectSample
      this.disabledStartBtn = false
      web2game.loadScene(selectSample.name)
      // .then((sceneName) => {
      // cc.director.loadScene(selectSample.name)
      this.gameLoadingStatus = false
      this.gameShowStatus = true
      //   // web2game.updateResolution(this.STUDENT_SIZE, this.ratio)

      //   // setTimeout(() => {
      //   //   // 改变位置后
      //   //   const myEvent = new Event('resize')
      //   //   window.dispatchEvent(myEvent)
      //   // },400)
      // })
    },
    closeGameModel() {
      this.gameShowStatus = false
      // web2game.unloadGame()
    },
    gameBegin() {
      if (this.disabledStartBtn) return
      this.disabledStartBtn = true
      web2game.emit('nova.teacher.start')
    },
    selectFilter(key, value) {
      this[key + 'Select'] = value
      this.search()
    },
    search() {
      this.sampleData = this.oriSampleData.filter((el) => {
        return (
          (!this.GameSyncTypeEnumSelect ||
            el.type == this.GameSyncTypeEnumSelect) &&
          (!this.GradeEnumSelect || el.grade.includes(this.GradeEnumSelect)) &&
          (!this.CourseStepEnumSelect || el.tip == this.CourseStepEnumSelect) &&
          (!this.AuthorEnumSelect || el.author == this.AuthorEnumSelect) &&
          (!this.SubjectEnumSelect || el.subject == this.SubjectEnumSelect)
        )
      })
    },
  },
}
</script>

<style scoped lang = scss>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 1s;
}

.centerEditor {
  position: relative;
  top: 75px;
  padding-bottom: 50px;
  width: 100%;
  height: 100%;
  .centerEditorContainer {
    width: 1200px;
    margin: 0 auto;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.7);
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      height: 136px;
    }
    .no-data-text {
      font-size: 12px;
      line-height: 20px;
      color: #666;
      text-align: center;
    }
  }
  .base-filter-block {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 13px 24px 13px 24px;
    background: #fff;
    flex-shrink: 0;
    margin-top: 24px;
    box-shadow: 0 1px 3px 0 rgba(85, 97, 107, 0.15);
    border-radius: 4px;
    .group-list {
      flex: 1;
      margin-right: 16px;
      .group-item {
        display: flex;
        position: relative;
        .group-label {
          flex-shrink: 0;
          display: flex;
          margin-top: 3px;
          width: 65px;
          font-size: 12px;
          line-height: 20px;
          font-weight: 600;
          .red-icon {
            position: relative;
            padding-left: 14px;
          }
          .label-name {
            padding-left: 0px;
            flex: 1;
            text-align-last: justify;
          }
          .colon {
            flex-shrink: 0;
          }
        }
        .group-options {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .option-item {
            padding: 3px 4px;
            height: 26px;
            cursor: pointer;
            span {
              display: inline-block;
              padding: 1px 6px;
              font-size: 12px;
              line-height: 18px;
              border-radius: 4px;
            }
            &.is-actived span,
            &:hover span {
              background-color: #e7f5ff;
              color: #3f92ff;
            }
          }
        }
      }
    }
  }
  .itemList {
    display: grid;
    grid-template-columns: repeat(4, 23.7%);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    width: 100%;
    .itemContainer {
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
      position: relative;
      transition: all 1s ease 0s;
      overflow: hidden;
      &:hover {
        box-shadow: 7px 17px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .cover-info {
        padding: 6px 15px 28px;
        height: 80px;
        overflow: hidden;
        h4 {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
          white-space: nowrap;
          display: block;
          font-weight: bold;
          line-height: 18px;
          margin-top: 7px;
          margin-bottom: 5px;
        }
        small {
          color: #838383;
          padding-bottom: 10px;
        }
      }
      .cover-fields {
        bottom: 34px;
        font-size: 12px;
        height: 35px;
        left: 10px;
        line-height: 35px;
        max-width: 210px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 15px;
        padding-right: 15px;
      }
      .cover-stat {
        background-color: #f6f6f6;
        border-radius: 0 0 3px 3px;
        border-top: 1px solid #e7e7e7;
        box-shadow: 0 1px 0 0 #fff inset;
        padding: 7px 15px 7px 15px;
        color: #8b8b8c;
        position: relative;
        .cover-yh {
          position: absolute;
          right: 1px;
          top: 1px;
          border-left: 1px solid #ddd;
          color: #aaa;
          cursor: default;
          width: 40px;
          line-height: 30px;
          height: 30px;
          transition: color 0.15s linear;
          text-align: center;
          display: inline-block;
          text-rendering: auto;
          font-size: 12px;
          font-family: 'Arial';
        }
        .f10 {
          font-size: 10px;
          font-family: 'Arial';
          padding-right: 12px;
        }
      }
      img {
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        transition: all 1s ease 0s;
      }
    }
  }
  .yyMask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(-0.5, 0.5);
    }
  }
  .result-num {
    flex-shrink: 0;
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 18px;
    color: #666;
  }
  .modalMask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: rgba(3, 3, 3, 0.5);
    .iconClose {
      position: absolute;
      top: 40px;
      right: 300px;
      width: 40px;
      height: 40px;
      font-size: 40px;
      color: #fff;
      cursor: pointer;
    }
    .modalContainer {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .game-details-block {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        margin-left: 16px;
        width: 370px;
        height: 460px;
        background: #fff;
        -webkit-box-shadow: 0 2px 10px 0 rgba(58, 66, 73, 0.21);
        box-shadow: 0 2px 10px 0 rgba(58, 66, 73, 0.21);
        border-radius: 4px;
        .block-main,
        .block-top {
          padding-left: 24px;
          padding-right: 22px;
        }

        .block-top {
          -ms-flex-negative: 0;
          flex-shrink: 0;
          padding-top: 24px;
          padding-bottom: 21px;
          border-bottom: 1px solid #f0f1f2;
        }

        .block-main {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          padding-bottom: 31px;
        }

        .block-footer {
          -ms-flex-negative: 0;
          flex-shrink: 0;
          border-top: 1px solid #f0f1f2;
          text-align: center;
        }

        .game-name {
          font-size: 22px;
          font-weight: 600;
          line-height: 28px;
        }

        .game-datas {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-top: 14px;
          .game-use-count {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-size: 12px;
            line-height: 16px;
            color: #979ea6;
          }

          .game-use-count > span + span {
            margin-left: 12px;
          }
        }

        .tool-btns {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin-top: 22px;
          .larger {
            width: 100%;
            height: 32px;
            line-height: 32px;
            border-radius: 8px;
          }
          .game-add-button {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: inline-block;
            font-size: 14px;
            text-align: center;
            vertical-align: middle;
            background: #3f92ff;
            color: #fff;
            cursor: pointer;
            &:active {
              background: #66a8ff;
            }
            &:hover {
              background: #66a8ff;
            }
            &.disabled {
              cursor: not-allowed;
              filter: grayscale(1);
            }
          }
        }

        .tool-btns .btn-edit,
        .tool-btns .game-add-button {
          margin-right: 14px;
        }

        .tool-btns .btn-edit,
        .tool-btns .btn-modify {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 0 15px;
          border-radius: 8px;
          color: #3f92ff;
        }

        .tool-btns .btn-edit > .iconfont,
        .tool-btns .btn-modify > .iconfont {
          margin-right: 6px;
        }

        .block-main > li {
          margin-top: 19px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          line-height: 22px;
        }

        .block-main > li.game-label,
        .block-main > li.upload-name {
          margin-top: 8px;
        }

        .label-name {
          -ms-flex-negative: 0;
          flex-shrink: 0;
          margin-right: 8px;
          width: 70px;
          -moz-text-align-last: justify;
          text-align-last: justify;
        }

        .icon-copy {
          margin-left: 6px;
          padding: 0 6px;
          cursor: pointer;
        }

        .icon-copy:hover {
          color: #3f92ff;
        }

        .game-desc {
          word-break: break-all;
        }

        .game-desc .icon-arrow-bottom,
        .game-desc .icon-arrow-top {
          color: #3f92ff;
          cursor: pointer;
        }

        .game-label-list,
        .knowledge-label-list {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          line-height: 0;
        }

        .game-label-list li {
          margin-right: 12px;
          margin-bottom: 11px;
          padding: 1px 0;
        }

        .game-label-list li > span {
          display: inline-block;
          padding: 1px 6px;
          font-size: 12px;
          line-height: 18px;
          border-radius: 3px;
          color: #979ea6;
          background-color: #f0f4f6;
        }

        .knowledge-label-list li {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-right: 20px;
          margin-bottom: 12px;
          line-height: 22px;
        }

        .knowledge-label-list li .icon-label {
          margin-right: 6px;
          color: #979ea6;
        }

        .knowledge-label-list li > span {
          color: #979ea6;
        }

        .btn-delete {
          margin-top: 18px;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 22px;
          color: #333;
          cursor: pointer;
        }

        .btn-delete .icon-delete {
          margin-right: 10px;
          font-size: 14px;
          color: #979ea6;
        }

        .btn-delete:hover .icon-delete {
          color: #ff4640;
        }
      }
      .gameDetailsBlock {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        width: 420px;
        background: #fff;
        box-shadow: 0 2px 10px 0 rgba(58, 66, 73, 0.21);
        border-radius: 4px;
        /* &.teacherSize {
          width: 3036px;
          height: 1366px;
          transform: matrix(0.33, 0, 0, 0.33, -1618, -768);
        }
        &.studentSize {
          width: 2048px;
          height: 1152px;
          transform: matrix(0.5, 0, 0, 0.5, -1124, -576);
        } */
      }
    }
  }
}
</style>
