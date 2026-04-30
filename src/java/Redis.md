---
title: Redis
date: 2025-10-04T00:00:00+08:00
category:
  - java
tags:
  - Redis
  - 缓存
  - 中间件
---

# Redis

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

Redis 是**内存数据结构存储**，用作数据库、缓存、消息队列。核心优势：**快**（内存存储）、**支持多种数据结构**。

## 为什么快

1. 内存存储，无磁盘 IO
2. 单线程，无锁竞争
3. I/O 多路复用，高并发处理

## 5 种数据结构

| 数据结构 | 命令 | 场景 |
|---------|------|------|
| String | `set/get/incr` | 缓存、计数器、分布式锁 |
| List | `lpush/rpop` | 队列、最新列表 |
| Hash | `hset/hget` | 对象存储、购物车 |
| Set | `sadd/smembers` | 标签、去重 |
| ZSet | `zadd/zrevrange` | 排行榜、延时队列 |

### String

```java
redis.set("name", "herrylo");
redis.setex("token", 3600, "abc123");  // 过期 1 小时
redis.incr("view_count");              // 计数器 +1
```

### Hash

```java
redis.hset("user:100", "name", "herrylo");
redis.hset("user:100", "age", "18");
Map<String, String> user = redis.hgetAll("user:100");
```

### List

```java
redis.lpush("queue", "task1", "task2");  // 左插入
String task = redis.rpop("queue");        // 右弹出（先进先出）
```

### ZSet（排行榜）

```java
redis.zadd("ranking", 100, "user1");
redis.zadd("ranking", 200, "user2");
List<String> top3 = redis.zrevrange("ranking", 0, 2);  // 前 3 名
```

## 持久化

| 方式 | 原理 | 优缺点 |
|------|------|--------|
| **RDB** | 定时快照 | 恢复快，可能丢数据 |
| **AOF** | 记录每个写命令 | 数据安全，文件大 |

## 缓存问题

| 问题 | 原因 | 解决 |
|------|------|------|
| **缓存穿透** | 数据库也没有，请求直达 DB | 缓存空值 |
| **缓存雪崩** | 大量 key 同时过期 | 过期时间 + 随机值 |
| **缓存击穿** | 热点 key 过期瞬间涌入 | 分布式锁 |

## 分布式锁

```java
// 加锁：setNX + 过期时间
Boolean locked = redis.setIfAbsent(lockKey, value, Duration.ofSeconds(10));

// 解锁：验证值后删除（防止误删别人的锁）
if (value.equals(redis.get(lockKey))) {
    redis.delete(lockKey);
}
```

## 核心要点

```
Redis：内存存储 + 5种数据结构 + 持久化（RDB/AOF）
缓存问题：穿透（空值）、雪崩（随机过期）、击穿（锁）
```