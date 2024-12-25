import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

function render(props: any) {
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

renderWithQiankun({

  //子应用中接入 qiankun
  // 导出三个必要的生命周期钩子函数
  // 渲染之前调用bootsrap mount挂载 unmount 卸载
  // 生命周期函数必须返回 Promise 子应用中也不需要再安装 qiankun
  mount(props) {
    console.log("viteapp mount");
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("viteapp unmount");
    const { container } = props;
    const mountRoot = container?.querySelector("#root");
    const root = ReactDOM.createRoot(mountRoot || document.getElementById("root"));
    root.unmount();
  },
  update(props: any) {
    console.log("viteapp update");
    console.log(props)
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  //如果没有qiankun的__POWERED_BY_QIANKUN__ 也可以独立运行
  render({});
}
