/**
 * 实现发布-订阅模式下的消息传输机制，支持命名空间与离线事件
 * @param {string} [key] 事件的名称
 * @param {function} [fn] 事件的回调
 * @param {string} [last] 是否只执行最后一次绑定的消息 last ==“last”时只执行最后一次绑定的消息，否则执行之前所有绑定的消息
 *
 * @example
 * 1.常规
 *  eventBus.on('click',function(a){
 *    console.log(a) // 输出 :1
 *  })
 *  eventBus.emit('click',1)
 *
 * 2. 先发布后订阅
 * eventBus.emit('click',1)
 * eventBus.on('click',function(a){
 * console.log(a) // 输出 :1
 * })
 *
 * 3.使用命名空间
 * eventBus.create('namespace1').on('click',function(a){
 * console.log(a) // 输出 :1
 * })
 * eventBus.create('namespace1').emit('click',1)
 *
 * auth by guoqiang
 * 注意：支持离线事件可能会带来一些副作用，比如意外的某个页面发布了某个消息，这时如果另一个订阅了这个消息，这个消息的回调会立即执行，而且大多请况下，回调的参数会出问题。在逻辑没理清之前不建议先发布再订阅
 * 注意：支持离线事件可能会带来一些副作用，比如意外的某个页面发布了某个消息，这时如果另一个订阅了这个消息，这个消息的回调会立即执行，而且大多请况下，回调的参数会出问题。在逻辑没理清之前不建议先发布再订阅
 * 注意：支持离线事件可能会带来一些副作用，比如意外的某个页面发布了某个消息，这时如果另一个订阅了这个消息，这个消息的回调会立即执行，而且大多请况下，回调的参数会出问题。在逻辑没理清之前不建议先发布再订阅
 */
(function(window, undefined) {
  var _subscribe = null,
    _publish = null,
    _unsubscribe = null,
    _shift = Array.prototype.shift, // 删除数组的第一个 元素，并返回这个元素
    _unshift = Array.prototype.unshift, // 在数组的开头添加一个或者多个元素，并返回数组新的length值
    namespaceCache = {},
    _create = null,
    each = function(ary, fn) {
      var ret = null;
      for (var i = 0, len = ary.length; i < len; i++) {
        var n = ary[i];
        ret = fn.call(n, i, n);
      }
      return ret;
    };

  // 订阅消息名称为：'+key+'
  _subscribe = function(key, fn, cache) {
    if (!cache[key]) {
      cache[key] = [];
    }
    cache[key].push(fn);
  };

  // 取消订阅（取消全部或者指定消息）
  _unsubscribe = function(key, cache, fn) {
    if (cache[key]) {
      if (fn) {
        for (var i = cache[key].length; i >= 0; i--) {
          if (cache[key][i] === fn) {
            cache[key].splice(i, 1);
          }
        }
      } else {
        cache[key] = [];
      }
    } else if (!key) {
      for (var key in cache) {
        delete cache[key];
      }
    } else {
      console.log("不存在该消息的监听:" + key);
    }
  };

  // 发布消息
  _publish = function() {
    var cache = _shift.call(arguments),
      key = _shift.call(arguments),
      args = arguments,
      _self = this,
      ret = null,
      stack = cache[key];

    if (!stack || !stack.length) {
      return;
    }

    return each(stack, function() {
      return this.apply(_self, args);
    });
  };

  // 创建命名空间
  _create = function(namespace) {
    var namespace = namespace || "default";
    var cache = {},
      offlineStack = {}, // 离线事件，用于先发布后订阅，只执行一次
      ret = {
        on: function(key, fn, last) {
          _subscribe(key, fn, cache);
          if (!offlineStack[key]) {
            offlineStack[key] = null;
            return;
          }
          if (last === "last") {
            // 指定执行离线队列的最后一个函数，执行完成之后删除
            offlineStack[key].length && offlineStack[key].pop()(); // [].pop => 删除一个数组中的最后的一个元素，并且返回这个元素
          } else {
            each(offlineStack[key], function() {
              this();
            });
          }
          offlineStack[key] = null;
        },
        one: function(key, fn, last) {
          _unsubscribe(key, cache);
          this.on(key, fn, last);
        },
        off: function(key, fn) {
          _unsubscribe(key, cache, fn);
        },
        emit: function() {
          var fn = null,
            args = null,
            key = _shift.call(arguments),
            _self = this;

          _unshift.call(arguments, cache, key);
          args = arguments;
          fn = function() {
            return _publish.apply(_self, args);
          };

          if (offlineStack && offlineStack[key] === undefined) {
            offlineStack[key] = [];
            return offlineStack[key].push(fn);
          }
          return fn();
        }
      };

    return namespace
      ? namespaceCache[namespace]
        ? namespaceCache[namespace]
        : (namespaceCache[namespace] = ret)
      : ret;
  };

  window.eventBus = {
    create: _create, // 创建命名空间
    one: function(key, fn, last) {
      // 订阅消息，只能单一对象订阅
      var namespace = "default";
      var pubsub = this.create(namespace);
      pubsub.one(key, fn, last);
    },
    on: function(key, fn, last) {
      // 订阅消息，可多对象同时订阅
      var namespace = "default";
      var pubsub = this.create(namespace);
      pubsub.on(key, fn, last);
    },
    off: function(key, fn, namespace) {
      // 取消订阅，（取消全部或指定消息）
      namespace = "default";
      var pubsub = this.create(namespace);
      console.trace("");
      pubsub.off(key, fn);
    },
    emit: function(key, fn) {
      // 发布消息
      var namespace = "default";
      var pubsub = this.create(namespace);
      pubsub.emit.apply(this, arguments);
    }
  };
})(window, undefined);
