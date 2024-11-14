const guestRoutes = [
  {
    path: '/',
    name: 'guest',
    meta: {
      title: "前台展示"
    },
    component: () => import('@/components/layout/guest/index.vue'),
    redirect: { name: 'guest-index' },
    children: [
      {
        path: 'index',
        name: 'guest-index',
        meta: {
          title: "首页"
        },
        component: () => import('@/view/guest/home/home-index.vue')
      },
      {
        path: 'major',
        name: 'guest-major',
        meta: {
          title: "技术分享"
        },
        component: () => import('@/view/guest/major/major-index.vue')
      },
      {
        path: 'thought',
        name: 'guest-thought',
        meta: {
          title: "杂文笔谈"
        },
        component: () => import('@/view/guest/thought/thought-index.vue')
      },
      {
        path: 'diary',
        name: 'guest-diary',
        meta: {
          title: "随心所录"
        },
        component: () => import('@/view/guest/diary/diary-index.vue')
      },
      {
        path: 'archive',
        name: 'guest-archive',
        meta: {
          title: "时间轴"
        },
        component: () => import('@/view/guest/archive/archive-index.vue')
      },
      {
        path: 'board',
        name: 'guest-board',
        meta: {
          title: "留言板"
        },
        component: () => import('@/view/guest/board/board-index.vue')
      },
      {
        path: 'about',
        name: 'guest-about',
        meta: {
          title: "关于我们"
        },
        component: () => import('@/view/guest/about/about-index.vue')
      },
      {
        path: 'blog/:id',
        name: 'guest-blog',
        meta: {
          title: '文章详情',
        },
        hidden: true,
        component: () => import('@/view/guest/blog/blog-index.vue')
      },
      {
        path: ':pathMatch(.*)',
        name: 'guest-404',
        meta:{
          title: '4 0 4'
        },
        component: () => import('@/view/guest/exception/404.vue'), 
        hidden: true
      }
    ]
  }
]

export default guestRoutes