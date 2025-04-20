<template>
  <van-skeleton title avatar :row="3"  :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="user.username"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-left: 5px;margin-top: 3px;" color="red">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="small" @click="doJoinFriend(user.id)">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
  import {UserType} from "../models/user";
  import {showConfirmDialog, showFailToast} from "vant";
  import myAxios from "../plugins/myAxios.ts";


  interface UserCardListProps{
    loading : boolean;
    userList : UserType[];
  }
  const props = withDefaults(defineProps<UserCardListProps>(),{
    loading: true,
    userList : []
  })

  const doJoinFriend = (id:number)=>{
    showConfirmDialog({
      title: '联系我',
      message:
          '确定要加他为好友吗？',
    })
        .then(async () => {
          // on confirm
          const res = await myAxios.post('/user/joinFriend', id,{
            headers: {
              'Content-Type': 'application/json'
            }});
          console.log('999999999999999999999999999999', res)
          if (res.data.code === 20000 && res.data.data == false){
            showFailToast('不能与自己加好友！')
          }
        });
  }


</script>

<style scoped>

</style>
