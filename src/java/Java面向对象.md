---
title: Java面向对象
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 面向对象
  - OOP
---

# Java面向对象

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## 面向对象概念

面向对象编程（OOP）是一种通过对象的方式，把现实世界映射到计算机模型的编程方法。

```
┌─────────────────────────────────────────────────────────────┐
│                  面向对象三大特性                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   封装：把数据和对数据的操作封装在一起                       │
│        ↓                                                   │
│   继承：子类继承父类，获得父类的属性和方法                   │
│        ↓                                                   │
│   多态：同一种行为，不同对象有不同表现形式                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 封装

通过 `class` 封装数据和操作：

```java
class Person {
    public String name;   // 公开属性
    private int age;      // 私有属性，外部无法直接访问

    // 构造方法
    public Person() {}

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // getter / setter
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}

// 使用
Person p = new Person("张三", 20);
p.name = "李四";      // 可以访问
// p.age = 30;        // 编译报错，age 是 private
p.setAge(30);         // 通过方法访问
```

## 继承

子类继承父类，获得父类的成员（除了构造方法）：

```java
// 父类
class Person {
    protected String name;
    protected int age;

    public void eat() {
        System.out.println("吃饭");
    }
}

// 子类
class Student extends Person {
    private int score;

    public void study() {
        System.out.println("学习");
    }

    // 重写父类方法
    @Override
    public void eat() {
        System.out.println("吃健康餐");
    }
}

// 使用
Student s = new Student();
s.name = "张三";     // 继承自父类
s.eat();             // 调用重写后的方法
s.study();           // 子类自己的方法
```

**继承特点**：
- Java 只支持单继承，不支持多继承
- 支持多层继承
- 非私有、非静态、非 final 的方法可以继承

## 重写

子类定义与父类方法签名完全相同的方法：

```java
class Animal {
    public void run() {
        System.out.println("动物跑");
    }
}

class Dog extends Animal {
    @Override
    public void run() {
        System.out.println("狗跑");
    }
}
```

**重写 vs 重载**：

| 特征 | 重写 (Override) | 重载 (Overload) |
|------|----------------|----------------|
| 发生位置 | 子类继承父类 | 同一个类中 |
| 方法名 | 相同 | 相同 |
| 参数列表 | 完全相同 | 不同 |
| 返回值 | 相同或子类型 | 无关 |

## 多态

同一种行为，不同对象有不同表现形式：

### 多态前提

```
┌─────────────────────────────────────────────────────────────┐
│                  多态的三个条件                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 有继承关系                                             │
│   2. 有父类引用指向子类对象                                 │
│   3. 有方法的重写                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 多态表现形式

```java
// 父类引用指向子类对象
父类类型 对象名称 = new 子类对象();

class Person {
    public void eat() {
        System.out.println("人吃饭");
    }
}

class Student extends Person {
    @Override
    public void eat() {
        System.out.println("学生吃食堂");
    }
}

class Teacher extends Person {
    @Override
    public void eat() {
        System.out.println("老师吃家常菜");
    }
}

// 多态调用
Person p1 = new Student();  // 父类引用指向子类对象
Person p2 = new Teacher();

p1.eat();  // 调用的是 Student 的 eat
p2.eat();  // 调用的是 Teacher 的 eat
```

### 多态调用特点

```
┌─────────────────────────────────────────────────────────────┐
│                  多态调用特点                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   成员变量：                                                │
│   编译看左边，运行也看左边                                  │
│                                                             │
│   成员方法：                                                │
│   编译看左边，运行看右边                                    │
│   （因为方法可以被重写）                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 多态的优劣势

```java
Person p = new Student();

// 劣势：无法直接调用子类的特有方法
// p.study();  // 编译报错

// 解决方案：向下转型
Student s = (Student) p;
s.study();  // OK
```

## static 修饰符

static 修饰成员变量和成员方法，表示共享：

```java
class Student {
    private String name;
    private int age;

    // 静态成员变量，所有对象共享
    public static String schoolName = "清华大学";

    // 静态方法
    public static void showSchool() {
        System.out.println("学校：" + schoolName);
        // 静态方法中不能访问非静态成员
        // System.out.println(this.name);  // 错误
    }
}

// 调用
Student.showSchool();           // 通过类名调用
new Student().showSchool();     // 也可以通过对象调用
System.out.println(Student.schoolName);
```

**static 特点**：
- 所有对象共享同一个变量
- 可以通过类名直接访问
- 静态方法只能访问静态成员
- 静态方法中没有 this 关键字

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 面向对象核心要点                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   封装：把数据和对数据的操作封装在一起                       │
│   - private 隐藏属性，public 提供访问方法                   │
│                                                             │
│   继承：子类继承父类                                        │
│   - 单继承，支持多层继承                                     │
│   - 构造方法不参与继承                                      │
│                                                             │
│   多态：父类引用指向子类对象                                │
│   - 编译看左边，运行看右边（方法）                          │
│   - 向下转型访问子类特有方法                                │
│                                                             │
│   static：共享，类名直接访问                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
