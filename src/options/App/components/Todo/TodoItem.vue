<!--  -->
<template>
  <li :class="todoitem.complete ? 'complete' : getType">
    <div class="complete">
      <svg @click="complete(todoitem.complete)" t="1614316411306" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2399" width="26" height="26">
        <path d="M511.232 981.333333C251.946667 981.333333 42.666667 770.474667 42.666667 512.768 42.666667 255.061333 253.525333 42.666667 511.232 42.666667c106.197333 0 207.701333 34.346667 290.474667 101.546666 20.309333 15.573333 23.466667 45.226667 7.808 65.578667-15.616 20.309333-45.269333 23.424-65.578667 7.808a370.176 370.176 0 0 0-232.704-81.237333c-206.165333 0-374.869333 168.704-374.869333 374.869333 0 206.165333 168.704 374.826667 374.869333 374.826667 206.165333 0 374.826667-168.661333 374.826667-374.826667 0-26.581333-3.114667-53.12-7.808-78.08a48.853333 48.853333 0 0 1 35.925333-56.234667 48.853333 48.853333 0 0 1 56.234667 35.925334c6.229333 31.232 9.386667 64 9.386666 96.853333C981.333333 770.432 770.432 981.333333 511.189333 981.333333z" fill="#ffffff" p-id="2400"></path>
        <path v-show="todoitem.complete" d="M512.768 703.317333c-12.501333 0-24.96-4.693333-32.768-14.08l-217.130667-220.16a46.634667 46.634667 0 0 1 0-65.621333 46.634667 46.634667 0 0 1 65.621334 0l184.32 185.856 388.864-393.6c18.773333-18.730667 48.426667-18.730667 65.621333 0 18.730667 18.773333 18.730667 48.426667 0 65.621333l-421.717333 426.368c-9.386667 9.386667-20.309333 15.616-32.810667 15.616z" fill="#ffffff" p-id="2401" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path>
      </svg>
    </div>
    <div class="title">
      <h2 :class="{'light':todoitem.complete}">{{ todoitem.title }}</h2>
      <span>{{ getDate(todoitem.startDate) }}</span>
    </div>
    <div class="delete">
      <svg @click="del(item.id)" t="1614314752248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2702" width="30" height="30">
        <path d="M225.834667 225.834667a42.666667 42.666667 0 0 1 60.330666 0L512 451.669333l225.834667-225.834666a42.666667 42.666667 0 1 1 60.330666 60.330666L572.330667 512l225.834666 225.834667a42.666667 42.666667 0 0 1-60.330666 60.330666L512 572.330667l-225.834667 225.834666a42.666667 42.666667 0 0 1-60.330666-60.330666L451.669333 512 225.834667 286.165333a42.666667 42.666667 0 0 1 0-60.330666z" fill="#cccccc" p-id="2703"></path>
      </svg>
    </div>
  </li>
</template>

<script lang='ts'>
import formatDate from "../../../../util/formatDate";
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, ref, } from 'vue'
export default defineComponent({
  name: "TodoItem",
  props:{
    item:{
      type: Object,
      required: true,
    }
  },
  setup(props,{emit}) {
    
    const todoitem = ref(props.item);

    const complete = (c: boolean)=>{
      if(!c){
        ElMessage.success({
          message: "恭喜完成一间事项!",
          type: "success",
          duration: 3000,
          showClose: true,
        })
        todoitem.value.endDate = new Date().getTime();
      }else{
        ElMessage({
          message: "取消完成事项！",
          duration: 3000,
          showClose: true,
        })
      }
      todoitem.value.complete = !todoitem.value.complete;
    }

    const del = (id: number)=>{
      ElMessageBox.confirm('此操作将删除该事项, 是否继续?', '操作询问', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        emit("del",id)
        ElMessage({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消操作'
        });
      });
    };

    const getDate = computed(()=>{
      return formatDate;
    })

    const getType = computed(()=>{
      const newdate = new Date();
      const nowTimestamp = newdate.getTime();
      const startTimestamp = todoitem.value.startDate;
      newdate.setHours(0,0,0,0);
      const tomorrowTimestamp = newdate.getTime() + (24 * 60 * 60 * 1000);
      if(tomorrowTimestamp - nowTimestamp <= (1000 * 60 * 60 * 2)){
        return "danger";
      }
      else if(nowTimestamp - startTimestamp <= (1000 * 60 * 30)){
        return "just"
      }
      else if(nowTimestamp - startTimestamp > (1000 * 60 * 30) && nowTimestamp - startTimestamp <= (1000 * 60 * 60 * 2)){
        return "need"
      }
      else{
        return "should"
      }
    })

    return {
      todoitem, 
      complete, 
      getDate, getType, 
      del, 
    }

  }
});
</script>
<style lang="scss" scoped>
  li{
    width: 100%;
    height: 45px;
    padding: 6px 12px;
    background-color: #fff;
    position: relative;
    padding-left: 50px;
    padding-right: 44px;
    margin-bottom: 12px;
    &.danger{
      &::before{
        content:"";
        display: block;
        width: 40px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #d63031;
      }
    }
    &.just{
      &::before{
        content:"";
        display: block;
        width: 40px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #0984e3;
      }
    }
    &.need{
      &::before{
        content:"";
        display: block;
        width: 40px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #ff793f;
      }
    }
    &.should{
      &::before{
        content:"";
        display: block;
        width: 40px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #ffb142;
      }
    }
    &.complete{
      &::before{
        content:"";
        display: block;
        width: 40px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #33d9b2;
      }
    }


    .complete, .delete{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      position: absolute;
      top: 0;
    }

    .complete{
      left: 8px;
      svg{
        cursor: pointer;
      }
    }

    .title{
      position: relative;
      h2{
        line-height: 33px;
        font-size: 18px;
        font-family: albb;
        position: relative;
        top: 1px;
        color: #3c3c3c;
      }
      h2.light{
        text-decoration: line-through;
        color: #ccc;
      }
      span{
        position: absolute;
        right: 0;
        top: 3px;
        line-height: 30px;
        font-family: albb;
        font-size: 12px;
        color: #8c8c8c;
        // transition: opacity .2s ease-in-out;
        // opacity: 0;
      }
    }

    .delete{
      right: 8px;
      opacity: 0;
      transition-property: opacity transform;
      transition: .2s ease-in-out;
      cursor: pointer;
      &:hover{
        transform: scale(0.9);
      }
    }

    &:hover{
      .delete, .title span{
        opacity: 1;
      }
    }

  }
</style>