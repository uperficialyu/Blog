
#### 统计代码执行时间

  ```javascript
  console.log(1);
  console.time('AAA');
  for (let i = 0; i < 99999999; i++) {
    if (i === 99999998) {
      console.log(2);
    }
  }
  console.timeEnd('AAA'); //=>time/timeEnd可以记录一段程序执行的时间（时间受电脑性能和执行时候的环境转态影响） "事后统计法"   300MS~400MS
  console.log(3);
  ```

##### 练习1：

  ```javascript
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 1000);
  console.log(3);
  setTimeout(() => {
    console.log(4);
  }, 0); //=>并不是立即执行,需要等待浏览器的最小反应时间 5~6MS
  console.log(5);
  for (let i = 0; i < 99999999; i++) {
    if (i === 99999998) {
      console.log(6);
    }
  }
  console.log(7);
  ```

答案：1 3 5 6 7 4 2

解析：先执行同步任务，然后执行宏任务。

| GUI线程 | 宏任务 |
| --- | --- | --- |
| console.log(1) | 1000毫秒后执行console.log(2) |
| console.log(3) | 5-6毫秒执行console.log(4) |
| console.log(5) | - |
| console.log(6) | - |
| console.log(7) | - |

##### 练习2：

  ```javascript
  setTimeout(() => {
    console.log(1);
  }, 20);
  console.log(2);
  setTimeout(() => {
    console.log(3);
  }, 10);
  console.log(4);
  for (let i = 0; i < 90000000; i++) {
    // do soming  79MS
  }
  console.log(5);
  setTimeout(() => {
    console.log(6);
  }, 8);
  console.log(7);
  setTimeout(() => {
    console.log(8);
  }, 15);
  console.log(9);
  ```

答案：2 4 5 7 9 3 1 6 8

解析：先执行同步任务，然后执行宏任务。

| GUI线程 | 宏任务 |
| --- | --- | --- |
| console.log(2) | 任务1：20毫秒后执行console.log(1) |
| console.log(4) | 任务2：10毫秒执行console.log(3) |
| console.log(5) | 执行for循环后，已经过去了79ms，宏任务，1,2已经执行完成了，等待同步执行完成后执行 |
| console.log(7) | 任务3：8毫秒执行console.log(6) |
| console.log(9) | 任务4：15毫秒执行console.log(8) |

##### 练习3：

  ```javascript
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }
  // 第一次循环  向任务队列中插入一个定时器
  // 第二次循环  向任务队列中插入一个定时器
  // ...
  // 第五次循环  向任务队列中插入一个定时器
  // 循环结束 全局下的i=5  任务队列中有5个定时器  【GUI空闲】
  //   定时器执行中遇到i 不是自己的，则找全局的，全局的i=5
  //   =>5 * 5
  ```

##### 练习4：

  ```javascript
  setTimeout(() => {
    console.log(1);
    while (1 === 1) {}
  }, 10);
  console.log(2);
  for (let i = 0; i < 90000000; i++) {
    // do soming  79MS
  }
  // 循环结束  任务1已经到时间了
  console.log(3);
  setTimeout(() => {
    console.log(4);	
  }, 5);
  console.log(5);
  ```

答案：2 4 5 7 9 3 1 6 8

解析：先执行同步任务，然后执行宏任务，执行第一个宏任务后，遇到了死循环，第二个宏任务永远无法执行。

##### 练习5：

  ```javascript
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2');
  }
  console.log('script start');
  setTimeout(function () {
    console.log('setTimeout');
  }, 0)
  async1();
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
  console.log('script end');
  ```
答案：
1. script start
2. async1 start
3. async2
4. promise1
5. script end
6. async1 end
7. promise2
8. setTimeout

解析：先执行同步任务，然后执行微任务，最后执行宏任务。

| GUI线程 | 微任务 |宏任务 | 
| --- | --- | --- |
| console.log('script start') | 任务1：console.log('async1 end') | 任务1：5-6毫秒后执行console.log('setTimeout') |
| console.log('async1 start') | 任务2：console.log('promise2') | - |
| console.log('async2') | - | - |
| console.log('promise1') | - | - |
| console.log('script end') | - | - |