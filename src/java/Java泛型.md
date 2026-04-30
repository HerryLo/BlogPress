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

原文链接：[语雀链接](https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0)

## 什么是泛型

泛型是JDK5引入的编译时类型检查机制，在代码编译阶段统一数据类型、将类型问题提前到编译期发现，并避免强制类型转换的运行时异常。需要注意的是，Java的泛型是伪泛型，编译后类型信息会被完全擦除，运行时不存在泛型信息。

泛型的核心优势体现在三个方面：第一，统一数据类型，避免集合操作时的类型不一致；第二，将运行时类型错误提前到编译期发现；第三，省去强制类型转换的麻烦，系统自动完成类型检查。

## 泛型细节

泛型使用时需要注意三点：第一，泛型必须指定为引用类型，不能写int、double等基础类型，需要用Integer、Double包装类；第二，不指定泛型时默认是Object类型；第三，指定泛型后可传入该类型或其子类。

例如ArrayList<int>是错误的，必须写成ArrayList<Integer>。而不指定泛型时如new ArrayList()可以添加任意类型对象，读取时需要手动强转。

## 泛型类

编写类时若类型不确定可将类型定义为泛型，类名后的<E>是泛型标记，在实例化时指定具体类型。例如ArrayList<E>中E作为add方法的参数类型和get方法的返回类型，实例化时传入String则E就是String类型。

```java
public class ArrayList<E> {
    private Object[] arr = new Object[10];
    private int size = 0;

    public boolean add(E e) {
        arr[size] = e;
        size++;
        return true;
    }

    public E get(int i) {
        return (E) arr[i];
    }
}
// 使用：ArrayList<String> list = new ArrayList<>();
```

## 泛型方法

方法形参类型不确定时可在方法定义处声明泛型，语法是在返回值前加<T>。泛型方法可以被静态调用，且不依赖对象实例。常见工具类如集合工具类常用泛型方法实现通用操作。

```java
public class ListUtil {
    public static <T> void addAll(ArrayList<T> arr, T... elements) {
        for (T el : elements) {
            arr.add(el);
        }
    }
}
// 使用：ListUtil.addAll(list, "a", "b", "c");
```

## 泛型接口

泛型接口有两种实现方式：实现时确定类型（如ArrayListImpl implements List<String>），或实现时延续泛型（如LinkedListImpl<E> implements List<E>）。前者适用于具体类型已知的情况，后者适用于类型需要由使用者决定的场景。

```java
public interface List<E> {
    void add(E e);
    E get(int index);
}

// 方式1：实现时确定类型
public class ArrayListImpl implements List<String> {
    public void add(String e) { }
    public String get(int index) { return null; }
}

// 方式2：实现时延续泛型
public class LinkedListImpl<E> implements List<E> {
    public void add(E e) { }
    public E get(int index) { return null; }
}
```

## ? extends T 上限通配符

extends是上限通配符，接收T或T的子类类型。因为无法确定具体子类型，读取元素时只能以T类型读取（因为所有子类都可以转为T），但不能写入任何元素，因为不知道具体是什么子类型。适用于只读取数据的场景。

例如ArrayList<? extends Number>可以接收ArrayList<Integer>或ArrayList<Double>，读取时返回Number类型，但无法添加任何元素。

## ? super T 下限通配符

super是下限通配符，接收T或T的父类类型。因为父类范围更广，可以确定写入时T及其子类都能转为父类型，所以可以写入T或T的子类。读取时只能以Object类型接收，因为无法确定具体父类型。适用于写入数据的场景。

例如ArrayList<? super Integer>可以接收ArrayList<Integer>或ArrayList<Number>，可以添加Integer或其子类，但读取时只能以Object接收。

## 通配符对比

| 特征 | ? extends T | ? super T |
|------|-------------|-----------|
| 接收类型 | T及其子类 | T及其父类 |
| 读取类型 | T（类型安全） | Object（类型不安全） |
| 写入操作 | 禁止 | T及其子类 |
| 适用场景 | 只读 | 只写 |

口诀记忆：**extends读、super写**，读使用上限保证类型安全，写使用下限保证类型兼容。

## 类型擦除

Java泛型在编译后会将泛型信息全部擦除，统一替换为Object或指定上限类型。如ArrayList<String>和ArrayList<Integer>编译后都变成ArrayList，getClass()比较返回true。这是Java实现泛型的折中方案，兼容JDK5之前的代码。

```
┌─────────────────────────────────────────────────────────────┐
│                  泛型类型擦除示意                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   编译前：                                                  │
│   ArrayList<String> list1 = new ArrayList<>();            │
│   ArrayList<Integer> list2 = new ArrayList<>();           │
│                                                             │
│          ↓ 编译（类型擦除）                                  │
│                                                             │
│   编译后：                                                  │
│   ArrayList list1 = new ArrayList();                       │
│   ArrayList list2 = new ArrayList();                       │
│                                                             │
│   list1.getClass() == list2.getClass()  // true           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

擦除规则：泛型类型<T>未指定上限时擦除为Object，指定上限如<T extends Number>时擦除为上限类型Number。

## 总结

泛型的核心价值在于编译时类型安全和代码复用。泛型类、泛型方法、泛型接口分别用于类、方法、接口的类型参数化。通配符? extends T适用于只读场景，? super T适用于只写场景。类型擦除是理解Java泛型的关键概念。