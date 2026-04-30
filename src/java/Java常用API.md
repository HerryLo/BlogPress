---
title: Java常用API
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - API
  - 工具类
---

# Java常用API

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

> 本篇文章保留为基础工具类合集。Object/equals/hashCode 重写见 `Java面向对象.md`；Arrays 工具类见 `Java单列集合.md`；日期时间见 `Java日期时间.md`；正则表达式见 `Java正则.md`。

## Math 数学工具

```java
// 常用方法
Math.abs(-10);           // 绝对值：10
Math.ceil(3.14);         // 向上取整：4.0
Math.floor(3.14);        // 向下取整：3.0
Math.round(3.54);        // 四舍五入：4
Math.max(10, 20);        // 最大值：20
Math.min(10, 20);        // 最小值：10

// 幂运算
Math.pow(2, 3);          // 2的3次方：8.0
Math.sqrt(16);          // 平方根：4.0
Math.cbrt(27);           // 立方根：3.0

// 随机数
Math.random();          // [0,1) 的随机数
// 生成 1-100 随机整数
int num = (int)(Math.random() * 100) + 1;
```

## System 系统工具

```java
// 获取当前时间戳（毫秒）
long time = System.currentTimeMillis();
System.out.println(time);  // 1704067200000

// 获取当前时间戳（纳秒）
long nanoTime = System.nanoTime();

// 数组拷贝
int[] src = {1, 2, 3, 4, 5};
int[] dest = new int[5];
System.arraycopy(src, 0, dest, 0, 5);

// 退出程序
System.exit(0);  // 0 表示正常退出

// 建议 JVM 回收垃圾
System.gc();
```

## Objects 工具类

Null-safe 的操作工具类：

```java
Objects.equals(obj1, obj2);           // 安全比较
Objects.isNull(obj);                  // 判断 null
Objects.nonNull(obj);                 // 判断非 null
Objects.requireNonNull(obj);         // null 则抛异常
Objects.requireNonNull(obj, "msg");  // null 抛异常带消息
Objects.hashCode(obj);               // 安全获取 hashCode
Objects.toString(obj);               // 安全转字符串
Objects.toString(obj, "default");    // null 时返回默认值
```

## BigInteger 大整数

处理超出 long 范围的整数：

```java
// 创建
BigInteger bi = new BigInteger("999999999999999999999999999");
BigInteger bi1 = BigInteger.valueOf(91111);

// 运算（使用成员方法）
bi.add(bi1);         // 加
bi.subtract(bi1);    // 减
bi.multiply(bi1);     // 乘
bi.divide(bi1);      // 除
bi.remainder(bi1);   // 取余

// 返回新的 BigInteger，不会改变原对象
BigInteger result = bi.add(bi1);
```

## BigDecimal 精确小数

用于精确计算：

```java
// 创建（建议用字符串，避免精度问题）
BigDecimal bd1 = new BigDecimal("0.01");
BigDecimal bd2 = new BigDecimal("0.09");

// 运算
bd1.add(bd2);         // 加
bd1.subtract(bd2);    // 减
bd1.multiply(bd2);    // 乘
bd1.divide(bd2);       // 除

// 建议使用 valueOf 创建
BigDecimal bd3 = BigDecimal.valueOf(10);
```

**注意**：
- 使用字符串创建，避免精度丢失
- valueOf 内部会优化 -10 到 10 的整数

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 常用 API 核心要点                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Math：abs / ceil / floor / round / max / min / pow / random │
│                                                             │
│   System：currentTimeMillis / arraycopy / exit / gc         │
│                                                             │
│   Objects：equals / isNull / requireNonNull / toString     │
│                                                             │
│   BigInteger：大整数运算（超出 long 范围）                   │
│                                                             │
│   BigDecimal：精确小数计算                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```