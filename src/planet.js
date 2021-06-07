import * as rpg from './rpg.js'
import * as maps from './maps.js'

const DEBUG=true

class Planet{
  constructor(name,background,themes){
    this.name=name //string
    this.background=background //filename
    this.themes=Array.from(themes)
    this.enhance=true //whether to add affix to enlarge map pool
    this.pool=[] //maps left
    this.used=[] //maps generated
  }
  
  generate(affix=false){
    if(this.enhance){
      if(!affix) affix=rpg.pick(affixes)
      affix.apply(this)
    }
    this.pool=maps.filter(this.themes)
  }
  
  getmap(players,p=this.pool){
    if(players<2) players=2
    let m=rpg.pick(p.filter(
      m=>players<=m.players&&m.players<=players*2))
    if(p==this.pool){
      if(!m) return this.getmap(players,this.used)
      p.splice(p.indexOf(m),1)
      this.used.push(m)
      if(p.length==0){
        p=this.used
        this.used=[]
      }
    }
    return m
  }
  
  toString(){return this.name+' planet'}
}

class Paradise extends Planet{
  constructor(){
    super('Paradise','amazon.jpg',[maps.LUSH,maps.WATER])
    this.enhance=false
  }
}

class Gas extends Planet{
  constructor(){
    super('Gas','2k_jupiter.jpg',[maps.ORBITAL])
    this.enhance=false
  }
}

class Factory extends Planet{
  constructor(){
    super('Factory','paris.jpg',[maps.INDUSTRIAL,maps.URBAN])
    this.enhance=false
  }
}

class Rock extends Planet{
  constructor(){
    super('Rock','grand_canyon.jpg',[maps.ROCKY])
    this.enhance=false
  }
}

class Ice extends Planet{
  constructor(){
    super('Ice','2k_mercury.jpg',[maps.COLD])
  }
}

class Desert extends Planet{
  constructor(){
    super('Desert','2k_mars.jpg',[maps.DESERT])
  }
}

class Scorching extends Planet{
  constructor(){
    super('Scorching','2k_venus_surface.jpg',[maps.INFERNO])
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

class Shrine extends Affix{
  constructor(){
    super('shrine',[maps.TEMPLE])
  }
}

class Corrupted extends Affix{
  constructor(){
    super('corrupt',[maps.DARK,maps.TOXIC])
  }
  
  rename(planet){planet.name=`${this.name} ${planet.name}`}
}

/* TODO
  25 temple maps maps.js:385:13
  35 dark maps maps.js:385:13
  7 toxic maps
 */

export var current=false

var types=[Paradise,Gas,Factory,Rock,Ice,Desert,Scorching]
var affixes=[new Shrine(),new Corrupted()]

function setup(){
  current=rpg.pick(types)
  current=new current()
  current.generate()
  if(DEBUG){
    for(let t of types){
      let base=new t()
      let variants=[base]
      if(base.enhance){
        for(let a of affixes){
          let v=new t()
          v.generate(a)
          variants.push(v)
        }
      }
      base.enhance=false
      base.generate()
      for(let v of variants){
        let name=v.toString().toLowerCase()
        console.log(`${name} (${v.themes}): ${v.pool.length} maps`)
      }
    }
  }
}

setup()
