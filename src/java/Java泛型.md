---
title: Java泛型
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 泛型
---

# Java泛型

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 什么是泛型

泛型是 JDK5 引入的特性，可以在**编译阶段**约束操作的数据类型，并进行检查。

**注意**：Java 中的泛型是**伪泛型**（类型擦除，运行时不存在泛型信息）。

```
┌─────────────────────────────────────────────────────────────┐
│                  泛型的优势                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 统一数据类型                                           │
│   2. 把运行时期的问题提前到了编译期间                        │
│   3. 避免强制类型转换可能出现的异常                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 泛型的细节

```
┌─────────────────────────────────────────────────────────────┐
│                  泛型使用细节                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 泛型中不能写基础类型，必须是引用类型                    │
│      ❌ ArrayList<int>                                      │
│      ✅ ArrayList<Integer>                                 │
│                                                             │
│   2. 指定泛型的具体类型后，传递数据时，可以传入该类型         │
│      或其子类型                                               │
│                                                             │
│   3. 如果不写泛型，类型默认是 Object                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 泛型的使用场景

```
┌─────────────────────────────────────────────────────────────┐
│                  泛型的使用场景                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 定义类、方法、接口的时候，如果类型不确定，可以使用泛型   │
│   2. 如果类型不确定，但能知道那个继承体系中的，              │
│      可以使用泛型的通配符                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 泛型格式

```java
// 泛型格式
<T>

// 泛型通配符
<? extends T>   // T 或 T 的子类
<? super T>     // T 或 T 的父类
```

## 泛型类

在编写一个类时，如果不确定类型，可以将类型定义为泛型：

```java
public class ArrayList<E> {
    private Object[] arr = new Object[10];
    private int size = 0;

    public ArrayList() {}

    // E 作为参数类型
    public boolean add(E e) {
        arr[size] = e;
        size++;
        return true;
    }

    // E 作为返回类型
    public E get(int i) {
        return (E) arr[i];
    }
}

// 使用
ArrayList<String> list1 = new ArrayList<>();
list1.add("hello");
String s = list1.get(0);

ArrayList<Integer> list2 = new ArrayList<>();
list2.add(100);
Integer n = list2.get(0);
```

## 泛型方法

在编写一个方法时，如果形参类型不确定，可以在方法定义泛型：

```java
public class ListUtil {
    private ListUtil() {}  // 私有构造，不让创建对象

    // 泛型方法：在返回值前声明 <T>
    public static <T> void addAll(ArrayList<T> arr, T el1, T el2, T el3) {
        arr.add(el1);
        arr.add(el2);
        arr.add(el3);
    }
}

// 使用
ArrayList<String> list1 = new ArrayList<>();
ListUtil.addAll(list1, "a", "b", "c");

ArrayList<Integer> list2 = new ArrayList<>();
ListUtil.addAll(list2, 1, 2, 3);
```

## 泛型接口

```java
public interface List<E> {
    void add(E e);
    E get(int index);
}

// 方式1：实现类确定类型
public class ArrayListImpl implements List<String> {
    @Override
    public void add(String e) { }

    @Override
    public String get(int index) {
        return null;
    }
}

// 方式2：实现类不确定类型，延续泛型
public class LinkedListImpl<E> implements List<E> {
    @Override
    public void add(E e) { }

    @Override
    public E get(int index) {
        return null;
    }
}

// 使用
List<String> list1 = new ArrayListImpl<>();
List<Integer> list2 = new LinkedListImpl<>();
```

## 泛型通配符

### 为什么要用通配符

```java
// 定义一个方法，接收 ArrayList，遍历打印
// 如果不用通配符，需要为每种类型写一个重载
public static void printList(ArrayList<String> list) {
    for (String s : list) {
        System.out.println(s);
    }
}

public static void printList(ArrayList<Integer> list) {
    for (Integer n : list) {
        System.out.println(n);
    }
}

// 使用通配符，一个方法搞定
public static void printList(ArrayList<?> list) {
    for (Object o : list) {
        System.out.println(o);
    }
}
```

### ? extends T 和 ? super T

```
┌─────────────────────────────────────────────────────────────┐
│                  泛型通配符对比                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ? extends T（上限通配符）                                 │
│   - 只能接收 T 或 T 的子类                                  │
│   - 适合「读取」操作                                        │
│   - 不能添加元素（不知道具体是什么类型）                     │
│                                                             │
│   ? super T（下限通配符）                                   │
│   - 只能接收 T 或 T 的父类                                  │
│   - 适合「写入」操作                                        │
│   - 可以添加 T 或 T 的子类                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 代码示例

```java
class Ye {}
class Fu extends Ye {}
class Zi extends Fu {}

public static void main(String[] args) {
    ArrayList<Ye> l1 = new ArrayList<>();
    ArrayList<Fu> l2 = new ArrayList<>();
    ArrayList<Zi> l3 = new ArrayList<>();

    // ? extends Fu：只接受 Fu 或 Fu 的子类
    // methodExtends(l1);  // 报错，Ye 不是 Fu 的子类
    methodExtends(l2);  // OK
    methodExtends(l3);  // OK

    // ? super Fu：只接受 Fu 或 Fu 的父类
    methodSuper(l1);  // OK
    methodSuper(l2);  // OK
    // methodSuper(l3);  // 报错，Zi 是 Fu 的子类，不是父类
}

// ? extends Fu：只读
public static void methodExtends(ArrayList<? extends Fu> arr) {
    // 可以读取，但不能写入
    Fu fu = arr.get(0);  // OK
    // arr.add(new Fu());  // 报错，不知道具体类型
}

// ? super Fu：只写
public static void methodSuper(ArrayList<? super Fu> arr) {
    // 可以写入，但不能确定读取类型
    arr.add(new Fu());  // OK
    arr.add(new Zi());  // OK
    // Object obj = arr.get(0);  // 可以，但类型不安全
}
```

## 类型擦除

Java 的泛型是伪泛型，编译后会擦除类型信息：

```java
ArrayList<String> list1 = new ArrayList<>();
ArrayList<Integer> list2 = new ArrayList<>();

// 编译后变成：
ArrayList list1 = new ArrayList();
ArrayList list2 = new ArrayList();

// 所以：
list1.getClass() == list2.getClass();  // true，都是 ArrayList.class
```

**类型擦除的规则**：

| 泛型类型 | 擦除后的类型 |
|---------|-------------|
| `<T>` | Object |
| `<T extends Number>` | Number |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 泛型核心要点                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   泛型类：class ArrayList<E> { ... }                        │
│   泛型方法：public <T> void method(T t) { ... }            │
│   泛型接口：interface List<E> { ... }                      │
│                                                             │
│   通配符：                                                 │
│   - ? extends T：只读，适用于读取                          │
│   - ? super T：只写，适用于写入                            │
│                                                             │
│   注意：Java 泛型是伪泛型，编译后类型信息会被擦除           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
