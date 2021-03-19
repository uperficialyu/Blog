function swap(a, b) {
  let temp = a;
  a = b;
  b = temp;
}

let arr = [1, 3, 4, 2, 4, 5, 2, 1, 6, 3];

const sort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(sort(arr))

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
Array.prototype.bubble = function bubble() {
  let flag = false;
  // 外层循环I控制比较的轮数
  for (let i = 0; i < this.length - 1; i++) {
    // 里层循环控制每一轮比较的次数J
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        // 当前项大于后一项，交换位置
        swap(this, j, j + 1);
        flag = true;
      }
    }
    if (!flag) break;
    flag = false;
  }
  return this;
}
let ary = [12, 8, 24, 16, 1];
ary.bubble();
console.log(ary);


