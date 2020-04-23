
export default {
    install(Vue){
        Vue.fun = function(){
            console.log('fun ', this)
        }
    }
}