### 概览

* [数组辅助方法](https://github.com/yibuyisheng/utilities/blob/master/src/arrayHelper.js)
* [类型判断、获取对象键和值、extend 、格式化等](https://github.com/yibuyisheng/utilities/blob/master/src/base.js)
* [日期辅助方法](https://github.com/yibuyisheng/utilities/blob/master/src/dateHelper.js)
* [事件对象](https://github.com/yibuyisheng/utilities/blob/master/src/eventDealer.js)
* [url 处理辅助方法](https://github.com/yibuyisheng/utilities/blob/master/src/urlHelper.js)

### 方法说明：

  * base.getProp()
  
  **概述**
  
  `getProp()` 函数按照一组键值的顺序去查询对象中的键值。
  
  **语法**
  
  > base.getProp([obj, props, dft])
  
  **参数**
  
  *obj*

    待查询的对象（或数组），如果传入非对象（也不是数组），那么返回 dft 默认值，如果默认值不存在，则返回空字符串。
  
  *props*
  
    一组键名，其中也可夹杂数组索引。
  
  *dft*
  
    查询不到的情况下的默认值。
    
  例子：
  
  ```js
  base.getProp({a: [1, 2, 3]}, ['a']); // 返回 [1, 2 ,3]
  base.getProp({a: [1, 2, 3]}, ['a', 1]); // 返回 2
  base.getProp({a: [1, 2, 3]}, ['a', 1, 'abc']); // 返回空字符串：''
  base.getProp({a: [1, 2, 3]}, ['a', 1, 'abc'], 'default'); // 返回字符串：'default'
  ```
