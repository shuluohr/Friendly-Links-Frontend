<template>
  <van-card
      v-for="user in props.userList"
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
      <van-button size="small">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
  import {UserType} from "../models/user";

  interface UserCardListProps{
    userList : UserType[]
  }
  const props = withDefaults(defineProps<UserCardListProps>(),{
    userList : []
  })
</script>

<style scoped>

</style>
