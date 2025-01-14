import { createRouter, createWebHistory } from 'vue-router'
import blogRedirect from "../utils/BlogRedirect";
import BlogPanel from "../components/BlogPanel.vue";
import Admin from "../components/Admin.vue";
import CategoryBody from "../components/body/CategoryBody.vue";
import ArticleBody from "../components/body/article/ArticleBody.vue";
import SubjectBody from "../components/body/SubjectBody.vue";
import BlogAuthorBody from "../components/body/author/BlogAuthorBody.vue";

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
                { path: 'p/:articleId', component: ArticleBody }
            ]
        },
        {
            path: 'author/',
            name: "AuthorBody",
            component: BlogAuthorBody
        }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '*',
        redirect: "/"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router