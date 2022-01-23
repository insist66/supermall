import Vue from 'vue';
import Vuex from 'vuex';

// 安装插件
Vue.use(Vuex);

// 创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },

  mutations: {
    // mutations唯一的目的就是修改state中的状态
    addCart(state, payload) {
      // state.cartList.push(payload)
      // payload新添加的商品
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      //判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        payload.count = 1;
        state.cartList.push(payload)
      }
    }
  }
})

// 挂载到Vue实例上
export default store;