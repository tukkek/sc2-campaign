import * as rpg from '../controller/rpg.js'
import * as ai from './ai.js'

class Card{
  constructor(text,bonus=0){
    this.text=text
    this.reward=4+bonus*2
    this.sticky=true
  }
  
  discard(){
    this.sticky=false
    hand.splice(hand.indexOf(this),1)
  }
}

class Goal extends Card{
  constructor(text,bonus=0){
    super('Goal: '+text,bonus)
  }
}

class Unit extends Goal{
  constructor(text){
    super('Recruit '+text)
  }
}

class Bonus extends Card{
  constructor(text,cost){
    super('Bonus: '+text)
    this.reward=cost
    this.sticky=false
  }
}

export var protoss=[
  new Unit('Zealot'),new Unit('Stalker'),new Unit('Sentry'),new Unit('Adept'),new Unit('High Templar'),new Unit('Dark Templar'),new Unit('Immortal'),new Unit('Colossus'),new Unit('Disruptor'),new Unit('Archon'),new Unit('Warp Prism'),new Unit('Phoenix'),new Unit('Void Ray'),new Unit('Oracle'),new Unit('Carrier'),new Unit('Tempest'),new Unit('Mothership Core'),new Unit('Mothership'),
  new Goal('Train 10 Marines'),  new Goal('Build a Factory during the first 270 seconds'),  new Goal("Kill units with Yamato blasts"),  new Goal("Destroy units with Sniper Rounds"),  new Goal("Destroy worker units with Auto-Turrets"),  new Goal("Kill enemy units with a Nuke"),  new Goal("Have 9 Terran units training simultaneously"),  new Goal("Heal allied units with Medivacs"),  new Goal("Use a Raven Seeker Missile"),]
export var terran=[
  new Unit('Marine'),new Unit('Marauder'),new Unit('Reaper'),new Unit('Ghost'),new Unit('Hellion'),new Unit('Hellbat'),new Unit('Siege Tank'),new Unit('Cyclone'),new Unit('Widow mine'),new Unit('Thor'),new Unit('Auto-turret'),new Unit('Viking'),new Unit('Medivac'),new Unit('Liberator'),new Unit('Raven'),new Unit('Banshee'),new Unit('Battlecruiser'),
  new Goal('Warp in 5 Zealots'),  new Goal('Warp in a Twilight Council during first 275 seconds'),  new Goal("Have 9 Protoss units warping in simultaneously"),  new Goal("Absorb damage with hallucinations"),  new Goal("Recharge shields with Shield Batteries"),  new Goal("Destroy units with a High Templar"),  new Goal("Warp in 50 units using Warp Prisms"),  new Goal("Capture enemy units in a Vortex"),  new Goal("Use Blink"),  new Goal("Control 15 hallucinations",1),]
export var zerg=[
  new Unit('Queen'),new Unit('Zergling'),new Unit('Baneling'),new Unit('Roach'),new Unit('Ravager'),new Unit('Hydralisk'),new Unit('Lurker'),new Unit('Infestor'),new Unit('Swarm host'),new Unit('Ultralisk'),new Unit('Changeling'),new Unit('Infested Terran'),new Unit('Nydus Worm'),new Unit('Overseer'),new Unit('Mutalisk'),new Unit('Corruptor'),new Unit('Brood lord'),new Unit('Viper'),
  new Goal("Mutate a Lair during the first 285 seconds"),  new Goal("Destroy units with Infested Terrans"),  new Goal("Destroy units with a single Neural Parasited unit"),  new Goal("Have 21 Zerg units morphing simultaneously"),  new Goal("While playing as Zerg, warp in a Zealot"),]
export var hand=[]//drawn cards

var generic=[new Goal('Expand during the first 225 seconds'),new Goal("Build a gold base"),new Goal("Deploy units with a transport"),new Goal("Destroy cloaked or burrowed units"),new Goal("Win in under 5 minutes"),]

function setup(){
  let decks={
    'Protoss':protoss,
    'Terran':terran,
    'Zerg':zerg,
  }
  for(let race of Object.keys(decks)) for(let i=1;i<=5;i++)
    generic.push(new Bonus(`Reduce a ${race} AI opponent's power by ${i*10}%`,i))
  for(let race of Object.keys(decks)){
    let d=decks[race]
    d.push(...generic)
    for(let i=0;i<ai.DIFFICULTIES.length;i++){
      let ally=new Bonus(`Add a ${race} (${ai.DIFFICULTIES[i]}) ally to your team`,-i)
      d.push(ally)
      if(i==1) hand.push(ally)
    }
  }
  hand=rpg.shuffle(hand).slice(0,2)
}

export function draw(deck){
  let c=deck[rpg.roll(0,deck.length-1)]
  hand.push(c)
  return c
}

setup()
