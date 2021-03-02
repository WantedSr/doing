<!--  -->
<template>
  <div class="list_head">
    <el-row>
      <el-col class="title" :span="7">
        <h3>{{sum}}</h3>书签
      </el-col>
      <el-col class="search" :offset="1" :span="16">
        <div class="input">
          <input type="text" v-model="searchValue" placeholder-color="#fff" placeholder="select bookmark" @keyup="search">
          <svg t="1613800731362" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2193" width="15" height="15"><path d="M426.666667 170.666667a256 256 0 1 0 0 512 256 256 0 0 0 0-512z m-341.333334 256a341.333333 341.333333 0 1 1 610.986667 209.322666l229.845333 229.845334a42.666667 42.666667 0 0 1-60.330666 60.330666l-229.845334-229.845333A341.333333 341.333333 0 0 1 85.333333 426.666667z" fill="#ffffff" p-id="2194"></path></svg>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref,  } from 'vue'
export default defineComponent({
  name: "FavoriteHead",
  props:{
    sum:{
      type: Number,
      required: true,
      default: 0,
    }
  },
  setup(props,{emit}) {
    
    const searchValue = ref("");

    const search = ()=>{
      if(searchValue.value === ''){
        emit("search",null);
      }else{
        chrome.bookmarks.search(searchValue.value,(res: BookTag[])=>{
          // console.log(res);
          emit("search",res);
        });
      }
    }

    return {
      searchValue, 
      search, 
    }

  }
});
</script>
<style lang="scss" scoped>
  .list_head{
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(45deg, #88d3ce 0%, #6e45e2 100%);
    box-shadow: 0 5px 8px rgba(88,88,88,.4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    z-index: 3;
    .title{
      position: relative;
      color: #FFF;
      font-size: 12px;
      font-family: albb;
      font-weight: 400;
      h3{
        display: inline-block;
        font-size: 18px;
        margin-right: 2px;
      }
    }
    .search{
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .input{
        display: flex;
        align-items: center;
        justify-content: center;
        input{
          width: 100%;
          border-radius: 50px;
          border: 2px solid #FFF;
          background: transparent;
          outline: none;
          padding: 4px 28px 4px 12px;
          font-size: 14px;
          color: #FFF;
          &::-webkit-input-placeholder { /* WebKit browsers */
            color: #ccc;
          }
          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #ccc;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #ccc;
          }
          &:-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #ccc;
          }
        }
        svg{
          position: absolute;
          right: 8px;
        }
      }
    }
  }
</style>