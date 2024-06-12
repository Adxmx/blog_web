/**跳转路由列表
 * 
 * groups和group:
 *  一级导航:
 *    groups: key为分组的key值, title为分组的标题, 用于二级导航栏的分组聚合
 *  二级导航:
 *    group: 值为一级导航栏groups列表中的某一个key
 * 
 *  若一级导航栏存在groups，则二级导航栏的中的group的值须为groups中的某一个key
 *  若一级导航栏不存在groups，二级导航栏group无需配置
 */
const routes = [
  {
    path: '/login',
    name: 'admin-login',
    meta: {
      title: '登 录'
    },
    hidden: true,
    component: () => import('@/view/admin/login/index.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/components/layout/admin/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        meta: {
          title: '仪  表  盘',
          icon:'compass-outlined'
        },
        component: () => import('@/view/admin/dashboard/index.vue')
      },
      {
        path: 'blog',
        name: 'admin-blog',
        meta: {
          title: '博客管理',
          icon:'desktop-outlined',
          groups:[
            {"key": "article", "title": "文 章"},
            {"key": "archive", "title": "归 档"},
          ]
        },
        children: [
          {
            path: 'artical/detail/:id',
            name: 'admin-blog-artical-detail',
            meta: {
              title: '博客详情',
              group: 'article'
            },
            hidden: true,
            component: () => import('@/view/admin/blog/blog-detail.vue')
          },
          {
            path: 'artical/write',
            name: 'admin-blog-artical-write',
            meta: {
              title: '博客发布',
              icon: 'form-outlined',
              group: 'article'
            },
            component: () => import('@/view/admin/blog/blog-write.vue')
          },
          {
            path: 'artical/list',
            name: 'admin-blog-artical-list',
            meta: {
              title: '博客列表',
              icon: 'read-outlined',
              group: 'article'
            },
            component: () => import('@/view/admin/blog/blog-list.vue')
          },
          {
            path: 'archive/list',
            name: 'admin-blog-archive-list',
            meta: {
              title: '博客归档',
              icon: 'gold-outlined',
              group: 'archive'
            },
            component: () => import('@/view/admin/archive/archive-list.vue')
          }
        ]
      },
      {
        path: ':pathMatch(.*)',
        name: '404',
        meta:{
          title: '4 0 4'
        },
        component: () => import('@/view/admin/exception/404.vue'), 
        hidden: true
      }
    ]
  }
]



export default routes