<template>
  <user-card-list :user-list="userList"/>
  <!-- 搜索提示 -->
  <van-empty v-if="!userList || userList.length < 1" description="数据找不到了" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from '../plugins/myAxios.ts'
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";



const userList:any = ref([])


onMounted( async ()=>{
  const userListData =  await myAxios.get('/user/recommend',{
    params: {
      pageSize: 8,
      pageNum: 1
    }
  })
      .then(function (response){
        console.log('/user/recommend success',response)
        showSuccessToast('请求成功')
        console.log("response",response)
        return response.data?.data?.records
      })
      .catch(function (error) {
        console.error('/user/recommend error',error)
        showFailToast('请求失败')
      })

  if (userListData){
    userListData.forEach((user:any)=>{
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData

  }
})




</script>

<style scoped>

</style>
