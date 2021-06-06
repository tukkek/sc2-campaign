import * as rpg from './rpg.js'
import * as sidebar from './sidebar.js'
import * as maps from './maps.js'
import * as planet from './planet.js'

const DEPTH=10
const BREADTH=12
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
    this.credits=1+rpg.randomize(y)
    this.hostile=true
    this.visual=AREA.cloneNode(true)
    this.visual.onclick=()=>this.click()
    this.visual.onmouseenter=()=>sidebar.show(this)
    this.visual.onmouseleave=()=>sidebar.close()
    this.blocked=false
    this.race=''
    this.map=''
  }
  
  get difficulty(){return DIFFICULTIES[this.y]}
  get difficultyshort(){return DIFFICULTIESSHORT[this.y]}
  
  get label(){return `${this.race[0]}`}
  
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
    sidebar.addcredits(this.credits)
    this.credits=0
    let r=this.race.toLowerCase()
    this.visual.classList.remove(r)
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
  
  populate(){}//don't
  update(){}//dont
}

/* Simulates expansion, at each turn seeding some or no races
 * and possibly expanding previously-placed ones. */
function placeraces(areas){
  let empty=Array.from(areas)
  while(empty.length>0){
    empty=rpg.shuffle(empty).filter(a=>a.race=='')
    let seeds=rpg.roll(0,RACES.length-1)
    let races=rpg.shuffle(Array.from(RACES)).slice(0,seeds)
    for(let i=0;i<Math.min(empty.length,races.length);i++){
      empty[i].race=races[i]
    }
    for(let a of areas.filter(a=>a.race!='')){
      if(rpg.chancein(9)) for(let n of a.neighbors)
        n.race=a.race
    }
  }
}

export function setup(){
  let areas=[]
  for(let y=DEPTH-1;y>=0;y--){
    for(let x=BREADTH-1;x>=0;x--){
      let a=Math.random()<BLOCKED?new Block(x,y):new Area(x,y)
      a.place()
      if(y==DEPTH-1) AREAS[x]=[]
      AREAS[x][y]=a
      areas.push(a)
    }
  }
  let populated=rpg.shuffle(areas).filter(a=>!a.blocked)
    .sort((a,b)=>a.neighbors.length-b.neighbors.length)
  placeraces(areas)
  for(let p of populated){
    p.populate()
    p.update()
  }
}
