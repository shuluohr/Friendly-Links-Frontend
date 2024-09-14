<template>
  <template v-if="user">
    <van-cell title="昵称" to="/user/edit" is-link arrow-direction="down" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号"  :value="user.userAccount" />
    <van-cell title="头像" to="/user/edit" is-link arrow-direction="down" >
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" to="/user/edit" is-link arrow-direction="down" :value="user.gender" @click="toEdit('gender','性别',user.gender)" />
    <van-cell title="电话" to="/user/edit" is-link arrow-direction="down" :value="user.phone" @click="toEdit('phone','电话',user.phone)" />
    <van-cell title="邮箱" to="/user/edit" is-link arrow-direction="down" :value="user.email" />
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell title="注册时间" :value="user.createTime" />
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
