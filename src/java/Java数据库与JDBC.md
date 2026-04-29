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

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

## MySQL 基础回顾

**MySQL** 是一个**开源的关系型数据库管理系统**，是目前世界上最流行的数据库之一。它使用 **SQL（结构化查询语言）** 来管理和操作数据。

### 数据库操作

```sql
-- 创建数据库
CREATE DATABASE blog DEFAULT CHARACTER SET utf8mb4;

-- 查看所有数据库
SHOW DATABASES;

-- 选择数据库
USE blog;

-- 删除数据库（谨慎操作）
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

-- 查看建表语句
SHOW CREATE TABLE user;

-- 修改表结构
ALTER TABLE user ADD COLUMN phone VARCHAR(20);
ALTER TABLE user MODIFY COLUMN phone VARCHAR(30);
ALTER TABLE user DROP COLUMN phone;

-- 删除表
DROP TABLE user;
```

### 增删改查

```sql
-- 插入数据
INSERT INTO user (username, password, email) VALUES ('admin', '123456', 'admin@example.com');

-- 查询数据
SELECT * FROM user WHERE username = 'admin';
SELECT username, email FROM user WHERE id > 1;

-- 更新数据
UPDATE user SET email = 'new@example.com' WHERE id = 1;

-- 删除数据
DELETE FROM user WHERE id = 1;

-- 条件查询
SELECT * FROM user WHERE username LIKE 'admin%';
SELECT * FROM user WHERE age >= 18 AND age <= 30;

-- 排序
SELECT * FROM user ORDER BY created_at DESC;

-- 分页
SELECT * FROM user LIMIT 10 OFFSET 0;
```

## JDBC 架构

JDBC（Java Database Connectivity）是 Java 连接数据库的标准 API：

```
┌─────────────────────────────────────────────────────────────┐
│                      JDBC 架构图                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Java 应用                                                │
│       │                                                     │
│       ▼                                                     │
│   ┌─────────────────────────────────────┐                   │
│   │         JDBC API (java.sql)          │                   │
│   │  DriverManager / Connection /       │                   │
│   │  Statement / ResultSet / PreparedStatement             │
│   └─────────────────────────────────────┘                   │
│       │                                                     │
│       ▼                                                     │
│   ┌─────────────────────────────────────┐                   │
│   │       JDBC Driver (驱动实现)         │                   │
│   │  MySQL Driver / Oracle Driver / ...  │                   │
│   └─────────────────────────────────────┘                   │
│       │                                                     │
│       ▼                                                     │
│   ┌─────────────────────────────────────┐                   │
│   │           数据库 (MySQL/Oracle)      │                   │
│   └─────────────────────────────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## JDBC 使用步骤

```java
// 第一步：加载驱动（JDBC 4.0 后可省略，SPI 自动加载）
Class.forName("com.mysql.cj.jdbc.Driver");

// 第二步：建立连接
String url = "jdbc:mysql://localhost:3306/blog?useSSL=false&serverTimezone=UTC";
String username = "root";
String password = "password";
Connection conn = DriverManager.getConnection(url, username, password);

// 第三步：创建语句对象
Statement stmt = conn.createStatement();

// 第四步：执行 SQL
String sql = "SELECT * FROM user WHERE username = 'admin'";
ResultSet rs = stmt.executeQuery(sql);

// 第五步：处理结果
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("username");
    String email = rs.getString("email");
    System.out.println(id + ": " + name + " - " + email);
}

// 第六步：关闭资源（倒序关闭）
rs.close();
stmt.close();
conn.close();
```

**连接 URL 参数说明：**

```java
jdbc:mysql://localhost:3306/blog
  ?useUnicode=true              // 使用 Unicode 字符集
  &characterEncoding=UTF-8      // 字符编码
  &useSSL=false                 // 是否使用 SSL 连接
  &serverTimezone=UTC           // 时区设置
  &allowPublicKeyRetrieval=true // 允许公钥检索（MySQL 8.0+）
```

## PreparedStatement 防 SQL 注入

为什么要用 PreparedStatement 而不是 Statement？

```
┌─────────────────────────────────────────────────────────────┐
│              SQL 注入攻击原理                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  恶意输入：username = "admin' --"                          │
│                                                             │
│  SQL: SELECT * FROM user WHERE username = 'admin' --'      │
│                                    ↑                        │
│                           -- 后面的内容被注释掉了！          │
│                                                             │
│  结果：不用密码也能登录                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**PreparedStatement 使用：**

```java
// 使用 ? 占位符，避免 SQL 拼接
String sql = "SELECT * FROM user WHERE username = ? AND password = ?";

// 预编译 SQL（参数用占位符代替）
PreparedStatement ps = conn.prepareStatement(sql);

// 设置参数（索引从 1 开始）
ps.setString(1, username);
ps.setString(2, password);

// 执行查询
ResultSet rs = ps.executeQuery();

if (rs.next()) {
    // 登录成功
} else {
    // 登录失败
}
```

**PreparedStatement 的好处：**

| 特性 | 说明 |
|------|------|
| **防止 SQL 注入** | 参数被当作数据处理，而非 SQL 语句的一部分 |
| **提高性能** | 数据库预编译 SQL 语句，重复执行效率更高 |
| **代码更清晰** | 参数分离，SQL 语句可读性更好 |

## CRUD 完整示例

```java
public class UserDao {

    private Connection getConnection() throws Exception {
        String url = "jdbc:mysql://localhost:3306/blog?useSSL=false&serverTimezone=UTC";
        return DriverManager.getConnection(url, "root", "password");
    }

    // 增加
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

    // 删除
    public int delete(int id) throws Exception {
        String sql = "DELETE FROM user WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        }
    }

    // 修改
    public int update(User user) throws Exception {
        String sql = "UPDATE user SET username = ?, email = ? WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setInt(3, user.getId());
            return ps.executeUpdate();
        }
    }

    // 根据 ID 查询
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

    // 查询所有
    public List<User> selectAll() throws Exception {
        String sql = "SELECT * FROM user";
        List<User> users = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                users.add(new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getString("email")
                ));
            }
        }
        return users;
    }
}
```

## 数据库连接池

为什么要用连接池？

```
┌─────────────────────────────────────────────────────────────┐
│              不用连接池：每次请求都创建连接                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   请求1 ──→ 创建连接 ──→ 查询 ──→ 关闭连接                   │
│   请求2 ──→ 创建连接 ──→ 查询 ──→ 关闭连接                   │
│   请求3 ──→ 创建连接 ──→ 查询 ──→ 关闭连接                   │
│                                                             │
│   问题：创建和关闭连接耗时，占用资源                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              使用连接池：复用已有连接                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌────────────────────────────────────┐                   │
│   │         连接池（预先创建 N 个连接）   │                   │
│   │   [连接1] [连接2] [连接3] [连接4]   │                   │
│   └────────────────────────────────────┘                   │
│        ↑           ↑           ↑                            │
│   请求1          请求2        请求3                          │
│   借用连接      借用连接      借用连接                        │
│   用完归还      用完归还      用完归还                        │
│                                                             │
│   优点：复用连接，速度快                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Druid 连接池使用

```java
// 1. 引入依赖
// druid-spring-boot-starter

// 2. 配置文件（application.yml）
/*
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/blog?useSSL=false&serverTimezone=UTC
    username: root
    password: password
    # Druid 连接池配置
    druid:
      initial-size: 5              # 初始连接数
      min-idle: 5                   # 最小空闲连接数
      max-active: 20                # 最大连接数
      max-wait: 60000              # 获取连接最大等待时间（ms）
      time-between-eviction-runs-millis: 60000  # 清理线程运行周期
      min-evictable-idle-time-millis: 300000    # 连接最小生存时间
*/

// 3. 使用（Spring Boot 自动配置，直接注入）
@Autowired
private DataSource dataSource;

public void testConnection() throws Exception {
    // 从连接池获取连接
    Connection conn = dataSource.getConnection();
    System.out.println(conn);
    // 归还连接到池中，而不是真正关闭
    conn.close();
}
```

### HikariCP 连接池（性能最优）

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/blog?useSSL=false&serverTimezone=UTC
    username: root
    password: password
    # HikariCP 配置（Spring Boot 2.x 默认使用）
    hikari:
      pool-name: HikariCP-Pool
      minimum-idle: 5
      maximum-pool-size: 10
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

## 事务管理

事务是指一组操作要么全部成功，要么全部失败：

```
┌─────────────────────────────────────────────────────────────┐
│                    事务的 ACID 特性                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Atomic（原子性）                                           │
│  └─ 事务是最小执行单元，不可分割                              │
│                                                             │
│  Consistency（一致性）                                       │
│  └─ 事务执行前后，数据库状态保持一致                          │
│                                                             │
│  Isolation（隔离性）                                         │
│  └─ 并发执行时，事务之间互不干扰                             │
│                                                             │
│  Durability（持久性）                                        │
│  └─ 事务提交后，结果永久保存                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### JDBC 事务控制

```java
public void transferMoney(int fromId, int toId, double amount) {
    String sql1 = "UPDATE account SET balance = balance - ? WHERE id = ?";
    String sql2 = "UPDATE account SET balance = balance + ? WHERE id = ?";

    try (Connection conn = getConnection()) {
        // 关闭自动提交，开启事务
        conn.setAutoCommit(false);

        try (PreparedStatement ps1 = conn.prepareStatement(sql1);
             PreparedStatement ps2 = conn.prepareStatement(sql2)) {

            // 转出账户扣钱
            ps1.setDouble(1, amount);
            ps1.setInt(2, fromId);
            ps1.executeUpdate();

            // 转入账户加钱
            ps2.setDouble(1, amount);
            ps2.setInt(2, toId);
            ps2.executeUpdate();

            // 提交事务
            conn.commit();
            System.out.println("转账成功");

        } catch (Exception e) {
            // 回滚事务
            conn.rollback();
            System.out.println("转账失败，已回滚");
            throw e;
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 事务隔离级别

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|------|-----------|------|
| `READ_UNCOMMITTED` | 可能 | 可能 | 可能 |
| `READ_COMMITTED` | 不可能 | 可能 | 可能 |
| `REPEATABLE_READ` | 不可能 | 不可能 | 可能 |
| `SERIALIZABLE` | 不可能 | 不可能 | 不可能 |

**脏读 vs 不可重复读 vs 幻读：**

- **脏读**：读取到其他事务未提交的数据
- **不可重复读**：同一事务中，两次读取数据不一致（其他事务提交了修改）
- **幻读**：同一事务中，两次查询结果集不一致（其他事务提交了新增或删除）

## ORM 思想

ORM（Object Relational Mapping）对象关系映射：

```
┌─────────────────────────────────────────────────────────────┐
│                      ORM 映射关系                           │
├─────────────────────────────────────────────────────────────┤
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
│   类名 ───────→ 表名                                        │
│   属性 ───────→ 列名                                        │
│   对象 ───────→ 行记录                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**常见 ORM 框架：**

| 框架 | 特点 |
|------|------|
| **MyBatis** | 半自动 ORM，SQL 可控，灵活度高 |
| **MyBatis-Plus** | MyBatis 增强，简化 CRUD 操作 |
| **Hibernate** | 全自动 ORM，学习成本高，灵活性较低 |
| **Spring Data JPA** | 基于 Hibernate，简化开发 |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 数据库开发全景图                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   JDBC API ──→ PreparedStatement（防注入）                    │
│       │                                                     │
│       ▼                                                     │
│   连接池（Druid / HikariCP）                                 │
│       │                                                     │
│       ▼                                                     │
│   事务管理（ACID / 隔离级别）                                 │
│       │                                                     │
│       ▼                                                     │
│   ORM 框架（MyBatis / MyBatis-Plus）                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**核心要点：**

1. **JDBC** 是 Java 连接数据库的标准 API，步骤：加载驱动 → 获取连接 → 执行 SQL → 处理结果 → 关闭资源
2. **PreparedStatement** 相比 Statement 更安全（防 SQL 注入）且性能更好
3. **连接池**复用数据库连接，避免频繁创建/销毁连接的性能开销
4. **事务**保证数据一致性，ACID 特性：原子性、一致性、隔离性、持久性
5. **ORM** 将数据库表映射为 Java 对象，简化数据库操作
