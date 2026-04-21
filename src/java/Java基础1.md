---
title: Java基础上
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
---

# Java基础上

原文链接：https://www.yuque.com/yopai/pp6bv5/xqfzn5tio8k1nnvg

## 数据类型

### 基本类型

```
整数类型：byte，short，int，long
byte：-128 ~ 127
short: -32768 ~ 32767
int: -2147483648 ~ 2147483647
long: -9223372036854775808 ~ 9223372036854775807

浮点数类型：float，double

字符类型：char

布尔类型：boolean
```

### 引用类型

```
String
ArrayList
HashMap
HashSet
//...
```

引用类型的变量类似于 C 语言的指针，它内部存储一个"地址"，指向某个对象在内存的位置。

### String

```java
// 字符串判断
String str = "abc";
String str1 = "abc";

if(str.equals(str1)) {
    System.out.println("相等");
}

// 字符串拼接
StringBuilder sb = new StringBuilder();
sb.append("Hello").append("World");
String str2 = sb.toString()
System.out.println(str2);
```

### ArrayList

```java
// 集合只能放引用类型
ArrayList<String> al = new ArrayList<>();
al.add("Hello");
al.add("World!");

ArrayList<Person> al1 = new ArrayList<>();
Person pe1 = new Person("lh",18);
Person pe2 = new Person("ll",23);
al.add(pe1);
al.add(pe2);
```

## 面向对象

面向对象编程，是一种通过对象的方式，把现实世界映射到计算机模型的一种编程方法。

在 Java 中，创建一个类，例如，给这个类命名为 `Person`，就是定义一个 `class`：

```java
// 标准的 JavaBean 类
class Person {
    private String name;
    private int age;

    public Person() {
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

一个 `class` 可以包含多个成员变量和成员方法。

### static

static 表示静态，是 java 中的一个修饰符，可以修饰成员方法、成员变量。

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1753278002898-8399521d-8b81-4b58-b5fd-937b0acfb56f.png)

+ 静态方法只能访问静态变量和静态方法；
+ 非静态方法可以访问静态变量或者静态方法，也可以访问非静态的成员变量和非静态的成员方法；
+ 静态方法中是没有 this 关键字；

### 封装

通过 `class` 封装方法，`class` 类可以多次复用。

```java
class Person {
    public String name;
    public int age;
    private String hobby;
}
```

`Person` 类就定义了两个 `field` 字段，`field` 通过 **public** 或 **private** 修饰，是否允许被外部直接访问。

```java
// 实例化
Person person = new Person();
person.name = "herrylo"
person.age = 100;
person.hobby = "Swimming"; // 提示异常报错
```

如果希望修改或得到 `hobby` 字段，可以通过 `class` 内部实现：

```java
class Person {
    private String hobby;

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }
    public String getHobby() {
        return this.hobby;
    }
}
```

如果希望在实例化类时，传递参数进行初始化，我们也可以使用**构造方法**完成：

```java
Person person = new Person("herrylo", 100);

Person person1 = new Person("herrylo");

class Person {
    public String name;
    public int age;

    // 构造方法
    // 创建实例的时候，实际上是通过构造方法来初始化实例的
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 可以定义多个构造方法，编译器根据参数自动判断
    public Person(String name) {
        this.name = name;
        this.age = 12;
    }
}
```

如果在开发类中，存在多种入参的方式，那么你就会用到**方法重载**：

```java
Person person1 = new Person();
person1.setName("herry")

Person person2 = new Person();
person1.setName("herry", "lo")

class Person {
    public String name;

    public void setName(String hobby) {
        this.name = hobby;
    }
    public void setName(String hobby, String hobby1) {
        this.name = hobby + hobby1;
    }
    public String getName() {
        return this.name;
    }
}
```

### 继承

继承是面向对象编程中非常强大的一种机制，它首先可以复用代码。

```java
class Person {
    private String name;
    private int age;

    public String getName() {...}
    public void setName(String name) {...}
    public int getAge() {...}
    public void setAge(int age) {...}
}

class Student extends Person {
    // 不要重复 name 和 age 字段/方法，
    // 只需要定义新增 score 字段/方法：
    private int score;
    private String name;

    public int getScore() { … }
    public void setScore(int score) { … }

    public void showInfo() {
        // 访问当前子类变量
        System.out.println(this.name);
        // 访问父类变量
        System.out.println(super.name);
    }
}
```

当我们让 `Student` 从 `Person` 继承时，子类 `Student` 就获得了父类 `Person` 的成员变量和非私有成员方法（构造方法不会继承），后续只需为 `Student` 编写新增的变量和方法。

**注意：非私有，非静态，非 final 的方法才可以进行继承；**

### 重写

在继承关系中，子类如果定义了一个与父类方法签名完全相同的方法，被称为重写（Override）。

```java
class Person {
    // 构造函数和成员变量、方法省略...

    public void run() {
        System.out.println("Person.run");
    }
}

class Student extends Person {
    // 构造函数省略...

    // 注解可以校验重写是否正确，同时可读性好
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}
```

### 多态

多态是指，对象的多种形态，其真正执行的方法取决于运行时期实际类型的方法。

**多态前提**

+ 有继承关系；
+ 有父类引用指向子类对象；
+ 有方法的重写

```java
// 多态的表现形式
父类类型 对象名称 = 子类对象

class Person {
    private String name = "lh";
    private int age;

    public Person() {}
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void show() {
        // ..
    }
}

class Student extends Person {
    // ...
}

class Teacher extends Person {
    // ...
}

Person p1 = new Student();
Person p2 = new Teacher();
System.out.println(p1.name);
```

**多态调用特点**

"**真正执行的方法取决于运行时期实际类型的方法**"可以解释为：

> 1. 当调用成员变量时，编译看左边，运行也看左边；
>    + 编译看左边：javac 编译时，会看左边的父类有没有这个变量，如果有编译成功，如果没有编译失败；
>    + 运行也看左边：java 运行代码时，实际获取的就是左边父类中成员变量的值；
> 2. 当调用成员方法时，编译看左边，运行看右边；
>    + 编译看左边：javac 编译时，会看左边的父类有没有这个方法，如果有编译成功，如果没有编译失败；
>    + 运行也看右边：java 运行代码时，实际获取的就是右边子类中成员方法；

**多态优劣势**

多态无法直接调用子类的特定方法，当调用成员变量时，编译看左边，运行也看左边。在编译时，会先检查左边父类有没有这个方法，如果没有会直接报错。

```java
Person p = new Student();

p.lookHome(); // 父类没有这个方法会报错

// 解决方案：强制转换变回子类类型再调用
Student st = (Student) p;
```

### 包

什么是包？包是文件夹。用来管理各种不同功能的 Java 类，方便后期代码维护。

包名规则：公司域名反写 + 包的作用，需要全部英文小写，见名知意。例如：com.itend.domain。

什么时候需要导包？什么时候不需要导包？

+ **使用同一个包中的类时，不需要导包。**
+ **使用 java.lang 包中的类时，不需要导包。**
+ **其他情况都需要导包。**
+ **如果同时使用两个包中的同名类，需要用全类名。**

### final

1. final 修饰类：最终类，不能被继承；
2. final 修饰方法：最终方法，不能被重写；
3. final 修饰变量：是常量，不能被修改；
   + 基本数据类型：变量的值不能修改；
   + 引用数据类型：地址值不能修改，内部的属性可以修改；

### 权限修饰符

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1753608249360-e560d678-551b-4caa-9306-cabe81b72b4d.png)

protected 是受保护的，设置 protected 的变量或方法，只能当前类、当前包的其他类和子类中使用。

### 代码块

静态 static 代码块：可以作用数据的初始化。它在类加载时自动执行，并且只执行一次；

```java
public class Main {
    static {
        System.out.println("类数据初始化");
    }

    public static void main(String[] args) {
        Person p = new Student();
        p.run();
    }
}
```

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1753608789902-534d44a8-46e8-4228-a9aa-3e0d527371c8.png)

### 抽象类

如果一个 `class` 定义了方法，但没有具体执行代码，这个方法就是抽象方法，抽象方法用 **abstract** 修饰。

因为抽象类本身被设计成只能用于被继承，因此，抽象类可以强迫子类实现其定义的抽象方法，否则编译会报错。因此，抽象方法实际上相当于定义了"规范"。

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Student();
        p.run();
    }
}

// 抽象类中不止可以定义抽象方法，依然可定义成员变量和成员方法
abstract class Person {
    private int age;
    private String name;

    public Person(){};

    public Person(int age, String name){
        this.age = age;
        this.name = name;
    };

    // 抽象方法
    public abstract void run();

    public void show() {
        System.out.println("Person");
    }
}

class Student extends Person {
    public Student(){};
    public Student(int age, String name){
        super(age, name);
    };

    @Override
    public void run() {
        System.out.println("Student.run");
    }
}
```

**注意**

1. **抽象类不能实例化**；
2. 抽象类不一定有抽象方法，有抽象方法的类一定是抽象类；
3. 可以有构造方法；
4. 抽象类的子类：
   + 要么重写抽象类中的**所有**抽象方法；
   + 要么是抽象类；

**适用场景**

由于 Java 不支持多继承，抽象类适用于需要**单继承的场景**。如果一个类需要继承多个类的功能，则应考虑使用接口。

总之，抽象类适用于定义一组共有的属性和方法，以便在多个子类中共享和复用代码，同时实现多态性。它们在需要提供公共实现代码和实现单继承的场景中非常有用。

### 接口

在抽象类中，抽象方法本质上是定义接口规范：即规定高层类的接口，从而保证所有子类都有相同的接口实现，这样，多态就能发挥出威力。

如果一个抽象类没有字段，所有方法全部都是抽象方法，就可以把该抽象类改写为**接口**。

**定义使用**

1. 接口用关键字 `interface` 来定义：
   + `public interface 接口名 {}`；
2. **接口不能实例化**，没有构造方法，成员变量只能是常量；
3. 接口和类之间是实现关系，通过 `implements` 关键字表示：
   + `public class 类名 implements 接口名 {}`；
4. 接口的子类（实现类）：
   + 要么重写接口中的所有抽象方法；
   + 要么是抽象类；

```java
abstract class Person {
    private int age;
    private String name;
    public Person(){};
    public Person(int age, String name){
        this.age = age;
        this.name = name;
    };
    public abstract void eat();
}

interface Swim {
    public abstract void swim();
}

interface Dance {
    public abstract void dance();
}

class Student extends Person implements Swim, Dance {
    public Student(){}
    public Student(int age, String name) {
        super(age, name);
    }

    @Override
    public void eat() {
        System.out.println(this.name + " eat");
    }
    @Override
    public void swim() {
        System.out.println(this.name + " swim");
    }
    @Override
    public void dance() {
        System.out.println(this.name + " dance");
    }
}
```

![画板](https://cdn.nlark.com/yuque/0/2023/jpeg/1606439/1693561540888-9143895a-41a8-40fc-abca-dc316777e969.jpeg)

接口中除了可以定义抽象方法，还可以定义**默认方法**和**静态方法**。

默认方法不是抽象方法，所以不强制被重写。但是如果被重写，重写的时候去掉 default 关键字。

1. JDK7 以前：接口中只能定义抽象方法。
2. JDK8：接口中可以定义有方法体的方法。（默认、静态）
3. JDK9：接口中可以定义私有方法。
4. 私有方法分为两种：普通的私有方法，静态的私有方法。

### 内部类

1. 内部类的分类？

   **成员内部类**，静态内部类，局部内部类，**匿名内部类**。

2. 什么是**成员内部类**？

   写在成员位置的，属于外部类的成员。

3. 获取成员内部类对象的两种方式？

   方式一：当成员内部类被 private 修饰时，在外部类编写方法，对外提供内部类对象。

   方式二：当成员内部类被非私有修饰时，直接创建对象：`Outer.Inner oi = new Outer().new Inner();`

4. 外部类成员变量和内部类成员变量重名时，在内部类如何访问？

   `System.out.println(Outer.this.变量名);`

5. 什么是**匿名内部类**？

   使用前提条件：需要存在类/接口。

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1753882557767-78915d8c-c819-4740-bae6-8efa899da546.png)

```java
new Swiming(){
    @Override
    public void show() {
        System.out.println("匿名内部类")
    }
}
```

## 常用API

### Math

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754470530401-eb35b0ee-7879-4d81-a838-9a375cf96c11.png)

### System

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754472470122-a728d4d5-6f89-4348-9d90-a1fdb048a573.png)

### Runtime

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754485153726-c389bd42-b0f2-4050-8788-8b3066f779e6.png)

### Object

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754487151403-0d2ccaa0-9bc3-4d98-b1d4-a950952f8ce4.png)

`Object` 中的**toString** 方法调用会返回对象地址值，我们可以在 JavaBean 类中重写 `toString` 方法。

`Object` 中的**clone** 方法是**浅克隆**，克隆基本类型会创建全新的变量，克隆引用类型会继续引用克隆变量地址，不会创建全新的变量。当然，如果我们希望达到深度克隆，我们也可以重写 **clone** 方法。

在实际开发中，如果需要深拷贝可以直接使用 [GSON](https://mvnrepository.com/artifact/com.google.code.gson/gson) 这个 jar 包，来进行深拷贝。

### Objects

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754572776995-69694474-87ba-46c9-979e-ef9ee2410a84.png)

```java
Student s1 = new Student("lh", 20)
Student s2 = null

Objects.equals(s1, s2);
Objects.isNull(s2);
```

### BigInteger

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754574159295-6b68728d-5508-47eb-b5b5-035500f283a6.png)

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754574328543-8052ccd6-8244-4f29-949a-d1b87e49d886.png)

```java
BigInteger bi = new BigInteger("999999999999999999999999999");
BigInteger bi1 = BigInteger.valueOf(91111);

BigInteger bi2 = new BigInteger("01111", 2); // 将二进制的数转成十进制数
```

`BigInteger` 是一个对象，通过 `new BigInteger` 实例创建对象，如果需要加减乘除，需要通过成员方法来进行，与基本类型有区别。

### BigDecimal

+ 用于小数的精确计算
+ 用于表示很大的小数

```java
BigDecimal bd1 = new BigDecimal(0.01); // 这种方式有可能不精确，不建议使用

BigDecimal bd2 = new BigDecimal("0.01");
BigDecimal bd3 = new BigDecimal("0.09");

BigDecimal bd4 = BigDecimal.valueOf(10);

System.out.println(bd2.add(bd3));
```

如果要表示的数不大，没有超出 `double` 的取值范围，建议使用静态方法；

如果要表示的数比较大，超出了 `double` 的取值范围，建议使用构造方法；

如果我们传递的是 0-10 之间的**整数**，包含 0，包含 10，那么方法会返回已经创建好的对象，不会重新 new；

### 正则表达式

+ 校验字符串是否满足规则
+ 在一段文本中查找满足要求的内容

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754714469902-251b8854-8a9f-40d5-b34f-0f17feaa8745.png)

```java
// 手机号正则表达式：13995567034 13582921234 18523451256
String regex = "1[3-9][0-9]{9}";// 表示第一位只能是1，第二位是3-9，剩余的九位数字从0-9都可以
System.out.println("13005567091".matches(regex));

// 座机号正则：025-4323545 0721-4323545 0352323545
String regex1 = "0[0-9]{2,3}-?[1-9]\\d{4,9}";
System.out.println("025-4323545".matches(regex1));

String str = "Java，自从95年问世以来，经历了很多版本，目前企业中用的最多的是Java8和Java11，" +
    "因为这两个是长期支持版本，下一个长期支持版本是Java17，相信在未来不久Java17也会逐渐登上历史舞台";
// Pattern : 表示正则表达式
Pattern p = Pattern.compile("Java");
// Matcher ：文本匹配器
Matcher m = p.matcher(str);

while(m.find()) {
    System.out.println(m.group());
}
```

### Date

**JDK7 时间类**

+ Date
+ SimpleDateFormat
+ Calendar

```java
// 将 Date 对象通过 SimpleDateFormat 对象方法格式化
Date d = new Date();
SimpleDateFormat sf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
System.out.println(sf.format(d));

// 通过 SimpleDateFormat 对象 parse 解析方法，将字符串转换成 Date 对象
String str = "2022-02-11";
SimpleDateFormat sf1= new SimpleDateFormat("yyyy-MM-dd");
Date strDate = sf1.parse(str);
System.out.println(strDate);

// Calendar 日历类，通过调用 getInstance 方法获取日历对象
// 月份范围：0-11
// 星期日是一周的第一天
Calendar c = Calendar.getInstance();
int month = c.get(Calendar.MONTH);
c.add(Calendar.MONTH, 1)
System.out.println(c.get(Calendar.YEAR));
System.out.println(c.get(Calendar.MONTH));
System.out.println(c.get(Calendar.DATE));
```

**JDK8 时间类**

最大的特点：**返回时间不可变，每次都返回一个全新的对象**

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1754749193844-64b65e32-4f1e-4592-b66e-5ebba66e731b.png)

```java
ZoneId zi1 = ZoneId.systemDefault();// 获取当前时区

Instant is = Instant.now();// 不区分时区
System.out.println(is);

DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
ZonedDateTime zdt = ZonedDateTime.now();// 区分时区
System.out.println(df.format(zdt));

ZonedDateTime zdt1 = Instant.now().atZone(ZoneId.of("Africa/Nairobi"));
System.out.println(df.format(zdt1));

LocalDateTime ldt = LocalDateTime.now();
System.out.println(ldt.format(df));
```

### 包装类

```java
Integer i = Integer.valueOf("123");

Integer i1 = Integer.valueOf(127);
Integer i2 = Integer.valueOf(128);
// 数据在 [-128~127] 之间 Integer 会提前创建好，如果数据在这个范围直接不需要创建，直接返回

Integer i3 = Integer.parseInt("123");
```

### Lambda

区别于面向对象，`lambda` 实际是一种函数式编程的语法，Java 吸收了函数式编程的思想，简化匿名内部类的调用，使其使用简洁易懂，不需要书写一大串的匿名内部类方法。

```java
int[] arr2 = {10,2,3,5,6,1,7,8,4,9}

// 匿名类调用
//        Arrays.sort(arr2 ,new Comparator<Integer>(){
//            @Override
//            public int compare(Integer o1, Integer o2) {
//                return o1 - o2;
//            }
//        });

// lambda 调用
Arrays.sort(arr2, (o1, o2) -> {
    return o1 - o2;
});
```

## 常见算法

### 基本查找

```java
ArrayList<Integer> arrayList = new ArrayList<>();
for (int i = 0; i < arr.length; i++) {
    if(searchNum == arr[i]) {
        arrayList.add(i);
    }
}
System.out.println(arrayList);
```

### 二分查找

使用前提：**数据必须要按照升序或降序有序排列；**

```java
int min = 0;
int max = arr.length - 1;
int index = 0;

while (true){
    if(min > max) {
        System.out.println("数字不存在");
        index = -1;
        break;
    }

    int mid = (min+max)/2;
    int el = arr[mid];

    if(el > num) {
        max = mid - 1;
    }else if(el < num) {
        min = mid + 1;
    }else if(el == num) {
        index = mid;
        break;
    }
}
System.out.println(index);
```

**二分查找的过程：**

+ `min` 和 `max` 表示当前要查找的范围；
+ `mid` 是在 `min` 和 `max` 中间的；
+ 如果要查找的元素在 `mid` 的左边，缩小范围时，`min` 不变，`max` 等于 `mid-1`；
+ 如果要查找的元素在 `mid` 的右边，缩小范围时，`max` 不变，`min` 等于 `mid+1`；

### 分块查找

将数据分成若干块，每块内部有序，块间无序。先在块内二分查找定位块，再在块内线性查找。

```java
// 分块查找
int[] arr = {10, 20, 30, 40, 50, 60, 70, 80, 90};
int blockSize = 3; // 每块3个元素

// 确定元素所在块
int blockIndex = 0;
for (int i = 0; i < arr.length; i++) {
    if (arr[i] >= 50) {
        blockIndex = i / blockSize;
        break;
    }
}

// 在块内线性查找
int start = blockIndex * blockSize;
int end = Math.min(start + blockSize, arr.length);
for (int i = start; i < end; i++) {
    if (arr[i] == 50) {
        System.out.println("找到了: " + i);
        break;
    }
}
```

### 哈希查找

利用哈希函数直接计算出元素的存储位置，实现 O(1) 查找。常见实现是 HashMap。

```java
// 使用 HashMap 实现哈希查找
HashMap<Integer, Integer> map = new HashMap<>();
int[] arr = {5, 12, 8, 3, 9, 20};

// 将数组元素存入 Map，key 为值，value 为索引
for (int i = 0; i < arr.length; i++) {
    map.put(arr[i], i);
}

// 查找元素 8
if (map.containsKey(8)) {
    System.out.println("找到了，索引: " + map.get(8));
} else {
    System.out.println("未找到");
}
```

### 冒泡排序

相邻元素两两比较，大的往后放。一轮下来最大的元素就"冒"到了最后。

```java
int[] arr = {5, 3, 8, 1, 2};

for (int i = 0; i < arr.length - 1; i++) {
    for (int j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 5, 8]
```

### 选择排序

每轮从未排序部分选出最小元素，放到已排序末尾。相比冒泡排序交换次数更少。

```java
int[] arr = {5, 3, 8, 1, 2};

for (int i = 0; i < arr.length - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }
    int temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
}
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 5, 8]
```

### 插入排序

把元素插入到已排序部分的合适位置。像打牌时整理手牌一样。

```java
int[] arr = {5, 3, 8, 1, 2};

for (int i = 1; i < arr.length; i++) {
    int current = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = current;
}
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 5, 8]
```

### 快速排序

选一个基准元素，将数组分为两部分，左边小于基准，右边大于基准。递归处理左右两部分。

```java
public static void quickSort(int[] arr, int left, int right) {
    if (left >= right) return;

    int pivot = arr[left];
    int i = left, j = right;

    while (i < j) {
        while (i < j && arr[j] >= pivot) j--;
        arr[i] = arr[j];
        while (i < j && arr[i] <= pivot) i++;
        arr[j] = arr[i];
    }
    arr[i] = pivot;

    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);
}

// 调用
int[] arr = {5, 3, 8, 1, 2};
quickSort(arr, 0, arr.length - 1);
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 5, 8]
```

### 递归

方法调用自身。需要注意收敛条件，否则会栈溢出。典型应用：阶乘、斐波那契数列、汉诺塔。

```java
// 阶乘
public static int factorial(int n) {
    if (n == 1) return 1;
    return n * factorial(n - 1);
}

// 斐波那契数列: 1, 1, 2, 3, 5, 8...
public static int fibonacci(int n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 求数组最大值的递归实现
public static int getMax(int[] arr, int left, int right) {
    if (left == right) return arr[left];
    int mid = (left + right) / 2;
    int leftMax = getMax(arr, left, mid);
    int rightMax = getMax(arr, mid + 1, right);
    return Math.max(leftMax, rightMax);
}
```

### Arrays

```java
int[] arr = {1,2,34,5,6,7,8,9};

// 数组变成字符串
Arrays.toString(arr);

// 数组二分查找
Arrays.binarySearch(arr, 2);

// 拷贝数组
Arrays.copyOf(arr, 10);

// 拷贝数组（指定范围），指定范围是包头不包尾
Arrays.copyOfRange(arr, 0, 9);

// 填充数组
Arrays.fill(arr, 10);

// 数组排序（底层使用快速排序）
int[] arr2 = {10,2,3,5,6,1,7,8,4,9};
Arrays.sort(arr2);
```
