import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import blogRedirect from "@/utils/BlogRedirect";

// 路由懒加载
const BlogPanel = () => import('@/components/BlogPanel.vue')
const Admin  = () => import("@/components/Admin.vue")
const CategoryBody  = () => import("@/components/body/CategoryBody.vue")
const ArticleBody  = () => import("@/components/body/article/ArticleBody.vue")
const SubjectBody  = () => import("@/components/body/SubjectBody.vue")
const BlogAuthorBody  = () => import("@/components/body/author/BlogAuthorBody.vue")

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
        component: BlogPanel,
        children: [{
            path: 'subject/',
            name: "SubjectBody",
            component: SubjectBody,
            redirect: "/",
            children: [
                { path: 'category/:categoryId', component: CategoryBody },
                { path: 'archive/:archiveYear/:archiveMonth', component: CategoryBody },
                { path: 'tag/:tagId/', component: CategoryBody },
                { path: 'p/:articleId', component: ArticleBody },
                {
                    path: '/admin',
                    name: 'Admin',
                    component: Admin,
                },
            ]
        },
        {
            path: 'author/',
            name: "AuthorBody",
            component: BlogAuthorBody
        }
        ]
    },
    // {
    //     path: '/admin',
    //     name: 'Admin',
    //     component: Admin,
    // },
    {
        path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router