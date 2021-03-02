<!--  -->
<template>
  <div class="base-head box clearfix">
    <h1 class="title fl">
      <slot name="title">
        {{title}}
      </slot>
    </h1>
    <div class="fr subtitle">
      <slot name="subtitle">
        {{subtitle}}
      </slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, } from 'vue'
export default defineComponent({
  name: "",
  props:{
    title:{
      type: String,
      default: "HelloWorld",
    },
    subtitle:{
      type: String,
      default: "HelloWorld",
    },
  },
  setup() {
    
    return {
      
    }

  }
});
</script>
<style lang="scss" scoped>
  .base-head{
    width: 100%;
    height: 42px;
    padding: 8px 12px;
    font-family: albb;
    .title{
      font-size: 16px;
      color: #3c3c3c;
      line-height: 26px;
    }
    .subtitle{
      color: #6c6c6c;
      line-height: 28px;
    }
  }
</style>