import * as rpg from '../controller/rpg.js'
import * as sidebar from './sidebar/sidebar.js'
import * as planet from '../model/planet.js'
import * as ai from '../model/ai.js'
import * as credits from './sidebar/credits.js'

const DEPTH=11
const BREADTH=8
const MAP=document.querySelector('#map')
const AREA=document.querySelector('template.area').content.childNodes[0]
const AREAS=[]
const ORTHOGONAL=[[0,+1],[+1,0],[0,-1],[-1,0]]
const DIAGONAL=[[-1,-1],[-1,0],[-1,+1],[0,-1],[0,+1],[+1,-1],[+1,0],[+1,+1]]
const BLOCKED=.84
const CARDS=document.querySelector('#tab-cards')
const DEBUG=false

class Area{
  constructor(x,y){
    this.x=x
    this.y=y
    this.credits=this.appraise()
    this.hostile=true
    this.visual=AREA.cloneNode(true)
    this.visual.onclick=()=>this.click()
    this.visual.onmouseenter=()=>sidebar.show(this)
    this.blocked=false
    this.race=''
    this.map=''
  }
  
  get difficulty(){return ai.DIFFICULTIES[this.y]}
  get difficultyshort(){return ai.DIFFICULTIESSHORT[this.y]}
  get label(){return `${this.race[0]}`}
  
  appraise(){
    if(this.y==0) return 0
    let value=rpg.randomize(Math.pow(2,this.y))
    if(value<1) value=1
    let i=0
    for(;value>10;i++) value/=10
    return Math.round(value)*Math.pow(10,i)
  }
  
  update(){
    let v=this.visual
    if(this.hostile) 
      v.classList.add(this.race.toLowerCase())
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
  
  place(){MAP.appendChild(this.visual)}
  
  click(){
    this.hostile=!this.hostile
    credits.add(this.credits)
    this.credits=0
    let r=this.race.toLowerCase()
    this.visual.classList.remove(r)
    this.update()
  }

  get neighbors(){
    let neighbors=[]
    for(let n of DIAGONAL){
      let x=this.x+n[0]
      let y=this.y+n[1]
      if(!(0<=x&&x<BREADTH)) continue
      if(!(0<=y&&y<DEPTH)) continue
      let a=AREAS[x][y]
      if(a.blocked) continue
      neighbors.push(a)
    }
    return neighbors
  }
}

class Block extends Area{
  constructor(x,y){
    super(x,y)
    this.credits=0
    this.visual.classList.add('block')
    this.visual.onmouseenter=()=>CARDS.click()
    this.blocked=true
  }
  
  get label(){return ''}
  
  update(){}//dont
}

/* Simulates expansion, at each turn seeding some or no races
 * and possibly expanding previously-placed ones. */
function placeraces(areas){
  let empty=Array.from(areas)
  let races=rpg.shuffle(Array.from(ai.RACES))
  let seed=0
  while(empty.length>0){
    empty=rpg.shuffle(empty).filter(a=>a.race=='')
    let seeds=rpg.roll(0,ai.RACES.length-1)
    for(let i=0;i<Math.min(empty.length,races.length);i++){
      empty[i].race=races[seed%races.length]
      seed+=1
    }
    for(let a of areas.filter(a=>a.race!=''))
      if(rpg.chancein(2)) for(let n of a.neighbors)
        n.race=a.race
  }
}

function reset(){for(let x=0;x<BREADTH;x++) for(let y=0;y<DEPTH;y++) AREAS[x][y]=false}

function grow(x,y){
  if(!(0<=x&&x<BREADTH)) return
  if(!(0<=y&&y<DEPTH)) return
  if(AREAS[x][y]) return
  AREAS[x][y]=true
  for(let growx=x-1;growx<=x+1;growx++)
    for(let growy=y-1;growy<=y+1;growy++)
      if((growx!=x||growy!=y)&&Math.random()>BLOCKED)
        grow(growx,growy)
//   if(Math.random()>BLOCKED) grow(x+1,y+0)
//   if(Math.random()>BLOCKED) grow(x-1,y+0)
//   if(Math.random()>BLOCKED) grow(x+0,y+1)
//   if(Math.random()>BLOCKED) grow(x+0,y+1)
}

function done(){
  for(let x=0;x<BREADTH;x++) if(AREAS[x][DEPTH-1]) return true
  return false
}

export function setup(){
  for(let x=0;x<BREADTH;x++) AREAS[x]=[]
  reset()
  while(!done()){
    reset()
    grow(rpg.roll(0,BREADTH),0)
  }
  let areas=[]
  for(let x=0;x<BREADTH;x++){
    for(let y=0;y<DEPTH;y++){
      let a=AREAS[x][y]?new Area(x,y):new Block(x,y)
      AREAS[a.x][a.y]=a
      areas.push(a)
    }
  }
  for(let y=DEPTH-1;y>=0;y--)
    for(let x=0;x<BREADTH;x++)
      AREAS[x][y].place()
  placeraces(areas)
  let populated=areas.filter(a=>!a.blocked).sort((a,b)=>(b.y+b.neighbors.length)-(a.y+a.neighbors.length))
  for(let p of populated){
    p.map=planet.current.getmap((p.neighbors.length+1)*2)
    p.update()
    if(p.y==0) p.click()
  }
  MAP.style['background-image']=`url('planets/${planet.current.background}')`
  if(DEBUG) console.log(populated.length+' areas generated')
}
