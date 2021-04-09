/*
 * @Author: jinguoqiang
 * @Date: 2020-04-27 11:21:19
 * @LastEditTime: 2020-04-27 11:21:24
 * @LastEditors: jinguoqiang
 */
// game 发消息给 electron
export let GAME2WEB_EVENTTYPE = {
  ON_PAGE_CHANGE_SUCCESS: 'ON_PAGE_CHANGE_SUCCESS',
  SELECT_NODE: 'SELECT_NODE',
  GAMENODE_MOVED: 'GAMENODE_MOVED',
  GAMENODE_MOVEEND: 'GAMENODE_MOVEEND',
  GAMESCENE_LOADED: 'GAMESCENE_LOADED'
}

// electron 发消息给 game
export let E2G_EVENTTYPE = {
  CREATOR_INIT: 'CREATOR_INIT', // 初始化游戏场景
  LOAD_SCENE: 'LOAD_SCENE', // 加载场景
  LOAD_GAME: 'LOAD_GAME', // 加载小游戏 （prefab）
  UNLOAD_GAME: 'UNLOAD_GAME', // 卸载小游戏 （prefab）
  UPDATE_RESOLUTION: 'UPDATE_RESOLUTION', // 调整分辨率
  SET_NODEATTRIBUTE: 'SET_NODEATTRIBUTE' // 设置节点属性值
}
