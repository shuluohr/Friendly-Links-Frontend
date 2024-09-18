<template>
<!--NavBar导航栏-->
  <van-nav-bar
      :title
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>



  <div id="content">
    <router-view/>
  </div>


<!--底部tabbar-->
  <van-tabbar  route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {routes} from "../config/route.ts";
//import {createFilter} from "vite";

  const router = useRouter();
  const DEFINE_TITLE = '伙伴匹配'
  const title = ref(DEFINE_TITLE);


  /**
   * 根据路由切换标题
   */
  router.beforeEach((to) => {
    const toPath = to.path;
    const myRoute = routes.find( route => toPath == route.path)
    title.value = myRoute?.title ?? DEFINE_TITLE;
  })

  const onClickLeft = () => {
    router.back()
  };
  const onClickRight = () => {
    router.push('/search')
  };


</script>

<style scoped>
#content{
  padding-bottom: 60px;
}
</style>
