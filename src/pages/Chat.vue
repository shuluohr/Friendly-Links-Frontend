<template>
  <div id="content">
<!--    <van-notice-bar-->
<!--        scrollable-->
<!--        color="#F80000"-->
<!--        class="van-action-bar"-->
<!--        left-icon="volume-o"-->
<!--        :text="noticeMessage"-->
<!--    /><br><br>-->
    <!--          消息整体-->
    <div :class="message.sender===currentUser.userAccount?'chat-message-me':'chat-message-other'"
         :style="{'padding-bottom':messages.length-1===index?'2rem':'none'}"
         v-for="(message, index) in messages"
         :key="index">

      <!--消息头像-->
      <div :class="message.sender===currentUser.userAccount?'message-me-asWhole-headPortrait':'message-other-asWhole-headPortrait'" v-if="message.sender!=='system'">
        <img
            :src="message.avatarUrl"
            class="examineeFace_logo_style">
      </div>
      <!--消息-->
      <div :class="message.sender===currentUser.userAccount?'message-me-asWhole-right':'message-other-asWhole-right'" v-if="message.sender!=='system'" >
        <!--消息上面-->
        <div :class="message.sender===currentUser.userAccount?'message-me-asWhole-top':'message-other-asWhole-top'">
          {{message.sender === currentUser.userAccount ? currentUser.userAccount : message.sender}}
        </div>
        <!--消息内容-->
        <div :class="message.sender===currentUser.userAccount?'message-me':'message-other'">
          {{ message.content }}
        </div>
      </div>
<!--      <van-divider v-if="message.sender === 'system'" >{{new Date().toLocaleString()}}</van-divider>-->
    </div>

    <!-- 可以使用 CellGroup 作为容器 -->
    <van-cell-group inset class="chat-input">
      <van-field  v-model="chatMessage" left-icon="edit" placeholder="输入信息..." @end-validate="sendMessage">
        <template #button>
          <van-button type="primary" @click="sendMessage">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <br><br><br>
  </div>

</template>

<script setup>
import {ref, onMounted, watchEffect, onBeforeUnmount, watch} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {useRoute} from "vue-router";

const route = useRoute()

//聊天消息
const chatMessage = ref('');
//上线通知
const noticeMessage = ref('');
//聊天室全部消息
const messages = ref([]);
//上线下线通知
let systemMessage = ref();
//登陆用户
let currentUser = ref();

//最新消息
let newMessage = ref();


let socket;

  if (window.WebSocket){
    socket = new WebSocket("ws://localhost:7000/hello")

    socket.onmessage = async (ev)=>{
      await getNewMessage()
      messages.value.push({sender: newMessage.value.sender, content: newMessage.value.content, avatarUrl: newMessage.value.avatarUrl})
      console.log(messages.value)
    }
    socket.onopen = (ev) => {
      // messages.value.push({sender: 'system', content: "连接开启了..."})
    }
    socket.onclose = (ev) => {
      // messages.value.push({sender: 'system', content: "连接关闭了..."})
    }
  }else {
    alert("当前浏览器不支持websocket")
  }

const sendMessage = () => {
  if (chatMessage.value === ''){
    return;
  }
  if(!socket){
    return;
  }
  if (socket.readyState === WebSocket.OPEN){
    messageStore(chatMessage.value)
    socket.send(chatMessage.value)
    chatMessage.value=''
  }else {
    alert('连接没有开启')
  }


}

/**
 * 连接服务器
 * @returns {Promise<void>}
 */
const connectServer = async () => {
  const res = await myAxios.get('/chat/server');
  if (res?.data?.code !== 20000){
    showFailToast('服务器启动失败！')
  }
}

/**
 * 获取登录的用户信息
 * @returns {Promise<void>}
 */
const getCurrentUserValue = async ()=> {
  const res = await getCurrentUser()

  if (res) {
    currentUser.value = res
  } else {
    showFailToast('获取个人信息失败')
  }
}

/**
 * 存储消息
 * @param message
 * @returns {Promise<void>}
 */
const messageStore = async (message) => {
  const res = await myAxios.post('/chat/messageStore',{
    id: route.query.id,
    userAccount: currentUser.value.userAccount,
    avatarUrl: currentUser.value.avatarUrl,
    message,
  });
  if (res?.data?.code !== 20000){
    showFailToast('系统异常')
  }
}

/**
 * 获取消息列表
 * @param message
 * @returns {Promise<void>}
 */
const getMessageList = async () => {
  const res = await myAxios.get('/chat/getMessageList',{
    params:{
      id: route.query.id,
    }
  });
  if (res?.data?.code === 20000 && res?.data?.data){
    console.log("77777777777777777777777777777777777777777",res?.data?.data)
    let messageEntriesList = res?.data?.data
    messages.value = messageEntriesList
    newMessage.value = messageEntriesList[0]

  }else {
    showFailToast('系统异常')
  }
}

/**
 * 获取最新消息
 * @param message
 * @returns {Promise<void>}
 */
const getNewMessage = async () => {
  const res = await myAxios.get('/chat/getNewMessage',{
    params:{
      id: route.query.id,
    }
  });
  if (res?.data?.code === 20000 && res?.data?.data){
    newMessage.value = res?.data?.data
  }else {
    showFailToast('系统异常')
  }
}

watchEffect(()=>{
  getMessageList()
})

onMounted(()=>{
      connectServer()
      getCurrentUserValue()
    }
);

onBeforeUnmount(()=>{
  socket.onmessage = null; // 移除事件监听器

})


</script>


<style scoped>




.chat-input{
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 50px;
}

.chat-message-other {
  /*background-color: red;*/
  display: flex;
  padding-left: 1rem;
  padding-top: 1rem;
}

.chat-message-me {
  /*background-color: red;*/
  display: flex;
  padding-right: 1rem;
  padding-top: 1rem;
  flex-direction: row-reverse; /* 将子div的顺序反转 */

}

.message-me-asWhole-headPortrait {
  padding: 3px;
}

.message-other-asWhole-headPortrait {
  padding: 3px;
}

.message-me-asWhole-right {
  display: flex;
  flex-direction: column; /* 设置子元素垂直排列 */
  margin-left: 0.1rem;
}

.message-other-asWhole-right {
  display: flex;
  flex-direction: column; /* 设置子元素垂直排列 */
  margin-left: 0.1rem;
}

.message-me-asWhole-top {
  padding: 3px;
  /* font-size: 12px; */
  font-family: 微软雅黑;
  padding: 3px;
  color: rgba(134, 144, 156, 1);
  text-align: right;
}

.message-other-asWhole-top {
  padding: 3px;
  /* font-size: 12px; */
  font-family: 微软雅黑;
  padding: 3px;
  color: rgba(134, 144, 156, 1);
}

.message-me {
  background-color: rgba(242, 243, 245, 1);
  max-width: 280px;
  word-wrap: break-word; /* 处理英文单词换行 */
  word-break: break-all; /* 处理中文换行 */
  display: inline-block; /*将div元素转换为行内块元素*/
  width: auto; /* 宽度根据文本宽度自动调正*/
  padding: 6px 12px;
  border-radius: 4px;
}

.message-other {
  background-color: rgba(242, 243, 245, 1);
  max-width: 280px;
  word-wrap: break-word; /* 处理英文单词换行 */
  word-break: break-all; /* 处理中文换行 */
  display: inline-block; /*将div元素转换为行内块元素*/
  width: auto; /* 宽度根据文本宽度自动调正*/
  padding: 6px 12px;
  border-radius: 4px;
}


.examineeFace_logo_style {
  width: 30px;
}

</style>
