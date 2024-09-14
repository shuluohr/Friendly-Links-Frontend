<template>
  <div class="teamPage">
    <van-button  icon="plus" type="primary" @click="doJoinTeam"/>
    <team-card-list :team-list="teamList"/>
  </div>
</template>

<script setup lang="ts">
  import {useRouter} from "vue-router";
  import TeamCardList from "../components/TeamCardList.vue";
  import {onMounted} from "vue";
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast} from "vant";
  import {ref} from 'vue'

  const route = useRouter()
  //跳转到添加队伍页面
  const doJoinTeam = () =>{
    route.push({
      path: '/team/add'
    })
  }

  const teamList = ref([])
  //加载队伍信息
  onMounted(async ()=>{
    const res = await myAxios.get('/team/list');
    if (res?.data?.code === 20000 && res?.data?.data){
      teamList.value = res.data.data
    }else {
      showFailToast('加载队伍失败，请刷新重试')
    }
  })

</script>

<style scoped>

</style>
