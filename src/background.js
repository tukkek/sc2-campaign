import * as rpg from './rpg.js'

const BACKGROUNDS=['2k_mars.jpg','2k_mercury.jpg','2k_venus_surface.jpg']
const MAP=document.querySelector('#map')

export function setup(){MAP.style['background-image']=`url('planets/${rpg.pick(BACKGROUNDS)}')`}
