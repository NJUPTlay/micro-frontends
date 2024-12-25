import { handleRouter } from "./handle-router";


export const rewriteRouter=()=>{
    // hash 路由 window.onhashChange
     // history 路由 history.go .back .forward 都是onpopstate 事件
    window.addEventListener('popstate',()=>{
        handleRouter()
     })
     const rawPushState=window.history.pushState
     window.history.pushState =(...args)=>{
        rawPushState.apply(window.history,args)
        handleRouter()
     }

     const rawReplaceState=window.history.replaceState
     window.history.replaceState =(...args)=>{
        rawReplaceState.apply(window.history,args)
        handleRouter()
     }
}