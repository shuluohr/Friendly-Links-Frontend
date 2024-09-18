<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="kun"
      :desc="team.description"
      :title="team.name"
  >
    <template #tags>
      <van-tag plain type="primary" style="margin-left: 5px;margin-top: 3px;" color="red">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div style="margin-bottom: 10px">
        {{ `队伍人数：${team.hasJoinTeamNum}/${team.maxNum} `}}
      </div>
    </template>
    <template #footer>
      <van-button
          v-if="team?.userId !== currentUser?.id && !team?.hasJoinTeam"
          size="small"
          type="primary"
          plain
          @click="()=>{
            joinTeamId = team?.id;
            if(team.status === 0){
              doJoinTeam();
            }else {
              showPasswordDialog = true;
            }
          }">加入队伍
      </van-button>
      <van-button
          v-if="team.userId === currentUser?.id "
          size="small" type="primary"
          plain
          @click="doUpdateTeam(team.id)">更新
      </van-button>
      <!--todo 仅加入队伍可见      -->
      <van-button
          v-if="team.hasJoinTeam"
          size="small"
          type="primary"
          plain
          @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button
          v-if="team.userId === currentUser?.id"
          size="small"
          type="danger"
          plain
          @click="doDeleteTeam(team.id)"> 解散队伍
      </van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button  @confirm="doJoinTeam(passwordVal)" @cancel="doLeaveAndClearPassword">
    <van-field type="text" v-model="passwordVal" placeholder="请输入队伍密码"/>
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import kun from '../assets/kun.png'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onBeforeUpdate, onMounted, onUpdated, ref, watchEffect} from 'vue'
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [],
})
const joinTeamId = ref()
//控制密码输入框弹出的模态框
const showPasswordDialog = ref(false)
//取消并清空密码
const doLeaveAndClearPassword = ()=>{
  passwordVal.value = ''
}
//密码文本
const passwordVal = ref('')
const currentUser = ref()


onMounted(async()=> {
  currentUser.value = await getCurrentUser()
})

/**
 * 加入队伍
 */
const doJoinTeam = async (passwordVal?:string) => {
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: passwordVal,
  });
  if (res?.data?.code === 20000) {
    showSuccessToast('加入成功')
  } else {
    showFailToast('加入失败' + '\n' + (res.data.description ? `${res.data.description}` : ''))
  }
  doLeaveAndClearPassword()

}

/**
 * 跳转到修改队伍的页面
 */
const router = useRouter()
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  })
}

/**
 * 退出队伍
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.data?.code === 20000) {
    showSuccessToast('操作成功')
  } else {
    showFailToast('操作失败' + '\n' + (res.data.description ? `${res.data.description}` : ''))
  }
}

/**
 * 解散队伍
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id
  });
  if (res?.data?.code === 20000) {
    showSuccessToast('操作成功')
  } else {
    showFailToast('操作失败' + '\n' + (res.data.description ? `${res.data.description}` : ''))
  }
}


</script>

<style scoped>

</style>
