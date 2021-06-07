import * as rpg from './rpg.js'
import './clock.js'
import * as planet from './planet.js'

const CREDITS=document.querySelector('#credits input')
const INSTRUCTIONS=document.querySelector('#instructions')
const AREAINFO=document.querySelector('#areainfo')
const DATA=document.querySelector('template.data').content.childNodes[0]
const GAMBLE=document.querySelector('button#gamble')

function getcredits(){return parseInt(CREDITS.value)}

export function addcredits(c){CREDITS.value=getcredits()+c}

function inform(name,value){
  let d=DATA.cloneNode(true)
  d.querySelector('.name').innerHTML=name
  value=value.toString().toUpperCase()
  d.querySelector('.value').innerHTML=value
  AREAINFO.querySelector('.generated').appendChild(d)
}

export function show(area){
  for(let d of AREAINFO.querySelectorAll('li.data.generated')) d.remove()
  inform('Planet',planet.current)
  inform('Map',area.map)
  inform('Owner',`${area.race} (${area.difficulty})`)
  for(let n of area.neighbors)
    inform(n.hostile?'Foe':'Ally',`${n.race} (${n.difficulty})`)
  inform('Spoils','$'+area.credits)
  AREAINFO.classList.remove('hidden')
  INSTRUCTIONS.classList.add('hidden')
}

export function close(){
  INSTRUCTIONS.classList.remove('hidden')
  AREAINFO.classList.add('hidden')
}

GAMBLE.onclick=()=>{
  let c=getcredits()
  if(c>0) CREDITS.value=rpg.randomize(c)
}
