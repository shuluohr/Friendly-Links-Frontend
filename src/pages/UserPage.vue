<template>
  <template v-if="user">
    <van-cell title="用户" :value="user?.username" />
    <van-cell title="修改我的信息" is-link to="/user/update" />
    <van-cell title="我的好友" is-link to="/user/myJoinFriend" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.ts";


const router = useRouter();

const user:any = ref()


onMounted(async ()=>{
  const res = await getCurrentUser()

  if (res){
    user.value = res
  }else {
    showFailToast('获取个人信息失败')
  }
})


/*
const user = {
    id: 1,
    username: 'hicgil',
    userAccount: 'shuluo',
    avatarUrl: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.hsnwZAr2R2xUr97ScoSjrgAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    gender: '男',
    phone: '12314234',
    email: '12124@qq.com',
    planetCode: '1',
    createTime: new Date(),
  }*/

const toEdit = (editKey,editName,currentValue)=>{
  router.push({
    path: '/user/edit',
    query: {editKey, editName, currentValue}
  })
}


/*
const editOk = {
  editKey: route.query.editKey,
  editName:route.query.editName,
  currentValue:route.query.value
}

user.value.gender = editOk.currentValue
*/



//修改表格的值内容
</script>

<style scoped>

</style>
