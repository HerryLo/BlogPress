---
title: Java集合扩展
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 集合
  - 可变参数
  - Collections
---

# Java集合扩展

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 可变参数

可变参数本质是一个数组，可以接收任意数量的参数。

```
┌─────────────────────────────────────────────────────────────┐
│                  可变参数特点                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 形参列表只能有一个可变参数                             │
│   2. 可变参数必须放在形参列表的最后面                       │
│   3. 本质是一个数组                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```java
public class Main {
    // 可变参数：接收任意数量的 int 参数
    public int getSum(int... args) {
        int sum = 0;
        for (int arg : args) {
            sum += arg;
        }
        return sum;
    }

    // 可变参数必须放在最后
    public void print(String prefix, int... nums) {
        System.out.print(prefix);
        for (int num : nums) {
            System.out.print(num + " ");
        }
    }

    public static void main(String[] args) {
        Main main = new Main();

        System.out.println(main.getSum(1, 2, 3));      // 6
        System.out.println(main.getSum(1, 2, 3, 4, 5)); // 15

        main.print("数字：", 1, 2, 3, 4, 5);
        // 数字：1 2 3 4 5
    }
}
```

## Collections 工具类

Collections 是集合操作的工具类。

### 常用方法

```java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "c", "d", "e");

// 批量添加
Collections.addAll(list, "1", "2", "3");

// 排序
Collections.sort(list);  // 按字典序升序
Collections.sort(list, Comparator.reverseOrder());  // 降序

// 反转
Collections.reverse(list);

// 打乱顺序
Collections.shuffle(list);

// 交换
Collections.swap(list, 0, 4);

// 二分查找（必须先排序）
Collections.sort(list);
int index = Collections.binarySearch(list, "c");

// 获取最大值/最小值
Collections.max(list);
Collections.min(list);

// 替换所有
Collections.replaceAll(list, "a", "A");

// 填充
Collections.fill(list, "X");
```

### 自定义排序

```java
// 按长度排序
Collections.sort(list, (s1, s2) -> s1.length() - s2.length());

// 按字典序倒序
Collections.sort(list, Comparator.reverseOrder());

// 多条件排序
Collections.sort(list, (s1, s2) -> {
    int result = s1.length() - s2.length();
    return result == 0 ? s1.compareTo(s2) : result;
});
```

## 不可变集合

不可变集合：创建后不能修改，只能遍历。

```
┌─────────────────────────────────────────────────────────────┐
│                  不可变集合特点                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 创建后不能添加、删除、修改元素                         │
│   2. 防止数据被意外修改                                      │
│   3. 线程安全                                               │
│   4. 通常用于定义常量集合                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 创建不可变集合

```java
// 不可变 List
List<String> list = List.of("a", "b", "c");
// list.add("d");  // UnsupportedOperationException

// 不可变 Set
Set<String> set = Set.of("a", "b", "c");
// set.remove("a");  // UnsupportedOperationException
// 注意：Set 不可变集合中元素不能重复，重复会报错
// Set.of("a", "b", "b");  // IllegalArgumentException

// 不可变 Map
Map<String, String> map = Map.of(
    "张三", "南京",
    "李四", "北京",
    "王五", "上海"
);
// map.put("赵六", "广州");  // UnsupportedOperationException
// 注意：Map 不可变集合中键不能重复，值可以重复
```

### 使用场景

```java
// 场景1：定义常量集合
static final Set<String> WEEKDAYS = Set.of(
    "星期一", "星期二", "星期三", "星期四", "星期五"
);

// 场景2：方法返回值，防止被修改
public List<String> getSupportedLanguages() {
    return List.of("Java", "Python", "JavaScript");
}

// 场景3：配置数据
Map<String, Integer> MAX_SIZE = Map.of(
    "连接池", 100,
    "缓存", 1000,
    "队列", 500
);
```

## 集合选择指南

```
┌─────────────────────────────────────────────────────────────┐
│                  集合选择指南                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 想用 List 系列？                                       │
│      ├─ 增删多 → LinkedList                                │
│      └─ 其他 → ArrayList（用的最多）                        │
│                                                             │
│   2. 想用 Set 系列？                                        │
│      ├─ 去重 → HashSet（用的最多）                          │
│      ├─ 去重且保序 → LinkedHashSet                        │
│      └─ 排序 → TreeSet                                     │
│                                                             │
│   3. 想用 Map 系列？                                        │
│      ├─ 键值对存取 → HashMap（用的最多）                    │
│      ├─ 键值对存取且保序 → LinkedHashMap                   │
│      └─ 键值对排序 → TreeMap                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 对比表格

| 集合类型 | 有序 | 重复 | 索引 | 底层结构 |
|---------|------|------|------|---------|
| ArrayList | ✅ | ✅ | ✅ | 数组 |
| LinkedList | ✅ | ✅ | ✅ | 双向链表 |
| HashSet | ❌ | ❌ | ❌ | 哈希表 |
| LinkedHashSet | ✅ | ❌ | ❌ | 哈希表+链表 |
| TreeSet | ✅ | ❌ | ❌ | 红黑树 |
| HashMap | ❌ | ❌（键） | ❌ | 哈希表 |
| LinkedHashMap | ✅ | ❌（键） | ❌ | 哈希表+链表 |
| TreeMap | ✅ | ❌（键） | ❌ | 红黑树 |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  集合扩展核心要点                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   可变参数：本质是数组，放最后                               │
│                                                             │
│   Collections：sort / reverse / shuffle / swap               │
│             / binarySearch / max / min                     │
│                                                             │
│   不可变集合：List.of / Set.of / Map.of                     │
│   - 创建后不能修改                                         │
│   - 用于常量定义或防止数据被修改                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
