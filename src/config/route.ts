import {createRouter, createWebHistory} from "vue-router";
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";


export const routes = [
    { path: '/', title: '主页', component: Index},
    { path: '/team', title: '找队伍', component: Team},
    { path: '/team/create', title: '创建队伍', component: TeamAddPage},
    { path: '/team/update', title: '更新队伍', component: TeamUpdatePage},
    { path: '/user', title: '个人', component: UserPage},
    { path: '/search', title: '找伙伴', component: Search},
    { path: '/user/list', title: '查找结果', component: SearchResultPage},
    { path: '/user/edit', title: '编辑信息', component: UserEditPage},
    { path: '/user/login', title: '登录', component: UserLoginPage},
    { path: '/user/update', title: '个人信息修改', component: UserUpdatePage},
    { path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage},
    { path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
]

// 创建 router 实例，然后传 `routes` 配置
const router =  createRouter({
    history: createWebHistory(),
    routes // (缩写) 相当于 routes: routes
})

export default router;
