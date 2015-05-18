### 概览

* [数组辅助方法](https://github.com/yibuyisheng/utilities/blob/master/src/arrayHelper.js)
* [类型判断、获取对象键和值、extend 、格式化等](https://github.com/yibuyisheng/utilities/blob/master/src/base.js)
* [日期辅助方法](https://github.com/yibuyisheng/utilities/blob/master/src/dateHelper.js)
* [事件对象](https://github.com/yibuyisheng/utilities/blob/master/src/eventDealer.js)
* [url 处理辅助方法](https://github.com/yibuyisheng/utilities/blob/master/src/urlHelper.js)

### 方法说明：

  * base.getProp([obj, props, dft])

    **概述**<br>
      `getProp()` 函数按照一组键值的顺序去查询对象中的键值。

    **参数**

      *obj*<br>
      待查询的对象（或数组），如果传入非对象（也不是数组），那么返回 dft 默认值，如果默认值不存在，则返回空字符串。

      *props*<br>
        一组键名，其中也可夹杂数组索引。

      *dft*<br>
        查询不到的情况下的默认值。

      例子：<br>
      ```js
        base.getProp({a: [1, 2, 3]}, ['a']); // 返回 [1, 2 ,3]
        base.getProp({a: [1, 2, 3]}, ['a', 1]); // 返回 2
        base.getProp({a: [1, 2, 3]}, ['a', 1, 'abc']); // 返回空字符串：''
        base.getProp({a: [1, 2, 3]}, ['a', 1, 'abc'], 'default'); // 返回字符串：'default'
      ```

  * base.getClassName(obj)

    **概述**<br>
      获取 obj 的类型名。

  * base.isObject(obj)

    **概述**<br>
      判断 obj 是否是一个 Object 类型。

  * base.isFunction(obj)

    **概述**<br>
      判断 obj 是否是一个函数对象。

  * base.isArray(obj)

    **概述**<br>
      判断 obj 是否是一个 Array 类型（不包括类数组）。

  * base.isString(obj)

    **概述**<br>
      判断 obj 是否是 String 类型。

  * base.isNumber(obj)

    **概述**<br>
      判断 obj 是否是 Number 类型。

  * base.extend(obj1, obj2, obj3, ...)

    **概述**<br>
      深度复制合并对象属性，将 obj2 、 obj3 ... 一系列对象属性深复制到 obj1 上，并返回合并后的对象。

  * base.bind(fn, thisArg, arg1, arg2, ...)

    **概述**<br>
      类似于 EcmaScript 5 的 Function.prototype.bind() 方法，给 fn 绑定 thisArg 作为执行上下文（this），并且预传入 arg1 、 arg2 ... 作为函数参数。该函数返回一个函数对象。

  * base.format(str, arg1, arg2, arg3, ...)

    **概述**<br>
      将 arg1 、 arg2 、 arg3 ... 格式化到 str 中，依次替换 str 中的 `{0}` 、 `{1}` 、 `{2}` ... 。

  * base.keys(obj)

    **概述**<br>
      获取 obj 中可枚举的键，返回键数组。

  * base.values(obj)

    **概述**<br>
      获取 obj 中可枚举键对应的键值，返回键值数组。
