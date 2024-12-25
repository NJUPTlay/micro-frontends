import { handleRouter } from "./handle-router";
import { rewriteRouter } from "./rewrite-router";

let _apps=[]

export const getApps=()=>_apps;

export const registerMicroApps=(apps)=>{
    _apps=apps
}

export const start=()=>{
    
     // 微前端的运行原理： 
     // 1.监视路由变化  
     rewriteRouter()

     // 2.匹配子应用 
     handleRouter()
     // 3.加载子应用 

     // 4.渲染子应用

}