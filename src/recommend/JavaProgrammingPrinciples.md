---
title: '浅读Java编程思想(第4版)'
date: 2024-01-01T00:00:00+08:00
category:
  - 推荐
tags:
    - Java
    - 编程思想
---

# 浅读Java编程思想(第4版)

## 一切皆对象
Java的核心哲学：一切皆为对象。通过引用操作对象，引用就像遥控器，对象是电视。

```java
String s = new String("hello");
```

基本类型有例外：int、float、boolean等不是对象，但Java为其提供了包装类使其"对象化"。存储区域分工明确：寄存器最快、栈存放引用和基本类型、堆存放对象、静态区存类信息。数组在Java中是对象，有内置length属性和安全检查。

## 初始化与清理
构造器是对象初始化的核心，通过重载支持多种初始化方式。this关键字指向当前对象，static成员属于类而非实例。

```java
class Dog {
    String name;
    Dog(String name) {
        this.name = name;  // this区分成员变量和参数
    }
    static int count;      // 所有实例共享
}
```

成员初始化顺序：声明顺序初始化 → 构造器 → 对象创建。代码块在构造器之前执行。垃圾回收器负责清理无用对象，finally确保清理代码执行。

## 访问权限控制
Java四级访问权限：

```java
public class Person {}           // 公开
protected String name;          // 子类+同包可见
private int age;                 // 仅本类可见
String address;                  // 同包可见
```

权限控制是封装的基础，类库设计通过public/private/protected划分接口和实现。

## 复用类
组合（has-a）和继承（is-a）是两种复用方式。

```java
class Engine {}                  // 组合
class Car {
    private Engine engine;       // Car has-a Engine
}
class Vehicle {}
class Bus extends Vehicle {}     // 继承，Bus is-a Vehicle
```

final修饰类阻止继承，protected允许子类访问父类成员。代理是组合的变种，兼组合与继承之长。

## 多态
多态让父类引用指向子类对象，方法调用在运行时绑定到实际类型。

```java
class Animal { void eat() {} }
class Dog extends Animal { void eat() { System.out.println("狗吃骨头"); } }

Animal a = new Dog();  // 向上转型
a.eat();               // 输出"狗吃骨头"，运行时确定
```

抽象类（abstract）和接口（interface）定义契约，具体实现由子类完成。向下转型需用instanceof检查安全性。

## 接口
接口是100%抽象的类，支持多继承。

```java
interface Eatable { void eat(); }
interface Serializable { void serialize(); }
class Apple implements Eatable, Serializable {
    public void eat() {}
    public void serialize() {}
}
```

接口中嵌套接口/类，默认public static。工厂模式、回调机制大量依赖接口。接口与抽象类的选择：需要多重继承时用接口，需要实例变量时用抽象类。

## 内部类
内部类可以访问外围类的所有成员，包括private。

```java
class Outer {
    private int x = 10;
    class Inner {
        void print() { System.out.println(x); }
    }
}
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
```

匿名内部类适合一次性实现接口或继承类。常用于事件监听器和回调。

```java
button.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("点击");
    }
});
```

## 持有对象（集合框架）
List、Set、Map三大集合接口，List有序可重复（ArrayList、LinkedList），Set无序去重（HashSet、TreeSet），Map键值对（HashMap、TreeMap）。

```java
List<String> list = new ArrayList<>();  // 泛型保证类型安全
list.add("java");
for (String s : list) { System.out.println(s); }  // foreach遍历

Map<String, Integer> map = new HashMap<>();
map.put("java", 1);
```

Iterator是统一的遍历接口，foreach本质是迭代器。集合只存放引用类型，基本类型需用包装类。

## 异常与错误处理
Java异常是可控的，强制捕获或声明。

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("除数不能为零");
} finally {
    System.out.println("资源释放");
}
```

RuntimeException无需捕获，其他checked exception必须捕获或声明。异常链保留原始异常信息。自定义异常继承Exception。

## 字符串
String是不可变对象，创建后内容不能改变。

```java
String s1 = "hello";           // 字符串池
String s2 = "hello";           // 复用池中对象
String s3 = new String("hello"); // 创建新对象

// 字符串拼接效率低
String sql = "SELECT * FROM " + tableName + " WHERE id = " + id; // 每次创建新StringBuilder

// 推荐
StringBuilder sb = new StringBuilder();
sb.append("SELECT * FROM ").append(tableName);
```

StringBuilder（非线程安全）比StringBuffer（线程安全）性能更好。字符串操作方法：indexOf、substring、replace、split、trim、format。

## 类型信息（反射与RTTI）
Class对象是类型信息的入口，类加载时自动生成。

```java
Class<?> clazz = Class.forName("com.example.Dog");  // 反射获取
Class<?> clazz = Dog.class;                        // 类字面量

Object obj = clazz.newInstance();                  // 创建实例
Method method = clazz.getMethod("bark");            // 获取方法
method.invoke(obj);                                 // 调用方法
```

反射是框架的灵魂，动态代理（Proxy）在RPC、Spring AOP中大量使用。RTTI（Run-Time Type Identification）在instanceof和转型时使用。

## 泛型
泛型让集合等容器在编译时检查类型安全。

```java
List<Dog> dogs = new ArrayList<>();
dogs.add(new Dog());
Dog d = dogs.get(0);  // 无需强制转换

// 类型通配符
void printAll(List<?> list) {}           // 任意类型
void printDogs(List<? extends Animal> list) {} // Animal的子类
void addNumbers(List<? super Integer> list) {} // Integer的父类
```

类型擦除：泛型信息在运行时丢失，编译器自动插入强制转换。泛型不能直接用于基本类型、不能创建泛型数组、不能直接实例化T。

## 数组
数组是固定长度的连续内存，效率高于容器。

```java
int[] arr = new int[10];        // 基本类型数组
Dog[] dogs = new Dog[5];        // 引用数组
dogs[0] = new Dog();

// 可变参数
void print(String... args) {
    for (String s : args) System.out.println(s);
}
print("a", "b", "c");
```

多维数组可以是不规则数组：`int[][] arr = new int[3][]; arr[0] = new int[5];`。数组与容器可通过`Arrays.asList()`互转。

## 容器再研究
底层实现决定性能特点。HashMap用数组+链表（JDK8后红黑树）实现，利用hashCode定位。

```java
Map<String, Integer> map = new LinkedHashMap<>();  // 保持插入顺序
map.put("first", 1);
map.put("second", 2);
// 遍历顺序：first, second

// 自定义对象作为Map的key必须重写hashCode和equals
class Person {
    String name;
    int hashCode() { return name.hashCode(); }
    boolean equals(Object o) { return name.equals(((Person)o).name); }
}
```

Queue接口、双端队列Deque、PriorityQueue（堆实现）。并发容器：ConcurrentHashMap、CopyOnWriteArrayList等。

## I/O系统
Java I/O采用装饰器模式，层层包装流。

```java
// 字节流
FileInputStream fis = new FileInputStream("a.txt");
BufferedInputStream bis = new BufferedInputStream(fis);

// 字符流
FileReader fr = new FileReader("a.txt");
BufferedReader br = new BufferedReader(fr);
String line;
while ((line = br.readLine()) != null) System.out.println(line);

// 对象序列化
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("obj.dat"));
oos.writeObject(new Dog("旺财"));
```

InputStream/OutputStream处理字节，Reader/Writer处理字符。序列化（Serializable）使对象可持久化传输，transient修饰的字段不参与序列化。

## 枚举类型
枚举是语法糖，本质是final类。

```java
enum Color { RED, GREEN, BLUE; }

Color c = Color.RED;
switch (c) {
    case RED: System.out.println("红色"); break;
    case GREEN: System.out.println("绿色"); break;
}

// 枚举可以有构造器和方法
enum Status {
    SUCCESS(200), ERROR(500);
    private final int code;
    Status(int code) { this.code = code; }
    int getCode() { return code; }
}
```

枚举values()方法返回所有常量数组，可实现接口。枚举常用于替代常量定义，提供类型安全。

## 注解
注解是元数据，不影响程序逻辑但可被工具读取。

```java
@Retention(RetentionPolicy.RUNTIME)  // 运行时保留
@Target(ElementType.METHOD)           // 作用于方法
public @interface MyAnnotation {
    String value() default "default";  // 注解元素
}

@MyAnnotation(value = "test")
public void method() {}
```

Java内置注解：@Override、@Deprecated、@SuppressWarnings。元注解@Target、@Retention、@Documented、@Inherited。注解广泛用于JUnit单元测试、Hibernate映射、Spring配置、lombok等。

## 并发
线程是调度的基本单位，多线程实现并行处理。

```java
class MyThread extends Thread {
    public void run() { System.out.println("线程执行"); }
}
new MyThread().start();

// 实现Runnable
class MyRunnable implements Runnable {
    public void run() {}
}
new Thread(new MyRunnable()).start();

// Callable带返回值
Future<Integer> future = executor.submit(new Callable<Integer>() {
    public Integer call() { return 42; }
});
Integer result = future.get();
```

synchronized同步方法或代码块，volatile保证可见性。wait/notify实现线程间通信。java.util.concurrent提供高级工具：ExecutorService线程池、CountDownLatch、CyclicBarrier、Semaphore、BlockingQueue、ConcurrentHashMap等。并发编程需注意死锁、活锁、饥饿问题。

## 图形化用户界面
AWT依赖本地系统组件，Swing纯Java实现，轻量级组件更多。

```java
JFrame frame = new JFrame("标题");
frame.setSize(400, 300);
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

JButton button = new JButton("点击");
button.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("按钮点击");
    }
});
frame.add(button);

frame.setVisible(true);
```

布局管理器管理组件位置：FlowLayout流式、BorderLayout东南西北中、GridLayout网格。事件监听器模式处理用户交互。此部分非Java核心领域，仅为桌面应用开发基础。