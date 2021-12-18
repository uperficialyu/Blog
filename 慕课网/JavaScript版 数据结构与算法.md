## 第6章 基础算法之“递归类”

#### 6-1 复原IP地址

题目：给定一个只包含数字的字符串，用以表示一个IP地址，返回所有可能从s获得的有效IP地址。你可以按任何顺序返回答案。

有效IP地址正好由四个整数（每个整数位于0到255之间组成，且不能含有前导 0），整数之间用'.' 分隔。

例如："0.1.2.201"和"192.168.1.1"是有效IP地址，但是"0.011.255.245"、"192.168.1.312"和"192.168@1.1"是无效IP地址。

示例 1：

  ```javascript
  输入：s = "25525511135"
  输出：["255.255.11.135","255.255.111.35"]
  ```

示例 2：

  ```javascript
  输入：s = "0000"
  输出：["0.0.0.0"]
  ```

示例3：

  ```javascript
  输入：s = "1111"
  输出：["1.1.1.1"]
  ```

示例4：

  ```javascript
  输入：s = "010010"
  输出：["0.10.0.10","0.100.1.0"]
  ```

示例 5：

  ```javascript
  输入：s = "101023"
  输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
  ```

答案：

  ```javascript
  const ipSearch = (str) => {
    // 保留所有符合条件的ip
    let r = [];
    let search = (cur, sub) => {
      // 非法输入过滤
      if (sub.length > 12) {
        return
      }
      // 边界条件
      if (cur.length === 4 && cur.join('') === str) {
        r.push(cur.join('.'));
      } else {
        for (let i = 0, len = Math.min(3, sub.length), tmp; i < len; i++) {
          tmp = sub.substr(0, i + 1);
          if (tmp < 256) {
            search(cur.concat([tmp]), sub.substr(i + 1));
          }
        }
      }
    }
    search([], str);
    return r;
  }
  ```

#### 6-2 关联字符串
<!-- 
题目：给定一个字符串s和一些长度相同的单词words。找出s中恰好可以由words中所有单词串联形成的子串的起始位置。

注意子串要与words中的单词完全匹配，中间不能有其他字符，但不需要考虑words中单词串联的顺序。


示例 1：

  ```javascript
  输入：s = "barfoothefoobarman", words = ["foo","bar"]
  输出：[0,9]
  解释：
  从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
  输出的顺序不重要, [9,0] 也是有效答案。
  ```

示例 2：

  ```javascript
  输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
  输出：[]
  ```

示例 3：

  ```javascript
  输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
  输出：[6,9,12]
  ``` -->

## 第13章 进阶算法之“贪婪算法”

#### 13-1 进阶算法介绍 

题目：给定一个数组prices，其中prices[i]是一支给定股票第i天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

  ```javascript
  输入: prices = [7,1,5,3,6,4]
  输出: 7
  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
       随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
  ```

示例 2:

  ```javascript
  输入: prices = [1,2,3,4,5]
  输出: 4
  解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
       注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
  ```

示例 3:

  ```javascript
  输入: prices = [7,6,4,3,1]
  输出: 0
  解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
  ```

答案：

  ```javascript
  const stocks = (prices) => {
    // 用来保存利润
    let count = 0
    for (let i = 0, len = prices.length; i < len; i++) {
      for (let j = i; j < len - 1; j++) {
        if (prices[j + 1] > prices[j]) {
          count += prices[j + 1] - prices[j]
          i = j;
        } else {
          i = j;
          break
        }
      }
    }
    return count;
  }
  ```