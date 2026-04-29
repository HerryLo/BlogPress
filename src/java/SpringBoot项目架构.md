---
title: SpringBoot项目架构
date: 2025-10-06T00:00:00+08:00
category:
  - java开发
tags:
  - SpringBoot
  - 架构
  - RESTful
---

# SpringBoot项目架构

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

## Spring Boot 是什么

Spring Boot 是一个基于 Spring 的套件，它帮我们预组装了 Spring 的一系列组件，以便以尽可能少的代码和配置来开发基于 Spring 的 Java 应用程序。

```
┌─────────────────────────────────────────────────────────────┐
│                  Spring Boot 核心价值                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   传统 Spring 开发                                          │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  配置 applicationContext.xml                         │  │
│   │  配置 springmvc.xml                                  │  │
│   │  配置 web.xml                                        │  │
│   │  配置数据源、事务、MyBatis...                         │  │
│   │  几百行配置文件，半天起步                             │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Spring Boot 开发                                          │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  引入 starter 依赖                                   │  │
│   │  几行配置（application.yml）                         │  │
│   │  秒级起步，开箱即用                                   │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**一句话理解**：传统 Spring 像手动组装电脑，Spring Boot 像品牌整机，买来就能用。

## Spring Boot 自动配置原理

Spring Boot 为什么能"零配置"？

```
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot 自动配置原理                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   @SpringBootApplication                                   │
│        │                                                   │
│        ├── @EnableAutoConfiguration                        │
│        │        │                                          │
│        │        ├── @Import(AutoConfigurationImportSelector)│
│        │        │        │                                 │
│        │        │        ▼                                 │
│        │        │   加载 spring.factories                   │
│        │        │        │                                 │
│        │        │        ▼                                 │
│        │        │   加载所有自动配置类                      │
│        │        │        │                                 │
│        │        │        ▼                                 │
│        │        │   @Conditional 条件判断                  │
│        │        │        │                                 │
│        │        │        ├── 条件满足 → 注册 Bean         │
│        │        │        └── 条件不满足 → 跳过            │
│        │        │                                          │
│        └── @ComponentScan                                   │
│                 └── 扫描 @Component/@Service 等注解        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### spring.factories 文件

```properties
# Spring Boot 2.x 使用的配置路径
# 文件位置：META-INF/spring.factories

# 核心自动配置选择器
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.mybatis.MybatisAutoConfiguration,\
...
```

### Spring Boot 3.x 变化

```properties
# Spring Boot 3.x 使用新的配置路径
# 文件位置：META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports

# 每个配置类一行
com.example.autoconfig.MyAutoConfiguration
```

### 自动配置条件注解

| 注解 | 作用 |
|------|------|
| `@ConditionalOnClass` | classpath 有指定类才生效 |
| `@ConditionalOnMissingClass` | classpath 没有指定类才生效 |
| `@ConditionalOnBean` | 容器中有指定 Bean 才生效 |
| `@ConditionalOnMissingBean` | 容器中没有指定 Bean 才生效 |
| `@ConditionalOnProperty` | 配置文件中指定属性满足条件才生效 |

## Spring Boot Starter 依赖机制

Starter 将相关依赖打包，一次引入满足特定场景需求：

```
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Starter 依赖关系                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   引入 spring-boot-starter-web                              │
│        │                                                   │
│        ├── spring-boot-starter                             │
│        │        ├── spring-core                            │
│        │        ├── spring-context                        │
│        │        └── spring-context-autoconfigure           │
│        │                                                   │
│        ├── spring-webmvc                                   │
│        │        ├── spring-web                            │
│        │        └── spring-webmvc                          │
│        │                                                   │
│        └── spring-boot-autoconfigure                      │
│                                                             │
│   开发者只需要引入一个 starter，所有相关依赖自动引入         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 常用 Starter

| Starter | 用途 |
|---------|------|
| `spring-boot-starter-web` | Web 开发（包含 MVC） |
| `spring-boot-starter-data-redis` | Redis 集成 |
| `spring-boot-starter-data-jpa` | JPA 数据库操作 |
| `mybatis-plus-boot-starter` | MyBatis-Plus 集成 |
| `druid-spring-boot-starter` | Druid 连接池 |
| `spring-boot-starter-validation` | 参数校验 |
| `spring-boot-starter-actuator` | 应用监控 |

## 三层架构

经典的三层架构，将项目按职责分层：

```
┌─────────────────────────────────────────────────────────────┐
│                  三层架构示意图                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                   Controller 层                      │  │
│   │          接收请求、参数校验、调用 Service              │  │
│   │                                                   │  │
│   │   @RestController                                  │  │
│   │   public class UserController {                    │  │
│   │       @Autowired                                   │  │
│   │       private UserService userService;             │  │
│   │                                                   │  │
│   │       @GetMapping("/user/{id}")                    │  │
│   │       public User getUser(@PathVariable Long id){  │  │
│   │           return userService.getUser(id);          │  │
│   │       }                                            │  │
│   │   }                                                │  │
│   └─────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                   Service 层                          │  │
│   │          业务逻辑处理、事务管理                       │  │
│   │                                                   │  │
│   │   @Service                                         │  │
│   │   public class UserService {                        │  │
│   │       @Autowired                                   │  │
│   │       private UserMapper userMapper;               │  │
│   │                                                   │  │
│   │       @Transactional                               │  │
│   │       public void saveUser(User user) {            │  │
│   │           userMapper.insert(user);                 │  │
│   │       }                                            │  │
│   │   }                                                │  │
│   └─────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                   Mapper 层                          │  │
│   │          数据库操作，SQL 编写                        │  │
│   │                                                   │  │
│   │   @Mapper                                          │  │
│   │   public interface UserMapper {                    │  │
│   │       @Select("SELECT * FROM user WHERE id = #{id}")│  │
│   │       User selectById(Long id);                    │  │
│   │   }                                                │  │
│   └─────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                   MySQL 数据库                        │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 各层职责

| 层级 | 职责 | 注解 |
|------|------|------|
| **Controller** | 接收请求、参数校验、调用 Service、返回响应 | `@RestController` / `@Controller` |
| **Service** | 业务逻辑、事务管理、组合 Mapper 操作 | `@Service` |
| **Mapper** | 数据库操作、SQL 执行 | `@Mapper` / `@Repository` |

## 请求处理完整流程

从请求发起到返回响应，经历了什么？

```
┌─────────────────────────────────────────────────────────────┐
│                  请求处理完整流程                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   浏览器请求 ──→ Nginx ──→ Spring Boot 应用                  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                   Filter 过滤器链                      │  │
│   │   CharacterEncodingFilter（编码）                      │  │
│   │   │                                                   │  │
│   │   └───→ FormContentFilter                            │  │
│   │            │                                          │  │
│   │            └───→ ... 其他 Filter                      │  │
│   └──────────────────────────────────────────────────────┘  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                 Interceptor 拦截器                     │  │
│   │   LoginInterceptor（登录校验）                         │  │
│   │   │                                                   │  │
│   │   └───→ LoggingInterceptor（日志记录）                │  │
│   └──────────────────────────────────────────────────────┘  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                 HandlerMapping                       │  │
│   │           找到匹配的 Controller 和方法                 │  │
│   └──────────────────────────────────────────────────────┘  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                   Controller                          │  │
│   │         @RequestMapping("/user")                     │  │
│   │              ↓                                       │  │
│   │         参数绑定（@RequestParam/@PathVariable）      │  │
│   │              ↓                                       │  │
│   │         调用 Service 层                               │  │
│   └──────────────────────────────────────────────────────┘  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                   Service                             │  │
│   │              业务逻辑处理                              │  │
│   │              @Transactional（事务控制）               │  │
│   └──────────────────────────────────────────────────────┘  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                   Mapper                              │  │
│   │              数据库操作                               │  │
│   └──────────────────────────────────────────────────────┘  │
│                        │                                    │
│                        ▼                                    │
│   ┌──────────────────────────────────────────────────────┐  │
│   │               MySQL / Redis / MQ                      │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Filter vs Interceptor

| 特性 | Filter | Interceptor |
|------|--------|------------|
| 依赖 | Servlet API | Spring MVC（需要 Controller） |
| 位置 | 容器级别，优先于 Interceptor | 控制器之前 |
| 注册方式 | `@WebFilter` 或 `FilterRegistrationBean` | `WebMvcConfigurer` 配置 |
| 用途 | 全局过滤（编码、跨域、安全） | 请求拦截（日志、权限） |

## RESTful API 设计

RESTful 是目前最流行的 API 设计风格：

### RESTful 规范

```
┌─────────────────────────────────────────────────────────────┐
│                  RESTful 设计规范                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   资源（名词）而非动作（动词）                               │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  GET    /users        获取用户列表                  │  │
│   │  GET    /users/1      获取 ID 为 1 的用户           │  │
│   │  POST   /users        创建用户                      │  │
│   │  PUT    /users/1      更新 ID 为 1 的用户（完整）   │  │
│   │  PATCH  /users/1      部分更新 ID 为 1 的用户       │  │
│   │  DELETE /users/1      删除 ID 为 1 的用户           │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   状态码明确                                                │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  200 OK          成功                                │  │
│   │  201 Created     创建成功                           │  │
│   │  204 No Content  删除成功（无返回内容）             │  │
│   │  400 Bad Request 请求参数错误                       │  │
│   │  401 Unauthorized 未认证                            │  │
│   │  403 Forbidden   无权限                            │  │
│   │  404 Not Found   资源不存在                        │  │
│   │  500 Server Error 服务器内部错误                    │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### RESTful 控制器示例

```java
@RestController
@RequestMapping("/api/users")
public class UserApi {

    @Autowired
    private UserService userService;

    // GET /api/users - 获取用户列表
    @GetMapping
    public Result<List<User>> list() {
        List<User> users = userService.list();
        return Result.success(users);
    }

    // GET /api/users/1 - 获取单个用户
    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            return Result.error("用户不存在");
        }
        return Result.success(user);
    }

    // POST /api/users - 创建用户
    @PostMapping
    public Result<User> create(@RequestBody @Valid CreateUserRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        userService.save(user);
        return Result.success(user);
    }

    // PUT /api/users/1 - 更新用户
    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id,
                                @RequestBody @Valid UpdateUserRequest request) {
        User user = userService.getById(id);
        if (user == null) {
            return Result.error("用户不存在");
        }
        user.setEmail(request.getEmail());
        userService.updateById(user);
        return Result.success();
    }

    // DELETE /api/users/1 - 删除用户
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userService.removeById(id);
        return Result.success();
    }
}
```

## 参数校验

使用 `@Validated` 进行参数校验：

```
┌─────────────────────────────────────────────────────────────┐
│                  常用校验注解                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   注解                    说明                              │
│   ───────────────────────────────────────────────────────── │
│   @NotNull                  不能为 null                     │
│   @NotBlank                 不能为空字符串                   │
│   @NotEmpty                 不能为空（集合/数组）            │
│   @Size(min, max)           长度范围                        │
│   @Min / @Max               数值最小/最大值                  │
│   @DecimalMin / @Max        BigDecimal 最小/最大值          │
│   @Email                    邮箱格式                        │
│   @Pattern                  正则表达式                      │
│   @Past                     过去的时间                      │
│   @Future                   未来的时间                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 校验示例

```java
// 请求对象
public class CreateUserRequest {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度 3-20")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度 6-20")
    private String password;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 0, message = "年龄不能小于 0")
    @Max(value = 150, message = "年龄不能大于 150")
    private Integer age;
}

// 控制器
@PostMapping
public Result<Void> create(@RequestBody @Validated CreateUserRequest request) {
    // @Validated 会自动校验，校验失败抛异常
    userService.createUser(request);
    return Result.success();
}
```

## 全局异常处理

统一的异常处理，避免业务代码中散落 try-catch：

```
┌─────────────────────────────────────────────────────────────┐
│                  全局异常处理流程                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   请求处理过程中抛出异常                                    │
│        │                                                   │
│        ▼                                                   │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              @ControllerAdvice                      │  │
│   │                                                   │  │
│   │   @ExceptionHandler(MethodArgumentNotValidException)│  │
│   │   → 处理参数校验异常                                │  │
│   │                                                   │  │
│   │   @ExceptionHandler(BusinessException)            │  │
│   │   → 处理业务异常                                    │  │
│   │                                                   │  │
│   │   @ExceptionHandler(Exception)                    │  │
│   │   → 处理其他异常                                    │  │
│   └─────────────────────────────────────────────────────┘  │
│        │                                                   │
│        ▼                                                   │
│   返回统一格式的错误响应                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 全局异常处理器

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // 处理参数校验异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        log.warn("参数校验失败：{}", message);
        return Result.error(400, message);
    }

    // 处理业务异常
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusinessException(BusinessException e) {
        log.warn("业务异常：{}", e.getMessage());
        return Result.error(e.getCode(), e.getMessage());
    }

    // 处理其他异常
    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception e) {
        log.error("系统异常", e);
        return Result.error(500, "系统繁忙，请稍后重试");
    }
}

// 自定义业务异常
public class BusinessException extends RuntimeException {
    private int code;

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}

// 统一响应格式
public class Result<T> {
    private int code;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.code = 200;
        result.message = "success";
        result.data = data;
        return result;
    }

    public static <T> Result<T> error(String message) {
        return error(500, message);
    }

    public static <T> Result<T> error(int code, String message) {
        Result<T> result = new Result<>();
        result.code = code;
        result.message = message;
        return result;
    }
}
```

## Spring Boot Actuator 监控

Actuator 提供应用监控端点：

```
┌─────────────────────────────────────────────────────────────┐
│                  Actuator 常用端点                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   端点                        说明                          │
│   ─────────────────────────────────────────────────────────│
│   /actuator/health               应用健康状态               │
│   /actuator/info                 应用基本信息               │
│   /actuator/metrics              应用指标                   │
│   /actuator/env                  环境变量                   │
│   /actuator/beans                容器中的 Bean              │
│   /actuator/caches               缓存信息                   │
│   /actuator/loggers              日志配置                   │
│   /actuator/heapdump             堆内存 dump                │
│   /actuator/threaddump           线程 dump                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 配置

```yaml
spring:
  actuator:
    endpoints:
      web:
        exposure:
          include: health,info,metrics,beans
        base-path: /actuator  # 端点前缀
```

## 项目架构完整图

```
┌─────────────────────────────────────────────────────────────┐
│                  Spring Boot 项目架构图                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                    客户端层                          │  │
│   │       Web浏览器  │  移动App  │  微信小程序  │  API调用   │  │
│   └─────────────────────────────────────────────────────┘  │
│                            │                               │
│                            ▼                               │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                    网关层                            │  │
│   │               Nginx（反向代理 + 负载均衡）            │  │
│   └─────────────────────────────────────────────────────┘  │
│                            │                               │
│            ┌───────────────┼───────────────┐               │
│            ▼               ▼               ▼               │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│   │  应用实例1  │   │  应用实例2  │   │  应用实例3  │     │
│   │   (8081)    │   │   (8082)    │   │   (8083)    │     │
│   └─────────────┘   └─────────────┘   └─────────────┘     │
│            │               │               │               │
│            └───────────────┼───────────────┘               │
│                            ▼                               │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                 Spring Boot 应用层                   │  │
│   ├─────────────────────────────────────────────────────┤  │
│   │   Filter（跨域、编码）→ Interceptor（权限、日志）   │  │
│   ├─────────────────────────────────────────────────────┤  │
│   │   @RestController（接收请求）                        │  │
│   ├─────────────────────────────────────────────────────┤  │
│   │   @Transactional（事务管理）                        │  │
│   ├─────────────────────────────────────────────────────┤  │
│   │   Service（业务逻辑）→ Mapper（数据访问）           │  │
│   └─────────────────────────────────────────────────────┘  │
│                            │                               │
│            ┌───────────────┼───────────────┐               │
│            ▼               ▼               ▼               │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│   │    MySQL    │   │    Redis    │   │   RabbitMQ  │     │
│   │   主数据库   │   │    缓存     │   │   消息队列   │     │
│   └─────────────┘   └─────────────┘   └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Spring Boot 核心要点                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   自动配置 ──→ @SpringBootApplication + 条件注解            │
│       │                                                     │
│       ▼                                                     │
│   Starter 机制 ──→ 一键引入完整依赖                         │
│       │                                                     │
│       ▼                                                     │
│   三层架构 ──→ Controller → Service → Mapper                │
│       │                                                     │
│       ▼                                                     │
│   请求流程 ──→ Filter → Interceptor → Controller → Service │
│       │                                                     │
│       ▼                                                     │
│   RESTful ──→ 资源 + HTTP 方法 + 状态码                    │
│       │                                                     │
│       ▼                                                     │
│   全局异常 ──→ @ControllerAdvice 统一处理                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**核心要点：**

1. **自动配置**通过 `spring.factories` 和条件注解实现零配置
2. **Starter** 将相关依赖打包，一次引入满足场景需求
3. **三层架构**明确各层职责：Controller 接收请求、Service 处理业务、Mapper 操作数据库
4. **请求流程**经过 Filter → Interceptor → Controller → Service → Mapper
5. **RESTful** 用 HTTP 方法表达操作，状态码明确含义
6. **全局异常**用 `@ControllerAdvice` 统一处理，避免业务代码中散落 try-catch
