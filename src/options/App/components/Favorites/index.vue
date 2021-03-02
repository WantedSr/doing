<!-- 书签侧边栏 -->
<template>
  <div class="favorite">
    <div class="list">
      <List-head :sum="sum" @search="search"/>
      <Favorite-list v-loading="loading" :list="bookmarks"/>
    </div>
    <List-aside @openFavorite="openFavorite" class="aside"/>
  </div>
</template>

<script lang='ts'>
import "../../../../interfece/bookmarks";
import { computed, defineComponent, onMounted, ref, } from 'vue'
import ListHead from "./head.vue"
import ListAside from "./aside.vue"
import FavoriteList from "./list.vue"

function getSum(arr: BookTag[] | null){
  if(arr === null){
    return 0;
  }
  let sum = 0;
  arr.forEach((elem: BookTag) => {
    if("url" in elem){
      sum ++;
    }else if("children" in elem && elem.children !== undefined){
      sum += getSum(elem.children);
    }
  });
  return sum;
}

export default defineComponent({
  name: "favorites",
  components:{
    ListHead, ListAside, FavoriteList,
  },
  setup(props,{emit}) {

    const bookmarks = ref<BookTag[] | null>(null);
    const moreBookmarks = ref<BookTag[] | null>(null);
    const searchBookmarks = ref<BookTag[] | null>(null);
    const loading = ref(true);

    const sum = computed(()=>{
      return getSum(bookmarks.value);
    })

    const favorite = ref<HTMLElement|null>(null);
    
    onMounted(()=>{
      /* eslint-disable */ 
      chrome.bookmarks.getTree((bookmarkArray: Bookmark[])=> {
        loading.value = false;
        moreBookmarks.value = bookmarks.value = bookmarkArray[0].children;
      });
      /* eslint-enable */ 
      favorite.value = document.querySelector(".favorite");
    })

    const openFavorite = ()=>{
      if(favorite.value !== null){
        if(favorite.value.classList.contains("active")){
          favorite.value.classList.remove("active");
          emit("showBg", false);
        }else{
          favorite.value.classList.add("active");
          emit("showBg", true);
        }
      }
    }

    const search = (list: BookTag[] | null)=>{
      if(list === null){
        bookmarks.value = moreBookmarks.value;
      }else{
        bookmarks.value = searchBookmarks.value = list;
      }
    }


    return {
      loading, bookmarks, sum, 
      search, openFavorite, 
    }

  }
});
</script>
<style lang="scss" scoped>
.favorite{
  width: 350px;
  height: 100vh;
  padding-right: 50px;
  position: absolute;
  top: 0;
  transition: left .5s ease-in-out;
  left: -300px;
  &.active{
    left: 0;
  }
  .list{
    width: 100%;
    height: 100%;
    padding-top: 50px;
    position: relative;
  }
  .aside{
    width: 50px;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>