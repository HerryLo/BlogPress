---
title: Java函数式编程
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - Lambda
  - 方法引用
---

# Java函数式编程

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## Lambda 表达式

Lambda 是 JDK8 引入的语法糖，用于简化函数式接口的匿名内部类写法。

```
┌─────────────────────────────────────────────────────────────┐
│                  Lambda 表达式格式                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   (参数列表) -> { 方法体 }                                  │
│                                                             │
│   省略规则：                                                │
│   1. 参数类型可以省略                                       │
│   2. 如果只有一个参数，() 可以省略                          │
│   3. 如果方法体只有一行，{} 和 ; 可以省略                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**函数式接口**：有且仅有一个抽象方法的接口。

```java
// 传统匿名内部类写法
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
}).start();

// Lambda 写法
new Thread(() -> System.out.println("Hello")).start();
```

### Lambda 简化规则

```java
// 完整写法
list.forEach((String s) -> {
    System.out.println(s);
});

// 省略参数类型
list.forEach((s) -> {
    System.out.println(s);
});

// 省略 ()
list.forEach(s -> {
    System.out.println(s);
});

// 省略 {} 和 ;
list.forEach(s -> System.out.println(s));
```

## 方法引用

方法引用把已经有的方法拿过来用，当作函数式接口中抽象方法的方法体。

```
┌─────────────────────────────────────────────────────────────┐
│                  方法引用场景                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   场景：当 Lambda 表达式的方法体已经有实现时，               │
│         可以使用方法引用替换                                │
│                                                             │
│   格式：类名或对象名 :: 方法名                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1. 引用静态方法

格式：`类名::静态方法`

```java
// Lambda 写法
list.stream()
    .map(s -> Integer.parseInt(s))
    .forEach(s -> System.out.println(s));

// 方法引用写法
list.stream()
    .map(Integer::parseInt)
    .forEach(System.out::println);

// 要求：抽象方法的形参和返回值需要与被引用方法保持一致
// parseInt(String s) -> int
// 所以抽象方法需要是 Function<String, Integer>
```

### 2. 引用成员方法

格式：`对象::成员方法` 或 `类名::成员方法`

```java
// Lambda 写法
list.stream()
    .filter(s -> s.isEmpty())
    .forEach(s -> System.out.println(s));

// 方法引用写法
list.stream()
    .filter(String::isEmpty)
    .forEach(System.out::println);
```

**其他类对象的方法引用**：

```java
// Lambda 写法
list.stream()
    .filter(s -> new Student().print(s))
    .forEach(s -> System.out.println(s));

// 方法引用写法
list.stream()
    .filter(new Student()::print)
    .forEach(System.out::println);
```

**this 和 super 引用**：

```java
class MyService {
    public void print(String s) {
        System.out.println(s);
    }

    public void useMethodRef() {
        // this::print 引用本类的 print 方法
        list.stream()
            .filter(this::print)
            .forEach(System.out::println);
    }
}
```

### 3. 引用构造方法

格式：`类名::new`

```java
// Lambda 写法
list.stream()
    .map(s -> new Student(s))
    .forEach(System.out::println);

// 方法引用写法
list.stream()
    .map(Student::new)
    .forEach(System.out::println);
```

### 4. 引用数组构造方法

格式：`数据类型[]::new`

```java
// Lambda 写法
String[] arr = list.stream()
    .toArray(s -> new String[s]);

// 方法引用写法
String[] arr = list.stream()
    .toArray(String[]::new);
```

## 方法引用汇总

```
┌─────────────────────────────────────────────────────────────┐
│                  方法引用格式汇总                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   引用静态方法：                                            │
│   类名::静态方法                                            │
│   例如：Integer::parseInt                                   │
│                                                             │
│   引用成员方法：                                            │
│   对象::成员方法                                            │
│   类名::成员方法                                            │
│   this::方法名 / super::方法名                              │
│                                                             │
│   引用构造方法：                                            │
│   类名::new                                                 │
│                                                             │
│   引用数组构造方法：                                        │
│   数据类型[]::new                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  函数式编程核心要点                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Lambda：(参数) -> { 方法体 }                              │
│   - 简化函数式接口的匿名内部类写法                           │
│   - 参数类型、()、{} 可以省略                               │
│                                                             │
│   方法引用：                                                │
│   - 静态方法：类名::方法名                                  │
│   - 成员方法：对象::方法名 或 类名::方法名                   │
│   - 构造方法：类名::new                                     │
│   - 数组构造：类型[]::new                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
