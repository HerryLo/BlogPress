---
title: Java注解
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 注解
---

# Java注解

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 注解概述

注解本身不包含任何业务逻辑代码，作用是**标记**，为类或方法附加元数据。

```
┌─────────────────────────────────────────────────────────────┐
│                  注解定义                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   注解（Annotation）：                                       │
│   - 用于为类、方法、变量等提供元数据                         │
│   - 本身不包含任何业务逻辑                                 │
│   - 主要用于编译检查、框架配置、运行时处理                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 常见注解

### JDK 内置注解

| 注解 | 说明 |
|------|------|
| `@Override` | 标记方法重写 |
| `@Deprecated` | 标记方法过时 |
| `@SuppressWarnings` | 抑制编译器警告 |
| `@FunctionalInterface` | 标记函数式接口 |

```java
@Override
public void onClick(View v) {
    // 重写父类方法
}

@Deprecated
public void oldMethod() {
    // 已过时的方法
}

@SuppressWarnings("unchecked")
public void oldCode() {
    List list = new ArrayList();
    // 忽略未检查警告
}
```

### 元注解

元注解是用于修饰注解的注解：

| 元注解 | 说明 |
|--------|------|
| `@Target` | 注解作用位置 |
| `@Retention` | 注解保留阶段 |
| `@Documented` | 是否出现在文档 |
| `@Inherited` | 是否可继承 |

## 自定义注解

### 基本格式

```java
// 定义注解
public @interface MyAnnotation {
    // 注解属性
    String value() default "默认值";
}
```

### 完整示例

```java
// 定义注解
@Target({ElementType.TYPE, ElementType.METHOD})  // 作用在类和方法上
@Retention(RetentionPolicy.RUNTIME)  // 保留到运行时
public @interface Author {
    String name();
    String date();
}
```

```java
// 使用注解
@Author(name = "Herry", date = "2024-01-01")
public class UserService {
    @Author(name = "Herry", date = "2024-01-01")
    public void method() {
    }
}
```

### 注解属性类型

```java
public @interface MyAnnotation {
    // 基本类型
    int value() default 0;

    // 字符串
    String name() default "";

    // 枚举
    Type type() default Type.A;

    // Class 类型
    Class<?> clazz() default Object.class;

    // 注解类型
    AnotherAnnotation another() default @AnotherAnnotation;

    // 以上类型数组
    String[] names() default {};
}
```

## 注解解析

### 获取注解信息

```java
// 判断是否存在指定注解
boolean has = clazz.isAnnotationPresent(MyAnnotation.class);

// 获取注解
MyAnnotation annotation = clazz.getAnnotation(MyAnnotation.class);
String name = annotation.name();
```

### 注解解析示例

```java
@Author(name = "Herry", date = "2024-01-01")
public class UserService {
    public void method() {
    }
}

// 解析类的注解
Class<?> clazz = UserService.class;
if (clazz.isAnnotationPresent(Author.class)) {
    Author author = clazz.getAnnotation(Author.class);
    System.out.println("作者：" + author.name());
    System.out.println("日期：" + author.date());
}

// 解析方法的注解
Method[] methods = clazz.getDeclaredMethods();
for (Method method : methods) {
    if (method.isAnnotationPresent(Author.class)) {
        Author author = method.getAnnotation(Author.class);
        System.out.println("方法：" + method.getName() + " 作者：" + author.name());
    }
}
```

### 注解与反射结合

```java
// 定义注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginRequired {
}

// 使用注解
public class UserService {
    @LoginRequired
    public void update() {
        System.out.println("更新数据");
    }

    public void query() {
        System.out.println("查询数据");
    }
}

// 解析并执行
Class<?> clazz = UserService.class;
Object obj = clazz.newInstance();
Method[] methods = clazz.getDeclaredMethods();

for (Method method : methods) {
    if (method.isAnnotationPresent(LoginRequired.class)) {
        System.out.println("需要登录，调用：" + method.getName());
        // 执行登录验证逻辑
    }
    method.invoke(obj);
}
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  注解核心要点                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   常见注解：@Override / @Deprecated / @SuppressWarnings    │
│                                                             │
│   元注解：@Target / @Retention / @Documented / @Inherited  │
│                                                             │
│   注解属性：基本类型、String、Class、枚举、注解、数组        │
│                                                             │
│   解析方式：isAnnotationPresent / getAnnotation            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
