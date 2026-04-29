---
title: Java修饰符与代码块
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 修饰符
  - 代码块
---

# Java修饰符与代码块

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## 包

包是文件夹，用来管理 Java 类。

### 包命名规则

```
┌─────────────────────────────────────────────────────────────┐
│                  包名命名规范                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   公司域名反写 + 包的作用                                    │
│                                                             │
│   例如：                                                   │
│   - com.example.domain   （领域模块）                       │
│   - com.example.service  （服务层）                        │
│   - com.example.dao      （持久层）                        │
│                                                             │
│   全部小写，见名知意                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 导包规则

```java
// 1. 使用同一个包中的类，不需要导包
package com.example;
class A { }
class B { }  // B 可以直接使用 A，不需要导包

// 2. java.lang 包中的类，不需要导包
String s = "hello";  // 不需要 import java.lang.String

// 3. 其他情况都需要导包
import java.util.ArrayList;  // 导包

// 4. 同名类需要用全类名
java.sql.Date date1;  // java.sql 包的 Date
java.util.Date date2; // java.util 包的 Date
```

## final 修饰符

final 表示最终的，不可改变的：

```java
// 1. 修饰类：最终类，不能被继承
public final class String { }

// 2. 修饰方法：最终方法，不能被重写
public final void show() { }

// 3. 修饰变量：常量，不能被修改
final int COUNT = 10;
// COUNT = 20;  // 编译报错

// 修饰基本类型：值不能改变
final int NUM = 100;
// NUM = 200;  // 错误

// 修饰引用类型：地址不能改变，但属性可以修改
final Person P = new Person();
P.name = "张三";   // OK，可以修改属性
// P = new Person();  // 错误，不能重新赋值
```

## 权限修饰符

| 修饰符 | 本类 | 同一包 | 子类 | 其他包 |
|--------|------|--------|------|--------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `default` | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

```
┌─────────────────────────────────────────────────────────────┐
│                  权限修饰符范围                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   private：只能在本类中访问                                 │
│   default（不写）：同一包内可访问                           │
│   protected：不同包但有继承关系可访问                       │
│   public：任意位置可访问                                     │
│                                                             │
│   记忆：private（私）→ default（本包）→ protected（子类）→ public（公）│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 使用场景

```java
// 成员变量通常 private
class Person {
    private String name;
    private int age;
}

// 方法通常 public
class Person {
    public void setName(String name) { }
    public String getName() { }
}

// 工具类用 public final 防止继承
public final class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}
```

## 代码块

代码块是用 `{}` 包裹的代码区域。

### 局部代码块

方法中的代码块，限定变量生命周期：

```java
public void method() {
    // 局部代码块
    {
        int x = 10;
        System.out.println(x);
    }
    // x 在这里不可用
}
```

### 构造代码块

写在类中，构造方法执行前自动执行：

```java
class Person {
    private String name;

    // 构造代码块
    {
        System.out.println("构造代码块执行");
    }

    public Person() {
        System.out.println("构造方法执行");
    }

    public Person(String name) {
        this.name = name;
    }
}

// 创建对象时
new Person();  // 先输出"构造代码块执行"，再输出"构造方法执行"
new Person("张三");  // 同样先输出"构造代码块执行"，再输出"构造方法执行"
```

### 静态代码块

用 `static` 修饰，在类加载时执行，只执行一次：

```java
class Person {
    static {
        System.out.println("静态代码块执行 - 类加载时执行");
    }

    {
        System.out.println("构造代码块执行 - 创建对象时执行");
    }

    public Person() {
        System.out.println("构造方法执行 - 创建对象时执行");
    }
}
```

### 代码块执行顺序

```
┌─────────────────────────────────────────────────────────────┐
│                  代码块执行顺序                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 静态代码块 - 类加载时执行，只执行一次                   │
│   2. 构造代码块 - 每次创建对象前都执行                     │
│   3. 构造方法 - 每次创建对象时执行                         │
│                                                             │
│   示例：                                                    │
│   new Person();  // 静态代码块 → 构造代码块 → 构造方法      │
│   new Person();  // 构造代码块 → 构造方法（静态只执行一次）  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**典型应用**：静态代码块常用于加载配置文件或初始化静态资源。

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  修饰符与代码块核心要点                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   包：管理类，命名用域名反写                                 │
│                                                             │
│   final：不可改变                                           │
│   - 修饰类：不能继承                                        │
│   - 修饰方法：不能重写                                      │
│   - 修饰变量：不能修改                                      │
│                                                             │
│   权限修饰符：                                              │
│   - private → default → protected → public                 │
│                                                             │
│   代码块：                                                  │
│   - 静态代码块：类加载时执行，只一次                        │
│   - 构造代码块：创建对象时执行                              │
│   - 局部代码块：限定变量生命周期                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
