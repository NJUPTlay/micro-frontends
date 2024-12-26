import { getApps } from "./index.js";
import { importHTML } from "./import-html.js";
import { getNextRoute, getPreRoute } from "./rewrite-router.js";

// 处理路由变化
export const handleRouter = async () => {
  // 先卸载上一个应用，在注册新的应用
  const apps = getApps();
  //获取上一个
  const prevApp=apps?.find(item=>getPreRoute().startsWith(item?.activeRule))

  //获取下一个
  const app = apps?.find((item) =>getNextRoute().startsWith(item.activeRule));

  if(prevApp){
    await unmount(prevApp)
  }

  if (!app) {
    return;
  }

  // 加载子应用
  // 请求子应用的资源
  // 直接嵌入 innerHTML 其中的 script 不会被加载执行
  // container.innerHTML=html
  // 需要手动加载子应用的 sript eval 来执行字符串中的代码
  const { template, getExternalScripts, execScripts } = await importHTML(app?.entry);
  const container = document.querySelector(app?.container);
  container.appendChild(template);

  //配置全局环境变量
  window.__POWERED_BY_QIANKUN__=true

  const appExports = await execScripts()
  app.bootstrap=appExports.bootstrap
  app.mount=appExports.mount
  app.unmount=appExports.unmount

  await bootstrap(app)

  await mount(app)


  async function bootstrap(app){
    app?.bootstrap&&(await app.bootstrap())
  }

  async function mount(app){
    app?.mount&&(await app.mount({
      container:document.querySelector(app.container)
    }))
  }

  async function unmount(app){
    app?.unmount&&(await app.unmount({
      container:document.querySelector(app.container)
    }))
  }

};
