import { fetchResource } from "./fetch-resource"


export const importHTML = async (url)=>{
    const html=await fetchResource(url)
    const template=document.createElement('div')
    template.innerHTML=html

    const scripts=template.querySelectorAll('script')

    // 获取所有的 sript 标签的代码
    function getExternalScripts() {
        return Promise.all(Array.from(scripts).map(script=>{
            const src=script.getAttribute('src')
            if(!src){
                return Promise.resolve(script.innerHTML)
            }else{
                return fetchResource(
                    src.startsWith('http')?src:`${url}${src}`
                )
            }
        }))

    }

    //获取并且执行 sript 标签的代码
    async function execScripts(){
        const scripts =await getExternalScripts()

        //手动构造一个commonJS构造环境
        const module={exports:{}}
        const exports=module.exports
        scripts.forEach(code=>{
            eval(code)
        })

        return module.exports  
    }
    return {
        template,
        getExternalScripts,
        execScripts
    }
}