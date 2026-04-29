---
title: Java反射
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 反射
---

# Java反射

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 反射概述

反射是程序在运行期可以拿到一个对象的所有信息（类、属性、方法），并能动态调用这些信息。

```
┌─────────────────────────────────────────────────────────────┐
│                  反射核心概念                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   反射（Reflection）：                                       │
│   - 程序在运行期可以获取任意类的信息                        │
│   - 可以动态调用类的方法和属性                               │
│   - 框架底层大量使用反射实现                                │
│                                                             │
│   核心类：java.lang.Class                                   │
│   - 代表类的本身                                            │
│   - 是反射的入口                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**反射的作用**：
- 框架（如 Spring、Hibernate）底层核心机制
- 动态获取类信息，创建对象
- 动态调用方法，访问属性

## 获取 Class 对象

获取 Class 对象的四种方式：

```java
// 方式1：Class.forName()  - 最常用
Class<?> clazz1 = Class.forName("com.example.Student");

// 方式2：类名.class
Class<?> clazz2 = Student.class;

// 方式3：对象.getClass()
Class<?> clazz3 = new Student().getClass();

// 方式4：类加载器
Class<?> clazz4 = getClass().getClassLoader().loadClass("com.example.Student");
```

```
┌─────────────────────────────────────────────────────────────┐
│                  四种方式对比                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Class.forName()        - 常用，字符串形式，可配置          │
│   类名.class              - 简单，直接引用                   │
│   对象.getClass()        - 已有对象时使用                   │
│   类加载器.loadClass()    - 可指定类加载器                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 获取类信息

### 获取类名

```java
Class<?> clazz = Class.forName("com.example.Student");

String name = clazz.getName();        // com.example.Student
String simpleName = clazz.getSimpleName();  // Student
String packageName = clazz.getPackage().getName();  // com.example
```

### 获取类的修饰符

```java
Class<?> clazz = Class.forName("com.example.Student");

int modifiers = clazz.getModifiers();
Modifier.toString(modifiers);  // public
```

### 获取父类

```java
Class<?> clazz = Class.forName("com.example.Student");

Class<?> superClass = clazz.getSuperclass();
System.out.println(superClass.getSimpleName());  // Person
```

### 获取接口

```java
Class<?> clazz = Class.forName("com.example.Student");

Class<?>[] interfaces = clazz.getInterfaces();
for (Class<?> iface : interfaces) {
    System.out.println(iface.getSimpleName());
}
```

## 获取成员变量

### 获取所有公开字段

```java
Class<?> clazz = Class.forName("com.example.Student");

// 获取公开字段（包括继承的）
Field[] fields = clazz.getFields();

for (Field field : fields) {
    System.out.println(field.getName());
}
```

### 获取所有声明字段

```java
Class<?> clazz = Class.forName("com.example.Student");

// 获取本类声明的所有字段（包括私有）
Field[] fields = clazz.getDeclaredFields();

for (Field field : fields) {
    System.out.println(field.getName() + " : " + field.getType().getSimpleName());
}
```

### 获取指定字段并使用

```java
Class<?> clazz = Class.forName("com.example.Student");
Object obj = clazz.newInstance();  // 创建对象

// 获取私有字段
Field nameField = clazz.getDeclaredField("name");
nameField.setAccessible(true);  // 设置访问权限

// 设置值
nameField.set(obj, "Herry");

// 获取值
String name = (String) nameField.get(obj);
System.out.println(name);  // Herry
```

## 获取成员方法

### 获取所有方法

```java
Class<?> clazz = Class.forName("com.example.Student");

// 获取本类及父类的公开方法
Method[] methods = clazz.getMethods();

// 仅获取本类声明的方法（包括私有）
Method[] declaredMethods = clazz.getDeclaredMethods();
```

### 获取指定方法

```java
Class<?> clazz = Class.forName("com.example.Student");
Object obj = clazz.newInstance();

// 获取无参方法
Method method1 = clazz.getMethod("methodName");

// 获取有参方法（方法名，参数类型）
Method method2 = clazz.getMethod("methodName", String.class, int.class);
```

### 调用方法

```java
Class<?> clazz = Class.forName("com.example.Student");
Object obj = clazz.newInstance();

// 调用无参方法
Method method = clazz.getMethod("show");
method.invoke(obj);

// 调用有参方法
Method setName = clazz.getMethod("setName", String.class);
setName.invoke(obj, "Herry");

// 调用私有方法
Method privateMethod = clazz.getDeclaredMethod("privateMethod");
privateMethod.setAccessible(true);
privateMethod.invoke(obj);
```

## 获取构造方法

### 获取构造方法

```java
Class<?> clazz = Class.forName("com.example.Student");

// 获取所有公开构造方法
Constructor<?>[] constructors = clazz.getConstructors();

// 获取所有构造方法（包括私有）
Constructor<?>[] declaredConstructors = clazz.getDeclaredConstructors();

// 获取指定构造方法
Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
```

### 使用构造方法创建对象

```java
Class<?> clazz = Class.forName("com.example.Student");

// 使用公开构造方法创建对象
Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
Object obj = constructor.newInstance("Herry", 18);

// 使用私有构造方法（需要设置访问权限）
Constructor<?> privateConstructor = clazz.getDeclaredConstructor(String.class);
privateConstructor.setAccessible(true);
Object obj2 = privateConstructor.newInstance("Herry");
```

## 反射应用场景

### 工厂模式

```java
// 传统工厂
class Factory {
    public static UserService create() {
        return new UserService();
    }
}

// 反射工厂（更灵活）
class Factory {
    public static Object create(String className) {
        try {
            Class<?> clazz = Class.forName(className);
            return clazz.newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// 使用
Object obj = Factory.create("com.example.UserService");
```

### 通用对象拷贝

```java
public static void copyProperties(Object source, Object target) {
    Class<?> clazz = source.getClass();

    Field[] fields = clazz.getDeclaredFields();
    for (Field field : fields) {
        field.setAccessible(true);
        try {
            Object value = field.get(source);
            field.set(target, value);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  反射核心要点                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   获取 Class：forName / 类名.class / 对象.getClass()        │
│                                                             │
│   获取类信息：getName / getSimpleName / getSuperclass       │
│                                                             │
│   获取成员变量：getDeclaredField / setAccessible            │
│                                                             │
│   获取成员方法：getDeclaredMethod / invoke                  │
│                                                             │
│   获取构造方法：getConstructor / newInstance               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
