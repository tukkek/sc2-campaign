import * as rpg from '../controller/rpg.js'
import * as maps from './maps.js'

const DEBUG=false
const BACKGROUNDS=[
  [maps.LUSH,'amazon.jpg'],
  [maps.WATER,'amazon.jpg'],
  [maps.ORBITAL,'2k_jupiter.jpg'],
  [maps.INDUSTRIAL,'paris.jpg'],
  [maps.URBAN,'paris.jpg'],
  [maps.ROCKY,'grand_canyon.jpg'],
  [maps.COLD,'2k_mercury.jpg'],
  [maps.DESERT,'2k_mars.jpg'],
  [maps.INFERNO,'2k_venus_surface.jpg'],
  [maps.TEMPLE,'thai_desert.jpg'],
  [maps.DARK,'lunar_surface.jpg'],
  [maps.TOXIC,'boa_vista.jpg']
]

class Planet{
  constructor(){
    this.themes=new Set()
    this.maps=new Set() //maps registered
    this.pool=new Set() //maps left
  }
  
  findmap(players){
    let m=false
    for(let nplayers=players;nplayers<=8;nplayers++){
      m=rpg.pick(Array.from(this.pool).filter(m=>m.players==nplayers))
      if(m){
        this.pool.delete(m)
        return m
      }
    }
    return false
  }
  
  expand(){
    let t=false
    if(this.themes.size==maps.THEMES.length) throw 'no more themes'
    while(!t){
      t=rpg.pick(Array.from(maps.THEMES))
      if(this.themes.has(t)) t=false
    }
    this.themes.add(t)
    for(let m of maps.filter(t)){
      if(this.maps.has(m)) continue
      this.maps.add(m)
      this.pool.add(m)
    }
  }
  
  getmap(players){
    if(players>8) players=8
    let m=false
    while(!m){
      m=this.findmap(players)
      if(!m) this.expand()
    }
    return m
  }
  
  toString(){return this.name+' planet'}
  get name(){return Array.from(this.themes).sort().join(' ')}
  
  get background(){
    let t=Array.from(this.themes)
    return rpg.pick(BACKGROUNDS.filter(b=>b[1]).filter(b=>t.indexOf(b[0])>=0))[1]
  }
}

class Affix{
  constructor(name,themes){
    this.name=name //string
    this.themes=themes //array os strings
  }
  
  rename(planet){planet.name=`${planet.name} ${this.name}`}
  
  apply(planet){
    this.rename(planet)
    planet.themes.push(...this.themes)
  }
}

export var current=new Planet()
