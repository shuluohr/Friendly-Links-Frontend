<template>
  <UserCardList :user-list="userList"/>
  <!-- 搜索提示 -->
  <van-empty v-if="!userList || userList.length < 1" image="search" description="搜索不到对应的用户" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from '../plugins/myAxios.ts'
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";


const route = useRoute()

const tags = route.query.tags
const userList:any = ref([])


onMounted( async ()=>{
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
        showSuccessToast('请求成功')
        console.log("response",response)
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
})


/*
const mockUser = {
  id: 12345,
  username: 'admin',
  userAccount: '1234',
  avatarUrl: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.hsnwZAr2R2xUr97ScoSjrgAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
  gender: 0,
  profile: "阿巴阿巴~",
  phone: '123123234',
  email: '2342459812839489@dsaf.com',
  useRoute: 0,
  planetCode: '1234',
  tags: ['java', 'emo', '打工中', '已婚', '交友'],
  createTime: new Date(),
}
const userList:any = ref([mockUser])*/

</script>

<style scoped>

</style>
