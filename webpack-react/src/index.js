import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


function render(props) {
  const { container } = props;
  const rootElement = container
    ? container.querySelector("#root")
    : document.getElementById("root");

  // 使用 createRoot 创建挂载点
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// 非qiankun子应用的处理 没有power_by_qinakun 直接render
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

//导出 方便qiankun的api去获取 webpack 是从入口开始导出的

export async function bootstrap() {
  console.log("webapck react app bootstraped");
}

export async function mount(props) {
  console.log("webpack props from main framework", props);
  render(props);
}

// 在切换的时候销毁掉
export async function unmount(props) {
  const { container } = props;
  const mountRoot = container?.querySelector("#root");
  const root = ReactDOM.createRoot(
    mountRoot || document.getElementById("root")
  );
  root.unmount();
}
