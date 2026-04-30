---
title: Java正则
date: 2026-04-30T00:00:00+08:00
category:
  - java
tags:
  - java
  - 正则
  - 正则表达式
  - Pattern
  - Matcher
---

# Java正则

原文链接：https://www.yuque.com/yopai/pp6bv5

## 正则概述

正则表达式（Regular Expression）用于**匹配、查找、替换**字符串。

```
┌─────────────────────────────────────────────────────────────┐
│                  正则能做什么                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 校验：手机号、邮箱、身份证等格式是否正确                │
│   2. 提取：从字符串中提取匹配规则的内容                      │
│   3. 替换：将符合规则的内容替换为指定字符串                  │
│   4. 分割：按规则分割字符串为数组                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 字符类

### 基本字符类

```java
// [abc]：匹配 a、b 或 c 中的任意一个
"apple".matches("[abc]");     // false（第一个是 a，但整体不匹配）
"apple".matches("a[bc]d");    // false（没有 bd）
"abd".matches("a[bc]d");      // true

// [^abc]：匹配除了 a、b、c 以外的任意字符
"dog".matches("[^abc]");      // true
"cat".matches("[^abc]");      // false

// [a-z] / [A-Z] / [0-9]：范围匹配
"f".matches("[a-z]");         // true
"G".matches("[A-Z]");         // true
"5".matches("[0-9]");         // true
"a9".matches("[a-zA-Z][0-9]"); // true

// 组合范围
"a".matches("[a-zA-Z]");      // true（字母）
"7".matches("[0-9a-zA-Z]");   // true（数字或字母）
```

### 预定义字符类

```java
// . ：匹配任意单个字符（换行符除外）
"a".matches(".");             // true
"好".matches(".");            // true
"\n".matches(".");            // false（换行符）

// \d：匹配数字，相当于 [0-9]
"5".matches("\\d");           // true
"a".matches("\\d");           // false

// \D：匹配非数字，相当于 [^0-9]
"a".matches("\\D");           // true

// \w：匹配单词字符（字母、数字、下划线），相当于 [a-zA-Z0-9_]
"a".matches("\\w");           // true
"5".matches("\\w");           // true
"_".matches("\\w");           // true
"-".matches("\\w");           // false

// \W：匹配非单词字符
"-".matches("\\W");           // true

// \s：匹配空白字符（空格、制表符、换行符等）
" ".matches("\\s");           // true
"\t".matches("\\s");          // true

// \S：匹配非空白字符
"a".matches("\\S");           // true
```

## 量词

量词表示匹配字符的数量：

```
┌─────────────────────────────────────────────────────────────┐
│                  量词符号                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   {n}     ：正好 n 次                                       │
│   {n,}    ：至少 n 次                                       │
│   {n,m}   ：n 到 m 次                                       │
│   ?       ：0 次或 1 次（相当于 {0,1}）                      │
│   *       ：0 次或多次（相当于 {0,}）                        │
│   +       ：1 次或多次（相当于 {1,}）                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 示例

```java
// {n}：正好 n 次
"abc".matches("[a-z]{3}");     // true（3个字母）
"ab".matches("[a-z]{3}");      // false（只有2个）
"abcd".matches("[a-z]{3}");    // false（4个）

// {n,}：至少 n 次
"abc".matches("[a-z]{2,}");    // true
"ab".matches("[a-z]{2,}");     // true

// {n,m}：n 到 m 次
"abc".matches("[a-z]{2,4}");   // true
"abcd".matches("[a-z]{2,4}");  // true
"ab".matches("[a-z]{2,4}");    // true

// ?：0 或 1 次
"ab".matches("ab?");           // true（b出现0次）
"abb".matches("ab?");          // true（b出现1次）
"abbb".matches("ab?");         // false（b出现2次）

// *：0 或多次
"abbb".matches("ab*");         // true
"a".matches("ab*");            // true（b出现0次）

// +：1 或多次
"ab".matches("ab+");           // true
"a".matches("ab+");            // false（b至少1次）
```

### 贪婪与非贪婪

```java
String str = "aaaa";

// 贪婪模式（默认）：尽可能多匹配
"a+".matcher(str).matches();   // "aaaa"（全部匹配）
"a{2,4}".matcher(str).matches(); // "aaaa"（取最多4个）

// 非贪婪模式（量词后加 ?）：尽可能少匹配
"a+?".matcher(str).matches();    // "a"（只匹配1个）
"a{2,4}?".matcher(str).matches(); // "aa"（取最少2个）
```

## 边界匹配

```java
// ^：字符串开头
"hello".matches("^hello");     // true
"hello".matches("^hell");      // false（不在开头）

// $：字符串结尾
"hello".matches("hello$");     // true
"hello".matches("ello$");      // true

// ^ 和 $ 一起用：整个字符串必须完全匹配
"hello".matches("^hello$");    // true
"hello world".matches("^hello$"); // false（有空格）

// \b：单词边界
"hello".matches(".*\\bhello"); // true（开头有边界）
"helloworld".matches(".*\\bhello\\b"); // false（world紧跟hello）
"hello world".matches(".*\\bhello\\b.*"); // true

// \B：非单词边界
```

## 分组与捕获

### 普通分组

```java
// (pattern)：捕获组，从左到右编号，从 1 开始
String str = "123-456-789";
Pattern p = Pattern.compile("(\\d+)-(\\d+)-(\\d+)");
Matcher m = p.matcher(str);

if (m.matches()) {
    m.group(0);    // "123-456-789"（整个匹配）
    m.group(1);    // "123"（第一组）
    m.group(2);    // "456"（第二组）
    m.group(3);    // "789"（第三组）
}
```

### 非捕获组

```java
// (?:pattern)：不创建捕获组
"(?:ab)+".matcher("ababab").matches();  // true，但不产生捕获组

// 场景：只用于分组，但不需要引用
"ab".matches("(?:ab)+");                 // true
```

### 反向引用

```java
// \n：引用第 n 个捕获组的内容
// 匹配连续重复的单词
"the the".matches("\\b(\\w+) \\1\\b");  // true（the 重复）
"dog dog".matches("\\b(\\w+) \\1\\b");  // true
"cat dog".matches("\\b(\\w+) \\1\\b");  // false

// 匹配 HTML 标签
"<div>content</div>".matches("<(\\w+)>.*?</\\1>");  // true
```

## 常用场景

### 手机号校验

```java
// 中国手机号：1 开头，第二位 3-9，后面 9 位数字
String phoneRegex = "1[3-9]\\d{9}";
"13812345678".matches(phoneRegex);  // true
"1381234567".matches(phoneRegex);   // false（少一位）
"12812345678".matches(phoneRegex);  // false（第二位是2）
"+8613812345678".matches(phoneRegex); // false（有+86）
```

### 邮箱校验

```java
// 简单版邮箱
String emailRegex = "\\w+@\\w+\\.\\w+";
"test@example.com".matches(emailRegex);   // true
"user.name@domain.co.uk".matches(emailRegex); // false（.co.uk）

// 完整版邮箱
String emailRegex2 = "[\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
"user.name@domain.co.uk".matches(emailRegex2);  // true
"a@b.c".matches(emailRegex2);                   // true
```

### 身份证校验（18位）

```java
// 18位身份证：17位数字 + 1位数字或X
String idCardRegex = "[1-9]\\d{16}[0-9Xx]";
"110101199001011234".matches(idCardRegex);  // true
"010101199001011234".matches(idCardRegex);  // false（首位不能为0）
"11010119900101123X".matches(idCardRegex);  // true
```

### URL 校验

```java
String urlRegex = "https?://[\\w.-]+(/[\\w./-]*)?";
"http://example.com".matches(urlRegex);          // true
"https://example.com/path".matches(urlRegex);    // true
"https://example.com/path/to/page".matches(urlRegex); // true
```

### 密码强度校验

```java
// 至少8位，包含数字和字母
String passwordRegex = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,}";
"Pass1234".matches(passwordRegex);   // true
"password".matches(passwordRegex);   // false（没有数字）
"Pass12".matches(passwordRegex);     // false（少于8位）
```

## Pattern 和 Matcher

### 基本用法

```java
// 方式1：直接使用 matches（适合简单场景）
"123".matches("\\d+");  // true

// 方式2：Pattern 和 Matcher（适合复杂场景）
String content = "Java is great. Java is powerful. Java is popular.";
Pattern p = Pattern.compile("Java");
Matcher m = p.matcher(content);

// find：查找下一个匹配
while (m.find()) {
    System.out.println("Found: " + m.group());
    // Found: Java
    // Found: Java
    // Found: Java
}

// matches：整个字符串是否匹配
Pattern p2 = Pattern.compile("Java");
Matcher m2 = p2.matcher("Java");
m2.matches();  // true

// replaceAll：替换所有匹配
String result = content.replaceAll("Java", "Python");
// "Python is great. Python is powerful. Python is popular."

// replaceFirst：替换第一个匹配
String result2 = content.replaceFirst("Java", "Python");
// "Python is great. Java is powerful. Java is popular."
```

### 完整示例

```java
String content = "联系邮箱：test@example.com，电话：13812345678，邮编：100000";

Pattern emailPattern = Pattern.compile("[\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
Pattern phonePattern = Pattern.compile("1[3-9]\\d{9}");
Pattern zipPattern = Pattern.compile("\\d{6}");

Matcher m;

// 提取邮箱
m = emailPattern.matcher(content);
while (m.find()) {
    System.out.println("邮箱: " + m.group());
}

// 提取手机号
m = phonePattern.matcher(content);
while (m.find()) {
    System.out.println("手机: " + m.group());
}

// 提取邮编
m = zipPattern.matcher(content);
while (m.find()) {
    System.out.println("邮编: " + m.group());
}
```

### Pattern 标志

```java
// 不区分大小写
Pattern p1 = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
"JAVA".matches("(?i)java");  // 简写形式

// 多行模式
Pattern p2 = Pattern.compile("^Java", Pattern.MULTILINE);
// 每行开头匹配

// -dotall 模式
Pattern p3 = Pattern.compile(".*", Pattern.DOTALL);
// . 匹配包括换行符的所有字符

// 组合使用
Pattern p4 = Pattern.compile("java", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);
```

## String 中的正则方法

```java
String str = "hello123world456";

// matches：整体匹配
str.matches("\\d+");                      // false
str.matches(".*\\d+.*");                  // true

// split：按正则分割
String[] parts = str.split("\\d+");       // ["hello", "world", ""]
// "hello123world456" → "hello" + "world" + ""（456后面还有一段空字符串）

// replaceAll：替换所有匹配
str.replaceAll("\\d+", "#");              // "hello#world#"

// replaceFirst：替换第一个匹配
str.replaceFirst("\\d+", "#");            // "hello#world456"
```

## 常见正则符号汇总

```
┌─────────────────────────────────────────────────────────────┐
│                  正则表达式速查表                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  字符类：                                                   │
│    [abc]       a、b 或 c 中的任意一个                       │
│    [^abc]      除了 a、b、c 以外的任意字符                  │
│    [a-z]       a 到 z 的任意字符                            │
│    .           任意单个字符（换行符除外）                   │
│    \d          数字 [0-9]                                  │
│    \D          非数字                                      │
│    \w          单词字符 [a-zA-Z0-9_]                       │
│    \W          非单词字符                                  │
│    \s          空白字符                                    │
│    \S          非空白字符                                  │
│                                                             │
│  量词：                                                     │
│    {n}         正好 n 次                                   │
│    {n,}        至少 n 次                                   │
│    {n,m}       n 到 m 次                                   │
│    ?           0 或 1 次                                   │
│    *           0 或多次                                    │
│    +           1 或多次                                    │
│                                                             │
│  边界：                                                     │
│    ^           字符串开头                                  │
│    $           字符串结尾                                  │
│    \b          单词边界                                    │
│    \B          非单词边界                                  │
│                                                             │
│  分组：                                                    │
│    (pattern)   捕获组                                      │
│    (?:pattern) 非捕获组                                    │
│    \n          引用第 n 个捕获组                           │
│                                                             │
│  转义：                                                    │
│    \\d         匹配字面量 \d（其他符号同理）               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 正则核心要点                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   字符类：[abc]、\d、\w、\s                                │
│   量词：{n}、{n,m}、?、*、+                                │
│   边界：^、$、\b                                           │
│   分组：(pattern)、(?:pattern)、\n                        │
│                                                             │
│   常用方法：                                                │
│   - String.matches()：整体匹配                             │
│   - Pattern.compile() + Matcher.find()：查找              │
│   - String.split()：分割                                   │
│   - String.replaceAll()：替换                              │
│                                                             │
│   最佳实践：                                                │
│   - 常用正则预编译为 Pattern 对象                           │
│   - 输入校验用 matches（整体匹配）                         │
│   - 内容提取用 find（部分匹配）                            │
│   - 复杂场景不要用 String.matches()，用 Pattern/Matcher    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```