<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="kun"
      :desc="team.description"
      :title="team.name"
  >
    <template #tags>
      <van-tag plain type="primary"  style="margin-left: 5px;margin-top: 3px;" color="red">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ '最大人数：' + team.maxNum }}
      </div>
    </template>
    <template #footer>
      <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
  import {TeamType} from "../models/team";
  import {teamStatusEnum} from "../constants/team.ts";
  import kun from '../assets/kun.png'
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast, showSuccessToast} from "vant";

  interface TeamCardListProps{
    teamList : TeamType[]
  }
  const props = withDefaults(defineProps<TeamCardListProps>(),{
    teamList : []
  })

  /**
   * 加入队伍
   */
  const doJoinTeam = async (id:number)=>{
    const res = await myAxios.post('/team/join',{
      teamId: id
    });
    if (res?.data?.code === 20000){
      showSuccessToast('加入成功')
    }else {
      showFailToast('加入失败'+'\n'+ (res.data.description ? `${res.data.description}`:''))
    }
  }
</script>

<style scoped>

</style>
