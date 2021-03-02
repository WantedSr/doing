import { createStore } from 'vuex'
import Cookie from "js-cookie";

export default createStore({
  state: {
    dayImg: Cookie.get("dayImg") || "",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
