---
title: JavaString
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - String
---

# JavaString

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## String 概述

String 是字符串类型，是 Java 中最常用的引用类型之一。

```
┌─────────────────────────────────────────────────────────────┐
│                  String 特点                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 字符串不可变                                           │
│      - 字符串创建后不能修改                                 │
│      - 每次拼接都会创建新字符串                             │
│                                                             │
│   2. 字符串常量池                                           │
│      - 相同内容的字符串共享同一块内存                       │
│      - 节省内存空间                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 创建方式

```java
// 方式1：字符串常量（推荐）
String s1 = "Hello";

// 方式2：new String 对象
String s2 = new String("Hello");

// s1 和 s2 的区别
// s1 指向字符串常量池
// s2 指向堆内存中的新对象
```

## 字符串判断

### 判断相等

```java
String str = "abc";
String str1 = "abc";

// 判断相等要使用 equals 方法，不能用 ==
if (str.equals(str1)) {
    System.out.println("相等");
}

// 不要用 == 比较字符串，因为 == 比较的是地址值
// str == str1 可能是 true（字符串常量池优化）或 false（new 的对象）
```

### 其他判断方法

```java
String str = "Hello World";

// 判断开头/结尾
boolean starts = str.startsWith("Hello");  // true
boolean ends = str.endsWith("World");  // true

// 判断包含
boolean contains = str.contains("World");  // true

// 判空
boolean isEmpty = str.isEmpty();  // false

// 判断是否为 null
// str == null 表示字符串变量没有指向任何对象
```

## 字符串获取

```java
String str = "Hello World";

// 获取长度
int length = str.length();  // 11

// 查找子串位置
int index = str.indexOf("World");     // 6（首次出现位置）
int lastIndex = str.lastIndexOf("o");  // 7（最后出现位置）

// 获取子串
String sub1 = str.substring(6);       // "World"（从索引6到末尾）
String sub2 = str.substring(6, 11);   // "World"（从索引6到11，不含11）

// 获取单个字符
char ch = str.charAt(6);  // 'W'
```

## 字符串转换

```java
String str = "Hello World";

// 转大小写
String upper = str.toUpperCase();  // "HELLO WORLD"
String lower = str.toLowerCase();  // "hello world"

// 去除首尾空格
String trimmed = "  Hello  ".trim();  // "Hello"

// 替换
String replaced = str.replace("World", "Java");  // "Hello Java"

// 拼接
String s1 = "Hello".concat(" World");  // "Hello World"
String s2 = "Hello" + " World";       // "Hello World"

// 字符串转字节数组
byte[] bytes = str.getBytes();

// 字符串转字符数组
char[] chars = str.toCharArray();
```

## 字符串分割

```java
String str = "a,b,c,d";

// 按分隔符分割
String[] parts = str.split(",");  // ["a", "b", "c", "d"]

// 多个分隔符
String str2 = "a,b;c|d";
String[] parts2 = str2.split("[,;|]");  // ["a", "b", "c", "d"]

// 限制分割次数
String[] limited = str.split(",", 2);  // ["a", "b,c,d"]

// 去除空白后分割
String str3 = "  a , b , c  ";
String[] trimmedParts = str3.trim().split("\\s*,\\s*");  // ["a", "b", "c"]
```

## 字符串拼接

```java
// 方式1：使用 + 拼接
String s1 = "Hello" + " World";

// 方式2：使用 StringBuilder（推荐，性能更好）
StringBuilder sb = new StringBuilder();
sb.append("Hello").append("World");
String s2 = sb.toString();

// 方式3：使用 String.format
String s3 = String.format("Hello %s", "World");

// 方式4：使用 String.join（JDK 8+）
String s4 = String.join("-", "a", "b", "c");  // "a-b-c"
```

## StringBuilder 常用方法

```java
StringBuilder sb = new StringBuilder();

// 追加
sb.append("Hello");
sb.append(" ").append("World");

// 插入
sb.insert(5, ",");  // 在索引5位置插入

// 删除
sb.delete(5, 6);    // 删除索引5到6的内容

// 反转
sb.reverse();

// 转 String
String result = sb.toString();
```

## String 常用方法汇总

| 方法 | 说明 |
|------|------|
| `length()` | 返回字符串长度 |
| `charAt(int index)` | 获取指定索引字符 |
| `indexOf(String str)` | 查找子串首次位置 |
| `lastIndexOf(String str)` | 查找子串最后位置 |
| `substring(int start)` | 获取子串（从start到末尾） |
| `substring(int start, int end)` | 获取子串（start到end-1） |
| `replace(old, new)` | 替换 |
| `split(String regex)` | 分割 |
| `toUpperCase()` | 转大写 |
| `toLowerCase()` | 转小写 |
| `trim()` | 去除首尾空格 |
| `startsWith(String prefix)` | 判断开头 |
| `endsWith(String suffix)` | 判断结尾 |
| `contains(String s)` | 判断包含 |
| `isEmpty()` | 判断是否为空 |
| `equals(Object o)` | 判断相等 |
| `getBytes()` | 转字节数组 |
| `toCharArray()` | 转字符数组 |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  String 核心要点                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   特点：                                                    │
│   - 字符串不可变                                            │
│   - 字符串常量池优化                                        │
│                                                             │
│   判断相等：                                                │
│   - 使用 equals 方法，不用 ==                              │
│                                                             │
│   常用方法：                                                │
│   - length / charAt / indexOf / substring                  │
│   - replace / split / toUpperCase / toLowerCase           │
│                                                             │
│   拼接性能：                                                │
│   - StringBuilder > + > concat                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
