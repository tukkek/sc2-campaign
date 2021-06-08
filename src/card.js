import * as rpg from './rpg.js'
import * as ai from './ai.js'

const UNITS=[
  //protoss
  'Zealot','Stalker','Sentry','Adept','High Templar','Dark Templar',
  'Immortal','Colossus','Disruptor',
  'Archon',
  'Warp prism',
  'Phoenix','Void ray','Oracle','Carrier','Tempest',
  'Mothership core','Mothership',
  //terran
  'Marine','Marauder','Reaper','Ghost',
  'Hellion','Hellbat','Siege Tank','Cyclone','Widow mine','Thor',
  'Auto-turret',
  'Viking','Medivac','Liberator','Raven','Banshee','Battlecruiser',
  //zerg
  'Queen','Zergling','Baneling','Roach','Ravager',
  'Hydralisk','Lurker','Infestor','Swarm host',
  'Ultralisk',
  'Changeling','Infested terran','Nydus worm',
  'Overseer','Mutalisk','Corruptor',
  'Brood lord','Viper',
]

class Card{
  constructor(text,bonus=0){
    this.text=text
    this.reward=4+bonus*2
    this.sticky=false
  }
  
  discard(){
    this.sticky=false
    hand.splice(hand.indexOf(this),1)
    deck.push(this)
  }
}

class Goal extends Card{
  constructor(text,bonus=0){
    super('Goal: '+text,bonus)
  }
}

class Bonus extends Card{
  constructor(text,cost){
    super('Bonus: '+text)
    this.reward=-Math.max(cost-2,0)
  }
}

export var hand=[]//drawn cards

var deck=[
  new Goal('Train 10 Marines'),
  new Goal('Warp in 5 Zealots'),
  new Goal('Expand during the first 225 seconds'),
  new Goal('Build a Factory during the first 270 seconds'),
  new Goal('Warp in a Twilight Council during first 275 seconds'),
  new Goal("Mutate a Lair during the first 285 seconds"),
  new Goal("Build a gold base"),
  new Goal("Kill units with Yamato blasts"),
  new Goal("Destroy units with Sniper Rounds"),
  new Goal("Destroy units with Infested Terrans"),
  new Goal("Destroy units with a Seeker Missile"),
  new Goal("Destroy units with a single Neural Parasited unit"),
  new Goal("Destroy worker units with Auto-Turrets"),
  new Goal("Deploy units with a transport"),
  new Goal("Kill enemy units with a Nuke"),
  new Goal("Have 9 Terran units training simultaneously"),
  new Goal("Have 9 Protoss units warping in simultaneously"),
  new Goal("Have 21 Zerg units morphing simultaneously"),
  new Goal("Heal allied units with Medivacs "),
  new Goal("Absorb damage with hallucinations"),
  new Goal("Recharge shields with Shield Batteries"),
  new Goal("Destroy cloaked or burrowed units"),
  new Goal("Destroy units with a High Templar"),
  new Goal("Warp in 50 units using Warp Prisms"),
  new Goal("While playing as Zerg, warp in a Zealot"),
  new Goal("Capture enemy units in a Vortex"),
  new Goal("Use Blink"),
  new Goal("Use a Raven Seeker Missile"),
  new Goal("Control 15 hallucinations",1),
  new Goal("Win in under 5 minutes"),
]

export function draw(){
  let c=rpg.roll(0,deck.length-1)
  c=deck.splice(c,1)[0]
  hand.push(c)
  return c
}

function setup(){
  deck.push(...UNITS.map(u=>new Goal('Recruit '+u)))
  for(let r of ai.RACES){
    deck.push(...ai.DIFFICULTIES.map(
      d=>new Bonus(`Add a ${r} (${d}) ally to your team`,ai.DIFFICULTIES.indexOf(d))))
    for(let i=1;i<=5;i++)
      deck.push(new Bonus(`Reduce a ${r} AI opponent's power by ${-i*10}% (doesn't stack)`,i))
  }
}

setup()
