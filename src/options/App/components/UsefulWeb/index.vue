<!--  -->
<template>
  <div class="usefulweb">
    <el-carousel height="260px" indicator-position="none" :autoplay="false">
      <el-carousel-item class="web-box clearfix" v-for="item in carouselItemLength" :key="item">
        <div class="web-item" v-for="web in splitArr((item-1)*webnum,webnum)" :key="web.url"  :style="{'width': webItemWidth}">
          <a :href="web.url" target="_blank" :class="'web-' + web.value">
          </a>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref,  } from 'vue'
export default defineComponent({
  name: "UsefulWeb",
  
  setup() {
    
    const clientWidth = ref(document.documentElement.clientWidth || document.body.clientWidth);

    window.addEventListener("resize",()=>{
      clientWidth.value = document.documentElement.clientWidth || document.body.clientWidth;
      // console.log(document.documentElement.clientHeight || document.body.clientHeight);
    });

    const UsefulWebs = reactive([
      {
        title: "BiliBili",
        value: "bilibili",
        url: "https://www.bilibili.com/",
      },
      {
        title: "百度",
        value: "baidu",
        url: "https://www.baidu.com/",
      },
      {
        title: "掘金",
        value: "juejin",
        url: "https://juejin.cn/",
      },
      {
        title: "京东",
        value: "jd",
        url: "https://www.jd.com/",
      },
      {
        title: "淘宝",
        value: "taobao",
        url: "https://www.taobao.com/",
      },
      {
        title: "腾讯视频",
        value: "txsp",
        url: "https://v.qq.com/",
      },
      {
        title: "知乎",
        value: "zhihu",
        url: "https://www.zhihu.com/",
      },
      {
        title: "Google翻译",
        value: "google_fy",
        url: "https://translate.google.cn/",
      }
    ]);

    const carouselItemLength = computed(()=>{
      if(clientWidth.value >= 1700){
        return Math.ceil(UsefulWebs.length / 8);
      }
      else if(clientWidth.value >= 1280){
        return Math.ceil(UsefulWebs.length / 6);
      }
      return Math.ceil(UsefulWebs.length / 4);
    });

    const webItemWidth = computed(()=>{
      if(clientWidth.value >= 1700){
        return "25%";
      }
      else if(clientWidth.value >= 1280){
        return "33.33%"
      }
      return "50%";
    });
    
    const webnum = computed(()=>{
      if(clientWidth.value >= 1700){
        return 8;
      }
      else if(clientWidth.value >= 1280){
        return 6;
      }
      return 4;
    });

    const splitArr = computed(()=>{
      return (index: number, length: number)=>{
        const newarr = [];
        const start = index;
        const end = index+1+length >= UsefulWebs.length ? UsefulWebs.length : index + length;
        for(let i=start;i<end;i++){
          newarr.push(UsefulWebs[i]);
        }
        return newarr;
      }
    });

    return {
      UsefulWebs, 
      carouselItemLength, webItemWidth, webnum, splitArr, 
    }

  }
});
</script>
<style lang="scss" scoped>
  .usefulweb{
    width: 100%;
    margin-bottom: 24px;
    .web-box{
      .web-item{
        float: left;
        height: 130px;
        padding: 12px;
        overflow: hidden;
        >a{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          border-radius: 8px;
          background-color: rgba(255,255,255,1);
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          box-shadow: 0 8px 8px rgba(88,88,88,.2);
          transition: transform .3s ease-in-out;
          &:hover{
            transform: scale(1.05);
          }
        }
        .web-bilibili{
          background-image: url("../../../../assets/usefulweb-img/bilibili.jpg");
        }
        .web-baidu{
          background-image: url("../../../../assets/usefulweb-img/baidu.jpg");
        }
        .web-juejin{
          background-image: url("../../../../assets/usefulweb-img/juejin.jpg");
        }
        .web-jd{
          background-image: url("../../../../assets/usefulweb-img/jd.jpg");
        }
        .web-taobao{
          background-image: url("../../../../assets/usefulweb-img/taobao.jpg");
        }
        .web-txsp{
          background-image: url("../../../../assets/usefulweb-img/txsp.jpg");
        }
        .web-zhihu{
          background-image: url("../../../../assets/usefulweb-img/zhihu.jpg");
        }
        .web-google_fy{
          background-image: url("../../../../assets/usefulweb-img/google_fy.jpg");
        }
      }
    }
  }
</style>