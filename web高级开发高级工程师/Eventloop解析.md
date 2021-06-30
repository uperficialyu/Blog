
## 任务队列

因为JavaScript是单线程的。意味着，前一个任务结束，才会执行后一个任务。如果前面一个任务执行的时间很长，后面一个任务不得不等待，会形成卡死现象。

如果仅仅只是计算量太大了，也算了。但是很多时候，cpu是闲着的，比如io输入输出，ajax请求，难道不得不等待结果，再执行吗？

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

微任务的优先级永远高于宏任务，宏任务的优先级是按照谁先到执行时间，谁先执行。

宏任务：定时器，ajax，事件绑定

微任务：promise，async，await

#### 统计代码执行时间

  ```javascript
  console.log(1);
  console.time('AAA');
  for (let i = 0; i < 99999999; i++) {
    if (i === 99999998) {
      console.log(2);
    }
  }
  console.timeEnd('AAA'); // =>time/timeEnd可以记录一段程序执行的时间（时间受电脑性能和执行时候的环境转态影响） "事后统计法"   300MS~400MS
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

##### 练习6：

  ```javascript
  function func1() {
    console.log('func1 start');
    return new Promise(resolve => {
      resolve('OK');
    });
  }
  function func2() {
    console.log('func2 start');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('OK');
      }, 10);
    });
  }
  console.log(1);
  setTimeout(async () => {
    console.log(2);
    await func1();
    console.log(3);
  }, 20);
  for (let i = 0; i < 90000000; i++) { } //循环大约要进行80MS左右
  console.log(4);
  func1().then(result => {
    console.log(5);
  });
  func2().then(result => {
    console.log(6);
  });
  setTimeout(() => {
    console.log(7);
  }, 0);
  console.log(8);
  ```

答案：
1. 1
2. 4
3. func1 start
4. func2 start
5. 8
6. 5
7. 7
8. 2
9. func1 start
10. 3
11. 6

解析：先执行同步任务，然后执行微任务，最后执行宏任务。

| GUI线程 | 微任务 |宏任务 | 
| --- | --- | --- |
| console.log(1) | 任务1：console.log(5) | 任务1：20毫秒后执行async () |
| console.log(4) | 任务2：console.log(3) | 任务2：20毫秒后执行resolve('OK') |
| console.log('func1 start') | 任务3：console.log(6) | 任务3：5-6毫秒后执行console.log(7) |
| console.log('func2 start') | - | - |
| console.log(8) | - | - |
