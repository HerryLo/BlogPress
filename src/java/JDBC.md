---
title: Java数据库与JDBC
date: 2025-10-03T00:00:00+08:00
category:
  - java开发
tags:
  - JDBC
  - 数据库
---

# Java数据库与JDBC

## 为什么学习JDBC

JDBC是Java连接数据库的标准API。通过JDBC，Java程序可以执行SQL语句，实现数据的增删改查。

## JDBC是什么

JDBC（Java Database Connectivity）定义了Java程序与数据库通信的接口规范。

**为什么需要JDBC：**
- 应用程序不能直接操作数据库
- 通过JDBC统一接口，屏蔽底层数据库差异
- MySQL驱动、Oracle驱动都实现JDBC接口

## JDBC操作步骤

JDBC操作数据库的六个步骤：加载驱动→获取连接→创建语句→执行SQL→处理结果→关闭资源。

```java
// 1. 加载驱动
Class.forName("com.mysql.cj.jdbc.Driver");

// 2. 获取连接
String url = "jdbc:mysql://localhost:3306/blog";
Connection conn = DriverManager.getConnection(url, "root", "password");

// 3. 创建语句对象
Statement stmt = conn.createStatement();

// 4. 执行SQL
ResultSet rs = stmt.executeQuery("SELECT * FROM user");

// 5. 处理结果
while (rs.next()) {
    System.out.println(rs.getString("username"));
}

// 6. 关闭资源
rs.close();
stmt.close();
conn.close();
```

**URL参数说明：**
```java
jdbc:mysql://localhost:3306/blog
  ?useSSL=false
  &serverTimezone=UTC
  &allowPublicKeyRetrieval=true
```

## CRUD完整示例

通过一个完整的增删改查示例，演示JDBC的实际使用。

```java
public class UserDao {

    private Connection getConnection() throws Exception {
        return DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/blog", "root", "password");
    }

    // 查询单个用户
    public User selectById(int id) throws Exception {
        String sql = "SELECT * FROM user WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getString("email")
                );
            }
            return null;
        }
    }

    // 插入用户
    public int insert(User user) throws Exception {
        String sql = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getEmail());
            return ps.executeUpdate();
        }
    }
}
```

## ORM思想

为什么需要ORM？JDBC直接操作SQL语句存在以下问题：
- SQL语句与Java代码混杂
- 手动映射结果集到对象，繁琐易错
- 数据库表结构改变时，维护困难

### 什么是ORM

ORM（Object Relational Mapping）对象关系映射，将数据库表映射为Java对象。

### ORM映射关系

```
┌─────────────────────────────────────────────────────────────┐
│   Java 对象              数据库表                            │
│   ┌─────────┐           ┌─────────────┐                     │
│   │  User   │  <──────> │    user     │                     │
│   ├─────────┤           ├─────────────┤                     │
│   │ id      │           │ id          │                     │
│   │ name    │           │ username    │                     │
│   │ email   │           │ email       │                     │
│   └─────────┘           └─────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

### ORM框架对比

| 框架 | 特点 | 适用场景 |
|------|------|----------|
| MyBatis | 半自动ORM，SQL可控 | 需要灵活SQL的项目 |
| Hibernate | 全自动ORM，学习成本高 | 快速开发，中小项目 |

### JDBC vs ORM

JDBC是基础，ORM是其上层封装。学习JDBC理解SQL执行过程，学习ORM理解对象映射思想。