const ELLAPSED=document.querySelector('span#ellapsed')
const START=document.querySelector('button#time')
const PAUSE=document.querySelector('button#pause')

var ellapsed=0
var ticking=false

function pad(n){
  n=new String(Math.round(n))
  return n.length==1?'0'+n:n
}

function format(now=Date.now()){
  let minutes=Math.floor(ellapsed/60)
  let hours=Math.floor(minutes/60)
  return `${pad(hours)}:${pad(minutes%60)}:${pad(ellapsed%60)}`
}

function tick(){
  ellapsed+=1
  ELLAPSED.innerHTML=format()
}

START.onclick=()=>{ticking=setInterval(tick,1000)}
PAUSE.onclick=()=>{clearInterval(ticking)}

ELLAPSED.innerHTML=format(0)
