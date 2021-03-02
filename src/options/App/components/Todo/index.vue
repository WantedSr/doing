<!--  -->
<template>
  <div class="todo">
    <BaseHead :title="'TODO'" :subtitle="'Today is done today'"/>
    <div class="todolist box" :style="{'height': (clientHeight - 32 - (12*5) - 42 - 130 - 260) + 'px'}">
      <ul>
        <TodoItem class="topShow" v-for="item in todolist" :key="item.id" :item="item" @del="del"/>
        <li class="todoAdd">
          <input type="text" v-model="addValue" @keyup.enter="addTodo" placeholder="输入你要添加的TODO事项">
          <el-button class="add" size="mini" @click="addTodo" type="text">添加</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import "../../../../interfece/TodoItem";
import { ElMessage } from 'element-plus';
import { defineComponent, onMounted, ref, } from 'vue'
import Cookie from "js-cookie";

import BaseHead from "../Header/index.vue";
import TodoItem from "./TodoItem.vue";
export default defineComponent({
  name: "ToDo",
  components:{
    BaseHead, 
    TodoItem, 
  },
  setup() {
    
    const clientHeight = ref(document.documentElement.clientHeight || document.body.clientHeight);
    
    window.addEventListener("resize",()=>{
      clientHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
    });

    let id = 1;

    const todolist = ref<TodoItem[]>([]);

    onMounted(()=>{
      const today = new Date().setHours(0,0,0,0).toString();
      if(Cookie.get("today") === undefined || Cookie.get("today") !== today){
        Cookie.set("today", today); 
        Cookie.remove("todolist");
      }
      else if(Cookie.getJSON("todolist") !== undefined){
        todolist.value = Cookie.getJSON("todolist");
      }else{
        todolist.value = [
          {
            id: 1,
            title: "新的一天，新的生活！",
            complete: false,
            startDate: new Date().getTime(),
            endDate: null, 
          },
        ];
        Cookie.set("todolist", todolist.value);
      }
      
      id = todolist.value[todolist.value.length - 1].id + 1;
    })

    const del = (id: number)=>{
      todolist.value.splice(todolist.value.findIndex(item=>item.id === id),1);
      Cookie.set("todolist", todolist.value); 
    };

    const addValue = ref();
    const addTodo = ()=>{
      todolist.value.push({
        id: ++id,
        title: addValue.value,
        complete: false,
        startDate: new Date().getTime(),
        endDate: null,
      });
      Cookie.set("todolist",todolist.value);
      addValue.value = '';
      ElMessage({
        message: "添加事项成功！",
        type: "success",
        duration: 3000,
        showClose: true,
      })
    }
    
    return {
      clientHeight, addValue,  
      todolist, 
      del, addTodo, 
    }

  }
});
</script>
<style lang="scss" scoped>
  .todo{
    padding: 0 12px;
    .todolist{
      box-shadow: 0 8px 8px rgba(88,88,88,.2);
      overflow-x: hidden;
      overflow-y: scroll;

      &:hover{
        /* 滚动的条条 */
        &::-webkit-scrollbar-thumb{
          background: #aaa;
        }
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
        background: transparent;
        transition: background .2s ease-in-out;;
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

      .todoAdd{
        width: 100%;
        height: 45px;
        padding: 6px 12px;
        background-color: #fff;
        position: relative;
        margin-bottom: 12px;
        padding-left: 50px;
        position: relative;
        &::before{
          content:"";
          display: block;
          width: 40px;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background-color: #7f8c8d;
        }
        >input{ 
          width: 100%;
          height: 100%;
          border: none;
          border-bottom: 2px solid #cccccc;
          font-family: albb;
          font-size: 12px;
          color: #888888;
          font-weight: 400;
        }
        .add{
          position: absolute;
          right: 18px;
          top: 8px;
        }
      }
    }
  }
</style>