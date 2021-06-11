import * as rpg from './rpg.js'
import './clock.js'
import * as planet from './planet.js'
import * as card from './card.js'

const CREDITS=document.querySelector('#credits input')
const INSTRUCTIONS=document.querySelector('#instructions')
const AREAINFO=document.querySelector('#areainfo')
const DATA=document.querySelector('template.data').content.childNodes[0]
const GAMBLE=document.querySelector('button#gamble')
const TABS=Array.from(document.querySelectorAll('#info .tabs *'))
const CARDS=document.querySelector('#info #cards')
const TABBED=[CARDS,AREAINFO,INSTRUCTIONS]
const DRAW=document.querySelector('#info #cards button#draw');
const CARD=CARDS.querySelector('template.card').content.childNodes[0]

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

function spend(credits){
  let bank=getcredits()
  if(bank<credits) return false
  CREDITS.value=bank-credits
  return true
}

function showcard(c){
  let div=CARD.cloneNode(true)
  div.querySelector('.text').innerHTML=c.text+'.'
  let claim=div.querySelector('.claim')
  if(c.reward>0) claim.innerHTML+=` (+$${c.reward})`
  else if(c.reward<0) claim.innerHTML+=` ($${c.reward})`
  claim.onclick=()=>{
    if(c.reward>0) addcredits(c.reward)
    else if(!spend(-c.reward)) return false
    if(!c.sticky){
      c.discard()
      update()
    }
  }
  div.querySelector('.sell').onclick=()=>{
    addcredits(1)
    c.discard()
    update()
  }
  let sticky=div.querySelector('input.sticky')
  sticky.checked=false
  sticky.onclick=()=>{
    if(c.sticky||!confirm('Spend $10 to turn this into a permanent goal?')||
      !spend(10)) return false
    c.sticky=true
    return true
  }
  CARDS.insertBefore(div,CARDS.firstChild)
}

function update(){
  for(let c of CARDS.querySelectorAll('#info #cards > .card'))
    c.remove()
  for(let h of card.hand) showcard(h)
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
  DRAW.onclick=()=>{
    if(spend(2)){
      card.draw()
      update()
    }
  }
  update()
}

setup()
