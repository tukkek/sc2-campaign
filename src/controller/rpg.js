const RANDOM=new Math.seedrandom() //TODO seed from URL TODO save/restore campaign state

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function roll(min,max){
  return Math.floor(Math.random()*(max-min+1))+min
}

export function pick(array){return array[roll(0,array.length-1)]}

export function randomize(n){return n+roll(0,n)-roll(0,n)}

export function chancein(n){return roll(1,n)==1}

export function shuffle(array){//https://stackoverflow.com/a/2450976
  let currentIndex=array.length
  let randomIndex=false
  while(0!==currentIndex){
    randomIndex=Math.floor(Math.random()*currentIndex)
    currentIndex--
    [array[currentIndex],array[randomIndex]]=
      [array[randomIndex],array[currentIndex]]
  }
  return array
}
