import { createStore } from 'vuex'
import userModule from './user-module.js'
import blogModule from './blog-module.js'

const state = {

}

const actions = {

}

const mutations = {

}

const modules = {
  user: userModule,
  blog: blogModule
}



export default createStore({
  state,
  actions,
  mutations,
  modules
})
