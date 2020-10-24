import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import JSONbig from 'json-bigint'
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';
Vue.use(ElementTiptapPlugin,{
  lang: "en", // 见 i18n
  spellcheck: true, // 可被 editor 同名 prop 重写
})

//1. JSONbig.parse() 和 JSON.parse() 相对应的
// var str = '{ "id": 1253585734669959168 }'
// console.log(JSON.parse(str)); // {id: 1253585734669959200}

// 他会把超出的 JS 安全整数范围内的数字转为一种类型为BigNumber 的对象
// 我们在使用的时候需要吧这个BigNumber.toString() 就能得到原来正确的数据了
// console.log(JSONbig.parse(str)); // {id: BigNumber}
// console.log(JSONbig.parse(str).id.toString()); // 使用toString() 方法转换一下  1253585734669959168

//2. JSONbig.stringify() 和 JSON.stringify() 对应的
//var data = JSONbig.parse(str)
// console.log(JSON.stringify(data)) // {"id":"1253585734669959168"}
// console.log(JSONbig.stringify(data))  // {"id":1253585734669959168}

//3. 解决思路
// Axios 会在内部使用JSON.parse() 吧后端返回的数据转为JavaScript数据对象
//所以解决思路是:不要让axios JSON.parse() 来转换这个数据, 而是用json-bigint来做转换处理
// axios提供了一个API: transformResponse: [function (data) {
    // 对 data 进行任意转换处理
 /*    return data;
  }], */

// 引入全局样式
import "@/styles/index.less"

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


