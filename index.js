let ary = [12, 23, 12, 15, 25, 23, 25, 14, 16];
let str = ary.sort((a, b) => a - b).join('@') + '@';
let reg = /(\d+@)\1*/g;
ary = [];
str.replace(reg, (n, m) => {
  m = Number(m.slice(0, m.length - 1));
  ary.push(m);
});
console.log(ary);