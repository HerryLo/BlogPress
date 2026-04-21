---
title: Java Web开发
date: 2025-10-11T00:00:00+08:00
category:
  - java开发
tags:
  - java开发
---

# Java Web开发

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

### Servlet

**Servlet 是 Java EE（现在叫 Jakarta EE）中最核心、最基础的 Web 技术规范**，几乎所有 Java Web 框架（Spring MVC、Struts、JSP 等）底层都建立在 Servlet 之上。

| 维度 | 说明 |
| --- | --- |
| **基础规范** | 所有 Java Web 应用都必须实现 Servlet 规范 |
| **请求入口** | 任何 HTTP 请求最终都会被 Servlet 处理 |
| **框架底层** | Spring MVC、Struts 等框架的 DispatcherServlet 本身就是 Servlet |
| **容器依赖** | Tomcat、Jetty、Undertow 等 Web 容器都是 Servlet 容器 |

#### 请求流程

```xml
浏览器请求 → Web 容器（Tomcat）→ Servlet 容器 → Servlet → 响应
                                    ↓
                            Spring MVC 本质上
                            也是一个 Servlet
```

#### Dispatcher

Servlet 是 java web 开发的接口规范，通过对 Servlet 的接口实现，就可以让 java 代码接收处理 Web 请求响应。

> 在 Java EE 平台上，处理 TCP 连接，解析 HTTP 协议这些底层工作统统扔给现成的 Web 服务器去做，我们只需要把自己的应用程序跑在 Web 服务器上。为了实现这一目的，Java EE 提供了 Servlet API，我们使用 Servlet API 编写自己的 Servlet 来处理 HTTP 请求，Web 服务器实现 Servlet API 接口，实现底层功能：
>
> ![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1766387016017-42a6dce6-dd52-49ec-a953-8160cef43ed8.png)
>
> 浏览器发出的 HTTP 请求总是由 Web Server 先接收，然后，根据 Servlet 配置的映射，不同的路径转发到不同的 Servlet：
>
> ![](https://cdn.nlark.com/yuque/0/2025/png/1606439/1766387091513-a1023cea-e575-41bf-a104-939a5cefe943.png)
>
> 这种根据路径转发的功能我们一般称为 dispatch。映射到 `/` 的 `IndexServlet` 比较特殊，它实际上会接收所有未匹配的路径，相当于 `/*`，因为 Dispatcher 的逻辑可以用伪代码实现如下：

```xml
String path = ...
if (path.equals("/hello")) {
    dispatchTo(helloServlet);
} else if (path.equals("/signin")) {
    dispatchTo(signinServlet);
} else {
    // 所有未匹配的路径均转发到"/"
    dispatchTo(indexServlet);
}
```

实际在 Spring Boot 框架中，也是包含了一个 dispatcher 的路径转发器，通过路径匹配不同的 controller 控制器。

### Maven

**Maven** 是一个**项目管理和构建自动化工具**，主要用于 Java 项目。它的核心作用是：

+ **依赖管理**：自动下载和管理项目需要的 Jar 包
+ **项目构建**：编译、测试、打包、部署一站式完成
+ **项目规范**：统一的项目结构和生命周期

**一句话**：Maven 就像你项目的"管家"，帮你管 Jar 包、管编译、管打包。

参考文档：[终于把项目构建神器 Maven 捋清楚了~](https://javabetter.cn/maven/maven.html)

### MySQL

**MySQL** 是一个**开源的关系型数据库管理系统**，是目前世界上最流行的数据库之一。它使用 **SQL（结构化查询语言）** 来管理和操作数据。

```sql
-- 创建数据库
CREATE DATABASE blog DEFAULT CHARACTER SET utf8mb4;

-- 创建用户表
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO user (username, password, email) VALUES ('admin', '123456', 'admin@example.com');

-- 查询
SELECT * FROM user WHERE username = 'admin';

-- 更新
UPDATE user SET email = 'new@example.com' WHERE id = 1;

-- 删除
DELETE FROM user WHERE id = 1;
```

**常用命令：**

```sql
-- 显示所有数据库
SHOW DATABASES;

-- 使用某个数据库
USE blog;

-- 显示所有表
SHOW TABLES;

-- 查看表结构
DESC user;

-- 条件查询
SELECT * FROM user WHERE username LIKE 'admin%';

-- 排序
SELECT * FROM user ORDER BY created_at DESC;

-- 分页
SELECT * FROM user LIMIT 10 OFFSET 0;
```

**JDBC 连接示例：**

```java
// 加载驱动
Class.forName("com.mysql.cj.jdbc.Driver");

// 建立连接
String url = "jdbc:mysql://localhost:3306/blog?useSSL=false&serverTimezone=UTC";
Connection conn = DriverManager.getConnection(url, "root", "password");

// 执行查询
PreparedStatement ps = conn.prepareStatement("SELECT * FROM user WHERE username = ?");
ps.setString(1, "admin");
ResultSet rs = ps.executeQuery();

while (rs.next()) {
    System.out.println(rs.getInt("id"));
    System.out.println(rs.getString("username"));
}
```

### Redis

**Redis** 是一个**开源的内存数据结构存储**，可以用作数据库、缓存和消息队列。

**为什么用 Redis？**

+ **快**：数据存在内存中，读写速度极快
+ **支持多种数据结构**：String、List、Hash、Set、ZSet
+ **支持持久化**：可以把内存数据保存到磁盘

**常用数据类型：**

```java
// String：最简单的类型
redis.set("name", "herrylo");
String name = redis.get("name");

// Hash：适合存对象
redis.hset("user:1", "name", "herrylo");
redis.hset("user:1", "age", "18");
Map<String, String> user = redis.hgetAll("user:1");

// List：有序列表，适合做队列
redis.lpush("queue", "task1");
redis.lpush("queue", "task2");
String task = redis.rpop("queue"); // 先进先出

// Set：无序不重复集合
redis.sadd("tags", "java", "spring", "redis");
Set<String> tags = redis.smembers("tags");

// ZSet：带分数的排序集合
redis.zadd("ranking", 100, "user1");
redis.zadd("ranking", 200, "user2");
List<String> top3 = redis.zrevrange("ranking", 0, 2); // 前3名
```

**Spring Boot 整合 Redis：**

```java
// 引入依赖
// spring-boot-starter-data-redis

// 配置 application.yml
/*
redis:
  host: localhost
  port: 6379
  password:
*/

// 使用 StringRedisTemplate
@Autowired
private StringRedisTemplate redisTemplate;

public void saveUser() {
    redisTemplate.opsForValue().set("user:100", JSON.toJSONString(user));
}

public User getUser() {
    String json = redisTemplate.opsForValue().get("user:100");
    return JSON.parseObject(json, User.class);
}

// 设置过期时间
redisTemplate.opsForValue().set("token", "abc123", Duration.ofHours(2));
```

**缓存穿透、缓存雪崩、缓存击穿：**

```java
// 缓存穿透：数据库没有数据也缓存空结果，避免大量请求打到数据库
if (user == null) {
    redisTemplate.opsForValue().set("user:" + id, "", Duration.ofMinutes(5));
}

// 缓存雪崩：过期时间加随机值，避免大量 key 同时过期
long expireTime = baseExpire + new Random().nextInt(3600);
redisTemplate.expire("user:" + id, expireTime, TimeUnit.SECONDS);

// 缓存击穿：热点 key 过期瞬间，大量请求涌入，用分布式锁保护
if (redisTemplate.opsForValue().get("user:" + id) == null) {
    // 加锁，只允许一个请求查数据库
    String lockKey = "lock:user:" + id;
    if (redisTemplate.opsForValue().setIfAbsent(lockKey, "1", Duration.ofSeconds(10))) {
        // 查询数据库并写入缓存
        redisTemplate.opsForValue().set("user:" + id, JSON.toJSONString(user));
        redisTemplate.delete(lockKey);
    }
}
```

### Spring

它的主要功能包括 IoC 容器、AOP 支持、事务支持、MVC 开发以及强大的第三方集成功能等。

参考：[Spring 开发 - Java教程 - 廖雪峰的官方网站](https://liaoxuefeng.com/books/java/spring/index.html)

### IOC控制反转

**IoC - Inversion of Control 控制反转**，控制反转就是把创建和管理 bean 的过程转移给了第三方。**IOC 控制反转是 Spring 框架最核心的基石**

而这个第三方，就是 Spring IoC Container，对于 IoC 来说，最重要的就是**容器**。

容器负责创建、配置和管理 bean，也就是它管理着 bean 的生命，控制着 bean 的依赖注入。

> **何为控制，控制的是什么？**
>
> 答：是 bean 的创建、管理的权利，控制 bean 的整个生命周期。
>
> **何为反转，反转了什么？**
>
> 答：把这个权利交给了 Spring 容器，而不是自己去控制，就是反转。由之前的自己主动创建对象，变成现在被动接收别人给我们的对象的过程，这就是反转。

### DI依赖注入

**DI（Dependency Injection，依赖注入） 是 IoC（控制反转） 的具体实现方式**。简单来说：

+ IoC 是思想：把对象的控制权交给容器；
+ DI 是方法：容器如何把依赖对象传递给需要它的类；

一句话概括：当某个对象需要其他对象的协助时，不需要自己创建，而是由外部容器直接送进来，这就是依赖注入。

注意：spring boot 推荐使用构造器方式注入 bean。

### AOP面向切面

AOP（Aspect-Oriented Programming，面向切面编程） 是一种编程范式，它允许你将横切关注点（cross-cutting concerns）从业务逻辑中分离出来。

**AOP 动态代理的核心是注解加反射。** 注解提供了"目标"和"元数据"，而反射提供了"执行能力"。两者结合，才构成了 AOP 动态代理的基石。

注解，本身不包含任何业务逻辑代码。它们的作用是**标记**，为类或方法附加元数据。

当代理对象拦截到方法调用时，代理对象利用**反射**，检查被调用方法上是否有注解，并读取它的属性值。

参考：[使用 AOP - Java教程 - 廖雪峰的官方网站](https://liaoxuefeng.com/books/java/spring/aop/index.html)、[Spring AOP 扫盲](https://javabetter.cn/springboot/aop-log.html#spring-aop-%E6%89%AB%E7%9B%B2)

### Spring Boot

Spring Boot 是一个基于 Spring 的套件，它帮我们预组装了 Spring 的一系列组件，以便以尽可能少的代码和配置来开发基于 Spring 的 Java 应用程序。

以汽车为例，如果我们想组装一辆汽车，我们需要发动机、传动、轮胎、底盘、外壳、座椅、内饰等各种部件，然后把它们装配起来。Spring 就相当于提供了一系列这样的部件，但是要装好汽车上路，还需要我们自己动手。而 Spring Boot 则相当于已经帮我们预装好了一辆可以上路的汽车，如果有特殊的要求，例如把发动机从普通款换成涡轮增压款，可以通过修改配置或编写少量代码完成。

参考：[Spring Cloud 开发 - Java教程 - 廖雪峰的官方网站](https://liaoxuefeng.com/books/java/springcloud/index.html)

### SpringBoot项目架构

**1. 核心三层架构**

+ **数据操作层**：使用 **MyBatis** 框架，通过 @Mapper 注解标记 Mapper 接口
+ **接口路由层**：使用 @RestController 注解标记 Controller 类处理 HTTP 请求
+ **业务逻辑层**：使用 @Service 注解标记 Service 类实现业务逻辑

**2. 关键支持组件**

+ **启动类**：使用 @SpringBootApplication 注解的主类作为应用入口，该注解组合了 @Configuration、@EnableAutoConfiguration 和 @ComponentScan，用于自动配置和组件扫描
+ **配置层**：通过 application.properties/yml 进行数据源、MyBatis 等配置
+ **异常处理**：使用 @ControllerAdvice 进行全局异常处理，结合 @ExceptionHandler 注解捕获和处理不同类型的异常
+ **拦截层**：使用 Interceptor 或 HandlerInterceptor 接口实现请求拦截功能
+ **缓存**：集成 **Redis** 等缓存解决方案，使用 @Cacheable、@CachePut 和 @CacheEvict 等注解实现缓存操作
+ **安全层**：**Spring Security** 提供认证和授权功能，集成 JWT 实现无状态认证
+ **消息队列**：集成 RabbitMQ 或 Kafka 等消息中间件，实现异步处理、系统解耦和流量削峰

### SpringBoot架构图

**整体分为客户端层、网关层、应用层和数据层：**

+ **客户端层**：浏览器、移动 App、微信小程序、第三方 API 发起请求
+ **网关层**：Nginx 做反向代理和负载均衡，分发请求到多个应用实例
+ **应用层**：Spring Boot 应用内部通过 Filter → Interceptor → Controller → Service → Mapper 的顺序处理请求，Spring Security + JWT 负责认证授权
+ **数据层**：MySQL 主数据库存储业务数据，Redis 做缓存提升查询性能，RabbitMQ 做消息队列实现异步和解耦

**请求处理流程：**

```
客户端请求 → Nginx → 应用实例
  → Filter（全局过滤，如跨域）
  → Interceptor（拦截器，如日志、权限）
  → Controller（接收HTTP请求）
  → Security（认证授权）
  → Service（业务逻辑）
  → Mapper（数据库操作）
  → MySQL / Redis / RabbitMQ
```

```xml
┌─────────────────────────────────────────────────────────────────┐
│                        客户端层                                 │
│     Web浏览器  │  移动App  │  微信小程序  │  第三方API          │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        网关层                                   │
│                    Nginx (反向代理/负载均衡)                     │
└───────────────────────────────┬─────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│  应用实例1    │       │  应用实例2    │       │  应用实例3    │
│  (8081)       │       │  (8082)       │       │  (8083)       │
└───────────────┘       └───────────────┘       └───────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Spring Boot 应用层                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Filter    │→│ Interceptor │→│ Controller  │             │
│  │  过滤器链   │  │  拦截器链   │  │  控制器层   │             │
│  └─────────────┘  └─────────────┘  └──────┬──────┘             │
│                                            ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Spring Security + JWT                       │   │
│  │         (认证授权 / Token管理)                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▼                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Service 业务层                        │   │
│  │   用户服务  │  订单服务  │  商品服务  │  缓存服务        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▼                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    MyBatis 数据访问层                    │   │
│  │   UserMapper  │  OrderMapper  │  ProductMapper          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│    MySQL      │       │    Redis      │       │   RabbitMQ    │
│   主数据库    │       │    缓存       │       │   消息队列    │
└───────────────┘       └───────────────┘       └───────────────┘
```
