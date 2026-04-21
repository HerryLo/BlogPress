---
title: Java基础下
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
---

# Java基础下

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 泛型

泛型是 JDK5 引入的特性，可以在编译阶段约束操作的数据类型，并进行检查。注意：Java 中的泛型是伪泛型。

**泛型的好处**：

+ 统一的数据类型；
+ 把运行时期的问题提前到了**编译期间**，避免强制类型转换可能出现的异常，因为在编译阶段类型就能确定下来；

**泛型的细节**：

+ 泛型中不能写基础类型；
+ 指定泛型的具体类型后，传递数据时，可以传入**该类型**或其子类型；
+ 如果不写泛型，类型默认是 Object；

**泛型的使用**：

+ 定义类、方法、接口的时候，如果类型不确定，就可以定义泛型；
+ 如果类型不确定，但能知道那个继承体系中的，可以使用泛型的通配符；

```java
// 泛型格式
<T>
// 泛型通配符
<? extends T>
<? super T>

// 泛型类
// 在编写一个类时，如果不确定类型，那么这个类型可以定义为泛型类
public class ArrayListTest<T> {
    private Object[] arr = new Object[10];
    private int count = 0;

    public ArrayListTest() {
    }

    public boolean add(T e) {
        arr[size] = e;
        size++;
        return true;
    }

    public T get(int i){
        return (T) arr[i];
    }
}

// 泛型方法
// 在编写一个方法时，方法形参类型不确定时，可以使用类名后面的定义的泛型
public class ListUtil {
    private ListUtil() {}

    public static<T> void addAll(ArrayListTest<T> arr, T el1, T el2, T el3){
        arr.add(el1);
        arr.add(el2);
        arr.add(el3);
    }
}

// 泛型接口
// 实现类确定类型可以给出具体的类型，如果实现类不确定类型，那就可以延续泛型，创建对象时在给定类型
public class ListTest1 implements List<String> {
    // ....
}
public class ListTest2<T> implements List<T> {
    // ....
}
ListTest1 lt1 = new ListTest1();
ListTest2<String> lt2 = new ListTest2<>();

// 泛型通配符使用展示
class Ye{};
class Fu extends Ye{};
class Zi extends Fu{};

ArrayList<Ye> l1 = new ArrayList<>();
ArrayList<Fu> l2 = new ArrayList<>();
ArrayList<Zi> l3 = new ArrayList<>();

//  method(l1); // 报错
    method(l2);
    method(l3);

//    ? super Fu 支持传递父类和自己
//    public static void method(ArrayList<? super Fu> arr) {
//
//    }

// ? extends Fu 支持传递自己和子类
public static void method(ArrayList<? extends Fu> arr) {

}
```

## 单列集合

![画板](https://cdn.nlark.com/yuque/0/2025/jpeg/1606439/1755599412569-49e0817c-7dd0-4f61-bccd-2a136f54be12.jpeg)

+ `Collection`、`List`、`Set` 是**接口**；
+ `ArrayList、LinkedList、HashSet、TreeSet、LinkedHashSet` 是**实现类**；
+ **List** 系列集合：**添加的元素是有序、可重复、****有索引**；
+ **Set** 系列集合：**添加的元素是无序、不重复、****无索引**；

```java
Collection<String> coll = new ArrayList<>();

// 添加
coll.add("aaa");
coll.add("bbb");
coll.add("ccc");

// 删除
coll.remove("aaa");// 删除成功返回true，失败返回false

// 判断元素是否包含
// 底层依赖equals进行判断，如果需要判断对象内部属性是否一致，需要重写equals方法
coll.contains("aaa");

// 判断集合是否为空
coll.isEmpty();

// 获取集合长度
coll.size();

// 清空
coll.clear();
```

### 迭代器

+ 迭代器在 Java 中的类是 **Iterator**，迭代器是集合专用的遍历方式。
+ 每次迭代器遍历完以后，如果再想遍历，必须再创建新的迭代器；

```java
Collection<String> coll = new ArrayList<>();

// 添加
coll.add("aaa");
coll.add("bbb");
coll.add("ccc");

Iterator<String> it = coll.iterator;

while(it.hasNext()){
    String str = it.next();
    System.out.println(str);
}
```

### 增强for遍历

+ 增强 for 底层就是迭代器，它是为了简化迭代器书写的；
+ 它是 JDK5 后出现的，其内部原理就是一个 **Iterator** 迭代器；
+ 所有的单列集合或数组才能使用增强 for 遍历；
+ 修改增强 for 中的变量，不会改变集合中原本的数据；

```java
Collection<String> coll = new ArrayList<>();

// 添加
coll.add("aaa");
coll.add("bbb");
coll.add("ccc");

for(String item : coll){
     System.out.println(item);
}
```

### Lambda遍历

+ 底层原理：在内部会自己遍历集合，依次得到每一个元素；

```java
Collection<String> coll = new ArrayList<>();

// 添加
coll.add("aaa");
coll.add("bbb");
coll.add("ccc");

coll.forEach((String s) -> {
    System.out.println(s);
})
```

### List集合

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> li = new ArrayList<>();

        // 添加元素
        li.add("aaa");
        li.add("bbb");
        li.add("ccc");

        // 把元素添加到指定的索引位置，原来索引上的元素依次往后
        li.add(1, "ddd");

        // 删除指定索引的元素，并返回被删除的元素
        li.remove(0);

        // 修改指定索引的元素，并返回被修改的元素
        li.set(1, "ddd");

        // 可选：打印结果查看
        System.out.println(li);
    }
}
```

![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1755695714100-9f82fdb8-359a-42c5-8820-37ecae9a48a6.png)

### ArrayList

**底层数据结构是数组**，数组默认长度是 10。

1. 利用空参创建的集合，在底层创建一个默认长度为 0 的数组；
2. 添加第一个元素时，底层会创建一个新的长度为 10 的数组；
3. 当数组添加满之后，会自动扩容为 1.5 倍；
4. 如果一次添加多个元素，1.5 倍还放不下，则会新创建数组的长度以实际为准；

### LinkedList

**底层数据结构是双链表（双向链表）**，查询慢，增删快，但如果操作的是首尾元素，速度极快。

```java
// 每个元素会保存上一个和下一个的地址
private static class Node{
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next ) {
        this.element = element;
        this.prev = prev;
        this.next = next;
    }
}
```

### Set集合

**特点**：

+ 无序、不重复、无索引
+ Set 集合的方法上基本上与 Collection 的 API 一致

**实现类特点**：

+ HashSet: 无序、不重复、无索引
+ LinkedHashSet: 有序、不重复、无索引
+ TreeSet: 可排序、不重复、无索引

### HashSet

`HashSet` 集合底层采取**哈希表**存储数据。哈希表是一种对于增删改查数据性能都较好的结构。

哈希表组成在 JDK8 之前是由：数组 + 链表组成，**在 JDK8 开始是由：数组 + 链表 + 红黑树**。

**哈希值：**

+ 根据 `hashcode` 方法算出来的 `int` 类型的整数；
+ 该方法定义在 `Object` 类中，所有对象都可以调用，默认使用地址值进行计算，一般情况下，会重写 `hashcode` 方法，利用对象内部的属性值计算哈希值；

**对象的哈希值特点：**

+ 如果**没有重写** `hashcode` 方法，此时的哈希值就是地址值，**不同对象计算出的哈希值是不同的；**
+ 如果**已经重写** `hashcode` 方法，**不同的对象只要属性值相同，计算出的哈希值就是一样的；**
+ 在小部分情况下，不同的属性值或者不同的地址值计算出来的哈希值也有可能一样。（**哈希碰撞**）

### LinkedHashSet

有序、不重复、无索引。

底层数据结构是依然**哈希表**，只是每个元素又额外的多了一个双链表的机制记录存储的顺序。

### TreeSet

`TreeSet` 集合底层是基于**红黑树**的数据结构实现排序的，增删改查性能都较好。

+ 不包含重复元素的集合
+ 没有带索引的方法
+ 可以将元素按照规则进行排序

**自定义排序规则方式：**

1. 方法一：JavaBean 类实现 Comparable 接口，指定比较规则；
2. 方法二：创建集合时，自定义 Comparator 比较器对象，指定比较规则；

### 使用总结

1. 如果想要集合中的元素可重复

**用 ArrayList 集合，基于数组的。（用的最多）**

2. 如果想要集合中的元素可重复，而且当前的增删操作明显多于查询

**用 LinkedList 集合，基于链表的。**

3. 如果想对集合中的元素去重

**用 HashSet 集合，基于哈希表。（用的最多）**

4. 如果想对集合中的元素去重，而且保证存取顺序

**用 LinkedHashSet 集合，基于哈希表和双链表，效率低于 HashSet。**

5. 如果想对集合中的元素进行排序

**用 TreeSet 集合，基于红黑树。后续也可以用 List 集合实现排序。**

## 双列集合

双列集合一次需要存一对数据，分别是键和值，键值这个整体，俗称键值对，在 Java 中称为 Entry 对象。

![画板](https://cdn.nlark.com/yuque/0/2025/jpeg/1606439/1756280156158-5d2f035c-ba46-49b3-bea4-6a6e9514b10d.jpeg)

+ `Map` 是双列集合中的顶层**接口**；
+ `HashMap`、`TreeMap`、`LinkedHashMap` 是**实现类**；

```java
Map<String, String> map1 = new HashMap<>();

// 添加
map1.put("name", "lh");
map1.put("age", "18");
map1.put("sex", "0101");

// 删除
String result = map1.remove("name"); // lh

// 清空
map1.clear();

// 判断是否包含指定键
boolean keyBoolean = map1.containsKey("age"); // true

// 判断是否包含指定值
boolean valueBoolean = map1.containsValue("19"); // false

// 是否为空
map1.isEmpty();

// 长度
map1.size();

// 遍历一：通过键找值
Set<String> keys = map1.keySet();
for(String key: keys){
    String value = map1.get(key);
}

// 遍历二：通过键值对对象遍历
Set<Map.Entry<String, String>> entrys = map1.entrySet();
for(Map.Entry<String, String> entry: entrys){
    String key = entry.getKey();
    String value = entry.getValue();
}

// 遍历三：通过 lambda 遍历
map1.forEach((String key, String value) -> {
    //...
})
```

### HashMap

特点都是由键决定的：无序、不重复、无索引。

+ `HashMap` 底层是哈希表结构的
+ 依赖 hashcode 方法和 equals 方法保证**键的唯一**；
+ **如果键存储的是自定义对象，需要重写 hashcode 和 equals 方法**；
+ **如果值存储自定义对象，不需要重写 hashcode 和 equals 方法**；

### LinkedHashMap

+ 由键决定：有序、不重复、无索引。
+ 这里的有序指的是保证存储和取出的元素顺序一致；
+ **原理**：底层数据结构是依然哈希表，只是每个键值对元素又额外的多了一个双链表的机制记录存储的顺序。

### TreeMap

+ `TreeMap` 跟 `TreeSet` 底层原理一样，都是红黑树结构的；
+ 由键决定特性：不重复、无索引、可排序；
+ 可排序：对键进行排序；
+ 注意：默认按照键的从小到大进行排序，也可以自己规定键的排序规则；

## 集合扩展

### 可变参数

可变参数本质是一个数组。作用是：在形参接收多个参数。

**注意**：1. 形参列表只能有一个；2. 可变参数必须放在形参列表的最后面。

```java
public int getSum(int...arg) {

}
```

### Collections

```java
ArrayList<String> list = new ArrayList<>();

// 批量添加
Collections.addAll(list, "1","2","3","4");

// 排序：按自然顺序排序，或使用自定义比较器。
Collections.sort(list)

// 反转：反转集合顺序。
Collections.reverse(list)

// 打乱：随机打乱集合顺序。
Collections.shuffle(list)

// 交换：交换指定索引的元素。
Collections.swap(list, i, j)
```

### 不可变集合

```java
List<String> list = List.of("1","2","3"); // 只能遍历，无法修改

// Set 集合中元素是唯一的，故 Set 不可变集合中元素不能重复，如果重复会报错
Set<String> list = Set.of("1","2","3","3"); // 只能遍历，无法修改

// 在创建 Map 不可变集合中，可以出现键不同值相同的情况
Map<String, String> map = Map.of("张三","南京","李四","北京","王五","北京");
```

## Stream

通过 stream 流来链式调用单列集合、双列集合、数组，在进行链式调用时，方法体中直接使用 lambda 表达式。

**中间方法：**

+ filter 过滤
+ limit 获取前几个元素
+ skip 跳过前几个元素
+ distinct 元素去重，依赖 hashcode 和 equals 方法
+ concat 合并 a 和 b 两个流为一个流
+ **map** 转换流中的数据类型

**终结方法：**

+ **forEach** 遍历
+ count 统计
+ **toArray** 收集流中的数据，放到数组中
+ **collect** 收集流中的数据，放到集合中

```java
ArrayList<String> arrayList = new ArrayList<>();
Collections.addAll(arrayList, "a-1","b-1","c-1","d-1");

arrayList.stream().filter(s -> s.equals("a"))
  .forEach(s -> System.out.println(s));

arrayList.stream().limit(2)
 .forEach(s -> System.out.println(s));

arrayList.stream().skip(2)
 .forEach(s -> System.out.println(s));

arrayList.stream().distinct()
 .forEach(s -> System.out.println(s));

// 转换数据类型
arrayList.stream().map(Integer::parseInt).forEach(s -> System.out.println(s));

// 转换成单列、双列集合
arrayList.stream().collect(Collectors.toMap(s -> s.split("-")[0], s -> s.split("-")[1]));
arrayList.stream().collect(Collectors.toCollection(ArrayList::new));
arrayList.stream().collect(Collectors.toList());
```

## 方法引用

方法引用就是把已经有的方法拿过来用，当作函数式接口中抽象方法的方法体。

1. 引用**静态方法**：`类名::静态方法`
   + 方法的形参和返回值需要与抽象方法的形参和返回值保持一致；
2. 引用**成员方法**：`对象::成员方法`
   + `其他类对象::方法名`、`this::方法名`、`super::方法名`；
3. 引用**构造方法**：`类型::new`
   + 被引用方法存在，且需要有函数式接口；
   + 被引用方法的形参和返回值需要与抽象方法的形参和返回值保持一致；
   + 被引用的方法功能需要满足当前的需求；
4. **其他调用方法**
   + 引用类名引用成员方法 `类名::成员方法`
   + 引用数组构造方法 `数据类型[]::new`

## 异常

![画板](https://cdn.nlark.com/yuque/0/2025/jpeg/1606439/1760270622293-f00f62a9-b5c8-41ff-8fd1-b6958eef9e0f.jpeg)

对于异常处理的日常使用分为两种：一种是写在方法里面，抛出异常；另外一种是写在方法调用的时候，对于可能抛出异常的接受处理，示例如下：

```java
// 抛出异常
class Student {
    // ... 省略
    public void setName(String name) {
        if(name.length() < 6 || name.length() > 40){
            // 抛出自定义异常
            throw new NameFormatException(name + "：名字格式有误，长度应该为：6 ~ 40");
        }
        this.name = name;
    }
}

// 通过 try/catch 接收并处理异常
try{
    Student s = new Student("abababbabab",18);
    s.setName("abab");
} catch (NameFormatException e) {
    System.out.println(e.getMessage());
    e.printStackTrace();
}
```

## 注解

注解（Annotation）是 Java 语言用于工具处理的标注：定义"在哪里做"和"做什么"。

注解，本身不包含任何业务逻辑代码。它们的作用是标记，为类或方法附加元数据。

从 JVM 的角度看，注解本身对代码逻辑没有任何影响，如何使用注解完全由工具决定。

## 反射

反射就是 Reflection，Java 的反射是指程序在运行期可以拿到一个对象的所有信息。

动态代理（Dynamic Proxy）的机制：可以在运行期动态创建某个 `interface` 的实例。

## IO

IO 流是存储和读取数据的解决方案；

IO 流主要用于读写数据（本地文件、网络）；

注意：不论是字节缓冲还是字符缓冲，都是通过较少系统 IO 操作次数来提升读写的效率，通过一次性读取更多的数据，减少系统 IO 操作的时间。

### File对象

**File 对象**

+ `File(String pathname)`：可以根据文件路径创建文件对象；
+ `File(String parent, String child)`：根据父路径名字字符串和子路径字符串创建文件对象；
+ `File(File parent, String child)`：根据父路径对应文件对象和子路径名字字符串创建文件对象；

**File 对象方法（判断、获取）**

+ `File[] listRoots()`：列出可用文件系统根
+ `String[] list()`：获取当前路径下所有内容
+ `String[] list(FilenameFilter filter)`：利用文件名过滤器获取当前该路径下所有内容
+ `File[] listFiles()`：获取当前路径下所有内容
+ `File[] listFiles(FileFilter filter)`：利用文件名过滤器获取当前该路径下所有内容
+ `File[] listFiles(FilenameFilter filter)`：利用文件名过滤器获取当前该路径下所有内容
+ `isDirectory` 是否文件夹
+ `isFile` 是否文件
+ `exists` 文件是否存在
+ `length` 文件大小字节数

**File 对象方法（创建、删除）**

+ `createNewFile` 创建空文件
+ `mkdir` 创建单级目录
+ `mkdirs` 创建多级目录
+ `delete` 删除文件、文件夹

### IO流

![画板](https://cdn.nlark.com/yuque/0/2025/jpeg/1606439/1765266573367-2ea46802-4097-42c3-bff2-839ef879fbdf.jpeg)

IO 流有字节流、字符流两大类，IO 流相关的 API 主要就是围绕它们两个。不论是字节流还是字符流，都包含 Input 和 Output 两种类型，Input 流是用来 `read` 读取数据，Output 流是用来 `write` 写入数据。

我们拿视频 copy 举例，由于需要处理视频流，我们用到**字节流**处理：

```java
try(FileInputStream fis = new FileInputStream("D:\\test\\test.mp4");
FileOutputStream fos = new FileOutputStream("JavaLearn\\test.mp4");){
    int len;
    // bytes 是控制每次读取的数据长度
    byte[] bytes = new byte[1024*1024*5];
    while((len = fis.read(bytes)) != -1) {
        // bytes 是获取到的字节数组；
        // len 表示读取的字节个数；
        // 添加 0 和 len 的目的是，bytes 数组有可能装不满，保证写入时，读多少就写多少
        fos.write(bytes, 0, len);
    }
}catch(Exception e) {
    e.printStackTrace();
}
```

其中 `FileInputStream` 输入流是将文件中的数据读取到程序中，`FileOutputStream` 输出流是程序中的数据写出到本地文件中。

这里我们考虑到文件过大，所以使用 `byte[]` 数组进行批量读取，这样可以减少系统频繁调用提升性能，如果还想提升读取性能，我们可以考虑使用字节缓冲流操作文件。

## 多线程

多线程具体操作实现有三种方法：

+ 通过继承 Thread 类实现，缺点是扩展性弱；
+ 通过实现 Runnable 接口实现；
+ 通过 Callable 接口和 Future 接口实现；

```java
Thread t = new Thread();
t.start(); // 调用线程
t.join(); // 等待 t 线程结束

public class MyThread extends Thread {
    @Override
    public void run() {
        // 线程具体业务代码
    }
}
```

```java
MyRunnable task = new MyRunnable();
Thread thread = new Thread(task); // 将任务传递给线程
thread.start();

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // 线程具体业务代码
    }
}
```

```java
public class CallableExample {
    public static void main(String[] args) throws Exception {
        // 定义 Callable 任务
        Callable<String> callableTask = () -> {
            Thread.sleep(1000); // 模拟耗时操作
            return "任务完成";
        };

        // 封装 Callable 到 FutureTask
        FutureTask<String> futureTask = new FutureTask<>(callableTask);

        // 启动线程执行任务
        new Thread(futureTask).start();

        // 获取任务结果（阻塞直到完成）
        String result = futureTask.get();
        System.out.println("结果: " + result);
    }
}
```

### synchronized

Java 程序依靠 `synchronized` 对线程进行同步，使用 `synchronized` 的时候，锁住的是哪个对象非常重要。

```java
Thread t1 = new MyThread();
Thread t2 = new MyThread();

t1.setName("线程1");
t2.setName("线程2");

t1.start();
t2.start();

public class MyThread extends Thread {
    static int count = 0;

    @Override
    public void run() {
        int localcount;
        while(true) {
            synchronized(MyThread.class) { // 同步锁
                if(count >= 100) {
                    break;
                }else {
                    count += 1;
                    localcount = count;
                }
            } // 释放锁
            System.out.println(Thread.currentThread().getName()+":"+localcount)

            // JVM 锁优化机制会让同一个线程更容易获得锁
            try{
                // 添加延时，增加线程切换机会
                Thread.sleep((int)(Math.random() * 10));
            }catch(InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
```

+ 多线程同时读写共享变量时，可能会造成逻辑错误，因此需要通过 `synchronized` 同步；
+ 同步的本质就是给指定对象加锁，加锁后才能继续执行后续代码；
+ 注意加锁对象必须是同一个实例；
+ 对 JVM 定义的单个原子操作不需要同步。

### 线程池

> 线程池其实是一种池化的技术实现，池化技术的核心思想就是实现资源的复用，避免资源的重复创建和销毁带来的性能开销。线程池可以管理一堆线程，让线程执行完任务之后不进行销毁，而是继续去处理其它线程已经提交的任务。

```java
public class ThreadPoolExample {
    public static void main(String[] args) throws Exception {
        // 线程池
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // 提交 Callable 任务
        Future<Integer> future = executor.submit(() -> {
            Thread.sleep(2000);
            return 42;
        });

        System.out.println("等待结果...");
        Integer result = future.get(); // 阻塞获取结果
        System.out.println("结果: " + result);

        // 释放线程池
        executor.shutdown();
    }
}
```

> 线程池的使用可以通过 Executors 来快速创建，但是不推荐使用，因为 Executors 创建的线程池都有一些缺陷，比如无界队列可能导致内存溢出，无限大的线程数可能导致机器负载过高。所以在实际的项目中，建议自定义线程池 ThreadPoolExecutor，根据业务场景来合理地设置线程数、队列大小等参数。
