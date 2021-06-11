const CREDITS=document.querySelector('#credits input')
const GAMBLE=document.querySelector('button#gamble')

function get(){return parseInt(CREDITS.value)}

export function add(c){CREDITS.value=get()+c}

export function spend(credits){
  let bank=get()
  if(bank<credits) return false
  CREDITS.value=bank-credits
  return true
}
 
function setup(){
  GAMBLE.onclick=()=>{
    let c=get()
    if(c>0) CREDITS.value=rpg.randomize(c)
  }
}

setup()
