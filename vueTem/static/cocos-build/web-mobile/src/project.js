window.__require=function e(t,n,o){function c(r,u){if(!n[r]){if(!t[r]){var s=r.split("/");if(s=s[s.length-1],!t[s]){var a="function"==typeof __require&&__require;if(!u&&a)return a(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+r+"'")}r=s}var _=n[r]={exports:{}};t[r][0].call(_.exports,function(e){return c(t[r][1][e]||e)},_,_.exports,e,t,n,o)}return n[r].exports}for(var i="function"==typeof __require&&__require,r=0;r<o.length;r++)c(o[r]);return c}({emitNode:[function(e,t,n){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","emitNode"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_END,function(e){e.stopPropagation(),window.eventBus&&window.eventBus.emit("WEB_MSG_TYPE.SELECT_NODE",e.currentTarget)},this)}}),cc._RF.pop()},{}],"use_v2.1-2.2.1_cc.Toggle_event":[function(e,t,n){"use strict";cc._RF.push(t,"7cbbeTVFKtH9KRAZoMTPnK7","use_v2.1-2.2.1_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_isChecked=!0),cc._RF.pop()},{}],web2gameSDk:[function(e,t,n){"use strict";cc._RF.push(t,"748bb2K29tIPLQmPiv9vhhz","web2gameSDk"),cc.web2cocosSDK={changeGameByPageIndex:function(e,t){},loadScene:function(e){return new Promise(function(t,n){cc.director.loadScene(e,function(o){o?n(o):t(e)})})},loadGame:function(e,t){},unloadGame:function(){},loadCustomImage:function(e,t){},updateResolution:function(e,t,n){var o=document.getElementById("GameDiv");cc.view.setDesignResolutionSize(e.width,e.height,cc.ResolutionPolicy.FIXED_WIDTH),o.style.width=e.width/t+"px",o.style.height=e.height/t+"px",cc.view.setCanvasSize(e.width/t,e.height/t),console.log(e),n&&n()},setNodeAttribute:function(e){var t=e.node,n=e.attribute,o=e.value;t?(t[n]=o,console.log("\u8bbe\u7f6e\u6210\u529f:"+n)):console.log("\u4e0d\u5b58\u5728\u8282\u70b9")},emitGameEvt:function(e,t){cc.find("Canvas/start").opacity=0,cc.tween(cc.find("Canvas/start")).to(.5,{opacity:255}).start()}},cc._RF.pop()},{}]},{},["emitNode","use_v2.1-2.2.1_cc.Toggle_event","web2gameSDk"]);