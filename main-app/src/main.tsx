import { createRoot } from 'react-dom/client'
import { registerMicroApps, start } from 'qiankun';


const MainApp = () => (
  <div id='root'>
    <h1>Main Application</h1>
    <div id="subapp-container"></div> {/* 子应用容器 */}
  </div>
);


createRoot(document.getElementById('root')!).render(<MainApp/>);

registerMicroApps([
  {
    name: 'sub-app',  // 子应用的名称
    entry: '//localhost:5174', // 子应用的地址
    container: '#subapp-container', // 挂载容器
    activeRule: '/sub-app',  // 激活路由
  },
  {
    name: 'sub-vue',  // 子应用的名称
    entry: '//localhost:5175', // 子应用的地址
    container: '#subapp-container', // 挂载容器
    activeRule: '/sub-vue',  // 激活路由
  },
]);

start();