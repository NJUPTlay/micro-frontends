export const importHTML=async (url)=>{
    const template=document.createElement('div')
    template.innerHTML='<p>test</p>'
    // 获取所有的 sript 标签的代码
    function getExternalScripts(){

    }

    //获取并且执行 sript 标签的代码
    function execSripts(){

    }
    return {
        template,
        getExternalScripts,
        execSripts
    }
}