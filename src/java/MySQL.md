---
title: MySQL关系型数据库
date: 2025-10-02T00:00:00+08:00
category:
  - java开发
tags:
  - MySQL
  - 数据库
  - SQL
---

# MySQL关系型数据库

## 为什么学习MySQL

MySQL是最流行的开源关系型数据库。应用程序通过SQL与数据库交互，MySQL是Java后端开发必须掌握的基础技能。

## MySQL简介与环境

MySQL是一个开源的关系型数据库管理系统，采用客户端-服务器架构。

**核心概念：**
- **服务器**：存储和管理数据
- **客户端**：发送SQL请求，接收结果
- **数据库**：数据的逻辑容器
- **表**：数据的结构化存储

**安装与连接：**
```bash
# 启动MySQL服务
net start mysql

# 连接数据库
mysql -u root -p
```

## 数据库与表操作

本节介绍如何创建、修改、删除数据库和表。

### 数据库操作

```sql
-- 创建数据库
CREATE DATABASE blog DEFAULT CHARACTER SET utf8mb4;

-- 查看所有数据库
SHOW DATABASES;

-- 选择数据库
USE blog;

-- 删除数据库
DROP DATABASE blog;
```

### 表操作

```sql
-- 创建用户表
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查看表结构
DESC user;

-- 删除表
DROP TABLE user;
```

## 增删改查

SQL的核心操作：数据的插入、查询、更新、删除。

### 插入数据

```sql
INSERT INTO user (username, password, email) VALUES ('admin', '123456', 'admin@example.com');
```

### 查询数据

```sql
SELECT * FROM user;
SELECT username, email FROM user WHERE id > 1;
```

### 更新数据

```sql
UPDATE user SET email = 'new@example.com' WHERE id = 1;
```

### 删除数据

```sql
DELETE FROM user WHERE id = 1;
```

## 常用函数与条件查询

### 条件查询

```sql
SELECT * FROM user WHERE username LIKE 'admin%';
SELECT * FROM user WHERE age >= 18 AND age <= 30;
```

### 排序与分页

```sql
SELECT * FROM user ORDER BY created_at DESC;
SELECT * FROM user LIMIT 10 OFFSET 0;
```

### 聚合函数

```sql
SELECT COUNT(*) FROM user;
SELECT AVG(age) FROM user;
```

## 索引

索引可以加速查询，但会增加存储空间和写入开销。

### 单列索引

```sql
CREATE INDEX idx_username ON user(username);
```

### 组合索引

```sql
CREATE INDEX idx_name_email ON user(username, email);
```

### 索引失效

```sql
-- 使用函数导致索引失效
SELECT * FROM user WHERE LEFT(username, 4) = 'admin';

-- 使用函数导致索引失效
SELECT * FROM user WHERE YEAR(created_at) = 2025;
```

## 关联查询

多表查询是数据库操作的核心技能。

### 内连接

```sql
SELECT u.username, o.order_id
FROM user u
INNER JOIN orders o ON u.id = o.user_id;
```

### 左连接

```sql
SELECT u.username, o.order_id
FROM user u
LEFT JOIN orders o ON u.id = o.user_id;
```

### 子查询

```sql
SELECT * FROM user
WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);
```

## 事务与隔离级别

事务保证一组操作要么全部成功，要么全部失败。

### 事务控制

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

### 隔离级别

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|------|-----------|------|
| READ_UNCOMMITTED | 可能 | 可能 | 可能 |
| READ_COMMITTED | 不可能 | 可能 | 可能 |
| REPEATABLE_READ | 不可能 | 不可能 | 可能 |
| SERIALIZABLE | 不可能 | 不可能 | 不可能 |

### 下一章预告

应用程序通过JDBC API连接数据库，执行SQL语句。下一章学习Java如何使用JDBC操作数据库。
