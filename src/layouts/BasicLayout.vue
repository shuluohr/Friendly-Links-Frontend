<template>
<!--NavBar导航栏-->
  <van-nav-bar
      title="标题"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <!--刷新功能和提示-->
  <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
  >
    <p>刷新次数: {{ count }}</p>
  </van-pull-refresh>

  <div id="content">
    <router-view/>
  </div>


<!--底部tabbar-->
  <van-tabbar  @change="onChange" route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>


<script setup lang="ts">
  import {showToast} from "vant";
  import {useRouter} from "vue-router";
  import {ref} from "vue";
  //import {createFilter} from "vite";

  const router = useRouter();
  const onClickLeft = () => {
    router.back()
  };
  const onClickRight = () => {
    router.push('/search')
  };

  // const active = ref('index');
  const onChange = (index:string) => showToast(`标签 ${index}`);

  // 实现刷新的功能
  const count = ref(0);
  const isLoading = ref(false);
  const onRefresh = () => {
    setTimeout(() => {
      showToast('刷新成功');
      isLoading.value = false;
      count.value++;
    }, 1000);
  }
</script>

<style scoped>
#content{
  padding-bottom: 60px;
}
</style>
