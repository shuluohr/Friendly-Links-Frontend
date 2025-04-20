<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <!-- 搜索提示 -->
  <van-empty v-if="loading === false && (!userList || userList.length < 1) " description="数据找不见了" />
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from '../plugins/myAxios.ts'
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {useRoute} from "vue-router";

// type ModeType = "default" | "match";

const userList:any = ref([{},{},{}])
const loading = ref<boolean>(true)
const route = useRoute()


/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;


  const userListData =  await myAxios.get('/user/getMyJoinFriendList')
        .then(function (response){
          if (!response.data.data){
            userList.value = null;
          }
          return response.data?.data
        })
        .catch(function (error) {
          showFailToast('请求失败: '+ error)
        })
  if (userListData){
    userListData.forEach((user:any)=>{
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
    console.log('1111111111111111111111111111111111111111111', userList.value)
  }
  loading.value = false;
}
watchEffect(()=>{
  loadData()
})



</script>

<style scoped>

</style>
