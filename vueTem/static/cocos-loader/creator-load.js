/* eslint-disable no-undef */
const GAME_INIT = cb => {
  var settings = window._CCSettings
  //   window._CCSettings = undefined

  if (!settings.debug) {
    var uuids = settings.uuids

    var rawAssets = settings.rawAssets
    var assetTypes = settings.assetTypes
    var realRawAssets = (settings.rawAssets = {})
    for (var mount in rawAssets) {
      var entries = rawAssets[mount]
      var realEntries = (realRawAssets[mount] = {})
      for (var id in entries) {
        var entry = entries[id]
        var type = entry[1]
        // retrieve minified raw asset
        if (typeof type === 'number') {
          entry[1] = assetTypes[type]
        }
        // retrieve uuid
        realEntries[uuids[id] || id] = entry
      }
    }

    var scenes = settings.scenes
    for (var i = 0; i < scenes.length; ++i) {
      var scene = scenes[i]
      if (typeof scene.uuid === 'number') {
        scene.uuid = uuids[scene.uuid]
      }
    }

    var packedAssets = settings.packedAssets
    for (var packId in packedAssets) {
      var packedIds = packedAssets[packId]
      for (var j = 0; j < packedIds.length; ++j) {
        if (typeof packedIds[j] === 'number') {
          packedIds[j] = uuids[packedIds[j]]
        }
      }
    }

    var subpackages = settings.subpackages
    for (var subId in subpackages) {
      var uuidArray = subpackages[subId].uuids
      if (uuidArray) {
        for (var k = 0, l = uuidArray.length; k < l; k++) {
          if (typeof uuidArray[k] === 'number') {
            uuidArray[k] = uuids[uuidArray[k]]
          }
        }
      }
    }
  }

  var jsList = settings.jsList

  if (jsList) {
    jsList = jsList.map(function (x) {
      return './static/cocos-build/web-mobile/src/' + x
    })
  }

  var option = {
    id: 'GameCanvas',
    scenes: settings.scenes,
    debugMode: settings.debug
      ? cc.debug.DebugMode.INFO
      : cc.debug.DebugMode.ERROR,
    showFPS: settings.debug,
    frameRate: 60,
    jsList: jsList,
    groupList: settings.groupList,
    collisionMatrix: settings.collisionMatrix
  }

  // init assets
  cc.AssetLibrary.init({
    libraryPath: './static/cocos-build/web-mobile/res/import',
    rawAssetsBase: './static/cocos-build/web-mobile/res/raw-',
    rawAssets: settings.rawAssets,
    packedAssets: settings.packedAssets,
    md5AssetsMap: settings.md5AssetsMap,
    subpackages: settings.subpackages
  })

  cc.game.run(option, () => {
    cb && cb()
  })
}

export default GAME_INIT
