<template>
  <van-form @submit="onSubmit()">
    <van-cell-group inset>
      <van-field
          v-model="currentValue"
          :name="editKey"
          :label="editName"
          :placeholder="`请输入${editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import { ref, toRefs} from 'vue';
import {useRoute,useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast,} from "vant";
import {getCurrentUser} from '../services/user.ts'

  const route = useRoute()
  const router = useRouter()

  const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})

  let {editKey,editName,currentValue} = toRefs(editUser.value)

  const onSubmit = async () => {
    const currentUser =  await getCurrentUser()
    if (!currentUser){
      showFailToast('您还未登录')
      return;
    }
    if (currentValue.value === '男'){
      currentValue.value = 1;
    }else if (currentValue.value === '女'){
      currentValue.value = 0;
    }

    const res = await myAxios.post('/user/update',{
      'id': currentUser.id,
      // [editKey.value as string] : currentValue.value
      [editUser.value.editKey as string] : currentValue.value
    })
    if (res.data.code === 20000 && res.data.data > 0){
      showSuccessToast('修改成功')
      router.back()
    }else {
      showFailToast('修改失败')
    }

  }

</script>

<style scoped>

</style>
