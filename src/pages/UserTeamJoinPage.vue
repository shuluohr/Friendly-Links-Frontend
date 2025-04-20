<template>
  <div class="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :team-list="teamList"/>
    <!-- 搜索提示 -->
    <van-empty v-if="!teamList || teamList.length < 1" image="search" description="找不到对应的队伍" />
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
  const searchText = ref('')


  const teamList = ref([])

  /**
   * 我已加入的队伍
   * @param val
   */
  const listTeam = async (val:string = '')=>{
    const res = await myAxios.get('/team/list/my/join',{
    params:{
      searchText: val,
      pageNum:1,
    }
  });
    if (res?.data?.code === 20000 && res?.data?.data){
      teamList.value = res.data.data
    }else {
      teamList.value = res.data.data
      showFailToast(res.data.description)
    }
  }

  //加载队伍信息
  onMounted(async ()=>{
    listTeam()
  })

  //按下搜索按钮后事件
  const onSearch = async (val:string) => {
    listTeam(val)
  };

</script>

<style scoped>

</style>
