---
title: Java-IO流
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - IO
  - 流
---

# Java-IO流

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## IO 流概述

IO 流用于读写数据（本地文件、网络等）。

```
┌─────────────────────────────────────────────────────────────┐
│                  IO 流分类                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   按方向：                                                  │
│   - 输入流：读取数据（Input / Reader）                      │
│   - 输出流：写入数据（Output / Writer）                     │
│                                                             │
│   按类型：                                                  │
│   - 字节流：处理二进制数据（所有文件）                      │
│   - 字符流：处理文本数据                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| 分类 | 字节输入流 | 字节输出流 | 字符输入流 | 字符输出流 |
|------|------------|------------|------------|------------|
| 基类 | InputStream | OutputStream | Reader | Writer |
| 文件流 | FileInputStream | FileOutputStream | FileReader | FileWriter |
| 缓冲流 | BufferedInputStream | BufferedOutputStream | BufferedReader | BufferedWriter |

## File 对象

File 对象用于操作文件和目录：

```java
// 创建 File 对象
File file1 = new File("D:/test.txt");
File file2 = new File("D:/test", "demo.txt");
File parent = new File("D:/test");
File file3 = new File(parent, "demo.txt");
```

### 判断和获取方法

```java
File file = new File("D:/test.txt");

file.isDirectory();    // 是否是目录
file.isFile();         // 是否是文件
file.exists();         // 是否存在
file.length();         // 文件大小（字节）

file.getName();        // 文件名（不含路径）
file.getPath();        // 获取构造时的路径
file.getAbsolutePath(); // 获取绝对路径

file.lastModified();  // 最后修改时间（毫秒时间戳）
```

### 创建和删除

```java
File file = new File("D:/test.txt");

file.createNewFile();   // 创建空文件（需处理 IOException）
file.mkdir();          // 创建单级目录
file.mkdirs();         // 创建多级目录
file.delete();         // 删除文件或空目录（成功返回 true）
```

### 遍历目录

```java
File dir = new File("D:/test");

// 列出所有文件名
String[] names = dir.list();
for (String name : names) {
    System.out.println(name);
}

// 列出所有 File 对象
File[] files = dir.listFiles();
for (File f : files) {
    System.out.println(f.getName());
}
```

## 字节流

### FileInputStream 文件输入流

```java
// 读取文件
try (FileInputStream fis = new FileInputStream("test.txt")) {
    int data;
    while ((data = fis.read()) != -1) {
        System.out.print((char) data);
    }
}

// 使用字节数组读取（更高效）
try (FileInputStream fis = new FileInputStream("test.txt")) {
    byte[] bytes = new byte[1024];
    int len;
    while ((len = fis.read(bytes)) != -1) {
        System.out.println(new String(bytes, 0, len));
    }
}
```

### FileOutputStream 文件输出流

```java
// 写入文件
try (FileOutputStream fos = new FileOutputStream("test.txt")) {
    fos.write(97);  // 写入字节
    fos.write("hello".getBytes());  // 写入字符串
    fos.flush();  // 刷新缓冲区
}
```

### 文件复制

```java
// 视频 copy 示例
try (FileInputStream fis = new FileInputStream("D:/test/test.mp4");
     FileOutputStream fos = new FileOutputStream("JavaLearn/test.mp4")) {

    int len;
    byte[] bytes = new byte[1024 * 1024 * 5];  // 5MB 缓冲区
    while ((len = fis.read(bytes)) != -1) {
        fos.write(bytes, 0, len);
    }
}
```

### 字节缓冲流

```java
// 字节缓冲输入流
try (BufferedInputStream bis = new BufferedInputStream(
        new FileInputStream("source.txt"))) {

    int data;
    while ((data = bis.read()) != -1) {
        // 处理数据
    }
}

// 字节缓冲输出流
try (BufferedOutputStream bos = new BufferedOutputStream(
        new FileOutputStream("target.txt"))) {

    bos.write("hello".getBytes());
}
```

## 字符流

### FileReader 文件字符输入流

```java
// 使用 FileReader 读取文本文件
try (FileReader fr = new FileReader("test.txt")) {
    int ch;
    while ((ch = fr.read()) != -1) {
        System.out.print((char) ch);
    }
}

// 使用字符数组读取
try (FileReader fr = new FileReader("test.txt")) {
    char[] chars = new char[1024];
    int len;
    while ((len = fr.read(chars)) != -1) {
        System.out.println(new String(chars, 0, len));
    }
}
```

### FileWriter 文件字符输出流

```java
// 使用 FileWriter 写入文本文件
try (FileWriter fw = new FileWriter("test.txt")) {
    fw.write("hello");
    fw.flush();
}
```

### 字符缓冲流

```java
// BufferedReader 高效读取
try (BufferedReader br = new BufferedReader(
        new FileReader("test.txt"))) {

    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// BufferedWriter 高效写入
try (BufferedWriter bw = new BufferedWriter(
        new FileWriter("test.txt"))) {

    bw.write("hello");
    bw.newLine();       // 换行
    bw.write("world");
    bw.flush();
}
```

## 转换流

处理字符编码问题：

```java
// 读取指定编码的文件
try (InputStreamReader isr = new InputStreamReader(
        new FileInputStream("test.txt"), "GBK")) {

    int ch;
    while ((ch = isr.read()) != -1) {
        System.out.print((char) ch);
    }
}

// 写入指定编码的文件
try (OutputStreamWriter osw = new OutputStreamWriter(
        new FileOutputStream("test.txt"), "UTF-8")) {

    osw.write("你好");
}
```

## 序列化与反序列化

### 对象输出流 ObjectOutputStream

```java
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("user.dat"))) {

    User user = new User("Herry", 18);
    oos.writeObject(user);
}
```

### 对象输入流 ObjectInputStream

```java
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("user.dat"))) {

    User user = (User) ois.readObject();
    System.out.println(user.getName());
}
```

**注意**：对象需要实现 `Serializable` 接口：

```java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
}
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  IO 流核心要点                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   分类：                                                    │
│   - 字节流：InputStream / OutputStream                     │
│   - 字符流：Reader / Writer                                │
│                                                             │
│   缓冲流：提升读写效率                                       │
│   - BufferedInputStream / BufferedOutputStream            │
│   - BufferedReader / BufferedWriter                        │
│                                                             │
│   File：操作文件/目录                                       │
│                                                             │
│   序列化：ObjectOutputStream / ObjectInputStream           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
