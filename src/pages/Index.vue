<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <!-- 搜索提示 -->
  <van-empty v-if="loading === false && (!userList || userList.length < 1) " description="数据找不见了" />
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from '../plugins/myAxios.ts'
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

// type ModeType = "default" | "match";

const userList:any = ref([{},{},{}])
const isMatchMode = ref<boolean>(false)
const loading = ref<boolean>(true)

/**
 * 加载数据
 */
const loadData = async () => {
  let userListData
  loading.value = true;
  //心动模式, 根据标签匹配用户
  if (isMatchMode.value){
    const num = 10;
    userListData =  await myAxios.get('/user/match',{
      params: {
        num
      }
    })
        .then(function (response){
          console.log('/user/match success',response)
          return response.data?.data
        })
        .catch(function (error) {
          console.error('/user/match error',error)
          showFailToast('请求失败')
        })
  } else {

    //普通模式，直接分页查询用户
    userListData =  await myAxios.get('/user/recommend',{
      params: {
        pageSize: 8,
        pageNum: 1
      }
    })
        .then(function (response){
          console.log('/user/recommend success',response)
          return response.data?.data?.records
        })
        .catch(function (error) {
          console.error('/user/recommend error',error)
          showFailToast('请求失败')
        })
  }
  if (userListData){

    userListData.forEach((user:any)=>{
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData

  }
  loading.value = false;
}

watchEffect(()=>{
  loadData()
})



</script>

<style scoped>

</style>
