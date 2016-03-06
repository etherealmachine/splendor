(function(Observer) {

  function observe(target, listener, path) {
    Object.getOwnPropertyNames(target).forEach(function(prop) {
      var tmp = target[prop];
      if (typeof tmp == 'object') {
        target[prop] = new Proxy(
          target[prop],
          observer(listener, path + '.' + prop));
        observe(tmp, listener, path + '.' + prop);
      }
    });
    return target;
  }

  var observer = function(listener, path) {
    return {
      set: function(target, prop, value, receiver) {
        Reflect.set(target, prop, value);
        listener.notifyPath(path + '.' + prop, value);
        return true;
      },
      get: function(target, prop, receiver) {
        if (prop == 'push') {
          return function(item) {
            target.push(item);
            listener.notifySplices(path, [
              {
                index: (target.length-1),
                removed: [],
                addedCount: 1,
                object: target,
                type: 'splice'
              }
            ]);
          }
        } else if (prop == 'pop') {
          console.error('unhandled polymer array mutation');
        } else if (prop == 'splice') {
          return function(start, deleteCount) {
            var removed = target.splice.apply(target, arguments);
            listener.notifySplices(path, [
              {
                index: start,
                removed: removed,
                addedCount: arguments.length-2,
                object: target,
                type: 'splice'
              }
            ]);
          }
        } else if (prop == 'shift') {
          return function() {
            var item = target.shift();
            listener.notifySplices(path, [
              {
                index: 0,
                removed: [item],
                addedCount: 0,
                object: target,
                type: 'splice'
              }
            ]);
            return item;
          }
        } else if (prop == 'unshift') {
            console.error('unhandled polymer array mutation');
        }
        return Reflect.get(target, prop, receiver);
      }
    };
  };

  Observer.observe = observe;
  
})(window.Observer = window.Observer || {});