<!--  -->
<template>
  <li :class="'booktag-' + booktag.id">
    <a :href="booktag.url !== undefined ? booktag.url : '#'" :target="booktag.url !== undefined ? '_blank' : ''" @click="booktag.url !== undefined ? '' : open()">
      <img v-if="(!booktag.children)" :src="'chrome://favicon/'+booktag.url+'/favicon.ico'" alt="no_ico">
      <svg v-else t="1613983847316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3478" width="16" height="16">
        <path d="M85.333333 256a85.333333 85.333333 0 0 1 85.333334-85.333333h213.333333a42.666667 42.666667 0 0 1 30.165333 12.501333L486.997333 256H853.333333a85.333333 85.333333 0 0 1 85.333334 85.333333v426.666667a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V256z m281.002667 0H170.666667v512h682.666666V341.333333h-384a42.666667 42.666667 0 0 1-30.165333-12.501333L366.336 256z" fill="#515151" p-id="3479"></path>
      </svg>
      <h3>{{booktag.title}}</h3>
    </a>
    <transition 
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"

      @before-leave="beforeLeave"
      @leave="leave"
    >
      <ul v-show="booktag.children && (booktag.show)" :class="'children-'+ booktag.id">
        <List-item v-for="booktag2 in booktag.children" :key="booktag2.id" :item="booktag2"></List-item>
      </ul>
    </transition>
  </li>
</template>

<script lang='ts'>
import { defineComponent, ref, } from 'vue';
export default defineComponent({
  name: "listItem",
  props:{
    item:{
      type: Object,
      requried: true,
    }
  },


  setup(props) {

    const booktag = ref(props.item);

    if(booktag.value != undefined){
      if(booktag.value.children !== undefined && booktag.value.show === undefined){
        booktag.value.show = false;
      }
    }

    const beforeEnter = (el: HTMLElement)=>{
      el.style.height = '0px';
      el.style.transition = 'height .5s ease-in-out';
    }
    const enter = (el: HTMLElement)=>{
      el.style.height = (el.children.length * 34)+"px";
    }
    const afterEnter = (el: HTMLElement)=>{
      // console.log(el);
      el.style.height = "auto";
    }
    const beforeLeave = (el: HTMLElement)=>{
      el.style.height = (el.children.length * 34)+"px";
      el.style.transition = 'height .5s ease-in-out';
    }
    const leave = (el: HTMLElement)=>{
      el.style.height = '0px';
    }

    const open = ()=>{
      if(booktag.value !== undefined){
        booktag.value.show = !booktag.value.show;
      }
    };

    return {
      booktag, 
      open, 
      beforeEnter, enter, afterEnter, beforeLeave, leave, 
    }

  }
});
</script>
<style lang="scss" scoped>
  ul{
    ul{
      opacity: 1;
      overflow: hidden;
      padding-left: 16px;
      li{
        margin-bottom: 4px;
      }
    }
    li{
      a{
        display: block;
        width: 100%;
        height: 30px;
        padding: 8px 0 8px 20px;
        position: relative;
        color: #4c4c4c;
        font-family: albb;
        &:hover{
          color: #3498db;
        }
        img,
        svg{
          width: 16px;
          height: 16px;
          position: absolute;
          left: 0px;
          top: 8px;
        }
        h3{
          font-size: 14px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>