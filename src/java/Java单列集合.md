---
title: Java单列集合
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 集合
  - Collection
  - List
  - Set
---

# Java单列集合

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 集合体系

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 集合体系                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                     Iterable                                │
│                        │                                   │
│                     Collection                              │
│                    ↙         ↘                             │
│              List          Set                             │
│           ↙    ↘         ↙    ↘                          │
│      ArrayList  LinkedList  HashSet  TreeSet               │
│                                    LinkedHashSet            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Collection 常用方法

```java
Collection<String> coll = new ArrayList<>();

// 添加元素
coll.add("aaa");
coll.add("bbb");
coll.add("ccc");

// 删除元素
coll.remove("aaa");

// 判断是否包含
coll.contains("bbb");

// 判断是否为空
coll.isEmpty();

// 获取集合长度
coll.size();

// 清空集合
coll.clear();
```

## 集合的遍历

### 1. 迭代器遍历

```java
Collection<String> coll = new ArrayList<>();
coll.add("aaa");
coll.add("bbb");
coll.add("ccc");

Iterator<String> it = coll.iterator();
while (it.hasNext()) {
    String str = it.next();
    System.out.println(str);
}
```

### 2. 增强 for 遍历

```java
for (String item : coll) {
    System.out.println(item);
}
```

### 3. Lambda 遍历

```java
coll.forEach(s -> System.out.println(s));
```

## List 集合

**特点**：有序、可重复、有索引。

### List 特有方法

```java
List<String> list = new ArrayList<>();

list.add("aaa");
list.add("bbb");

// 在指定索引位置插入
list.add(1, "ccc");

// 删除并返回
String removed = list.remove(0);

// 修改并返回
String old = list.set(1, "ddd");

// 获取
String item = list.get(0);
```

### ArrayList

**底层是数组**：

```
┌─────────────────────────────────────────────────────────────┐
│                  ArrayList 底层原理                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 空参创建：创建长度为 0 的数组                          │
│   2. 添加第一个元素：创建长度为 10 的数组                    │
│   3. 数组装满：自动扩容 1.5 倍                              │
│   4. 一次添加多个：按实际长度扩容                           │
│                                                             │
│   特点：查询快，增删慢（需要移动元素）                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### LinkedList

**底层是双向链表**：

```
┌─────────────────────────────────────────────────────────────┐
│                  LinkedList 底层原理                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌────┐     ┌────┐     ┌────┐                            │
│   │ A  │ ←── │ B  │ ←── │ C  │                            │
│   └────┘     └────┘     └────┘                            │
│                                                             │
│   特点：查询慢，增删快（首尾操作极快）                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**特有方法**：

```java
LinkedList<String> list = new LinkedList<>();

// 首尾操作
list.addFirst("first");
list.addLast("last");
list.getFirst();
list.getLast();
list.removeFirst();
list.removeLast();

// 栈/队列操作
list.push("a");     // 相当于 addFirst
String pop = list.pop();  // 相当于 removeFirst
```

## Set 集合

**特点**：无序、不重复、无索引。

| 实现类 | 特点 |
|--------|------|
| HashSet | 无序、不重复、无索引 |
| LinkedHashSet | 有序（存取顺序一致）、不重复、无索引 |
| TreeSet | 可排序、不重复、无索引 |

### HashSet

**底层是哈希表**：

```
┌─────────────────────────────────────────────────────────────┐
│                  HashSet 底层原理                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   JDK 8 之前：数组 + 链表                                  │
│   JDK 8 开始：数组 + 链表 + 红黑树                          │
│                                                             │
│   当链表长度超过 8 时，自动转为红黑树                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**哈希值特点**：

| 情况 | 哈希值 |
|------|--------|
| 没有重写 hashcode | 不同对象哈希值不同 |
| 重写 hashcode | 属性相同则哈希值相同 |
| 哈希碰撞 | 不同属性也可能哈希值相同 |

### LinkedHashSet

底层是哈希表 + 双链表，**保证存取顺序一致**。

### TreeSet

**底层是红黑树**，可排序：

```java
// 方式1：实现 Comparable 接口
TreeSet<Student> set = new TreeSet<>();
set.add(new Student("张三", 18));

class Student implements Comparable<Student> {
    private int age;

    @Override
    public int compareTo(Student s) {
        return this.age - s.age;
    }
}

// 方式2：传入比较器
TreeSet<Student> set = new TreeSet<>((s1, s2) -> s1.getAge() - s2.getAge());
```

## Arrays 数组工具

Arrays 是操作数组的的工具类：

```java
int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 数组转字符串（方便查看内容）
Arrays.toString(arr);  // [3, 1, 4, 1, 5, 9, 2, 6]

// 排序
Arrays.sort(arr);  // [1, 1, 2, 3, 4, 5, 6, 9]

// 二分查找（必须先排序）
int index = Arrays.binarySearch(arr, 5);  // 返回索引位置

// 拷贝
int[] copy = Arrays.copyOf(arr, 10);         // 长度变为10，不足的补0
int[] copyRange = Arrays.copyOfRange(arr, 0, 4);  // [1, 1, 2, 3]

// 填充
int[] arr2 = new int[5];
Arrays.fill(arr2, 0);  // 所有元素变为0

// 判断相等
int[] arr3 = {1, 1, 2, 3, 4, 5, 6, 9};
Arrays.equals(arr, arr3);  // true（内容相同）

// 数组转 List
Integer[] arr4 = {1, 2, 3};
List<Integer> list = Arrays.asList(arr4);
// 注意：asList 返回的 List 不能进行 add/remove 操作（固定长度）
```

**Arrays 与集合的配合**：

```java
// 数组 → List（可变）
Integer[] arr = {1, 2, 3};
List<Integer> list = new ArrayList<>(Arrays.asList(arr));

// List → 数组
List<String> list2 = new ArrayList<>();
list2.add("a");
list2.add("b");
String[] arr2 = list2.toArray(new String[0]);
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  单列集合选择指南                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   List（有序、可重复、有索引）：                             │
│   - 查询多 → ArrayList                                     │
│   - 增删多 → LinkedList                                    │
│                                                             │
│   Set（无序、不重复、无索引）：                              │
│   - 去重 → HashSet                                         │
│   - 去重且保序 → LinkedHashSet                             │
│   - 排序 → TreeSet                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
