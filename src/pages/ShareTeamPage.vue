<template>
  <div class="teamPage">
    <team-card-list :team-list="teamList"/>
    <!-- 搜索提示 -->
    <van-empty v-if="!teamList || teamList.length < 1" image="search" description="找不到对应的队伍" />
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import {ref} from 'vue'

const teamList = ref([])
const route = useRoute()
const id = route.query.id

/**
 * 分享的队伍
 * @param val
 */
const listTeam = async ()=>{
  const res = await myAxios.get('/team/get',{
    params:{
      id,
      pageNum:1,
    }
  });
  if (res?.data?.code === 20000 && res?.data?.data){
    teamList.value = res.data.data
  }else {
    showFailToast(res.data.description)
  }
}

//加载队伍信息
onMounted(async ()=>{
  listTeam()
})


</script>

<style scoped>

</style>
