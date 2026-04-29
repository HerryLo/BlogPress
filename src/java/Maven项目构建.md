---
title: Maven项目构建
date: 2025-10-02T00:00:00+08:00
category:
  - java开发
tags:
  - Maven
  - 项目构建
  - 依赖管理
---

# Maven项目构建

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

## Maven 是什么

**Maven** 是一个**项目管理和构建自动化工具**，主要用于 Java 项目。它的核心作用是：

+ **依赖管理**：自动下载和管理项目需要的 Jar 包
+ **项目构建**：编译、测试、打包、部署一站式完成
+ **项目规范**：统一的项目结构和生命周期

**一句话**：Maven 就像你项目的"管家"，帮你管 Jar 包、管编译、管打包。

## Maven 坐标

Maven 通过坐标来唯一标识一个 Jar 包：

```xml
<dependency>
    <groupId>com.alibaba</groupId>      <!-- 组织名 -->
    <artifactId>druid</artifactId>       <!-- 项目名 -->
    <version>1.2.8</version>           <!-- 版本号 -->
</dependency>
```

**坐标三要素：**

| 要素 | 作用 | 示例 |
|------|------|------|
| `groupId` | 组织/公司域名反写 | `com.alibaba`, `org.springframework` |
| `artifactId` | 项目/模块名 | `spring-core`, `mybatis` |
| `version` | 版本号 | `5.3.20`, `1.0-SNAPSHOT` |

**版本号规范：**

```
主版本号.次版本号.修订号
  │        │        │
  │        │        └── 修复bug，兼容更新
  │        └───────── 新功能，向下兼容
  └────────────────── 大改动，不兼容
```

**特殊版本：**

- `SNAPSHOT` - 快照版，开发中不稳定版本
- `RELEASE` - 发布版，稳定版本

## Maven 仓库

Maven 从哪里找 Jar 包？

```
┌─────────────────────────────────────────────────────────────┐
│                      Maven 仓库机制                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   本地仓库                           中央仓库                 │
│   (用户目录/.m2/repository)          (maven中央仓库)          │
│          ↑                                  ↑                │
│          │                                  │                │
│          │     私服 (Nexus/Artifactory)      │                │
│          │           ↑                       │                │
│          │           │                       │                │
│          └───────────┼───────────────────────┘                │
│                      │                                        │
│                      ▼                                        │
│               Maven 构建时                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**查找顺序：本地仓库 → 私服 → 中央仓库**

### 仓库目录结构

```
~/.m2/repository/
├── com/alibaba/
│   └── druid/
│       └── 1.2.8/
│           ├── druid-1.2.8.jar
│           └── druid-1.2.8.pom
├── org/springframework/
│   └── spring-core/
│       └── 5.3.20/
│           ├── spring-core-5.3.20.jar
│           └── spring-core-5.3.20.pom
```

## pom.xml 项目对象模型

pom.xml 是 Maven 项目的核心配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <!-- 项目模型版本，固定 4.0.0 -->
    <modelVersion>4.0.0</modelVersion>

    <!-- 项目坐标 -->
    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <!-- 项目名称和描述 -->
    <name>My Project</name>
    <description>这是一个示例项目</description>

    <!-- 属性配置 -->
    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 依赖管理 -->
    <dependencies>
        <!-- Spring Boot Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.0</version>
        </dependency>

        <!-- MyBatis Plus -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.5</version>
        </dependency>

        <!-- 数据库驱动 -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.33</version>
        </dependency>

        <!-- Lombok (编译时生效，不打入 jar) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.30</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <!-- 构建配置 -->
    <build>
        <plugins>
            <!-- Maven 编译插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### scope 依赖范围

| scope | 编译时可见 | 测试时可见 | 运行时可见 | 打包进 jar |
|-------|-----------|-----------|-----------|-----------|
| `compile` | ✅ | ✅ | ✅ | ✅ |
| `provided` | ✅ | ✅ | ❌ | ❌ |
| `test` | ❌ | ✅ | ❌ | ❌ |
| `runtime` | ❌ | ✅ | ✅ | ✅ |

**常见场景：**
- `servlet-api`：使用 `provided`，避免与 Tomcat 冲突
- `junit`：使用 `test`
- `jdbc驱动`：使用 `runtime`，编译时不需要

## Maven 依赖传递

```
A 依赖 B，B 依赖 C
         ↓
    A 自动获得 C 的依赖
         ↓
    这就是依赖传递
```

```xml
<!-- 项目 A 的 pom.xml -->
<dependency>
    <groupId>com.example</groupId>
    <artifactId>B</artifactId>
    <version>1.0</version>
</dependency>

<!-- B 的 pom.xml -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.12.0</version>
</dependency>
```

**依赖传递的好处**：只需要声明直接依赖，间接依赖会自动引入。

### 依赖冲突

当同一个 Jar 包被不同版本引入时，Maven 如何选择？

```
项目依赖关系：
A → B → C → D(版本1)
A → E → D(版本2)
```

**解决原则：**
1. **路径最短优先**：直接依赖 > 间接依赖
2. **声明顺序优先**：在 pom.xml 中先声明的优先

**查看依赖树：**

```bash
# 查看完整依赖树
mvn dependency:tree

# 查看依赖树（过滤只看某个）
mvn dependency:tree -Dincludes=com.alibaba:druid

# 导出依赖树到文件
mvn dependency:tree > dependency.txt
```

**排除依赖：**

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>B</artifactId>
    <version>1.0</version>
    <exclusions>
        <!-- 排除 B 传递过来的 C -->
        <exclusion>
            <groupId>com.example</groupId>
            <artifactId>C</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## Maven 生命周期

Maven 将项目构建过程划分为不同的阶段：

```
┌─────────────────────────────────────────────────────────────┐
│                    Maven 生命周期                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  clean     ──→ compile ──→ test ──→ package ──→ install ──→ deploy  │
│  (清理)        (编译)    (测试)  (打包)    (安装到本地)  (部署到远程)   │
│                                                             │
│  ←────────────────── 默认生命周期 ──────────────────────→  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**常用命令：**

| 命令 | 作用 | 说明 |
|------|------|------|
| `mvn clean` | 清理 target 目录 | 删除编译生成的 class 文件 |
| `mvn compile` | 编译项目 | 生成 target/classes |
| `mvn test` | 运行测试 | 执行 src/test/java 下的测试 |
| `mvn package` | 打包项目 | 生成 jar 或 war 文件 |
| `mvn install` | 安装到本地仓库 | 其他项目可以依赖此项目 |
| `mvn deploy` | 部署到远程仓库 | 发布到私服供团队使用 |
| `mvn dependency:tree` | 查看依赖树 | 分析依赖关系 |

**常用组合：**

```bash
# 清理并打包（跳过测试）
mvn clean package -DskipTests

# 打包到本地仓库
mvn clean install

# 查看依赖树
mvn dependency:tree

# 分析依赖（查看冲突）
mvn dependency:analyze
```

## Maven 常用插件

| 插件 | 作用 | 示例 |
|------|------|------|
| `maven-compiler-plugin` | 编译控制 | 设置 Java 版本 |
| `maven-surefire-plugin` | 测试运行 | 配置测试跳过 |
| `maven-jar-plugin` | jar 包打包 | 配置主类入口 |
| `maven-shade-plugin` | 打包可执行 jar | 包含依赖 |
| `maven-source-plugin` | 生成源码 jar | 上传源码到私服 |

## Maven 项目标准结构

```
my-project/
├── pom.xml                    # Maven 配置文件
├── src/
│   ├── main/
│   │   ├── java/             # Java 源代码
│   │   │   └── com/example/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── mapper/
│   │   │       └── entity/
│   │   └── resources/        # 配置文件
│   │       ├── application.yml
│   │       └── mapper/
│   └── test/
│       └── java/             # 测试代码
└── target/                   # 编译输出目录（自动生成）
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                      Maven 核心概念                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  坐标定位 ──→ groupId:artifactId:version                  │
│       ↓                                                     │
│  仓库获取 ──→ 本地 → 私服 → 中央仓库                        │
│       ↓                                                     │
│  依赖管理 ──→ 传递 + 冲突解决                              │
│       ↓                                                     │
│  生命周期 ──→ clean → compile → test → package → install   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**核心要点：**

1. **坐标**是 Maven 定位 Jar 包的方式（groupId:artifactId:version）
2. **仓库**查找顺序：本地仓库 → 私服 → 中央仓库
3. **依赖传递**简化了依赖声明，但要注意冲突
4. **生命周期**让构建过程规范化，常用 `package` 打包
5. 使用 `dependency:tree` 分析依赖，排查冲突问题
