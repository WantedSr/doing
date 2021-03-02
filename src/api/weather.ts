import request from "../util/request";
export default async function getWeather(city: string){
  return await request.get("http://wthrcdn.etouch.cn/weather_mini",{
    params:{
      city: city,
    }
  })
}