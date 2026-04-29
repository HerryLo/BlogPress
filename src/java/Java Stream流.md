---
title: Java Stream流
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - Stream
---

# Java Stream流

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## Stream 流

Stream 是 JDK8 引入的新特性，用于链式调用处理单列集合、双列集合、数组。

```
┌─────────────────────────────────────────────────────────────┐
│                  Stream 处理流程                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   数据源 ──→ 中间操作（可以不只一个）──→ 终结操作             │
│                                                             │
│   ArrayList<String> list = new ArrayList<>();              │
│   list.add("a"); list.add("b"); list.add("c");            │
│                                                             │
│   list.stream()                                             │
│       .filter(s -> s.equals("a"))   // 中间操作            │
│       .filter(s -> s.length() > 0)   // 中间操作           │
│       .forEach(s -> System.out.println(s)); // 终结操作     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**重要特点**：
- Stream 不存储数据，只处理数据
- Stream 操作完会返回新的 Stream，不影响原数据
- Stream 只有遇到终结操作才会执行（惰性求值）

## 中间方法

中间方法返回 Stream，可以链式调用：

| 方法 | 说明 |
|------|------|
| `filter` | 过滤 |
| `limit` | 获取前 n 个元素 |
| `skip` | 跳过前 n 个元素 |
| `distinct` | 去重（依赖 equals） |
| `concat` | 合并两个流 |
| `map` | 转换流中的数据类型 |

### filter 过滤

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a-1", "b-1", "c-1", "d-1");

// 过滤出以 "a" 开头的元素
list.stream()
    .filter(s -> s.startsWith("a"))
    .forEach(s -> System.out.println(s));  // a-1
```

### limit 和 skip

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "c", "d", "e");

// 获取前 3 个
list.stream()
    .limit(3)
    .forEach(s -> System.out.println(s));  // a, b, c

// 跳过前 2 个
list.stream()
    .skip(2)
    .forEach(s -> System.out.println(s));  // c, d, e

// 跳过前 2 个，获取前 3 个
list.stream()
    .skip(2)
    .limit(3)
    .forEach(s -> System.out.println(s));  // c, d, e
```

### distinct 去重

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "a", "c", "b");

list.stream()
    .distinct()
    .forEach(s -> System.out.println(s));  // a, b, c
```

### map 转换数据类型

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "1", "2", "3", "4", "5");

// 把 String 转成 Integer
list.stream()
    .map(Integer::parseInt)
    .forEach(s -> System.out.println(s));  // 1, 2, 3, 4, 5

// 计算总和
int sum = list.stream()
    .mapToInt(Integer::parseInt)
    .sum();
System.out.println(sum);  // 15
```

### concat 合并流

```java
ArrayList<String> list1 = new ArrayList<>();
Collections.addAll(list1, "a", "b");

ArrayList<String> list2 = new ArrayList<>();
Collections.addAll(list2, "1", "2");

Stream.concat(list1.stream(), list2.stream())
    .forEach(s -> System.out.println(s));  // a, b, 1, 2
```

## 终结方法

终结方法不返回 Stream：

| 方法 | 说明 |
|------|------|
| `forEach` | 遍历 |
| `count` | 统计个数 |
| `toArray` | 收集到数组 |
| `collect` | 收集到集合 |

### forEach 遍历

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "c");

list.stream()
    .forEach(s -> System.out.println(s));
```

### count 统计

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "c");

long count = list.stream().count();
System.out.println(count);  // 3
```

### toArray 转数组

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "c");

// 转成 Object 数组
Object[] arr1 = list.stream().toArray();

// 转成指定类型数组
String[] arr2 = list.stream().toArray(String[]::new);
```

### collect 转集合

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a-1", "b-1", "c-1", "a-2");

// 收集到 List
List<String> listResult = list.stream()
    .collect(Collectors.toList());

// 收集到 Set（去重）
Set<String> setResult = list.stream()
    .collect(Collectors.toSet());

// 收集到指定集合
ArrayList<String> arrayListResult = list.stream()
    .collect(Collectors.toCollection(ArrayList::new));
```

### collect 转 Map

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a-1", "b-2", "c-3");

// 字符串 "a-1" 拆成键值对，a 是键，1 是值
Map<String, String> map = list.stream()
    .collect(Collectors.toMap(
        s -> s.split("-")[0],   // 键
        s -> s.split("-")[1]    // 值
    ));

System.out.println(map);  // {a=1, b=2, c=3}
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Stream 流核心要点                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Stream：数据源 → 中间操作 → 终结操作                       │
│                                                             │
│   中间方法：filter / limit / skip / distinct / map / concat │
│   终结方法：forEach / count / toArray / collect            │
│                                                             │
│   特点：惰性求值，不影响原数据                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
