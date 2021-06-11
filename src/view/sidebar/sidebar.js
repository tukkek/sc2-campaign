import * as rpg from '../../controller/rpg.js'
import './clock.js'
import * as planet from '../../model/planet.js'
import * as cards from './cards.js'

const CREDITS=document.querySelector('#credits input')
const INSTRUCTIONS=document.querySelector('#instructions')
const AREAINFO=document.querySelector('#areainfo')
const DATA=document.querySelector('template.data').content.childNodes[0]
const GAMBLE=document.querySelector('button#gamble')
const TABS=Array.from(document.querySelectorAll('#info .tabs *'))
const TABBED=[cards.CARDS,AREAINFO,INSTRUCTIONS]

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
  TABS[1].click()
  for(let d of AREAINFO.querySelectorAll('li.data.generated')) d.remove()
  inform('Planet',planet.current)
  inform('Map',`${area.map} (${area.map.players})`)
  let areas=[area]
  areas.push(...area.neighbors)
  for(let n of area.neighbors.filter(a=>!a.hostile))
    inform('Ally',`${n.race} (${n.difficulty})`)
  for(let n of area.neighbors.filter(a=>a.hostile))
    inform('Foe',`${n.race} (${n.difficulty})`)
  inform('Spoils','$'+area.credits)
  AREAINFO.classList.remove('hidden')
  INSTRUCTIONS.classList.add('hidden')
}

function select(tab){
  for(let t of TABS) t.classList.remove('selected')
  for(let t of TABBED) t.classList.add('hidden')
  tab.classList.add('selected')
  TABBED[TABS.indexOf(tab)].classList.remove('hidden')
}

export function spend(credits){
  let bank=getcredits()
  if(bank<credits) return false
  CREDITS.value=bank-credits
  return true
}

function setup(){
  GAMBLE.onclick=()=>{
    let c=getcredits()
    if(c>0) CREDITS.value=rpg.randomize(c)
  }
  for(let t of TABS){
    t.onmouseover=()=>select(t)
    t.onclick=()=>select(t)
  }
}

setup()
