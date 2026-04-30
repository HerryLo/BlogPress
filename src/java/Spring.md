---
title: Spring核心概念
date: 2025-10-05T00:00:00+08:00
category:
  - java开发
tags:
  - Spring
  - IOC
  - AOP
  - DI
---

# Spring核心概念

## Spring 是什么

Spring 是一个轻量级的 Java 开发框架，它的主要功能包括：IoC 容器管理 Bean 的创建和依赖注入、AOP 支持面向切面编程、事务支持统一管理、MVC 开发 Web 请求处理框架、以及方便的第三方集成。Spring 出现之前，我们使用 EJB 开发企业应用，需要编写大量的配置文件，代码耦合严重。Spring 的诞生让 Java 开发变得简单，也让 Spring 成为了 Java 后端开发的事实标准。

**Spring 核心价值：**
- **轻量级**：核心 jar 包小，运行时开销低
- **解耦**：通过 IOC 和 DI 实现松耦合
- **AOP**：分离横切关注点，提高代码复用
- **一站式**：提供 Web、事务、安全等全套解决方案

## IOC 控制反转

IOC（Inversion of Control，控制反转）是 Spring 的核心思想。它将对象的创建和管理权从应用代码转移到 Spring 容器。当我们使用传统方式创建对象时，需要在代码中显式调用 `new UserService()`，这样会导致对象之间的依赖关系固化，测试困难。IOC 的出现解决了这个问题，它让容器负责创建对象并注入依赖，代码只需要声明需要什么，而不需要关心对象从何而来。

**为什么需要 IOC：**
1. 降低对象之间的耦合度
2. 便于单元测试（可以注入 mock 对象）
3. 统一对象生命周期管理
4. 更容易实现对象的替换和扩展

### IOC 容器启动流程

Spring 容器启动经历了以下步骤：首先是读取配置元数据，可以是 XML 文件、注解或 Java Config；然后根据配置创建 BeanDefinition，描述 Bean 的配置信息；接着调用 BeanFactoryPostProcessor 进行后置处理；之后实例化 Bean 创建实际的 Bean 实例；随后进行依赖注入，将属性和协作者注入到 Bean 中；接着调用生命周期回调方法进行初始化；最后 Bean 就绪可以使用；当容器关闭时，会销毁 Bean 并调用销毁方法。整个过程由 Spring 容器自动完成，开发者只需要提供配置即可。

**IOC 容器启动流程图：**

```
1. 读取配置元数据（XML / 注解 / Java Config）
       ↓
2. 创建 BeanDefinition（描述 Bean 的配置信息）
       ↓
3. BeanFactoryPostProcessor 后置处理
       ↓
4. 实例化 Bean（创建 Bean 实例）
       ↓
5. 依赖注入（注入属性和协作者）
       ↓
6. 生命周期回调（初始化方法）
       ↓
7. Bean 就绪（可以使用）
       ↓
8. 容器关闭（销毁 Bean，调用销毁方法）
```

### 核心问题解答

**何为控制，控制的是什么？** 控制指的是 Bean 的创建、管理的权利，具体包括 Bean 的实例化、属性的注入、生命周期的管理。也就是说，Spring 容器控制了 Bean 的一生，而我们只需要告诉容器如何创建这些 Bean。

**何为反转，反转了什么？** 反转指的是把创建和管理 Bean 的权利从开发者手中转交给 Spring 容器。传统的开发模式是由开发者主动创建对象，比如 `Service service = new Service()`。反转之后，开发者不再主动创建，而是被动等待容器注入对象。这种被动获取的方式就是"反转"，也称为"依赖注入"。

## DI 依赖注入

DI（Dependency Injection，依赖注入）是 IOC 的具体实现方式。IOC 是一种设计思想，而 DI 是实现这种思想的具体手段。通过 DI，Spring 容器在创建 Bean 时，会自动将依赖的其他 Bean 注入到目标 Bean 中。开发者只需要声明依赖，容器会负责找到对应的 Bean 并注入。

### 三种注入方式

**构造器注入**是官方推荐的方式。通过构造函数注入依赖有以下优点：依赖不可变（final 字段）、循环依赖可以在启动时检测到、单元测试时容易 mock。由于构造器注入能够确保依赖不为 null，现代 Spring 开发中应该优先使用构造器注入。

```java
@Service
public class UserService {
    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

**Setter 注入**通过 setter 方法注入依赖。这种方式适用于可选依赖（可以为空）的场景。当某个依赖不是必须的时候，可以使用Setter注入。但这种方式可能导致依赖被意外修改，且难以保证依赖不为 null。

```java
@Service
public class UserService {
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

**字段注入**直接在字段上使用 @Autowired 注解。这种方式虽然代码简洁，但存在诸多问题：难以进行单元测试、无法保证依赖不为 null（可能出现 NPE）、违背了类设计的单一职责原则。因此，字段注入不推荐在生产代码中使用。

```java
@Service
public class UserService {
    @Autowired
    private UserDao userDao;
}
```

### 依赖注入流程

当 Spring 容器创建一个 Bean 时，如果该 Bean 声明了依赖，会按以下顺序执行：首先创建目标 Bean，然后检查其依赖列表，接着根据依赖类型去容器中查找匹配的 Bean，如果找到则创建并注入，如果找不到则报错。整个过程遵循深度优先原则，确保所有依赖都被正确解析。

## Bean 作用域

Spring 容器中的 Bean 可以有不同的作用域，决定了 Bean 实例的创建策略和使用范围。理解 Bean 作用域有助于我们合理设计 Bean 的生命周期，避免内存浪费或线程安全问题。

| 作用域 | 说明 | 使用场景 |
|--------|------|---------|
| singleton | 整个容器只有一个实例 | 默认值，适合无状态的 Bean，如 Service、Repository |
| prototype | 每次获取创建新实例 | 有状态的 Bean，需要每次新创建的对象 |
| request | 每次 HTTP 请求创建一个 | Web 请求相关的 Bean |
| session | 每次 HTTP Session 创建一个 | Session 相关的 Bean |
| application | 整个 ServletContext 一个 | 全局共享的应用级 Bean |

实际开发中，99% 的 Bean 都是 singleton 作用域，因为 Spring 应用通常是无状态的。如果需要每次请求都创建新实例，应该选择 prototype 作用域。

## 自动装配

自动装配是 Spring 容器自动解析 Bean 之间的依赖关系，并将匹配的 Bean 自动注入到目标 Bean 中。Spring 会根据一定的规则自动选择需要注入的 Bean，开发者不需要显式指定。

### 自动装配方式

**byType 方式**是 Spring Boot 的默认方式。容器根据类型查找匹配的 Bean，如果找到一个就自动注入；如果找到多个，会再按名称（byName）进行匹配；如果找到多个且名称都不匹配，则报错。这种方式适合大多数场景，但需要注意接口可能有多个实现类的情况。

**byName 方式**根据属性名去容器中查找同名的 Bean。这种方式要求 Bean 的名称必须与属性名一致，否则无法匹配。

**constructor 方式**优先按构造器参数类型进行匹配，如果某个构造器的参数在容器中都能找到匹配的 Bean，则使用该构造器创建实例。

## AOP 面向切面编程

AOP（Aspect-Oriented Programming，面向切面编程）是 Spring 的另一核心概念。它将分散在多个业务逻辑中的公共行为抽取出来，形成独立的切面。这种做法大大降低了代码重复，提高了模块化程度。

### 什么是横切关注点

在软件开发中，有些行为是贯穿所有业务模块的，比如日志记录、性能监控、事务管理、安全校验等。这些行为散布在各个业务逻辑中，形成"横切关注点"。如果不使用 AOP，开发者需要在每个业务方法中重复编写这些逻辑，导致代码臃肿且难以维护。AOP 的出现完美解决了这个问题，它将这些横切关注点抽取出来，在不修改原有业务逻辑的情况下，增强目标方法的行为。

### AOP 术语详解

理解 AOP 需要掌握几个核心术语：Aspect（切面）是通知和切入点的组合，定义了在何处执行什么增强；Join Point（连接点）是程序执行的某个位置，通常指方法调用；Pointcut（切入点）定义了哪些连接点需要被增强，是匹配连接点的规则；Advice（通知）定义了增强的具体内容，即织入的代码；Target（目标对象）是被通知的对象；Weaving（织入）是将切面应用到目标对象的过程。

### 通知类型

Spring AOP 提供了五种通知类型：**前置通知（@Before）**在目标方法执行之前运行，常用于权限校验、日志记录；**后置通知（@AfterReturning）**在目标方法正常返回后执行，可以获取返回值；**异常通知（@AfterThrowing）**在目标方法抛出异常时执行，用于异常处理；**最终通知（@After）**无论目标方法是否异常都会执行，类似 try-catch 的 finally 块；**环绕通知（@Around）**最强大，可以控制目标方法的执行，可以在前后添加逻辑，甚至可以不执行目标方法。

### 切入点表达式

切入点表达式用于匹配需要被增强的方法。`execution(* com.example.service.UserService.*(..))` 是最常用的表达式，意思是匹配 UserService 类中所有方法，返回值任意、参数任意。表达式中的 `*` 表示通配符，`..` 表示任意参数。

```java
// 匹配指定类的方法
@Before("execution(* com.example.service.UserService.*(..))")

// 匹配所有 save 开头的方法
@Before("execution(* com.example..*.save*(..))")

// 匹配 UserService 中所有 public 方法
@Before("execution(public * com.example.service.UserService.*(..))")

// 匹配参数是 User 的方法
@Before("execution(* com.example.service.*.*(com.example.entity.User))")
```

## 动态代理

AOP 的底层实现依赖动态代理技术。Spring 根据目标对象是否实现接口，自动选择 JDK 动态代理或 CGLIB 代理。理解动态代理有助于我们在遇到代理相关问题时快速定位和解决。

### JDK 动态代理

JDK 动态代理要求目标对象必须实现接口。代理对象实现目标接口，在调用目标方法时，会先执行增强逻辑，然后通过反射调用目标方法。这种方式的优点是标准 API、无需第三方库，缺点是只能代理接口，不能代理类。

### CGLIB 代理

CGLIB 代理通过继承目标类生成子类来实现代理，不需要目标类实现接口。代理对象继承目标类，重写目标方法，在方法中调用父类（目标类）的方法并加入增强逻辑。这种方式的优点是可以代理任意类，缺点是需要生成字节码、可能影响性能。

### Spring 选择策略

Spring 默认的策略是：如果目标对象实现了接口，使用 JDK 动态代理；如果没有实现接口，使用 CGLIB 代理。可以通过配置 `proxy-target-class="true"` 强制使用 CGLIB 代理。在实际项目中，大部分 Service 都实现了接口，所以默认使用 JDK 动态代理。

### 动态代理执行流程

当客户端调用被代理的方法时，实际执行的是代理对象的 invoke 方法。代理对象在调用目标方法之前，会先执行 @Before 通知的逻辑，然后通过反射调用目标方法，根据方法执行结果决定是否执行 @AfterReturning 或 @AfterThrowing 通知，最后返回结果给客户端。整个过程对调用方透明，但增强了目标方法的行为。

**动态代理执行流程图：**

```
客户端调用
       ↓
   代理对象
       ↓
1. 调用方法（如 saveUser）
2. 根据注解判断需要增强
3. 执行前置通知（@Before）
4. 执行目标方法（saveUser 实际逻辑）
5. 执行返回通知（@AfterReturning）
6. 执行后置通知（@After）
       ↓
返回结果给客户端
```

## 自定义 AOP 切面示例

实际开发中，我们经常通过自定义注解配合 AOP 实现统一的日志记录、参数校验等功能。这种方式比在每个方法中手动添加逻辑更加优雅和可维护。

### 定义日志注解

通过 @Target 指定注解作用在方法上，@Retention 指定运行时保留，这样可以通过反射获取注解信息。自定义注解可以携带参数，如日志描述，便于在切面中获取并使用。

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyLog {
    String value() default "";
}
```

### 定义日志切面

@Aspect 注解标识这是一个切面类，@Component 将其注册到 Spring 容器。@Pointcut 定义切入点，本例中匹配所有带 @MyLog 注解的方法。@Around 环绕通知中，可以通过 joinPoint.getSignature() 获取方法签名，通过 signature.getMethod().getAnnotation() 获取方法上的注解。记录开始时间、执行目标方法、记录结束时间和耗时、捕获异常并记录错误信息。

```java
@Aspect
@Component
@Slf4j
public class LogAspect {

    @Pointcut("@annotation(com.example.anno.MyLog)")
    public void logPointcut() {}

    @Around("logPointcut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        MyLog myLog = signature.getMethod().getAnnotation(MyLog.class);

        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = signature.getName();

        log.info("【{}】开始执行：{}", myLog.value(), className + "." + methodName);

        long startTime = System.currentTimeMillis();

        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            log.info("【{}】执行完成，耗时：{}ms", myLog.value(), endTime - startTime);
            return result;
        } catch (Exception e) {
            long endTime = System.currentTimeMillis();
            log.error("【{}】执行异常，耗时：{}ms", myLog.value(), endTime - startTime, e);
            throw e;
        }
    }
}
```

## 事务传播行为

事务传播行为描述的是当一个事务方法被另一个事务方法调用时，事务如何传播的问题。理解事务传播行为对于正确设计事务边界至关重要。

### 什么是事务传播

假设外层方法开启了事务，调用内层方法时，内层方法可能需要参与外层的事务，也可能需要开启自己的独立事务。Spring 通过事务传播行为来控制这种场景。不同的事务传播行为会导致不同的执行结果，我们应该根据业务需求选择合适的传播行为。

### 七种传播行为

**REQUIRED** 是默认行为，表示如果有事务则加入，没有则新建。这个行为适合大多数场景，内层方法应该参与外层事务的情况。

**REQUIRES_NEW** 表示每次都新建事务，挂起外层事务。这个行为适合内层方法需要独立事务的场景，比如记录操作日志，即使外层事务回滚，日志也应该被保存。

**NESTED** 表示嵌套事务，使用 JDBC 的 Savepoint 机制。如果外层事务回滚，内层事务也会回滚；但内层事务的回滚不会影响外层事务。这个行为需要数据库支持 Savepoint。

**SUPPORTS** 表示如果有事务就加入，没有则以非事务运行。这个行为适合内层方法不是必须需要事务的场景。

**NOT_SUPPORTED** 表示以非事务运行，如果当前有事务则挂起。适合内层方法不需要事务且不应该参与外层事务的场景。

**MANDATORY** 表示必须在事务中运行，如果当前没有事务则抛异常。适合内层方法必须依赖外层事务的场景。

**NEVER** 表示必须在非事务中运行，如果当前有事务则抛异常。是 MANDATORY 的反向场景。

## 总结

Spring 核心概念包括 IOC 控制反转、DI 依赖注入、Bean 作用域、自动装配、AOP 面向切面编程和动态代理。IOC 将对象创建权交给容器，DI 是 IOC 的实现方式，构造器注入是最佳实践。Bean 作用域决定实例创建策略，singleton 是默认。AOP 将日志、事务等横切关注点分离，动态代理是 AOP 的底层实现，Spring 自动选择 JDK 或 CGLIB。