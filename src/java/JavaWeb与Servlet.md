---
title: JavaWeb与Servlet
date: 2025-10-01T00:00:00+08:00
category:
  - java开发
tags:
  - JavaWeb
  - Servlet
  - HTTP
---

# JavaWeb与Servlet

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

## 什么是 Servlet

**Servlet 是 Java EE（现在叫 Jakarta EE）中最核心、最基础的 Web 技术规范**，几乎所有 Java Web 框架（Spring MVC、Struts、JSP 等）底层都建立在 Servlet 之上。

| 维度 | 说明 |
| --- | --- |
| **基础规范** | 所有 Java Web 应用都必须实现 Servlet 规范 |
| **请求入口** | 任何 HTTP 请求最终都会被 Servlet 处理 |
| **框架底层** | Spring MVC、Struts 等框架的 DispatcherServlet 本身就是 Servlet |
| **容器依赖** | Tomcat、Jetty、Undertow 等 Web 容器都是 Servlet 容器 |

## 请求流程

浏览器发起请求后，经历了怎样的旅程？

```xml
浏览器请求 → Web 容器（Tomcat）→ Servlet 容器 → Servlet → 响应
                                    ↓
                            Spring MVC 本质上
                            也是一个 Servlet
```

**流程说明：**

1. 用户在浏览器输入 URL 发起 HTTP 请求
2. Tomcat（Web 容器）接收请求
3. 根据 URL 路径找到对应的 Servlet
4. Servlet 处理业务逻辑
5. 返回响应给浏览器

## Servlet 生命周期

Servlet 从加载到销毁，经历了怎样的过程？

```java
┌─────────────────────────────────────────────────────────────┐
│                     Servlet 生命周期                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 加载阶段                                                │
│      ↓                                                      │
│   2. 初始化阶段 [init()] ─────→ 只执行一次                    │
│      ↓                                                      │
│   3. 请求处理阶段 [service()] ──→ 每次请求都执行               │
│      ↓                                                      │
│   4. 销毁阶段 [destroy()] ──────→ 关闭容器时执行              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 生命周期方法详解

| 方法 | 调用时机 | 调用次数 | 作用 |
|------|----------|----------|------|
| `init()` | 第一次请求时 | 1次 | 初始化资源 |
| `service()` | 每次请求时 | N次 | 处理业务逻辑 |
| `destroy()` | 容器关闭时 | 1次 | 释放资源 |

```java
public class HelloServlet extends HttpServlet {

    // 初始化方法，Servlet 创建时调用
    @Override
    public void init() throws ServletException {
        System.out.println("Servlet 初始化了...");
    }

    // 处理请求的核心方法
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        System.out.println("处理请求...");
        // 根据请求方式分发到 doGet 或 doPost
        super.service(req, resp);
    }

    // 销毁方法，容器关闭时调用
    @Override
    public void destroy() {
        System.out.println("Servlet 销毁了...");
    }
}
```

## HttpServletRequest 请求对象

请求对象封装了客户端发来的所有信息，常用方法如下：

### 获取请求信息

```java
// 1. 获取请求参数
String username = request.getParameter("username");
String password = request.getParameter("password");

// 2. 获取所有参数名称
Enumeration<String> paramNames = request.getParameterNames();

// 3. 获取参数值（一个key对多个value）
String[] hobbies = request.getParameterValues("hobby");

// 4. 获取请求头信息
String contentType = request.getContentType();  // 如：application/json
String userAgent = request.getHeader("User-Agent");

// 5. 获取请求方式
String method = request.getMethod();  // GET 或 POST

// 6. 获取请求路径
String uri = request.getRequestURI();     // /user/login
StringBuffer url = request.getRequestURL(); // 完整URL
String contextPath = request.getContextPath(); // 项目路径
```

### 请求转发

请求转发是服务器内部的跳转，客户端只发起一次请求：

```java
// 步骤1: 设置请求属性（数据传递）
request.setAttribute("user", userObj);

// 步骤2: 转发到另一个 Servlet
request.getRequestDispatcher("/anotherServlet").forward(request, response);

// 注意：转发后当前 Servlet 的代码继续执行，还是会返回响应
// 所以转发后通常加 return 终止执行
System.out.println("转发后会继续执行...");
return;
```

**请求转发流程图：**

```
客户端请求 ──→ ServletA 设置属性 ──→ 转发到 ServletB
                ↓                      ↓
                └──────────────────────┘
                                        ↓
                              ServletB 获取属性处理
                                        ↓
                              响应返回客户端（只有一次响应）
```

## HttpServletResponse 响应对象

响应对象负责向客户端返回数据：

### 设置响应内容

```java
// 1. 设置响应字符编码和内容类型
response.setCharacterEncoding("UTF-8");
response.setContentType("text/html;charset=UTF-8");

// 2. 获取输出流写文本
PrintWriter out = response.getWriter();
out.write("Hello World");

// 3. 获取字节流写二进制数据（如文件下载）
ServletOutputStream out = response.getOutputStream();
out.write(bytes);
```

### 重定向

重定向是服务器告诉客户端"去访问另一个地址"，客户端会发起新的请求：

```java
// 重定向到另一个地址（客户端会发起新请求）
response.sendRedirect("/webapp/anotherPage");

// 重定向特点：
// 1. 地址栏会改变
// 2. 两次请求两次响应
// 3. 不能共享 request 域中的数据
```

**重定向 vs 转发：**

| 特征 | 请求转发 | 重定向 |
|------|----------|--------|
| 请求次数 | 1次 | 2次 |
| 地址栏 | 不变 | 改变 |
| 是否共享 request | 是 | 否 |
| 跳转位置 | 服务器内部 | 任意地址 |
| 速度 | 较快 | 较慢 |

## 会话管理：Cookie 和 Session

HTTP 是无状态协议，如何让服务器记住用户身份？

### Cookie 机制

Cookie 是服务器保存在客户端的小文件：

```
┌─────────────────────────────────────────────────────────────┐
│                        Cookie 原理                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   客户端                    服务器                           │
│     │                         │                             │
│     │  第一次请求             │                             │
│     │────────────────────────>│                             │
│     │                         │ 生成会话 ID                  │
│     │<────────────────────────│                             │
│     │   Set-Cookie: JSESSIONID│                             │
│     │                         │                             │
│     │  后续请求（带 Cookie）   │                             │
│     │────────────────────────>│                             │
│     │   Cookie: JSESSIONID=xxx│  通过 ID 识别用户            │
│     │                         │                             │
└─────────────────────────────────────────────────────────────┘
```

### Session 机制

Session 是服务器端存储的用户会话信息：

```java
// 1. 获取或创建 Session
HttpSession session = request.getSession(true); // true = 不存在则创建

// 2. 往 Session 中存数据
session.setAttribute("user", userObj);

// 3. 从 Session 中取数据
User user = (User) session.getAttribute("user");

// 4. 删除 Session 中的数据
session.removeAttribute("user");

// 5. 销毁整个 Session
session.invalidate();

// 6. Session 常用方法
session.getId();              // 获取 Session ID
session.getMaxInactiveInterval(); // 获取会话最大空闲时间
session.setMaxInactiveInterval(1800); // 设置 30 分钟
```

**Cookie vs Session 对比：**

| 特征 | Cookie | Session |
|------|--------|---------|
| 存储位置 | 客户端浏览器 | 服务器端 |
| 安全性 | 较低（可被用户禁用） | 较高 |
| 存储大小 | ≤4KB | 无限制（受服务器内存） |
| 生命周期 | 可以长期保存 | 随会话结束而结束 |

## 注解开发 Servlet

传统配置需要 web.xml，注解方式更加简洁：

```java
// 使用 @WebServlet 注解配置 Servlet
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 处理登录逻辑
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // 调用 Service 层验证
        UserService userService = new UserServiceImpl();
        User user = userService.login(username, password);

        if (user != null) {
            // 登录成功，重定向到主页
            response.sendRedirect("/index");
        } else {
            // 登录失败，转发回登录页并提示错误
            request.setAttribute("error", "用户名或密码错误");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // GET 请求显示登录页面
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }
}
```

### 常用 Servlet 注解

```java
@WebServlet("/user/*")           // 支持路径通配符
@WebServlet(name = "UserServlet")  // Servlet 名称
@WebServlet(urlPatterns = {"/user", "/admin"})  // 多个 URL 映射
@WebServlet(initParams = {
    @WebInitParam(name = "config", value = "xxx")
})  // 初始化参数
```

## 完整示例：用户登录功能

```java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private UserService userService = new UserServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 1. 设置编码
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 2. 获取请求参数
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String remember = request.getParameter("remember");

        // 3. 验证登录
        User user = userService.login(username, password);

        if (user != null) {
            // 登录成功
            if ("on".equals(remember)) {
                // 如果勾选记住我，创建 Cookie 保存用户名
                Cookie cookie = new Cookie("username", username);
                cookie.setMaxAge(7 * 24 * 60 * 60); // 7 天
                response.addCookie(cookie);
            }

            // 将用户信息存入 Session
            HttpSession session = request.getSession();
            session.setAttribute("user", user);

            // 重定向到主页
            response.sendRedirect(request.getContextPath() + "/index");
        } else {
            // 登录失败
            request.setAttribute("error", "用户名或密码错误");
            request.setAttribute("username", username);
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 获取 Cookie 中的用户名（自动填充）
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("username".equals(cookie.getName())) {
                    request.setAttribute("username", cookie.getValue());
                    break;
                }
            }
        }
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }
}
```

## Filter 过滤器

过滤器可以在请求到达 Servlet 之前进行拦截处理：

```java
@WebFilter("/*")  // 拦截所有请求
public class EncodingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("过滤器初始化");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {
        // 设置编码
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 放行，执行后续过滤器或 Servlet
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        System.out.println("过滤器销毁");
    }
}
```

**过滤器链执行顺序：**

```
请求 → Filter1.doFilter() → Filter2.doFilter() → Servlet
                      ↑                      ↑
                      └──────────────────────┘
                              执行完毕后返回
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                      JavaWeb 请求处理架构                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   浏览器 ──→ Filter1 ──→ Filter2 ──→ Servlet ──→ Service   │
│     ↑                                              │         │
│     │                                              ▼         │
│     │                                         Mapper/DAO     │
│     │                                              │         │
│     └──────────── 响应返回 ────────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**核心要点：**

1. **Servlet 是 JavaWeb 的基础**，所有框架都构建在其之上
2. **请求转发**是服务器内部跳转，**重定向**是让客户端发新请求
3. **Cookie**存在客户端，**Session**存在服务器端
4. **Filter**可以拦截请求进行统一处理（编码、权限校验等）
5. 使用**注解开发**可以替代繁琐的 web.xml 配置
