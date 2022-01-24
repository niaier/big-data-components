import Transfer from './Transfer.vue'
import "@/assets/font_icon/iconfont.css"

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('Transfer', Transfer)
}
//为组件添加 install 方法
Transfer.install = function (Vue) {
  Vue.component(Transfer.name, Transfer)
}
export default Transfer