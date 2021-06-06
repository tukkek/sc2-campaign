const CREDITS=document.querySelector('#credits input')
const INSTRUCTIONS=document.querySelector('#instructions')
const AREAINFO=document.querySelector('#areainfo')

export function addcredits(c){CREDITS.value=parseInt(CREDITS.value)+c}

export function show(area){
  AREAINFO.classList.remove('hidden')
  INSTRUCTIONS.classList.add('hidden')
}

export function close(){
  INSTRUCTIONS.classList.remove('hidden')
  AREAINFO.classList.add('hidden')
}
