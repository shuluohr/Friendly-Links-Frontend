<template>
  <div class="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus"  @click="toAddTeam"/>
    <team-card-list :team-list="teamList" />
    <!-- 搜索提示 -->
    <van-empty v-if="!teamList || teamList.length < 1" image="search" description="找不到对应的队伍" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const route = useRouter()
const searchText = ref('')
//房间状态
const active = ref('public')
/**
 * 切换房间状态
 * @param name
 */
const onTabChange = (name:string)=>{
  if (name === 'public'){
    //查公开
    listTeam(searchText.value, 0)
  }else {
    //查加密
    listTeam(searchText.value,2)
  }
}

//跳转到添加队伍页面
const toAddTeam = () =>{
    route.push({
      path: '/team/create'
    })
  }

  const teamList = ref([])


  /**
   * 所有队伍
   * @param val
   * @param status
   */
  //这里应该传队伍状态，不然只能看到公开的队伍
  const listTeam = async (val:string = '',status = 0)=>{
    const res = await myAxios.get('/team/list',{
    params:{
      searchText: val,
      status,
      pageNum:1,
    }
  });
    if (res?.data?.code === 20000 && res?.data?.data){
      teamList.value = res.data.data
      console.log(res.data)
    }else {
      teamList.value = res.data.data
      showFailToast(res.data.description)
      // showFailToast('加载队伍失败，请刷新重试')
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
