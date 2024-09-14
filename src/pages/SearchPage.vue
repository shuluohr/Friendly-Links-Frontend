<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />

    <van-divider content-position="left">已选标签</van-divider>
    <van-row gutter="10">
      <van-col v-for="tag in activeIds">
        <van-tag  plain closeable size:any="small" type="primary" @close="doClose(tag)">
          {{ tag }}
        </van-tag>
      </van-col>
    </van-row>

    <br/>
    <br/>
    <van-divider content-position="left">选择标签</van-divider>

    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
    <div style="padding: 20px">
      <van-button block type="primary" @click="doSearchResult">
        搜索
      </van-button>
    </div>

  </form>


</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router'
import {showToast} from 'vant';

const router = useRouter()

const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},

    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
    ],
  },
];
let tagList = ref(originTagList);
const searchText = ref('');
const onSearch = () => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
const onCancel = () => {
  showToast('取消');
  tagList.value = originTagList
};

const activeIds = ref([]);
const activeIndex = ref(0);


const doClose = (tag:any) => {
  activeIds.value = activeIds.value.filter(item=>{
    return item !== tag
  })
}

const doSearchResult = ()=>{
  router.push({
    path: '/user/list',
    query:{
      tags:activeIds.value
    }
  })
}


</script>

<style scoped>

</style>
