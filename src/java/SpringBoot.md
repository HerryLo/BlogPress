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

## Spring Boot 是什么

Spring Boot 是基于 Spring 的套件，它帮我们预组装了 Spring 的一系列组件，以便以尽可能少的代码和配置来开发基于 Spring 的 Java 应用程序。

传统的 Spring MVC 开发需要手动配置大量的 XML 文件，包括 applicationContext.xml、springmvc.xml、web.xml，还需要配置数据源、事务管理、MyBatis 映射文件等，往往需要几百行配置才能让项目跑起来。Spring Boot 的出现彻底改变了这一状况，它通过自动配置和 starter 依赖机制，让开发者可以秒级启动项目，开箱即用。

**Spring Boot 的核心价值：**

- **自动配置**：根据 classpath 中的依赖自动配置项目，无需手动编写大量配置文件
- **Starter 机制**：一个 starter 包含特定场景所需的全部依赖，引入即可使用
- **嵌入式服务器**：内置 Tomcat、Jetty 等服务器，打成 jar 包即可运行

**一句话理解**：传统 Spring 像手动组装电脑，需要自己选配件、组装、调试；Spring Boot 像品牌整机，买来插上电源就能用。

## Spring Boot 自动配置原理

Spring Boot 能够实现"零配置"的核心在于 @SpringBootApplication 注解。这个注解组合了 @EnableAutoConfiguration（启用自动配置）和 @ComponentScan（扫描组件）。

@EnableAutoConfiguration 通过 @Import 导入 AutoConfigurationImportSelector，该Selector 会扫描 classpath 中的配置文件：Spring Boot 2.x 使用 `META-INF/spring.factories`，3.x 使用 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`。加载所有自动配置类后，每个自动配置类使用 @Conditional 系列条件注解来判断是否应该生效。

**常见条件注解：**

| 注解 | 作用 |
|------|------|
| @ConditionalOnClass | classpath 有指定类才生效 |
| @ConditionalOnMissingClass | classpath 没有指定类才生效 |
| @ConditionalOnBean | 容器中有指定 Bean 才生效 |
| @ConditionalOnMissingBean | 容器中没有指定 Bean 才生效 |
| @ConditionalOnProperty | 配置文件中指定属性满足条件才生效 |

## Spring Boot Starter 依赖机制

Starter 是 Spring Boot 的另一核心特性，它将特定场景所需的依赖打包成一个 starter，开发者只需要引入一个依赖，就能获得完整的功能。

比如引入 `spring-boot-starter-web` 会自动引入 Spring MVC、Jackson、Tomcat 等所有相关依赖，无需逐个添加。Starter 的设计遵循"约定优于配置"原则，每个 starter 都有默认配置，开发者可以通过 application.yml 覆盖默认配置。

**常用 Starter：**

| Starter | 用途 |
|---------|------|
| spring-boot-starter-web | Web 开发（包含 MVC） |
| spring-boot-starter-data-redis | Redis 集成 |
| spring-boot-starter-data-jpa | JPA 数据库操作 |
| mybatis-plus-boot-starter | MyBatis-Plus 集成 |
| druid-spring-boot-starter | Druid 连接池 |
| spring-boot-starter-validation | 参数校验 |
| spring-boot-starter-actuator | 应用监控 |

## 三层架构

三层架构是企业级 Java 应用最常用的架构模式，将项目按职责分为 Controller 层、Service 层、Mapper 层。这种分层方式使得代码结构清晰，职责明确，便于维护和测试。

**各层职责：**

| 层级 | 职责 | 注解 |
|------|------|------|
| Controller | 接收请求、参数校验、调用 Service、返回响应 | @RestController / @Controller |
| Service | 业务逻辑、事务管理、组合 Mapper 操作 | @Service |
| Mapper | 数据库操作、SQL 执行 | @Mapper / @Repository |

**Controller 层**负责接收请求、参数校验、调用 Service 层、返回响应。它是应用的入口，处理 HTTP 请求的路由、参数的绑定和转换、对 Service 返回的结果进行封装。每个 Controller 方法通常对应一个 API 端点。

**Service 层**负责业务逻辑处理、事务管理、组合 Mapper 操作。它是业务逻辑的核心，Controller 不应该包含复杂的业务逻辑，应该委托给 Service。Service 层通常会调用多个 Mapper 方法完成业务操作，并在方法上添加 @Transactional 注解管理事务。

**Mapper 层**（也称为 DAO 层）负责数据库操作、执行 SQL 语句。它是数据访问的入口，只关心如何和数据库交互，不应该包含业务逻辑。在 MyBatis-Plus 或 MyBatis 中，Mapper 是一个接口，通过注解或 XML 映射文件定义 SQL 语句。

三层之间应该单向依赖：Controller → Service → Mapper。如果出现反向依赖，说明架构设计存在问题。

## 请求处理完整流程

一个 HTTP 请求从浏览器发出到获得响应，经历了多个组件的协作处理。理解这个流程有助于我们更好地设计和调试 Web 应用。

**请求处理链路：**

1. **Filter 过滤器链**：请求首先经过 Filter。Filter 是 Servlet 规范的一部分，位于容器级别，在请求进入 Spring MVC 之前执行。常用的 Filter 包括 CharacterEncodingFilter（处理编码）、FormContentFilter（处理表单数据）等。Filter 常用于跨域处理、安全过滤、请求日志等全局性工作。

2. **Interceptor 拦截器**：通过 Filter 之后，请求到达 Interceptor。拦截器是 Spring MVC 的组件，只对进入 Controller 的请求生效。拦截器可以实现登录校验、日志记录、性能监控等功能。与 Filter 相比，拦截器可以访问 Spring 容器中的 Bean，更加强大和灵活。

3. **Controller 处理**：HandlerMapping 根据 URL 找到匹配的 Controller 和方法，然后通过 HandlerAdapter 调用该方法。在方法执行前，会进行参数绑定，将请求参数转换为方法参数。方法执行后，返回值会经过处理（如 JSON 序列化），最后响应返回给客户端。

**Filter 与 Interceptor 的区别：**

| 特性 | Filter | Interceptor |
|------|--------|------------|
| 依赖 | Servlet API | Spring MVC（需要 Controller） |
| 位置 | 容器级别，优先于 Interceptor | 控制器之前 |
| 注册方式 | @WebFilter 或 FilterRegistrationBean | WebMvcConfigurer 配置 |
| 用途 | 全局过滤（编码、跨域、安全） | 请求拦截（日志、权限） |

## RESTful API 设计

RESTful 是目前最流行的 API 设计风格，它基于 HTTP 协议的自然语义，用 URL 表示资源，用 HTTP 方法表示操作。

**RESTful 设计三原则：**

1. **用名词表示资源**：URL 应该描述资源而不是动作。比如 `/users` 表示用户列表，`/users/1` 表示 ID 为 1 的用户，而不是 `/getUsers`、`/deleteUser` 这样带动词的 URL。

2. **用 HTTP 方法表示操作**：GET 用于获取资源，POST 用于创建资源，PUT 用于完整更新资源，PATCH 用于部分更新资源，DELETE 用于删除资源。每种方法都有明确的语义。

3. **用 HTTP 状态码表示结果**：200 表示成功，201 表示创建成功，204 表示删除成功（无返回内容），400 表示请求参数错误，401 表示未认证，403 表示无权限，404 表示资源不存在，500 表示服务器内部错误。

**RESTful 控制器示例：**

```java
@RestController
@RequestMapping("/api/users")
public class UserApi {

    @GetMapping
    public Result<List<User>> list() {
        return Result.success(userService.list());
    }

    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        return user == null ? Result.error("用户不存在") : Result.success(user);
    }

    @PostMapping
    public Result<Void> create(@RequestBody @Valid CreateUserRequest request) {
        userService.createUser(request);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userService.removeById(id);
        return Result.success();
    }
}
```

## 参数校验

用户提交的数据需要校验后才能使用。Spring Boot 提供了 @Validated 注解配合 Bean Validation 注解实现参数校验，这种方式将校验逻辑与业务代码分离，代码简洁且可复用。

**常用校验注解：**

| 注解 | 说明 |
|------|------|
| @NotNull | 不能为 null |
| @NotBlank | 不能为空字符串 |
| @NotEmpty | 不能为空（集合/数组） |
| @Size(min, max) | 长度范围 |
| @Min / @Max | 数值最小/最大值 |
| @Email | 邮箱格式 |
| @Pattern | 正则表达式 |

@NotNull 验证值不能为 null，适用于任意类型；@NotBlank 验证字符串不能为空或纯空格，用于 String 类型；@NotEmpty 验证集合或数组不能为空；@Size 验证字符串长度或集合大小；@Min/@Max 验证数值的最小最大值；@Email 验证邮箱格式；@Pattern 验证正则表达式匹配。

校验注解可以添加 message 属性指定错误提示信息。当 Controller 方法参数带有 @Validated 且校验失败时，会抛出 MethodArgumentNotValidException 异常，这个异常会被全局异常处理器捕获并返回统一的错误响应。

## 全局异常处理

实际开发中，业务逻辑可能会抛出各种异常。如果每个方法都 try-catch 处理异常，代码会变得臃肿且不一致。Spring Boot 提供了 @ControllerAdvice 注解实现全局异常处理，统一捕获并处理异常，返回格式统一的错误响应。

**工作流程：** 当 Controller 或 Service 抛出异常时，Spring MVC 会遍历 @ControllerAdvice 中的 @ExceptionHandler 方法，找到匹配异常类型的处理方法。处理方法可以返回统一的 Result 对象，包含错误码和错误信息。

**常见异常处理：**

- 参数校验异常（MethodArgumentNotValidException）返回字段错误信息
- 业务异常（自定义 BusinessException）返回业务定义的错误码
- 服务器异常（Exception）返回"系统繁忙"的友好提示

**全局异常处理器：**

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        return Result.error(400, message);
    }

    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusinessException(BusinessException e) {
        return Result.error(e.getCode(), e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception e) {
        log.error("系统异常", e);
        return Result.error(500, "系统繁忙，请稍后重试");
    }
}
```

## Spring Boot Actuator 监控

Spring Boot Actuator 提供了应用监控端点，可以查看应用的健康状态、指标信息、Bean 列表等。在生产环境中，监控是运维的重要手段，Actuator 让我们可以快速了解应用的运行状况。

**常用端点：**

| 端点 | 说明 |
|------|------|
| /actuator/health | 应用健康状态，用于负载均衡器判断实例是否可用 |
| /actuator/info | 应用基本信息 |
| /actuator/metrics | 应用指标，如内存使用、线程数、HTTP 请求数 |
| /actuator/beans | 容器中所有 Bean 的信息，用于调试 |
| /actuator/heapdump | 堆内存 dump 文件，用于问题排查 |
| /actuator/threaddump | 线程 dump 文件，用于问题排查 |

在 application.yml 中通过 `spring.actuator.endpoints.web.exposure.include` 配置需要暴露的端点。生产环境中至少应该暴露 health 端点。

**配置示例：**

```yaml
spring:
  actuator:
    endpoints:
      web:
        exposure:
          include: health,info,metrics,beans
        base-path: /actuator
```

## 项目架构完整图

一个完整的 Spring Boot 项目架构包括客户端层、网关层、应用层和数据层。

**架构分层：**

- **客户端层**：Web 浏览器、移动 App、微信小程序、API 调用
- **网关层**：Nginx 做反向代理和负载均衡
- **应用层**：部署多个 Spring Boot 实例，每个实例内部通过 Filter 处理跨域和编码，通过 Interceptor 处理权限和日志，通过 Controller 接收请求，通过 Service 处理业务逻辑，通过 Mapper 访问数据库
- **数据层**：MySQL 主数据库、Redis 缓存、RabbitMQ 消息队列

```
客户端层：Web浏览器 | 移动App | 微信小程序 | API调用
                ↓
          网关层（Nginx反向代理 + 负载均衡）
                ↓
   ┌────────────┼────────────┐
   ↓            ↓            ↓
应用实例1    应用实例2    应用实例3
(8081)        (8082)       (8083)
   │            │            │
   └────────────┼────────────┘
                ↓
      Spring Boot 应用层
   ┌─────────────────────────────┐
   │ Filter → Interceptor → Controller │
   │ @Transactional                    │
   │ Service → Mapper                  │
   └─────────────────────────────┘
                ↓
   ┌────────────┼────────────┐
   ↓            ↓            ↓
 MySQL       Redis        RabbitMQ
 主数据库      缓存         消息队列
```

这种架构支持水平扩展：可以在 Nginx 后增加多个 Spring Boot 实例应对流量增长；MySQL 可以做主从复制提高读写性能；Redis 缓存热点数据降低数据库压力；RabbitMQ 实现异步处理和系统解耦。

## 总结

Spring Boot 核心要点包括：自动配置通过条件注解实现零配置开发，Starter 机制一键引入完整依赖，三层架构明确各层职责，请求流程经过 Filter → Interceptor → Controller → Service → Mapper，RESTful 用 HTTP 方法表达操作，全局异常用 @ControllerAdvice 统一处理。掌握这些核心概念，才能熟练运用 Spring Boot 进行企业级应用开发。