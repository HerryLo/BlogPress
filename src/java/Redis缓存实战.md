---
title: Redis缓存实战
date: 2025-10-04T00:00:00+08:00
category:
  - java开发
tags:
  - Redis
  - 缓存
  - 中间件
---

# Redis缓存实战

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

## Redis 是什么

**Redis** 是一个**开源的内存数据结构存储**，可以用作数据库、缓存和消息队列。

**为什么用 Redis？**

+ **快**：数据存在内存中，读写速度极快
+ **支持多种数据结构**：String、List、Hash、Set、ZSet
+ **支持持久化**：可以把内存数据保存到磁盘

## Redis 线程模型

Redis 为什么这么快？

```
┌─────────────────────────────────────────────────────────────┐
│                  Redis 单线程模型                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   客户端请求                                               │
│       │                                                    │
│       ▼                                                    │
│   ┌──────────────────────────────────────────────────┐      │
│   │              I/O 多路复用器                        │      │
│   │    （select / epoll / kqueue）                   │      │
│   │                                                  │      │
│   │   ┌────────┐ ┌────────┐ ┌────────┐              │      │
│   │   │ 客户端1│ │ 客户端2│ │ 客户端3│ ...          │      │
│   │   └────────┘ └────────┘ └────────┘              │      │
│   └──────────────────────────────────────────────────┘      │
│       │                                                    │
│       ▼                                                    │
│   ┌──────────────────────────────────────────────────┐      │
│   │              单线程事件循环                        │      │
│   │   接收连接 → 读取请求 → 处理命令 → 写入响应        │      │
│   └──────────────────────────────────────────────────┘      │
│       │                                                    │
│       ▼                                                    │
│   ┌──────────────────────────────────────────────────┐      │
│   │              内存数据结构                            │      │
│   │   String / List / Hash / Set / ZSet              │      │
│   └──────────────────────────────────────────────────┘      │
│                                                             │
│   为什么快：                                               │
│   1. 内存存储，无磁盘 IO 开销                               │
│   2. 单线程，无锁竞争                                       │
│   3. I/O 多路复用，高并发处理                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**注意**：Redis 6.0 引入了多线程，但默认关闭，用于处理网络 I/O，不改变核心单线程执行模型。

## 5 种数据结构及应用场景

| 数据结构 | 命令示例 | 应用场景 |
|---------|---------|---------|
| String | `set/get` | 缓存、计数器、分布式锁 |
| List | `lpush/rpop` | 队列、消息队列、最新列表 |
| Hash | `hset/hget` | 对象存储、购物车 |
| Set | `sadd/smembers` | 标签、好友关系、去重 |
| ZSet | `zadd/zrevrange` | 排行榜、延时队列 |

### String：最简单的类型

```java
// 设置值
redis.set("name", "herrylo");
redis.set("age", "18");
redis.setex("token", 3600, "abc123"); // 1小时后过期

// 获取值
String name = redis.get("name");
String age = redis.get("age");

// 批量操作
redis.mSet("key1", "value1", "key2", "value2");
List<String> values = redis.mGet("key1", "key2");

// 计数
redis.incr("view_count");      // +1
redis.incrBy("view_count", 5); // +5
redis.decr("view_count");      // -1
```

**应用场景：**

```
缓存：把数据库查询结果缓存到 Redis
        ↓
查询请求 → 先查 Redis
                ↓ 有数据
                直接返回（命中）
                ↓ 无数据
                查数据库 → 存入 Redis → 返回
```

### Hash：适合存对象

```java
// 存用户对象
redis.hset("user:100", "name", "herrylo");
redis.hset("user:100", "age", "18");
redis.hset("user:100", "email", "herrylo@example.com");

// 获取用户对象
String name = redis.hget("user:100", "name");
Map<String, String> user = redis.hgetAll("user:100");
// {name: herrylo, age: 18, email: herrylo@example.com}

// 修改某个字段
redis.hset("user:100", "age", "20");

// 计数
redis.hincrBy("user:100", "age", 1);
```

**应用场景：**

```
购物车：
  user:cart:100          ← 用户 ID
  ├── product:001: 2    ← 商品ID:数量
  ├── product:002: 1
  └── product:003: 3

增加商品：hset user:cart:100 product:004 1
修改数量：hincrby user:cart:100 product:001 1
删除商品：hdel user:cart:100 product:001
```

### List：有序列表

```java
// 左插入（栈）
redis.lpush("queue", "task1", "task2", "task3");

// 右弹出（队列）
String task = redis.rpop("queue"); // task3（先进先出）

// 范围查询
List<String> allTasks = redis.lrange("queue", 0, -1);

// 列表长度
Long size = redis.llen("queue");
```

**应用场景：**

```
消息队列：
  lpush → rpop = 先进先出队列
  
  生产者              消费者
     │                  │
     ▼                  ▼
  [msg1] ← ← ← ← ← [msg1] ← ← ←
  [msg2]             [msg2]
  [msg3]             [msg3]

最新消息列表：
  lpush msg → ltrim 0 99 保持最新 100 条
```

### Set：无序不重复

```java
// 添加标签
redis.sadd("user:100:tags", "java", "spring", "redis");
redis.sadd("user:100:tags", "mysql");

// 获取所有标签
Set<String> tags = redis.smembers("user:100:tags");

// 检查是否存在
Boolean isMember = redis.sismember("user:100:tags", "java");

// 交集、并集、差集
redis.sinter("tags1", "tags2");  // 交集
redis.sunion("tags1", "tags2");  // 并集
redis.sdiff("tags1", "tags2");   // 差集
```

**应用场景：**

```
标签系统：
  用户 A 的标签：{java, python, ai}
  用户 B 的标签：{java, mysql, redis}
  
  推荐：找标签相同的用户 → sinter

好友关系：
  user:A:friends = {B, C, D}
  user:B:friends = {A, C, E}
  
  共同好友：sinter user:A:friends user:B:friends = {C}
```

### ZSet：带分数的排序集合

```java
// 添加排行榜数据
redis.zadd("ranking", 100, "user1");
redis.zadd("ranking", 200, "user2");
redis.zadd("ranking", 150, "user3");

// 获取排名前 3（从高到低）
List<String> top3 = redis.zrevrange("ranking", 0, 2);
// [user2, user3, user1]

// 获取 user3 的排名（0 表示第一名）
Long rank = redis.zrevrank("ranking", "user3");

// 获取 user3 的分数
Double score = redis.zscore("ranking", "user3");

// 指定分数范围查询
redis.zrangebyscore("ranking", 100, 200);
```

**应用场景：**

```
排行榜：
  ZADD leaderboard score username
  ZREVRANGE leaderboard 0 9 获取前 10 名
  
延时队列：
  ZADD delayQueue timestamp taskId
  ZRANGEBYSCORE delayQueue 0 currentTime 获取到期任务
```

## 持久化机制

Redis 数据存在内存，如何保证数据不丢失？

```
┌─────────────────────────────────────────────────────────────┐
│                  Redis 持久化机制                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   内存 ────────────────────────────→ 磁盘                    │
│   数据         RDB              AOF                         │
│                                                             │
│   ┌──────────────────────────────────────────────┐          │
│   │                   Redis                       │          │
│   │                                              │          │
│   │   RDB：定时生成数据快照                        │          │
│   │   AOF：记录每个写命令                          │          │
│   └──────────────────────────────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### RDB 快照

```
定时把内存数据完整复制一份到磁盘。

优点：恢复快（直接加载 .rdb 文件）
缺点：可能丢失最后一次快照后的数据
```

**配置示例：**

```bash
# 900秒内至少1个key变化则保存
save 900 1
# 300秒内至少10个key变化则保存
save 300 10
# 60秒内至少10000个key变化则保存
save 60 10000
```

### AOF 日志

```
记录每个写命令到文件，恢复时重放命令。

优点：数据安全性更高
缺点：文件比 RDB 大，恢复慢
```

**AOF 三种策略：**

| 策略 | 说明 | 安全性 | 性能 |
|------|------|--------|------|
| `always` | 每个命令都同步 | 最高 | 最慢 |
| `everysec` | 每秒同步 | 高 | 较快 |
| `no` | 由系统决定 | 低 | 最快 |

**推荐配置：**

```bash
appendonly yes
appendfsync everysec
```

### RDB + AOF 混合持久化

```
Redis 4.0 后支持，开启后：
1. 重写时，将 RDB 内容写入 AOF
2. 后续增量命令用 AOF 格式

既有 RDB 的快速恢复，又有 AOF 的数据完整性
```

## 缓存问题解决方案

```
┌─────────────────────────────────────────────────────────────┐
│                  缓存常见三大问题                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   缓存穿透：数据库也没有，请求穿过缓存直达数据库               │
│           ↓                                                  │
│   缓存雪崩：大量 key 同时过期，请求集中打到数据库             │
│           ↓                                                  │
│   缓存击穿：热点 key 过期瞬间，大量请求涌入数据库            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1. 缓存穿透

**问题**：数据库没有数据，缓存也没有，每次请求都打到数据库。

```
攻击示例：
  查询 ID = -1 的用户
  数据库没有 → 缓存没有 → 再查数据库
  攻击者大量查询不存在的数据 → 数据库压力增大
```

**解决方案：布隆过滤器或缓存空值**

```java
public User getUserById(int id) {
    String cacheKey = "user:" + id;

    // 1. 先查缓存
    String cached = redis.get(cacheKey);
    if (cached != null) {
        if ("NULL".equals(cached)) {
            return null; // 缓存的空值，直接返回
        }
        return JSON.parseObject(cached, User.class);
    }

    // 2. 查数据库
    User user = userMapper.selectById(id);

    // 3. 写入缓存（数据库没有也缓存空值，过期时间短一些）
    if (user == null) {
        redis.setex(cacheKey, 60, "NULL"); // 空值缓存 60 秒
    } else {
        redis.setex(cacheKey, 3600, JSON.toJSONString(user));
    }

    return user;
}
```

### 2. 缓存雪崩

**问题**：大量 key 同时过期，导致大量请求打到数据库。

```
┌─────────────────────────────────────────────────────────────┐
│                    缓存雪崩示意图                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   时间 ──────────────────────────────────→                   │
│                                                             │
│   key1 过期 ──┐                                             │
│   key2 过期 ──┼──→ 同时失效 ──→ 大量请求 ──→ 数据库         │
│   key3 过期 ──┘                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**解决方案：过期时间加随机值**

```java
// 原代码
redis.setex("user:100", 3600, userJson); // 1小时后过期

// 优化：过期时间加随机值
int baseExpire = 3600;
int randomExpire = new Random().nextInt(3600); // 0-3600 秒随机
int actualExpire = baseExpire + randomExpire;
redis.setex("user:100", actualExpire, userJson);

// 结果：过期时间在 1-2 小时之间随机，避免同时失效
```

**其他方案：**

- 使用永不过期的数据（更新时主动刷新）
- 搭建高可用 Redis 集群

### 3. 缓存击穿

**问题**：热点 key 过期瞬间，大量请求涌入数据库。

```
┌─────────────────────────────────────────────────────────────┐
│                    缓存击穿示意图                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   热点 key（比如爆款商品）                                  │
│        │                                                    │
│        │ 过期                                               │
│        ↓                                                    │
│   大量请求同时涌入 ──→ 数据库压力过大                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**解决方案：分布式锁**

```java
public User getUserById(int id) {
    String cacheKey = "user:" + id;
    String lockKey = "lock:user:" + id;

    // 1. 先查缓存
    String cached = redis.get(cacheKey);
    if (cached != null) {
        return JSON.parseObject(cached, User.class);
    }

    // 2. 获取分布式锁（只允许一个请求查数据库）
    Boolean locked = redis.setIfAbsent(lockKey, "1", Duration.ofSeconds(10));

    if (locked) {
        try {
            // 再次检查缓存（防止其他请求已经写入）
            cached = redis.get(cacheKey);
            if (cached != null) {
                return JSON.parseObject(cached, User.class);
            }

            // 查询数据库
            User user = userMapper.selectById(id);

            // 写入缓存
            redis.setex(cacheKey, 3600, JSON.toJSONString(user));

            return user;
        } finally {
            // 释放锁
            redis.delete(lockKey);
        }
    } else {
        // 没获取到锁，短暂等待后重试
        try {
            Thread.sleep(100);
        } catch (InterruptedException ignored) {}
        return getUserById(id);
    }
}
```

## Redis 分布式锁

Redis 实现分布式锁的最佳实践：

```java
public class RedisLock {

    private StringRedisTemplate redisTemplate;

    public RedisLock(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 获取锁
     * @param lockKey 锁的 key
     * @param expireTime 过期时间
     * @return 锁的值（用于释放锁时验证）
     */
    public String tryLock(String lockKey, long expireTime) {
        String lockValue = UUID.randomUUID().toString();
        Boolean locked = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, lockValue, Duration.ofSeconds(expireTime));
        return locked ? lockValue : null;
    }

    /**
     * 释放锁（必须验证锁的值，防止误删别人的锁）
     */
    public void unlock(String lockKey, String lockValue) {
        String currentValue = redisTemplate.opsForValue().get(lockKey);
        if (lockValue.equals(currentValue)) {
            redisTemplate.delete(lockKey);
        }
    }
}

// 使用示例
public void doSomething() {
    String lockKey = "lock:product:100";
    String lockValue = redisLock.tryLock(lockKey, 30);

    if (lockValue != null) {
        try {
            // 业务逻辑
        } finally {
            redisLock.unlock(lockKey, lockValue);
        }
    }
}
```

## Spring Data Redis 完整示例

### 配置

```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: # 密码，没有则留空
      database: 0
      timeout: 3000
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
          max-wait: -1
```

### 使用

```java
@Service
public class UserCacheService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final String USER_KEY_PREFIX = "user:";
    private static final int CACHE_EXPIRE = 3600; // 1小时

    public void cacheUser(User user) {
        String key = USER_KEY_PREFIX + user.getId();
        redisTemplate.opsForValue().set(key, JSON.toJSONString(user),
            Duration.ofSeconds(CACHE_EXPIRE));
    }

    public User getCachedUser(Integer userId) {
        String key = USER_KEY_PREFIX + userId;
        String json = redisTemplate.opsForValue().get(key);
        return json != null ? JSON.parseObject(json, User.class) : null;
    }

    public void deleteCachedUser(Integer userId) {
        String key = USER_KEY_PREFIX + userId;
        redisTemplate.delete(key);
    }

    // Hash 操作示例：缓存用户属性
    public void updateUserField(Integer userId, String field, String value) {
        String key = USER_KEY_PREFIX + userId;
        redisTemplate.opsForHash().put(key, field, value);
    }

    public String getUserField(Integer userId, String field) {
        String key = USER_KEY_PREFIX + userId;
        return (String) redisTemplate.opsForHash().get(key, field);
    }
}
```

## Jedis vs Lettuce

Redis 客户端常见两种选择：

| 特性 | Jedis | Lettuce |
|------|-------|---------|
| 线程模型 | 阻塞式，连接池 | 非阻塞，响应式 |
| 连接方式 | 同步 | 同步/异步/响应式 |
| Spring Boot | 2.x 默认 | 3.x 默认 |
| 连接池 | 需手动配置 | 内置连接池 |

**Spring Boot 2.x 配置 Jedis：**

```yaml
spring:
  data:
    redis:
      client-type: jedis  # 显式指定
      jedis:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Redis 知识全景图                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   5 种数据结构                                               │
│   String / List / Hash / Set / ZSet                         │
│                                                             │
│   持久化方案                                                │
│   RDB（快照）/ AOF（日志）/ 混合持久化                       │
│                                                             │
│   缓存问题                                                  │
│   穿透 / 雪崩 / 击穿 + 解决方案                              │
│                                                             │
│   应用场景                                                  │
│   缓存 / 分布式锁 / 排行榜 / 消息队列 / 延时队列             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**核心要点：**

1. **Redis 单线程模型** + **内存存储** = 高性能
2. **5 种数据结构**各有适用场景，根据业务选择
3. **RDB** 恢复快但可能丢数据，**AOF** 安全但文件大
4. **缓存三问题**：穿透（存空值）、雪崩（随机过期）、击穿（分布式锁）
5. **分布式锁**用 `setIfAbsent` + 过期时间 + 验证值释放
