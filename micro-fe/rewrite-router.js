import { handleRouter } from "./handle-router";

let preRoute = "";
let nextRoute = window.location.pathname;

export const getPreRoute = () => preRoute;

export const getNextRoute = () => nextRoute;

export const rewriteRouter = () => {
  // hash 路由 window.onhashChange
  // history 路由 history.go .back .forward 都是onpopstate 事件
  window.addEventListener("popstate", () => {
    preRoute=nextRoute
    nextRoute=window.location.pathname 
    handleRouter();
  });

  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    preRoute = window.location.pathname;
    rawPushState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    preRoute = window.location.pathname;
    rawReplaceState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter();
  };
};
