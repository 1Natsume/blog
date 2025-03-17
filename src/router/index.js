import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import blogRedirect from "@/utils/BlogRedirect";
import Component from "@/utils/Component";

let routes = [
    {
        path: '/',
        redirect: (e) => {
            return blogRedirect.redirect(e);
        }
    },
    {
        path: '/c',
        name: 'BlogPanel',
        component: Component.BlogPanel,
        children: [{
            path: 'subject/',
            name: "SubjectBody",
            component: Component.SubjectBody,
            redirect: "/",
            children: [
                { path: 'category/:categoryId', component: Component.CategoryBody },
                { path: 'archive/:archiveYear/:archiveMonth', component: Component.CategoryBody },
                { path: 'tag/:tagId/', component: Component.CategoryBody },
                { path: 'p/:articleId', component: Component.ArticleBody },
                {
                    path: '/admin',
                    name: 'Admin',
                    component: Component.Admin,
                },
            ]
        },
        {
            path: 'author/',
            name: "AuthorBody",
            component: Component.BlogAuthorBody
        }
        ]
    },
    {
        path: '/song',
        name: 'PlayList',
        component: Component.PlayList,
    },
    {
        path: '/home',
        name: 'Home',
        component: Component.Headertop,
    },
    {
        path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
    // 每次切换路由的时候滚动到页面顶部
    //页面跳转显示在顶部

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return { left: 0, top: 0}
            //return savedPosition
        } else {
            return { left: 0, top: 0 }
        }
    }
})

export default router