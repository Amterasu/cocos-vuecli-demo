cc.web2cocosSDK = {
	// 根据页码切换游戏
	changeGameByPageIndex: (pageIndex, callback) => { },
	/**
	 * 加载场景
	 *
	 * @param {String} sceneName 场景名字
	 * @param {*} callFunc
	 */
	loadScene(sceneName) {
		return new Promise((resolve, reject) => {
			cc.director.loadScene(sceneName, err => {
				if (!err) {
					resolve(sceneName)
				} else {
					reject(err);
				}
			});
		})
	},
	/**
	 * 加载游戏（prefab）
	 *
	 * @param {String} name 图片名称
	 * @param {Function} callFunc
	 */
	loadGame: (gameName, callFunc) => { },

	// 卸载游戏
	unloadGame: () => {
	},
	/**
	 * 加载自定义的图片
	 *
	 * @param {String} name 图片名称
	 * @param {Function} callFunc
	 */
	loadCustomImage(name, callFunc) {
		// cc.loader.load('../cocos-build/web-mobile/custom/' + name, callFunc);
	},
	//
	/**
	 * 重置game分辨率
	 *
	 * @param {cc.Vec2} editorSize {width:2048,height:1152}
	 * @param {number} ratio 缩放的倍率
	 * @param {Function} callFunc
	 */
	updateResolution(editorSize, ratio, callFunc) {
		var gameDiv = document.getElementById('GameDiv');
		cc.view.setDesignResolutionSize(
			editorSize.width,
			editorSize.height,
			cc.ResolutionPolicy.FIXED_WIDTH
		);
		gameDiv.style.width = editorSize.width / ratio + 'px';
		gameDiv.style.height = editorSize.height / ratio + 'px';
		cc.view.setCanvasSize(editorSize.width / ratio, editorSize.height / ratio);
		console.log(editorSize);
		callFunc && callFunc();
	},
	/**
	 * 设置节点属性
	 *
	 * @param {*} { node, attribute, value }
	 * @returns
	 */
	setNodeAttribute({ node, attribute, value }) {
		if (!node) {
			console.log('不存在节点');
			return;
		} else {
			node[attribute] = value;
			console.log('设置成功:' + attribute);
		}
	},
	/**
	 * 触发cocos内的事件系统
	 *
	 * @param {*} eventName
	 * @param {*} params
	 */
	emitGameEvt(eventName, params) {
		// EVT.emit(eventName, params);
		cc.find('Canvas/start').opacity = 0;
		cc.tween(cc.find('Canvas/start')).to(0.5, { opacity: 255 }).start()
	}
};
