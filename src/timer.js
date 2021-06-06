const ELLAPSED=document.querySelector('span#ellapsed')
const START=document.querySelector('button#time')

var start=0

function pad(n){
  n=new String(Math.round(n))
  return n.length==1?'0'+n:n
}

function format(now=Date.now()){
  let ellapsed=(now-start)/1000
  let hours=pad(Math.floor(ellapsed/60))
  let minutes=pad(Math.floor(hours/60))
  let seconds=pad(ellapsed%60)
  return `${hours}:${minutes}:${seconds}`
}

START.onclick=()=>{
  start=Date.now()
  setInterval(()=>ELLAPSED.innerHTML=format(),1000)
}

ELLAPSED.innerHTML=format(0)
