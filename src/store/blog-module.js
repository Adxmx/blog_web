export default {
  state: {
    // 编辑页博客id
    blogId: null
  },

  actions: {
    // 缓存待编辑的博客id
    cacheBlogId: (context, blogId) => {
        context.commit('CACHE_BLOG_ID', blogId)
    },
    // 清除待编辑的博客id
    releaseBlogId: (context) => {
        context.commit('RELEASE_BLOG_ID')
    }
  },

  mutations: {
    CACHE_BLOG_ID: (state, blogId) => {
      state.blogId = blogId
    },
    RELEASE_BLOG_ID: (state) => {
        state.blogId = null
    }
  }

}
