const quickSort = (arr) => {
  // 数组指定两个位置进行值交换
  let swap = (arr, i, j) => {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  // 完成一次划分交换
  let findCenter = (arr, left, right) => {
    let flag = arr[left]
    let idx = left + 1
    for (let i = idx; i <= right; i++) {
      if (arr[i] < flag) {
        swap(arr, idx, i)
        idx++
      }
    }
    swap(arr, left, idx - 1)
    return idx
  }
  // 递归排序
  let sort = (arr, left, right) => {
    if (left < right) {
      let center = findCenter(arr, left, right)
      sort(arr, left, center - 1)
      sort(arr, center, right)
    }
  }
  sort(arr, 0, arr.length - 1)
  return arr
}
console.log(quickSort([2,4,6,11,22,3,7]))