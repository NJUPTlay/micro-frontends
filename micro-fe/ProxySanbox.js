class SandProxy {
  constructor(name) {
    this.name = name;
    this.sandboxRunning = false;
    const proxyWindow = {};
    const rawWindow = window;
    this.proxy = new Proxy(proxyWindow, {
      set: function (target, key, value) {
        if (this.sandboxRunning) {
          console.log("正在设置");
          if (!target.hasOwnProperty(key) && rawWindow.hasOwnProperty(key)) {
            const desciptor = Object.getOwnPropertyDescriptor(rawWindow, key);
            const { writable, configurable, enumerable } = desciptor;
            if (writable) {
              Object.defineProperty(target, key, {
                writable,
                configurable,
                enumerable,
                value,
              });
            }
          } else {
            target[key] = value;
          }
          if (variableWhiteList.indexOf(key) !== -1) {
            // @ts-ignore
            rawWindow[key] = value; // 白名单中的属性需要存在在真实的window对象中
          }
        } else {
          rawWindow[key] = value;
        }
      },
      get: function (target, key) {
        if (key in target) return target[key];
        else if (key in rawWindow) return rawWindow[key];
      },
    });
  }
  avtive() {
    this.sandboxRunning = true;
  }
  inactive() {
    this.sandboxRunning = false;
  }
}

const sandProxy = new SandProxy("test");

window.testProp1 = "value1";
console.log(sandProxy.proxy.testProp1);

sandProxy.avtive();
sandProxy.proxy.testProp2 = "value2";

const variableWhiteList = ["test"];
sandProxy.proxy.test = "lay";
console.log(window.test);
console.log(sandProxy.proxy.testProp2);
