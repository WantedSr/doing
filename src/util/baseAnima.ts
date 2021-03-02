function fadeShow(el: HTMLElement){
  el.style.display = "block";
  el.style.opacity = "0";
  if(el.classList.contains("fadeHide")){
    el.classList.remove('fadeHide');
  }
  el.classList.add("fadeShow");
  setTimeout(()=>{
    el.style.opacity = '1';
  }, 550);
}

function fadeHide(el: HTMLElement){
  el.style.display = "block";
  el.style.opacity = "1";
  if(el.classList.contains("fadeShow")){
    el.classList.remove('fadeShow');
  }
  el.classList.add("fadeHide");
  setTimeout(()=>{
    el.style.display = "none";
    el.style.opacity = "0";
  },550);
}

export default {
  fadeShow, 
  fadeHide, 
}