---
title: Java异常
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 异常
---

# Java异常

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 异常概述

异常是程序在运行过程中发生的不正常情况。

```
┌─────────────────────────────────────────────────────────────┐
│                  异常体系                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      Throwable                               │
│                     ↙         ↘                             │
│                 Error          Exception                     │
│                  ↓              ↓                           │
│           严重问题，无法处理     可处理的问题                  │
│           (OutOfMemoryError)  (NullPointerException)        │
│                                 ↓                           │
│                             RuntimeException                │
│                             (运行时异常)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| 分类 | 说明 | 处理方式 |
|------|------|----------|
| Error | 严重问题，无法处理 | 不需要处理 |
| Exception | 可处理的问题 | 需要捕获或抛出 |
| RuntimeException | 运行时异常，编译时不检查 | 一般由程序逻辑错误导致 |

### 常见异常类型

```java
// 空指针异常
String str = null;
str.length();  // NullPointerException

// 数组越界
int[] arr = {1, 2, 3};
System.out.println(arr[5]);  // ArrayIndexOutOfBoundsException

// 类型转换异常
Object obj = "hello";
Integer num = (Integer) obj;  // ClassCastException

// 数字格式异常
String s = "abc";
int num = Integer.parseInt(s);  // NumberFormatException

// 算术异常
int result = 10 / 0;  // ArithmeticException
```

## 异常处理方式

### 方式1：throws 抛出异常

在方法声明处声明异常，让调用者处理：

```java
// 基本语法
public void readFile(String path) throws IOException {
    FileInputStream fis = new FileInputStream(path);
}

// 可以抛出多个异常
public void method() throws IOException, SQLException {
    // 可能抛出多种异常的代码
}
```

**throws 和 throw 的区别**：

| 关键字 | 位置 | 作用 |
|--------|------|------|
| throws | 方法声明处 | 声明异常，交给调用者处理 |
| throw | 方法体内 | 主动抛出异常 |

```java
// throw 示例
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("年龄不合法");
    }
    this.age = age;
}
```

### 方式2：try-catch 捕获异常

```java
try {
    // 可能出现异常的代码
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 处理异常
    System.out.println("除数不能为0");
    e.printStackTrace();
} finally {
    // 无论是否异常都会执行
    System.out.println("finally 执行");
}
```

**catch 多种异常**：

```java
try {
    // 可能出现多种异常的代码
} catch (IOException e) {
    // 处理 IO 异常
    e.printStackTrace();
} catch (SQLException e) {
    // 处理数据库异常
    e.printStackTrace();
} catch (Exception e) {
    // 处理其他异常（放在最后）
    e.printStackTrace();
}

// JDK 7+ 多异常合并
try {
    // 可能出现多种异常的代码
} catch (IOException | SQLException e) {
    // 处理 IO 或数据库异常
    e.printStackTrace();
}
```

### finally 执行时机

```java
try {
    System.out.println("try");
    return;
} catch (Exception e) {
    System.out.println("catch");
} finally {
    System.out.println("finally");  // 始终会执行
}

// 输出：
// try
// finally
```

**finally 不要返回结果**：

```java
try {
    return 1;
} finally {
    return 2;  // 会覆盖 try 中的 return
}
// 返回 2
```

## 自定义异常

### 自定义异常类

```java
// 自定义异常类
public class NameFormatException extends RuntimeException {
    public NameFormatException(String message) {
        super(message);
    }
}

// 使用
class Student {
    private String name;

    public void setName(String name) {
        if (name.length() < 6 || name.length() > 40) {
            throw new NameFormatException("名字格式有误，长度应该为：6 ~ 40");
        }
        this.name = name;
    }
}

// 调用
try {
    Student s = new Student();
    s.setName("abab");
} catch (NameFormatException e) {
    System.out.println(e.getMessage());  // 名字格式有误，长度应该为：6 ~ 40
}
```

### 自定义异常继承选择

```
┌─────────────────────────────────────────────────────────────┐
│                  自定义异常继承选择                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   继承 RuntimeException：                                   │
│   - 运行时异常，不需要强制处理                               │
│   - 编译器不检查，可选择处理或抛出                          │
│                                                             │
│   继承 Exception：                                          │
│   - 编译时异常，强制处理或声明                              │
│   - 调用者必须处理，否则编译不通过                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 异常处理规范

```
┌─────────────────────────────────────────────────────────────┐
│                  异常处理规范                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 不要捕获 Throwable 所有异常                            │
│      - Error 是严重问题，不应捕获                          │
│                                                             │
│   2. 不要捕获后忽略异常                                     │
│      catch(Exception e) {}  // 错误做法                     │
│                                                             │
│   3. 不要捕获后只打印日志                                   │
│      - 应该适当处理或重新抛出                               │
│                                                             │
│   4. 优先捕获具体异常                                       │
│      - 不要用 Exception 捕获所有                           │
│                                                             │
│   5. 不要在 finally 中抛出异常                             │
│      - 可能覆盖 try 中的异常                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  异常核心要点                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   异常体系：Error / Exception / RuntimeException           │
│                                                             │
│   处理方式：                                                │
│   - throws：声明异常，交给调用者处理                         │
│   - throw：主动抛出异常                                     │
│   - try-catch-finally：捕获并处理                          │
│                                                             │
│   自定义异常：继承 Exception 或 RuntimeException           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
