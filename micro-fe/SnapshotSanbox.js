function iter(obj, callback) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            callback(key);
        }
    }
}

class SnapshotSandbox {
    constructor(name) {
        this.name = name;
        this.proxy = window;
        this.modifyPropsMap = {};
    }
    active() {
        this.windowSnapshot = {};
        iter(window, (prop) => {
            this.windowSnapshot[prop] = window[prop];
        });

        //回复之前的修爱
        Object.keys(this.modifyPropsMap)?.forEach((key) => {
            window[key] = this.modifyPropsMap[key];
        });
        this.sandboxRunning = true;
    }
    inactive() {
        this.modifyPropsMap = {};
        //停止时，恢复至快照的状态 并且修改的属性存储
        iter(window, (prop) => {
            if (window[prop] !== this.windowSnapshot[prop]) {
                this.modifyPropsMap[prop] = window[prop];
                window[prop] = this.windowSnapshot[prop];
            }
        });
        this.sandboxRunning = false;
    }
}

// 创建沙箱实例
const sandbox = new SnapshotSandbox('test-sandbox');

// 在激活沙箱前，修改 window 对象的某些属性
window.someProperty = 'original value';
window.someOtherProperty = 'initial value';

// 激活沙箱
sandbox.active();

// 修改 window 对象的属性（沙箱内的操作）
window.someProperty = 'modified in sandbox';
window.someOtherProperty = 'changed in sandbox';

// 打印沙箱内修改后的 window 对象
console.log(window.someProperty); // 期望输出 'modified in sandbox'
console.log(window.someOtherProperty); // 期望输出 'changed in sandbox'

// 停用沙箱，恢复原始状态
sandbox.inactive();

// 打印沙箱停用后的 window 对象
console.log(window.someProperty); // 期望输出 'original value'，恢复为沙箱激活时的快照
console.log(window.someOtherProperty); // 期望输出 'initial value'，恢复为沙箱激活时的快照

