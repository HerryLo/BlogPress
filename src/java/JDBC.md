---
title: Java数据库与JDBC
date: 2025-10-03T00:00:00+08:00
category:
  - java开发
tags:
  - MySQL
  - JDBC
  - 数据库
---

# Java数据库与JDBC

## 为什么学习JDBC

在实际项目中，前端发送的请求需要后端处理，业务逻辑最终要与数据库交互。JDBC是Java操作数据库的基础，本章学习JDBC的使用，为后续ORM框架学习打下基础。

## MySQL基础回顾

MySQL是一个开源的关系型数据库管理系统，是目前最流行的数据库之一。本节回顾SQL基础操作，为后续JDBC实践做准备。

### 数据库和表操作

```sql
-- 创建数据库
CREATE DATABASE blog DEFAULT CHARACTER SET utf8mb4;

-- 使用数据库
USE blog;

-- 创建用户表
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);
```

### 增删改查操作

```sql
-- 插入数据
INSERT INTO user (username, password, email) VALUES ('admin', '123456', 'admin@example.com');

-- 查询数据
SELECT * FROM user WHERE username = 'admin';

-- 更新数据
UPDATE user SET email = 'new@example.com' WHERE id = 1;

-- 删除数据
DELETE FROM user WHERE id = 1;
```

## JDBC使用步骤

JDBC（Java Database Connectivity）是Java连接数据库的标准API。通过JDBC，Java程序可以执行SQL语句，实现数据的增删改查。

### 为什么需要JDBC

应用程序不能直接操作数据库，必须通过数据库厂商提供的驱动接口。JDBC定义了统一的接口规范，各种数据库驱动都实现这一接口，这样Java代码只需调用JDBC API，无需关心底层数据库差异。

### JDBC操作步骤

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
  ?useSSL=false              // 关闭SSL
  &serverTimezone=UTC       // 设置时区
  &allowPublicKeyRetrieval=true  // MySQL8.0+
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

ORM（Object Relational Mapping）对象关系映射，将数据库表映射为Java对象。表名对应类名，列对应属性，行对应对象实例。

### ORM映射关系

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Java 对象              数据库表                            │
│   ┌─────────┐           ┌─────────────┐                     │
│   │  User   │  <──────> │    user     │                     │
│   ├─────────┤           ├─────────────┤                     │
│   │ id      │           │ id          │                     │
│   │ name    │           │ username    │                     │
│   │ email   │           │ email       │                     │
│   └─────────┘           └─────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### ORM框架对比

| 框架 | 特点 | 适用场景 |
|------|------|----------|
| MyBatis | 半自动ORM，SQL可控 | 需要灵活SQL的项目 |
| Hibernate | 全自动ORM，学习成本高 | 快速开发，中小项目 |
| Spring Data JPA | 基于Hibernate，简化开发 | Spring生态项目 |

### JDBC vs ORM

JDBC是基础，ORM是其上层封装。学习JDBC理解SQL执行过程，学习ORM理解对象映射思想。后续学习Spring Data JPA/MyBatis会更容易理解。