/* TODO 
 * rename to planets.js and see TODO at maps.js
 * a map can be used in different planets!
 * - venus as desert/fiery/mountanous planet
 * - paris as urban/orbital/industrial planet
 * - mercury as ice planet
 * - amazon as forest/jungle/aquatic planet
 * - moon as spooky/dark planet
 * to validate once done: each planet should have ~70 maps, with a target of 5 planets
 * pick maps at random instead - sadly, allowing repetition but should be very ok if target is somewhat met
 * add planet type to sidebar map information
 */
import * as rpg from './rpg.js'

const BACKGROUNDS=['2k_mercury.jpg','2k_venus_surface.jpg','paris.jpg','amazon.jpg','moon.jpg']
const MAP=document.querySelector('#map')

export function setup(){MAP.style['background-image']=`url('planets/${rpg.pick(BACKGROUNDS)}')`}
setup()
