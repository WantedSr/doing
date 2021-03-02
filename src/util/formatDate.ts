export default function formatDate(timestamp: number){
  const date = new Date();
  date.setTime(timestamp);
  const y = date.getFullYear().toString();
  let M = (date.getMonth() + 1).toString();
  M = M.length < 2 ? '0'+M : M;
  let d = (date.getDate()).toString();
  d = d.length < 2 ? '0'+d : d;
  let h = (date.getHours()).toString();
  h = h.length < 2 ? '0'+h : h;
  let m = (date.getMinutes()).toString();
  m = m.length < 2 ? '0'+m : m;
  let s = (date.getSeconds()).toString();
  s = s.length < 2 ? '0'+s : s;
  return `${y}-${M}-${d} ${h}:${m}:${s}`;
}