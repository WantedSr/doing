<!--  -->
<template>
  <div class="bookmark">
    <div class="booklist" v-loading="list === null || (typeof list !== 'object') || (list.constructor !== Array)">
      <ul v-if="list !== null && typeof list === 'object' && list.constructor === Array && list.length > 0">
        <List-item v-for="item in list" :key="item.id" :item="item"/>
      </ul>
      <h3 v-else>未搜索到任何书签</h3>
    </div>
  </div>
</template>

<script lang='ts'>
import ListItem from "./listItem.vue";
import "../../../../interfece/bookmarks";
import { defineComponent, } from 'vue'
export default defineComponent({
  name: "FavoriteList",
  props: {
    list:{
      type: Array,
      required: true,
    }
  },
  components:{
    ListItem,
  },
  // setup(props) {
  //   return {
  //     bookmarks, 
  //   }
  // }
});
</script>
<style lang="scss" scoped>
  
  .bookmark{
    width: 100%;
    height: 100%;
    padding: 8px 0px;
    .booklist{
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 3;
      overflow-y: scroll;
      overflow-x: hidden;
      
      h3{
        padding: 12px;
        text-align: center;
        font-family: albb;
        color: #ccc;
      }
      ul{
        padding: 0 8px 24px;
      }

      /* 整个滚动条 */
      &::-webkit-scrollbar{    
        width: 6px;
        border-radius: 50px;
      }
      /* 滚动条的上下按钮 */
      &::-webkit-scrollbar-button{
        display: none;
      }
      /* 滚动的条条 */
      &::-webkit-scrollbar-thumb{
        width: 20px;
        margin: 0 auto;
        background-image: linear-gradient(45deg, #88d3ce 0%, #6e45e2 100%);
        border-radius: 50px;
      }
      /* 滚动条未显示的部分 */
      &::-webkit-scrollbar-track-piece{
        background-color: transparent;
      }
      /* 滚动条的底 */
      &::-webkit-scrollbar-track{
        background-color: transparent;
      }
    }
    &::after{
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,.96);
      z-index: 1;
    }
  }
</style>