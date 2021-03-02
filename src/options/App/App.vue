<template>
  <!-- <div>asdf</div> -->
  <index></index>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import index from "./components/index.vue"

export default defineComponent({
  name: 'App',
  components: {
    index,
  }
});
</script>

<style lang="scss">
@import url("../../style/font.scss");

body, html{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  min-width: 1024px;
  min-height: 700px;
  position: relative;
}


*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
li{
  list-style-type: none;
}

.clearfix::before , .clearfix::after{
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix{
  zoom: 1;
}

.fl{
  float: left;
}
.fr{
  float: right;
}

.box{
  background-color: rgba(255,255,255,.8);
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
}

input,button{
  outline: none;
}
button{
  cursor: pointer;
}


.topShow{
  animation: topShow .2s ease-in-out forwards;
  opacity: 0;
  position: relative;
}
@keyframes topShow {
  0%{
    top: 12px;
    opacity: 0;
  }
  100%{
    top: 0;
    opacity: 1;
  }
}


.fadeShow{
  animation: fadeShow .5s 1 ease-in-out forwards;
}
.fadeHide{
  animation: fadeHide .5s 1 ease-in-out forwards;
}

@keyframes fadeShow{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes fadeHide{
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

</style>
