---
title: Maven
date: 2025-10-02T00:00:00+08:00
category:
  - java
tags:
  - Maven
  - 项目构建
  - 依赖管理
---

# Maven

原文链接：https://www.yuque.com/yopai/pp6bv5/oex5nd4emukqqkpt

Maven 是 Java 项目的**依赖管理 + 构建自动化工具**，核心功能：管 Jar 包、管编译、管打包。

## 坐标

Maven 通过 `groupId:artifactId:version` 定位 Jar 包。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.2.0</version>
</dependency>
```

**版本号规范**：`主版本.次版本.修订号`（大改动→新功能→修复bug）

| 标识 | 含义 |
|------|------|
| `SNAPSHOT` | 快照版，开发中 |
| `RELEASE` | 发布版，稳定 |

## 仓库

```
本地仓库 → 私服（Nexus/Artifactory）→ 中央仓库（Maven Central）
```

本地仓库默认路径 `~/.m2/repository/`。

## pom.xml 核心配置

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <java.version>17</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.0</version>
        </dependency>
    </dependencies>
</project>
```

### scope 依赖范围

| scope | 编译 | 测试 | 运行 | 打包 |
|-------|------|------|------|------|
| `compile` | ✅ | ✅ | ✅ | ✅ |
| `provided` | ✅ | ✅ | ❌ | ❌ |
| `test` | ❌ | ✅ | ❌ | ❌ |
| `runtime` | ❌ | ✅ | ✅ | ✅ |

## 依赖传递与冲突

A 依赖 B，B 依赖 C → A 自动获得 C。

**冲突解决**：路径最短优先 → 声明顺序优先。

```bash
# 查看依赖树
mvn dependency:tree

# 排除冲突依赖
<exclusions>
    <exclusion>
        <groupId>com.example</groupId>
        <artifactId>B</artifactId>
    </exclusion>
</exclusions>
```

## 生命周期

```
clean → compile → test → package → install → deploy
```

常用命令：

```bash
mvn clean package -DskipTests   # 打包（跳过测试）
mvn clean install                # 安装到本地仓库
mvn dependency:tree              # 查看依赖
```

## 标准项目结构

```
my-project/
├── pom.xml
├── src/main/java/        # Java 源码
├── src/main/resources/   # 配置文件
└── src/test/java/        # 测试代码
```

## 核心要点

```
Maven：坐标定位 → 仓库查找 → 依赖管理 → 生命周期构建
```