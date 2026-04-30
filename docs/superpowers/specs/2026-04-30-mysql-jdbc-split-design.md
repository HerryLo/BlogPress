# MySQL与JDBC文章拆分设计

## 概述

将"Java数据库与JDBC"拆分为两篇独立文章：MySQL（数据库基础）和JDBC（Java数据库连接）。两篇文章为递进关系，MySQL在前，JDBC在后。

## 文章一：MySQL关系型数据库

### 目标结构

| 章节 | 内容 | 说明 |
|------|------|------|
| MySQL简介与环境 | MySQL安装、基本配置 | 了解数据库环境 |
| 数据库与表操作 | CREATE/USE/DROP/ALTER | 基础DDL |
| 增删改查 | INSERT/SELECT/UPDATE/DELETE | 核心DML |
| 常用函数与条件查询 | LIKE/ORDER BY/LIMIT/聚合函数 | 数据检索 |
| 索引 | 单列索引、组合索引、索引失效 | 性能优化基础 |
| 关联查询 | INNER JOIN/LEFT JOIN/子查询 | 多表查询 |
| 事务与隔离级别 | ACID、四种隔离级别 | 数据一致性 |

### 约束

- 代码示例≤50行
- 流程图≤1个
- 每章节≥80字描述
- 结尾引出JDBC，说明应用程序通过JDBC连接数据库

---

## 文章二：Java数据库与JDBC

### 目标结构

| 章节 | 内容 | 说明 |
|------|------|------|
| JDBC是什么 | 为什么需要JDBC | 承接MySQL知识 |
| JDBC操作步骤 | 驱动→连接→语句→结果→关闭 | 核心API |
| CRUD完整示例 | 代码≤50行 | 实战练习 |
| ORM思想 | 对象映射、框架对比 | 数据持久化思想 |

### 约束

- 代码示例≤50行
- 流程图≤1个
- 每章节≥80字描述
- 假设读者已了解SQL基础

---

## 递进关系

```
MySQL（数据库基础）
    ↓
JDBC（Java连接数据库）
    ↓
ORM框架（MyBatis/Spring Data JPA）
```

---

## 实施步骤

1. 创建 `src/java/MySQL.md`（扩充MySQL知识）
2. 重写 `src/java/JDBC.md`（移除MySQL基础，专注JDBC）
3. 更新侧边栏配置
4. 验证文章结构
5. 提交并推送