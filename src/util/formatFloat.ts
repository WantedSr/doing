export default function formatFloat(value: number, n: number) {
  const f = Math.round(value*Math.pow(10,n))/Math.pow(10,n);
  let s = f.toString();
  const rs = s.indexOf('.');   
  if (rs < 0) {     
      s += '.';   
  } 
  for(let i = s.length - s.indexOf('.'); i <= n; i++){
    s += "0";
  }
  return s;
}