let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
~ function () {
  function myFlat() {
    let result = [],
      _this = this;
    //=>循环ARR中的每一项，把不是数组的存储到新数组中
    let fn = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
          fn(item);
          continue;
        }
        result.push(item);
      }
    };
    fn(_this);
    return result;
  }
  Array.prototype.myFlat = myFlat;
}();
let arr1 = arr.myFlat();
console.log(arr1);