import { getApps } from "./index.js";
import { importHTML } from "./import-html.js";

// 处理路由变化
export const handleRouter = async () => {
  const apps = getApps();
  const app = apps.find((item) =>
    window.location.pathname.startsWith(item?.activeRule)
  );
  console.log(app);

  if (!app) {
    return;
  }

  //加载子应用
  // 请求子应用的资源
  const { template, getExternalScripts, execSripts } = await importHTML(app.entry);
  const container=document.querySelector(app.container)
  container.appendChild(template)
  //   const html=await fetch(app.entry).then(res=>res.text() )
  //   console.log(html);
  //   const container=document.querySelector(app?.container)
  //   直接嵌入 innerHTML 其中的 script 不会被加载执行
  //   container.innerHTML=html

  //需要手动加载子应用的 sript eval 来执行字符串中的代码
};
