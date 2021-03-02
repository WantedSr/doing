<!--  -->
<template>
  <li :title="newitem.title">
    <a :href="newitem.url ? newitem.url : newitem.originalUrl" target="_blank">
      <div class="like">
        <svg t="1614155439565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2837" width="16" height="16">
          <path d="M481.834667 311.168a42.666667 42.666667 0 0 1 60.330666 0l256 256a42.666667 42.666667 0 0 1-60.330666 60.330667L512 401.664l-225.834667 225.834667a42.666667 42.666667 0 0 1-60.330666-60.330667l256-256z" p-id="2838" fill="#ffffff"></path>
        </svg>
        <h5>{{getLike(newitem.collectionCount)}}</h5>
      </div>
      <h3>{{newitem.title}}</h3>
      <div class="meta">
        <h4>6个小时前</h4>
        <h4>{{newitem.user.username}}</h4>
      </div>
    </a>
  </li>
</template>

<script lang='ts'>
import formatFloat from "../../../../util/formatFloat";
import { computed, defineComponent, } from 'vue'
export default defineComponent({
  name: "NewItem",
  props:{
    newitem:{
      type: Object,
      required: true,
    }
  },
  setup() {
    const getLike = computed(()=>{
      return (like: number)=>{
        if(like >= 1000){
          return formatFloat(like/1000,2) + "k";
        }
        else if(like >= 10000){
          return formatFloat(like/10000,2) + "w";
        }
        else if(like >= 100000){
          return formatFloat(like/10000,1) + "w";
        }
        return like;
      }
    })

    return {
      getLike, 
    }

  }
});
</script>
<style lang="scss" scoped>
  li{
    background-color: #fff;
    transition: background .2s ease-in-out;;
    padding: 6px;
    height: 60px;
    margin-bottom: 12px;
    overflow: hidden;
    a{
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      padding-left: 50px;
      font-family: albb;
      .like{
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 100%;
        background-color: #3498db;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        svg{
          position: relative;
          top: 4px;
          transition: top .2s ease-in-out;
        }
        h5{
          display: block;
          width: 100%;
          text-align: center;
          color: #FFF;
          position: relative;
          top: -2px;
        }
      }
      >h3{
        width: 100%;
        line-height: 22px;
        font-size: 16px;
        color: #4c4c4c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .meta{
        text-align: left;
        width: 100%;
        h4{
          display: inline-block;
          margin-right: 12px;
          color: #8c8c8c;
        }
      }
    }

    &:hover{
      background-color: #ececec;
      a .like svg{
        top: 0px;
      }
    }
  }
</style>