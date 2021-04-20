function countObj(str) {
  var obj = {};
  for (var n of str) {
    if (obj[n]) {
      obj[n]++;
    } else {
      obj[n] = 1;
    }
  }
  return obj;
}
let str = 'ssdsdasbvc';
console.log(countObj(str))
