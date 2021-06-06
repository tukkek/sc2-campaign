const RANDOM=new Math.seedrandom() //TODO seed from URL TODO save/restore campaign state

export function pick(array){return array[Math.floor(Math.random()*array.length)]}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function roll(min,max){
  min=Math.ceil(min)
  max=Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)+min)
}

export function randomize(n){return n+roll(1,n)-roll(1,n)}

export function chancein(n){return roll(1,n)==1}
