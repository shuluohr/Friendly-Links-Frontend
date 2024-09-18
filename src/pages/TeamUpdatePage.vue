<template>
  <div class="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="1"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="calendar"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model.number="addTeamData.status" direction="horizontal">
              <van-radio :name="0">公开</van-radio>
              <van-radio :name="1">私有</van-radio>
              <van-radio :name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field v-if="addTeamData.status === 2"
            v-model="addTeamData.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast, showSuccessToast} from "vant";
  import router from "../config/route.ts";
import {useRoute} from "vue-router";


  const route = useRoute()

  const id = route.query.id

  //获取之前的队伍信息
  const addTeamData:any = ref({})
  onMounted(async () =>{
      if (id <= 0){
        showFailToast("加载失败")
        return;
      }

      const res = await myAxios.get('/team/get', {
        params: {
          id,
        }
      });
      if (res?.data?.code === 20000 && res?.data?.data ){
        console.log(res)
        addTeamData.value = res.data.data;
      }else {
        showFailToast("加载失败")
      }


  })
  //过期时间选择页面展示和确认之后步骤
  const showCalendar = ref(false);
  const onConfirm = (date) => {
    addTeamData.value.expireTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    showCalendar.value = false;
  };
  //提交表单
  //todo 前端参数校验
  const onSubmit = async () =>{
    const res = await myAxios.post('/team/update',addTeamData.value);
    if (res?.data?.code === 20000 && res?.data?.data ){
      showSuccessToast('更新成功');
      router.push({
        path: '/team',
        replace: true
      })
    }else {
      showFailToast('更新失败')
    }
  }



</script>

<style scoped>

</style>
