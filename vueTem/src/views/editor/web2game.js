/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
class Web2Game {
  /**
   * 根据页码切换课件
   *
   * @param {string} sceneName
   * @param {Function} callback
   * @memberof Web2Game
   */
  changeGameByPageIndex(pageIndex, callback) {
    cc.web2cocosSDK.changeGameByPageIndex(pageIndex, callback)
  }
  /**
   * 加载场景
   *
   * @param {string} sceneName
   * @param {Function} callback
   * @memberof Web2Game
   */
  loadScene(sceneName, callback) {
    return cc.web2cocosSDK.loadScene(sceneName, callback)
  }
  /**
   * 加载游戏的预制体
   *
   * @param {string} sceneName
   * @param {Function} callback
   * @memberof Web2Game
   */
  loadGame(gameName, callback) {
    cc.web2cocosSDK.loadGame(gameName, callback)
  }
  /**
   * 卸载游戏
   *
   * @param {string} sceneName
   * @param {Function} callback
   * @memberof Web2Game
   */
  unloadGame() {
    cc.web2cocosSDK.unloadGame()
  }
  /**
   * 加载图片 --electron内使用
   *
   * @param {string} sceneName
   * @param {Function} callback
   * @memberof Web2Game
   */

  loadCustomImage(imageName, callback) {
    cc.web2cocosSDK.loadCustomImage(imageName, callback)
  }
  /**
   * 重置game分辨率
   *
   * @param {cc.Vec2} editorSize {width:2048,height:1152}
   * @param {number} ratio 缩放的倍率
   * @param {Function} callFunc
   */
  updateResolution(editorSize, ratio, callback) {
    cc.web2cocosSDK.updateResolution(editorSize, ratio, callback)
  }
  /**
   * 设置节点属性
   *
   * @param {string} sceneName
   * @param {Function} callback
   * @memberof Web2Game
   */
  setNodeAttribute({ node, attribute, value }) {
    cc.web2cocosSDK.setNodeAttribute({ node, attribute, value })
  }
  /**
   * 触发cocos内的事件系统
   *
   * @param {*} eventName
   * @param {*} params
   */
  emit(eventName, params) {
    cc.web2cocosSDK.emitGameEvt(eventName, params)
  }
  static getInstance() {
    let instance
    return function() {
      if (!instance) {
        instance = new Web2Game()
      }
      return instance
    }
  }
}
const web2game = new Web2Game()

export default web2game
