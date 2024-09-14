import {createRouter, createWebHashHistory} from "vue-router";
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";




const routes = [
    { path: '/', component: Index},
    { path: '/team', component: Team},
    { path: '/team/add', component: TeamAddPage},
    { path: '/user', component: User},
    { path: '/search', component: Search},
    { path: '/user/list', component: SearchResultPage},
    { path: '/user/edit', component: UserEditPage},
    { path: '/user/login', component: UserLoginPage}
]

// 创建 router 实例，然后传 `routes` 配置
const router =  createRouter({
    history: createWebHashHistory(),
    routes // (缩写) 相当于 routes: routes
})

export default router;
