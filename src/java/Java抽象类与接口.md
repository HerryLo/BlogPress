---
title: Java抽象类与接口
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 抽象类
  - 接口
  - 内部类
---

# Java抽象类与接口

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## 抽象类

如果一个类的方法没有具体实现（没有方法体），这个方法就是**抽象方法**，用 `abstract` 修饰。

```java
// 抽象类
abstract class Animal {
    private String name;

    // 抽象方法 - 没有方法体
    public abstract void eat();

    public abstract void run();

    // 普通方法 - 有方法体
    public void sleep() {
        System.out.println("睡觉");
    }
}

// 子类必须重写所有抽象方法
class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃狗粮");
    }

    @Override
    public void run() {
        System.out.println("狗跑");
    }
}
```

### 抽象类特点

```
┌─────────────────────────────────────────────────────────────┐
│                  抽象类特点                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 抽象类不能实例化（不能 new）                           │
│   2. 抽象类不一定有抽象方法，有抽象方法一定是抽象类          │
│   3. 抽象类可以有构造方法（供子类调用）                     │
│   4. 子类要么重写所有抽象方法，要么子类也是抽象类            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 抽象类应用场景

当多个类有相同的行为，但实现方式不同时，可以把行为定义为抽象方法，让子类去重写：

```
Animal（抽象类）
  ├── eat() 抽象方法
  └── run() 抽象方法
      │
      ├── Dog 重写：狗吃狗粮 / 狗跑
      └── Cat 重写：猫吃鱼 / 猫跑
```

## 接口

如果抽象类中所有方法都是抽象方法，可以把这个抽象类改写为**接口**。

```java
// 接口定义
interface Flyable {
    // 抽象方法（JDK7 及以前）
    void fly();

    // 默认方法（JDK8）
    default void show() {
        System.out.println("默认显示");
    }

    // 静态方法（JDK8）
    static void test() {
        System.out.println("静态方法");
    }

    // 私有方法（JDK9）
    private void privateMethod() {
        System.out.println("私有方法");
    }
}

// 类实现接口
class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟儿飞翔");
    }
}

// 接口可以多实现
interface Walkable { void walk(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Walkable, Swimmable {
    @Override
    public void fly() { }
    @Override
    public void walk() { }
    @Override
    public void swim() { }
}
```

### 接口特点

```
┌─────────────────────────────────────────────────────────────┐
│                  接口特点                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 接口不能实例化                                         │
│   2. 接口成员只能是常量（public static final）              │
│   3. 接口方法默认抽象（JDK7 及以前）                        │
│   4. JDK8：新增默认方法和静态方法                           │
│   5. JDK9：新增私有方法                                     │
│   6. 类实现接口用 implements，关键字                        │
│   7. 类可以多实现接口                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 抽象类 vs 接口

| 对比 | 抽象类 | 接口 |
|------|--------|------|
| 继承/实现 | 单继承 | 多实现 |
| 成员变量 | 任意类型 | 只能是常量 |
| 成员方法 | 任意方法 | 抽象或默认/静态 |
| 构造方法 | 有 | 无 |
| 适用场景 | is-a 关系（同类） | has-a 能力（行为） |

**记忆**：抽象类是"是什么"（is-a），接口是"能做什么"（can-do）。

## 内部类

内部类是写在类内部的类。

### 内部类分类

```
┌─────────────────────────────────────────────────────────────┐
│                  内部类分类                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 成员内部类：写在成员位置，像成员变量一样               │
│   2. 静态内部类：用 static 修饰的成员内部类                │
│   3. 局部内部类：写在方法里                                 │
│   4. 匿名内部类：没有名字的内部类                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 成员内部类

```java
class Outer {
    private int age = 10;

    // 成员内部类
    class Inner {
        public void show() {
            // 访问外部类成员
            System.out.println(Outer.this.age);
        }
    }
}

// 获取内部类对象
Outer.Inner inner = new Outer().new Inner();
inner.show();
```

### 静态内部类

```java
class Outer {
    static int age = 10;

    // 静态内部类
    static class Inner {
        public void show() {
            // 只能访问外部类的静态成员
            System.out.println(age);
        }
    }
}

// 获取内部类对象
Outer.Inner inner = new Outer.Inner();
inner.show();
```

### 局部内部类

```java
class Outer {
    public void method() {
        // 局部内部类，作用域在方法内
        class Inner {
            public void show() {
                System.out.println("局部内部类");
            }
        }
        Inner inner = new Inner();
        inner.show();
    }
}
```

### 匿名内部类

没有名字的内部类，常用于简化代码：

```java
// 传统方式：先定义类，再创建对象
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟儿飞翔");
    }
}

Flyable f = new Bird();
f.fly();

// 匿名内部类方式：一步到位
Flyable f2 = new Flyable() {
    @Override
    public void fly() {
        System.out.println("鸟儿飞翔");
    }
};
f2.fly();
```

**匿名内部类应用场景**：

```java
// 场景1：作为方法参数
public void method(Flyable f) {
    f.fly();
}

// 调用
method(new Flyable() {
    @Override
    public void fly() {
        System.out.println("飞了");
    }
});

// 场景2：GUI 事件监听
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("按钮点击");
    }
});
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  抽象类与接口核心要点                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   抽象类：                                                  │
│   - abstract 修饰类和方法                                   │
│   - 不能实例化                                             │
│   - 子类必须重写抽象方法                                    │
│                                                             │
│   接口：                                                   │
│   - interface 定义                                         │
│   - 类用 implements 实现                                   │
│   - 可以多实现                                              │
│                                                             │
│   内部类：                                                  │
│   - 成员内部类、静态内部类、局部内部类、匿名内部类           │
│   - 匿名内部类常用于简化代码                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
