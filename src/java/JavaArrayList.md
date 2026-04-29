---
title: JavaArrayList
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - ArrayList
  - 集合
---

# JavaArrayList

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## ArrayList 概述

ArrayList 是动态数组，可以自动调整大小，是 Java 中最常用的集合之一。

```
┌─────────────────────────────────────────────────────────────┐
│                  ArrayList 特点                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 底层是数组                                             │
│      - 查询快（按索引随机访问）                             │
│      - 增删慢（需要移动元素）                               │
│                                                             │
│   2. 容量可动态增长                                         │
│      - 默认容量 10                                          │
│      - 扩容 1.5 倍                                          │
│                                                             │
│   3. 可以存储任意类型                                       │
│      - 本质是 Object[]                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 基本使用

### 创建 ArrayList

```java
// 创建空列表（推荐）
ArrayList<String> list = new ArrayList<>();

// 创建带初始容量的列表
ArrayList<String> list2 = new ArrayList<>(20);

// 从已有集合创建
ArrayList<String> list3 = new ArrayList<>(list);
```

### 添加元素

```java
ArrayList<String> list = new ArrayList<>();

// 添加元素到末尾
list.add("Hello");
list.add("World");
list.add("Java");

// 在指定位置插入
list.add(1, "插入");

// 添加多个元素
list.addAll(Arrays.asList("a", "b", "c"));

// 在指定位置添加多个
list.addAll(2, Arrays.asList("x", "y"));
```

### 获取元素

```java
ArrayList<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");

// 获取指定位置元素
String first = list.get(0);  // "Hello"

// 获取第一个元素
String first2 = list.getFirst();  // JDK 11+

// 获取最后一个元素
String last = list.getLast();  // JDK 11+
```

### 修改元素

```java
ArrayList<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");

// 修改指定位置元素
list.set(0, "NewHello");

// 替换第一个符合条件的元素
list.replaceAll(s -> s.equals("Hello") ? "Hi" : s);
```

### 删除元素

```java
ArrayList<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");
list.add("Java");

// 按索引删除
list.remove(0);        // 删除第一个元素，返回被删除的元素

// 按内容删除
list.remove("World");  // 删除首次出现的 "World"，返回 boolean

// 删除符合条件的元素
list.removeIf(s -> s.startsWith("H"));

// 清空
list.clear();
```

### 查询方法

```java
ArrayList<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");

// 获取大小
int size = list.size();  // 2

// 判断是否包含
boolean contains = list.contains("Hello");  // true

// 判断是否为空
boolean isEmpty = list.isEmpty();  // false

// 查找元素位置
int index = list.indexOf("World");     // 1（首次出现）
int lastIndex = list.lastIndexOf("o");  // 最后出现位置
```

## 遍历方式

### 方式1：普通 for 循环

```java
ArrayList<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.add("c");

for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

### 方式2：增强 for 循环

```java
for (String item : list) {
    System.out.println(item);
}
```

### 方式3：Lambda 遍历

```java
// 基本遍历
list.forEach(item -> System.out.println(item));

// 方法引用
list.forEach(System.out::println);

// 带索引的遍历
IntStream.range(0, list.size())
    .forEach(i -> System.out.println(i + ": " + list.get(i)));
```

### 方式4：迭代器

```java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    System.out.println(item);
}

// 使用迭代器删除（安全）
Iterator<String> it2 = list.iterator();
while (it2.hasNext()) {
    if (it2.next().equals("b")) {
        it2.remove();
    }
}

// ListIterator（可以双向遍历和修改）
ListIterator<String> lit = list.listIterator();
while (lit.hasNext()) {
    System.out.println(lit.next());
}
while (lit.hasPrevious()) {
    System.out.println(lit.previous());
}
```

## 转换操作

```java
ArrayList<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.add("c");

// 转数组
Object[] arr = list.toArray();
String[] arr2 = list.toArray(new String[0]);

// 转 Set
Set<String> set = new HashSet<>(list);

// 转 String
String str = list.toString();  // "[a, b, c]"

// 不可变列表
List<String> immutable = List.of("a", "b", "c");
```

## 排序

```java
ArrayList<String> list = new ArrayList<>();
list.add("c");
list.add("a");
list.add("b");

// 自然排序（需元素实现 Comparable）
Collections.sort(list);  // [a, b, c]

// 字典序降序
Collections.sort(list, Comparator.reverseOrder());

// 自定义排序
Collections.sort(list, (s1, s2) -> s1.length() - s2.length());

// JDK 8+ 简写
list.sort(Comparator.naturalOrder());
list.sort(Comparator.reverseOrder());
```

## 常用方法汇总

| 方法 | 说明 |
|------|------|
| `add(E e)` | 添加元素到末尾 |
| `add(int index, E e)` | 在指定位置插入 |
| `get(int index)` | 获取指定位置元素 |
| `set(int index, E e)` | 修改指定位置元素 |
| `remove(int index)` | 按索引删除，返回被删元素 |
| `remove(Object o)` | 按内容删除，返回是否成功 |
| `removeIf(Predicate)` | 删除符合条件的元素 |
| `size()` | 返回元素个数 |
| `contains(Object o)` | 判断是否包含 |
| `isEmpty()` | 判断是否为空 |
| `clear()` | 清空所有 |
| `indexOf(Object o)` | 查找首次出现位置 |
| `lastIndexOf(Object o)` | 查找最后出现位置 |
| `addAll(Collection c)` | 添加多个元素 |
| `toArray()` | 转数组 |
| `sort(Comparator)` | 排序 |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  ArrayList 核心要点                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   特点：                                                    │
│   - 底层是数组，查询快，增删慢                              │
│   - 容量自动扩容（1.5倍）                                   │
│                                                             │
│   遍历方式：                                                │
│   - for / 增强for / Lambda / 迭代器                        │
│                                                             │
│   注意：                                                   │
│   - 迭代器遍历时删除元素要使用迭代器的 remove              │
│   - 不同步，非线程安全                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
