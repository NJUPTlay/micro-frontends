function App() {
  return (
    <>
      <p>webpack-react</p>
      {/*qiankun 存在 publicpath 路径问题,现有webpack是提供支持、vite需要第三方插件来处理*/}
      <img width="100" height="100" src="logo.jpg" alt=""/>
    </>
  );
}

export default App;
