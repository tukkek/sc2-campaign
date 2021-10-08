import * as card from '../../model/card.js'
import * as credits from './credits.js'

export const CARDS=document.querySelector('#info #cards')
const DRAWPROTOSS=document.querySelector('#info #cards button#drawprotoss');
const DRAWTERRAN=document.querySelector('#info #cards button#drawterran');
const DRAWZERG=document.querySelector('#info #cards button#drawzerg');
const CARD=CARDS.querySelector('template.card').content.childNodes[0]

function showcard(c){
  let div=CARD.cloneNode(true)
  div.querySelector('.text').innerHTML=c.text+'.'
  let claim=div.querySelector('.claim')
  if(c.reward>0) claim.innerHTML+=` (+$${c.reward})`
  else if(c.reward<0) claim.innerHTML+=` (-$${-c.reward})`
  claim.onclick=()=>{
    if(c.reward>0) credits.add(c.reward)
    else if(!credits.spend(-c.reward)) return false
    if(!c.sticky){
      c.discard()
      update()
    }
  }
  div.querySelector('.sell').onclick=()=>{
    credits.add(1)
    c.discard()
    update()
  }
  CARDS.insertBefore(div,CARDS.firstChild)
}

function update(){
  for(let c of CARDS.querySelectorAll('#info #cards > .card'))
    c.remove()
  for(let h of card.hand) showcard(h)
}

function draw(deck){
  if(credits.spend(2)){
    card.draw(deck)
    update()
  }
}

function setup(){
  DRAWPROTOSS.onclick=()=>draw(card.protoss)
  DRAWTERRAN.onclick=()=>draw(card.terran)
  DRAWZERG.onclick=()=>draw(card.zerg)
  update()
}

setup()
