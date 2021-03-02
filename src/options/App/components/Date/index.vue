<!--  -->
<template>
  <div class="clock">
    <div class="time">
      <h1>{{Hours}}:{{Minutes}}</h1>
      <h3>:{{Seconds}}</h3>
    </div>
    <div class="day">
      {{Today}} {{week}}
    </div>
    <div v-show="weather" class="weather">
      {{TodayWeather}} 
    </div>
    <div v-show="weather" class="temperature">
      {{TodayTemperature}} &#176;C
    </div>
  </div>
</template>

<script lang='ts'>
function getFengli(fl: string){
  const arr = fl.split("<![CDATA[");
  const arr2 = arr[1].split("]");
  // console.log(arr);
  return arr2[0];
}
import getWeather from "../../../../api/weather";
import { computed, defineComponent, onMounted, ref,  } from 'vue'
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "",
  setup() {
    
    const clientHeight = ref(document.documentElement.clientHeight || document.body.clientHeight);
    
    window.addEventListener("resize",()=>{
      clientHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
    });

    const weather = ref();

    onMounted(()=>{
      getWeather("深圳")
      .then(res=>{
        if(res.status !== 200){
          ElMessage({
            message: "获取当日天气状况有一点点问题，请刷新重试！",
            type: "warning",
            showClose: true,
            duration: 3000,
          });
        }else{
          weather.value = res.data.data;
        }
        // console.log(res);
      })
      .catch(err=>{
        ElMessage({
          message: "获取当日天气状况出现了点问题，请稍后重试！",
          type: "error",
          showClose: true,
          duration: 3000,
        });
        console.log(err);
      })
    });

    const Hours = ref("00");
    const Minutes = ref("00");
    const Seconds = ref("00");

    const Year = ref("0000");
    const Month = ref("00");
    const D = ref("00");
    const Day = ref(0);

    setInterval(()=>{
      const date = new Date();
      Seconds.value = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
      Minutes.value = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
      Hours.value = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
      Year.value = date.getFullYear().toString();
      Month.value = date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1).toString() : (date.getMonth()+1).toString();
      D.value = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
      Day.value = date.getDay();
    }, 500);

    const Today = computed(()=>{
      return Year.value + "年" + Month.value + "月" + D.value + "日"
    })

    const week = computed(()=>{
      switch(Day.value){
        case 0:
          return "星期日"
        case 1:
          return "星期一"
        case 2:
          return "星期二"
        case 3:
          return "星期三"
        case 4:
          return "星期四"
        case 5:
          return "星期五"
        default:
          return "星期六"
      }
    });

    const TodayWeather = computed(()=>{
      if(weather.value !== null && weather.value){
        const w = weather.value.forecast[0];
        return `${weather.value.city} ${w.type} ${w.high} ${w.low} ${w.fengxiang} ${getFengli(w.fengli)}`;
      }
      return '';
    });

    const TodayTemperature = computed(()=>{
      if(weather.value !== null && weather.value){
        return weather.value.wendu;
      }
      return '';
    })

    return {
      clientHeight, weather, 
      Seconds, Minutes, Hours, Year, Month, D, Day, 
      Today, week, TodayWeather, TodayTemperature, 
    }
  }
});
</script>
<style lang="scss" scoped>
  .clock{
    height: 130px;
    margin-bottom: 24px;
    padding: 0 6px;
    font-family: albb;
    position: relative;
    text-shadow: 1px 1px 1px #333333;
    .time{
      color: #FFF;
      position: relative;
      margin-bottom: -12px;
      h1{
        font-size: 70px;
      }    
      h3{
        font-size: 30px;
        position: absolute;
        left: 200px;
        bottom: 12px;
      }
    }
    .day{
      position: relative;
      left: 8px;
      width: 100%;
      color: #FFF;
      font-size: 18px;
    }
    .weather{
      position: relative;
      left: 8px;
      color: #FFF;
      font-size: 14px;
    }
    .temperature{
      color: #FFF;
      position: absolute;
      font-size: 20px;
      left: 238px;
      top: 10px;
    }
  }
</style>