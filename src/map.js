import * as rpg from './rpg.js'
import * as sidebar from './sidebar.js'
import * as maps from './maps.js'
import * as planet from './planet.js'

const DEPTH=10
const BREADTH=14
const MAP=document.querySelector('#map')
const AREA=document.querySelector('template.area').content.childNodes[0]
const AREAS=[]
const NEIGHBORS=[[-1,0],[+1,0],[0,-1],[0,+1]]
const RACES=['Protoss','Terran','Zerg']
const DIFFICULTIES=['Very Easy','Easy','Medium','Hard','Harder','Very Hard','Elite','Cheater 1','Cheater 2','Cheater 3']
const DIFFICULTIESSHORT=['VE','E','M','H','H+','VH','El','C1','C2','C3']
const BLOCKED=5/10

class Area{
  constructor(x,y){
    this.x=x
    this.y=y
    this.credits=1+rpg.randomize(x)
    this.hostile=true
    this.visual=AREA.cloneNode(true)
    this.visual.onclick=()=>this.click()
    this.visual.onmouseenter=()=>sidebar.show(this)
    this.visual.onmouseleave=()=>sidebar.close()
    this.blocked=false
    this.race=rpg.pick(RACES)
    this.map=''
  }
  
  get difficulty(){return DIFFICULTIES[this.x]}
  get difficultyshort(){return DIFFICULTIESSHORT[this.x]}
  
  get label(){return `${this.race[0]}`}
  
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
    sidebar.addcredits(this.credits)
    this.credits=0
    this.update()
  }
  
  get neighbors(){
    return NEIGHBORS
      .map(xy=>[this.x+xy[0],this.y+xy[1]])
      .filter(xy=>0<=xy[0]&&xy[0]<BREADTH)
      .filter(xy=>0<=xy[1]&&xy[1]<DEPTH)
      .map(xy=>AREAS[xy[0]][xy[1]])
      .filter(a=>!a.blocked)
  }
  
  populate(){
    this.map=maps.get(1+this.neighbors.length)
  }
}

class Block extends Area{
  constructor(x,y){
    super(x,y)
    this.credits=0
    this.visual.classList.add('block')
    this.visual.onmouseenter=false
    this.visual.onmouseleave=false
    this.blocked=true
  }
  
  get label(){return ''}
}

export function setup(){
  let areas=[]
  for(let x=BREADTH-1;x>=0;x--){
    AREAS[x]=[]
    for(let y=DEPTH-1;y>=0;y--){
      let a=Math.random()<BLOCKED?new Block(x,y):new Area(x,y)
      a.place()
      AREAS[x][y]=a
      areas.push(a)
    }
  }
  let populated=rpg.shuffle(areas).filter(a=>!a.blocked)
    .sort((a,b)=>a.neighbors.length-b.neighbors.length)
  for(let p of populated) p.populate()
}
