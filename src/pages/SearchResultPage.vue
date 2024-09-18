<template>
  <user-card-list :user-list="userList" :loading/>
  <!-- 搜索提示 -->
  <van-empty v-if="loading === false && (!userList || userList.length < 1)" image="search" description="搜索不到对应的用户" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from '../plugins/myAxios.ts'
import {showFailToast} from "vant";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";


const route = useRoute()

const tags = route.query.tags
const userList:any = ref([{},{},{}])
const loading = ref<boolean>(true)

onMounted( async ()=>{
  loading.value = true;
  const userListData =  await myAxios.get('/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices:false})
    }
  })
      .then(function (response){
        console.log('/user/search/tags success',response)
        return response.data?.data
      })
      .catch(function (error) {
        console.error('/user/search/tags error',error)
        showFailToast('请求失败')
      })

  console.log("userListData",userListData)
  if (userListData){
    userListData.forEach((user:any)=>{
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
  loading.value = false;
})



</script>

<style scoped>

</style>
