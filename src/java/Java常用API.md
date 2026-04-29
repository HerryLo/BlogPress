---
title: Java常用API
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - API
  - 工具类
---

# Java常用API

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## Math 数学工具

```java
// 常用方法
Math.abs(-10);           // 绝对值：10
Math.ceil(3.14);         // 向上取整：4.0
Math.floor(3.14);        // 向下取整：3.0
Math.round(3.54);        // 四舍五入：4
Math.max(10, 20);        // 最大值：20
Math.min(10, 20);        // 最小值：10

// 幂运算
Math.pow(2, 3);          // 2的3次方：8.0
Math.sqrt(16);          // 平方根：4.0
Math.cbrt(27);           // 立方根：3.0

// 随机数
Math.random();          // [0,1) 的随机数
// 生成 1-100 随机整数
int num = (int)(Math.random() * 100) + 1;
```

## System 系统工具

```java
// 获取当前时间戳（毫秒）
long time = System.currentTimeMillis();
System.out.println(time);  // 1704067200000

// 获取当前时间戳（纳秒）
long nanoTime = System.nanoTime();

// 数组拷贝
int[] src = {1, 2, 3, 4, 5};
int[] dest = new int[5];
System.arraycopy(src, 0, dest, 0, 5);

// 退出程序
System.exit(0);  // 0 表示正常退出

// 建议 JVM 回收垃圾
System.gc();
```

## Object 根类

Object 是所有类的父类：

```java
Object obj = new Object();

// toString：返回对象地址值
obj.toString();  // java.lang.Object@1a2b3c4d

// equals：默认比较地址值
obj.equals(obj2);

// hashCode：返回对象哈希值
obj.hashCode();

// getClass：返回 Class 对象
obj.getClass();

// clone：克隆对象（浅克隆）
obj.clone();
```

### 重写 toString

```java
class Person {
    private String name;
    private int age;

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
```

### 重写 equals

```java
class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

## Objects 工具类

Null-safe 的操作工具类：

```java
Objects.equals(obj1, obj2);           // 安全比较
Objects.isNull(obj);                  // 判断 null
Objects.nonNull(obj);                 // 判断非 null
Objects.requireNonNull(obj);         // null 则抛异常
Objects.requireNonNull(obj, "msg");  // null 抛异常带消息
Objects.hashCode(obj);               // 安全获取 hashCode
Objects.toString(obj);               // 安全转字符串
Objects.toString(obj, "default");    // null 时返回默认值
```

## BigInteger 大整数

处理超出 long 范围的整数：

```java
// 创建
BigInteger bi = new BigInteger("999999999999999999999999999");
BigInteger bi1 = BigInteger.valueOf(91111);

// 运算（使用成员方法）
bi.add(bi1);         // 加
bi.subtract(bi1);    // 减
bi.multiply(bi1);     // 乘
bi.divide(bi1);      // 除
bi.remainder(bi1);   // 取余

// 返回新的 BigInteger，不会改变原对象
BigInteger result = bi.add(bi1);
```

## BigDecimal 精确小数

用于精确计算：

```java
// 创建（建议用字符串，避免精度问题）
BigDecimal bd1 = new BigDecimal("0.01");
BigDecimal bd2 = new BigDecimal("0.09");

// 运算
bd1.add(bd2);         // 加
bd1.subtract(bd2);    // 减
bd1.multiply(bd2);    // 乘
bd1.divide(bd2);       // 除

// 建议使用 valueOf 创建
BigDecimal bd3 = BigDecimal.valueOf(10);
```

**注意**：
- 使用字符串创建，避免精度丢失
- valueOf 内部会优化 -10 到 10 的整数

## 正则表达式

### 校验格式

```java
// 手机号：1开头，第二位3-9，后面9位数字
String phoneRegex = "1[3-9][0-9]{9}";
"13812345678".matches(phoneRegex);  // true

// 邮箱
String emailRegex = "\\w+@\\w+\\.\\w+";
"test@example.com".matches(emailRegex);  // true

// 座机号
String telRegex = "0\\d{2,3}-?\\d{7,8}";
"010-12345678".matches(telRegex);  // true
```

### 查找内容

```java
String str = "Java 是最好的语言，Java 很有趣";
Pattern p = Pattern.compile("Java");
Matcher m = p.matcher(str);

while (m.find()) {
    System.out.println(m.group());  // 找到所有 "Java"
}
```

### 替换和分割

```java
String str = "java,c++;python|go";

// 分割
String[] parts = str.split("[,\\|;]");  // ["java", "c++", "python", "go"]

// 替换
String replaced = str.replaceAll("Java", "Python");
String replaced2 = str.replaceFirst("Java", "Python");
```

## Date 日期

### JDK7 日期

```java
// Date
Date date = new Date();
date.getTime();  // 获取时间戳

// SimpleDateFormat 格式化
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String format = sdf.format(date);

// 解析字符串为 Date
Date parsed = sdf.parse("2024-01-01 12:00:00");

// Calendar 日历
Calendar cal = Calendar.getInstance();
int year = cal.get(Calendar.YEAR);
int month = cal.get(Calendar.MONTH) + 1;  // 0-11
int day = cal.get(Calendar.DATE);
cal.add(Calendar.DAY_OF_MONTH, 7);  // 加7天
```

### JDK8 新日期

```java
import java.time.*;

// LocalDate 日期
LocalDate now = LocalDate.now();
LocalDate date = LocalDate.of(2024, 1, 1);

// LocalTime 时间
LocalTime time = LocalTime.now();

// LocalDateTime 日期时间
LocalDateTime ldt = LocalDateTime.now();

// 格式化
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
String formatted = ldt.format(fmt);

// 解析
LocalDateTime parsed = LocalDateTime.parse("2024-01-01 12:00", fmt);

// 加减
ldt.plusDays(7);    // 加7天
ldt.minusHours(2);  // 减2小时
```

**JDK8 新日期特点**：返回新对象（不可变），线程安全。

## Arrays 数组工具

```java
int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 数组转字符串
Arrays.toString(arr);  // [3, 1, 4, 1, 5, 9, 2, 6]

// 排序
Arrays.sort(arr);

// 二分查找（必须先排序）
Arrays.binarySearch(arr, 5);  // 返回索引

// 拷贝
int[] copy = Arrays.copyOf(arr, 10);         // 长度变为10
int[] copyRange = Arrays.copyOfRange(arr, 0, 5);  // [3, 1, 4, 1, 5]

// 填充
Arrays.fill(arr, 0);  // 所有元素变为0

// 判断相等
Arrays.equals(arr1, arr2);
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 常用 API 核心要点                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Math：abs / ceil / floor / round / max / min / pow / random │
│                                                             │
│   System：currentTimeMillis / arraycopy / exit             │
│                                                             │
│   Object：toString / equals / hashCode / clone              │
│                                                             │
│   Objects：equals / isNull / requireNonNull                │
│                                                             │
│   BigInteger / BigDecimal：精确计算                        │
│                                                             │
│   正则：matches / split / replace / Pattern / Matcher      │
│                                                             │
│   Date：SimpleDateFormat / Calendar（JDK7）                │
│         LocalDate / LocalDateTime（JDK8，线程安全）        │
│                                                             │
│   Arrays：sort / binarySearch / copyOf / toString          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
