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

## 为什么学习Servlet

Servlet是JavaWeb的基石，所有Java Web框架（Spring MVC、Struts）底层都建立在Servlet之上。理解Servlet，才能理解框架工作原理。

## 什么是Servlet

Servlet是Java EE（现Jakarta EE）定义的Web组件规范，运行在Web容器中，负责处理HTTP请求并生成响应。

**核心特点：**
- 部署在Tomcat、Jetty等Web容器中
- 处理浏览器发送的HTTP请求
- 框架底层：Spring MVC的DispatcherServlet本身就是Servlet

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   浏览器请求 → Tomcat → Servlet容器 → Servlet → 响应        │
│                                    ↓                        │
│                            Spring MVC 也运行在其上           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 请求流程

理解一个HTTP请求从浏览器发出到获得响应的完整过程。

**流程说明：**

1. 用户在浏览器输入URL发起HTTP请求
2. Tomcat接收请求，解析URL路径
3. 找到对应的Servlet
4. Servlet执行业务逻辑
5. 返回响应给浏览器

```
浏览器请求 → Web容器 → Servlet容器 → Servlet → 响应
```

## Servlet生命周期

Servlet从加载到销毁经历多个阶段，理解生命周期有助于正确初始化资源和释放资源。

**生命周期方法：**

| 方法 | 调用时机 | 调用次数 |
|------|----------|----------|
| init() | 第一次请求时 | 1次 |
| service() | 每次请求时 | N次 |
| destroy() | 容器关闭时 | 1次 |

```java
public class HelloServlet extends HttpServlet {

    @Override
    public void init() {
        System.out.println("Servlet初始化，只执行一次");
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("处理请求，每次都执行");
    }

    @Override
    public void destroy() {
        System.out.println("容器关闭时执行，用于释放资源");
    }
}
```

## 会话管理

HTTP是无状态协议，服务器无法识别两次请求是否来自同一用户。会话管理解决这一问题。

### 为什么需要会话管理

用户登录后，服务器需要记住用户身份，以便后续请求携带用户信息。Cookie和Session是两种主要的会话管理机制。

### Cookie机制

Cookie是服务器发送给浏览器的小文件，存储在浏览器端。

```java
// 服务器创建Cookie
Cookie cookie = new Cookie("username", "admin");
cookie.setMaxAge(7 * 24 * 60 * 60);  // 7天有效
response.addCookie(cookie);

// 浏览器请求时自动携带Cookie
Cookie[] cookies = request.getCookies();
```

### Session机制

Session存储在服务器端，比Cookie更安全。

```java
// 获取Session
HttpSession session = request.getSession();

// 存储数据
session.setAttribute("user", user);

// 获取数据
User user = (User) session.getAttribute("user");

// 销毁Session
session.invalidate();
```

### Cookie vs Session

| 特征 | Cookie | Session |
|------|--------|---------|
| 存储位置 | 客户端浏览器 | 服务器端 |
| 安全性 | 较低 | 较高 |
| 存储大小 | ≤4KB | 无限制 |

## 注解开发Servlet

传统方式需要配置web.xml，注解方式更简洁。

```java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        // 处理登录逻辑...
    }
}
```

常用注解：
- `@WebServlet("/path")` - 配置URL映射
- `@WebInitParam` - 配置初始化参数

## Filter过滤器

Filter在请求到达Servlet之前进行拦截处理，常用于编码转换、权限校验等。

```java
@WebFilter("/*")
public class EncodingFilter implements Filter {

    @Override
    public void init(FilterConfig config) {
        System.out.println("过滤器初始化");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);  // 放行
    }

    @Override
    public void destroy() {
        System.out.println("过滤器销毁");
    }
}
```

## 总结

Servlet是JavaWeb核心，请求流程：浏览器→Filter→Servlet→Service→DAO。

**学习路径：**
```
Servlet（请求处理基础）
    ↓
Spring MVC（请求调度框架）
    ↓
JDBC（数据库操作）
    ↓
MyBatis（数据持久化）
```

掌握Servlet后，才能理解Spring MVC等框架的工作原理。