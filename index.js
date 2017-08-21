const colorCache = {

}

exports.colorTransition = function (startColor, endColor, percent){
  
  let key = startColor+endColor 
  
  if(!colorCache.hasOwnProperty(key)){
    key = endColor+startColor
    percent = 100 - percent
  }
  if(colorCache.hasOwnProperty(key)){
    return colorCache[key][Math.round(percent)]
  } 
    
  const re = /#(.{2})(.{2})(.{2})/;
  let _start = re.exec(startColor)
  let _end = re.exec(endColor)
   
  let start = [
    parseInt(_start[1], 16),
    parseInt(_start[2], 16),
    parseInt(_start[3], 16)
  ]
    
  let diff = [
     parseInt(_end[1], 16) - start[0],
     parseInt(_end[2], 16) - start[1],
     parseInt(_end[3], 16) - start[2]
  ]
  
  let frames = Array(101).fill(1).map((i, percent) => {
    return '#' + start.map((color, index) => {
    let difference = Math.round(diff[index] / 100 * percent)
    let newValue = (color + difference).toString(16)
    return newValue.length === 1? '0' + newValue : newValue
    }).join('')
  }).reverse()
   
  colorCache[key] = frames;  
  return frames[Math.round(percent)]
}
