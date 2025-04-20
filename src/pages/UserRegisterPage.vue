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
      <van-field
          v-model="checkPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请输入确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <van-field
          v-model="planetCode"
          name="编号"
          label="编号"
          placeholder="请输入编号"
          :rules="[{ required: true, message: '请填写编号' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <p style="color: red; font-size: 12px">{{resultErr}}</p>
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
  const checkPassword = ref('');
  const planetCode = ref('');

  const resultErr = ref()

  console.log(route.query)
  const onSubmit = async () => {
    const registerResult = await myAxios.post('/user/register',{
      userAccount: userAccount.value,
      userPassword: userPassword.value,
      checkPassword: checkPassword.value,
      planetCode: planetCode.value,
    })
    console.log(registerResult)
    if (registerResult.data.code === 20000 && registerResult.data.data ){
      showSuccessToast('注册成功')

      const redirectUrl = route.query?.redirect as string ?? '/user/login';
      window.location.href = redirectUrl;

    }else {
      resultErr.value = registerResult.data.description
      showFailToast('注册失败')
    }
  };
</script>

<style scoped>

</style>
