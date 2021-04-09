cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        this.node.on(
            cc.Node.EventType.TOUCH_END,
            e => {
                e.stopPropagation();
                if (window.eventBus) {
                    window.eventBus.emit('WEB_MSG_TYPE.SELECT_NODE', e.currentTarget);
                }
            },
            this
        );
    },
});
