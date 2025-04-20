<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="shandao"
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
            if(team.status === 0 || team.status === 1){
              doJoinTeam();
            }else {
              showPasswordDialog = true;
            }
          }">加入队伍
      </van-button>
      <van-button
          v-if="team.hasJoinTeam"
          size="small" type="primary"
          plain
          @click="doGroupChat(team.id)">群聊
      </van-button>
      <van-button
          v-if="team.hasJoinTeam && team.status === 1 && team.userId === currentUser?.id"
          size="small" type="primary"
          plain
          @click="doShareTeam(team.id)">分享房间
      </van-button>
      <van-button
          v-if="team.hasJoinTeam"
          size="small" type="primary"
          plain
          @click="doMemberList(team.id,team.maxNum)">队伍成员
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
import shandao from '../assets/shandao.jpg'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast,showDialog} from "vant";
import {onMounted, ref} from 'vue'
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
 * 进入展示成员列表界面
 */
const doMemberList = (id:number, maxNum:number) => {
  router.push({
    path: '/team/member/list',
    query: {
      teamId: id,
      maxNum,
    }
  })
}

/**
 * 进入群聊界面
 */
const doGroupChat = (id:number) => {
  router.push({
    path: '/chat',
    query: {
      id
    }
  })
}

/**
 * 分享队伍
 */
const doShareTeam = (id:number) => {
  const message = 'http://localhost:5173/team/share/get?id='+id;
  showDialog({
    title: '复制链接',
    message: message,
    theme: 'round-button',
  }).then(() => {
    navigator.clipboard.writeText(message)
    // on close
  });
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
