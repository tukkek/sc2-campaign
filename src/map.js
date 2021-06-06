import * as rpg from './rpg.js'
import * as info from './info.js'

const DEPTH=10
const BREADTH=DEPTH

const MAP=document.querySelector('#map')
const AREA=document.querySelector('template.area').content.childNodes[0]
const AREAS=[]

class Area{
  constructor(x,y){
    this.credits=rpg.randomize(x)
    this.hostile=true
    this.visual=AREA.cloneNode(true)
    this.visual.onclick=()=>this.click()
    this.visual.onmouseenter=()=>info.show(this)
    this.visual.onmouseleave=()=>info.close()
  }
  
  get label(){return 'T - VE'}
  
  update(){
    let v=this.visual
    v.querySelector('.label').innerHTML=this.label
    let credits=this.credits==0?'':'$'+this.credits
    v.querySelector('.credits').innerHTML=credits
    if(this.hostile){
      v.classList.remove('friendly')
      v.classList.add('hostile')
    }else{
      v.classList.remove('hostile')
      v.classList.add('friendly')
    }
  }
  
  place(){
    this.update()
    MAP.appendChild(this.visual)
  }
  
  click(){
    this.hostile=!this.hostile
    info.addcredits(this.credits)
    this.credits=0
    this.update()
  }
}

class Block extends Area{
  constructor(x,y){
    super(x,y)
    this.credits=0
    this.visual.classList.add('block')
    this.visual.onmouseenter=false
    this.visual.onmouseleave=false
  }
  
  get label(){return ''}
}

export function setup(){
  for(let x=DEPTH;x>0;x--){
    AREAS[x]=[]
    for(let y=BREADTH;y>0;y--){
      let a=rpg.chancein(3)?new Block(x,y):new Area(x,y)
      a.place()
      AREAS[x][y]=a
    }
  }
}
