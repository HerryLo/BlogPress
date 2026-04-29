---
title: Java双列集合
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 集合
  - Map
---

# Java双列集合

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## Map 概述

Map 存储**键值对**，一次存一对。

```
┌─────────────────────────────────────────────────────────────┐
│                  Map 存储结构                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Map<String, String> map = new HashMap<>();              │
│                                                             │
│   ┌────────────────────────────────────────────┐           │
│   │                   Map                       │           │
│   │  ┌─────────┐      ┌─────────┐              │           │
│   │  │  key    │ ───→ │  value  │              │           │
│   │  │ "name"  │      │"herrylo"│              │           │
│   │  ├─────────┤      ├─────────┤              │           │
│   │  │  key    │ ───→ │  value  │              │           │
│   │  │  "age"  │      │   "18"  │              │           │
│   │  └─────────┘      └─────────┘              │           │
│   └────────────────────────────────────────────┘           │
│                                                             │
│   键不能重复，值可以重复                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Map 常用方法

```java
Map<String, String> map = new HashMap<>();

// 添加
map.put("name", "lh");
map.put("age", "18");

// 删除
String removed = map.remove("name");

// 清空
map.clear();

// 判断
map.containsKey("age");
map.containsValue("18");
map.isEmpty();

// 长度
map.size();
```

## HashMap

**特点**：无序、不重复、无索引。

- 底层是哈希表结构
- 依赖 `hashcode` 和 `equals` 方法保证键的唯一

```
┌─────────────────────────────────────────────────────────────┐
│                  HashMap 底层原理                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   数组 + 链表 + 红黑树（JDK 8+）                            │
│                                                             │
│   当链表长度超过 8 时，自动转为红黑树                       │
│                                                             │
│   哈希值：根据 hashcode 方法计算                            │
│   哈希碰撞：不同属性也可能计算出相同哈希值                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**键存储自定义对象**：

```java
HashMap<Student, String> map = new HashMap<>();
map.put(new Student("张三", 18), "北京");

class Student {
    private String name;
    private int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

## LinkedHashMap

**特点**：有序、不重复、无索引。

- 有序指的是保证存储和取出的元素顺序一致
- 底层是哈希表 + 双链表

```java
LinkedHashMap<String, String> map = new LinkedHashMap<>();
map.put("c", "3");
map.put("a", "1");
map.put("b", "2");

// 遍历结果：c=3, a=1, b=2（按存入顺序）
map.forEach((k, v) -> System.out.println(k + "=" + v));
```

## TreeMap

**特点**：可排序、不重复、无索引。

- 底层是红黑树结构
- 默认按键的升序排列

```java
TreeMap<String, String> map = new TreeMap<>();
map.put("c", "3");
map.put("a", "1");
map.put("b", "2");

// 遍历结果：a=1, b=2, c=3（按键字典序）
map.forEach((k, v) -> System.out.println(k + "=" + v));
```

**自定义排序规则**：

```java
// 方式1：实现 Comparable 接口
class Student implements Comparable<Student> {
    private int age;

    @Override
    public int compareTo(Student s) {
        return this.age - s.age;
    }
}

// 方式2：传入比较器
TreeMap<Student, String> map = new TreeMap<>((s1, s2) -> s1.getAge() - s2.getAge());
```

## Map 遍历

### 方式一：通过键找值

```java
Map<String, String> map = new HashMap<>();
map.put("name", "herrylo");
map.put("age", "18");

Set<String> keys = map.keySet();
for (String key : keys) {
    String value = map.get(key);
    System.out.println(key + " = " + value);
}
```

### 方式二：通过键值对对象

```java
Set<Map.Entry<String, String>> entries = map.entrySet();
for (Map.Entry<String, String> entry : entries) {
    String key = entry.getKey();
    String value = entry.getValue();
    System.out.println(key + " = " + value);
}
```

### 方式三：Lambda 遍历

```java
map.forEach((key, value) -> {
    System.out.println(key + " = " + value);
});
```

## Map 使用场景

| 需求 | 选择 |
|------|------|
| 键值对存取 | HashMap |
| 键值对存取且保序 | LinkedHashMap |
| 键值对排序 | TreeMap |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  双列集合核心要点                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Map：存储键值对                                           │
│   - HashMap：无序、不重复（用的最多）                        │
│   - LinkedHashMap：有序                                     │
│   - TreeMap：可排序                                         │
│                                                             │
│   遍历方式：                                                │
│   - keySet() → get(key)                                    │
│   - entrySet() → getKey() / getValue()                     │
│   - forEach (Lambda)                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
