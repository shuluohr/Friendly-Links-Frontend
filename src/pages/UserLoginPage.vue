<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <RouterLink to="/user/register" style="font-size: 12px">没有账号？跳转注册</RouterLink><br><br>
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>

    </div>
  </van-form>

</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import {useRoute, useRouter} from "vue-router";
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast, showSuccessToast} from "vant";

  const router = useRouter()
  const route = useRoute()

  const userAccount = ref('');
  const userPassword = ref('');
  console.log(route.query)
  const onSubmit = async () => {
    const loginResult = await myAxios.post('/user/login',{
      userAccount: userAccount.value,
      userPassword: userPassword.value
    })
    console.log(loginResult)
    if (loginResult.data.code === 20000 && loginResult.data.data ){
      showSuccessToast('登录成功')

      const redirectUrl = route.query?.redirect as string ?? '/';
      window.location.href = redirectUrl;
    }else {
      showFailToast('登录失败')
    }
  };
</script>

<style scoped>

</style>
