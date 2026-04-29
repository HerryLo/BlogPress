---
title: Java多线程
date: 2025-08-27T00:00:00+08:00
category:
  - java
tags:
  - java
  - 多线程
  - 线程池
---

# Java多线程

原文链接：https://www.yuque.com/yopai/pp6bv5/uel16rwvgfu825g0

## 多线程概述

多线程让程序同时执行多个任务，提高程序效率。

```
┌─────────────────────────────────────────────────────────────┐
│                  多线程与单线程对比                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   单线程：                                                  │
│   任务1 → 任务2 → 任务3                                    │
│                                                             │
│   多线程：                                                  │
│   任务1 ──┐                                                │
│   任务2 ──┼──→ 同时执行                                    │
│   任务3 ──┘                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**应用场景**：
- 同时处理多个客户端请求
- 后台任务（如定时任务、数据同步）
- 大任务拆分并行处理

## 进程与线程

| 概念 | 说明 |
|------|------|
| 进程 | 程序运行时的实例，每个进程有独立内存空间 |
| 线程 | 进程内的执行单元，共享进程内存 |

```
┌─────────────────────────────────────────────────────────────┐
│                  进程与线程关系                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   进程（QQ.exe）                                            │
│   ├── 线程1：接收消息                                       │
│   ├── 线程2：发送消息                                       │
│   └── 线程3：界面渲染                                       │
│                                                             │
│   每个进程至少有一个线程（主线程）                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 多线程实现方式

### 方式1：继承 Thread 类

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        // 线程具体业务代码
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
}

// 使用
public class Demo {
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start();  // 启动线程
        t.join();   // 等待线程结束
    }
}
```

### 方式2：实现 Runnable 接口（推荐）

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
}

// 使用
public class Demo {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start();
    }
}

// 匿名内部类写法
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("线程执行");
    }
}).start();

// Lambda 写法
new Thread(() -> System.out.println("线程执行")).start();
```

### 方式3：实现 Callable 接口 + FutureTask

```java
Callable<String> callable = () -> {
    Thread.sleep(1000);
    return "任务完成";
};

FutureTask<String> futureTask = new FutureTask<>(callable);
new Thread(futureTask).start();

// 获取结果（阻塞等待）
String result = futureTask.get();
System.out.println(result);
```

## Thread 常用方法

```java
Thread t = new Thread(() -> System.out.println("线程执行"));

t.start();              // 启动线程
t.join();               // 等待该线程执行完毕
t.join(1000);          // 等待最多 1 秒

t.setName("MyThread");  // 设置线程名
t.setPriority(10);      // 设置优先级（1-10）

Thread.sleep(1000);     // 静态方法，休眠 1 秒

Thread.currentThread(); // 获取当前线程
```

## 线程生命周期

```
┌─────────────────────────────────────────────────────────────┐
│                  线程状态转换                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   NEW ──→ RUNNABLE ──→ TERMINATED                           │
│              ↓                                              │
│         BLOCKED/WAITING                                    │
│              ↓                                              │
│         TIMED_WAITING                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| 状态 | 说明 |
|------|------|
| NEW | 创建了线程对象，未调用 start |
| RUNNABLE | 运行中或就绪状态 |
| BLOCKED | 等待锁 |
| WAITING | 无限等待 |
| TIMED_WAITING | 限时等待 |
| TERMINATED | 线程结束 |

## synchronized 同步

多线程同时读写共享变量可能造成逻辑错误，需要同步：

```
┌─────────────────────────────────────────────────────────────┐
│                  synchronized 同步锁                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   synchronized (锁对象) {                                  │
│       // 需要同步的代码                                     │
│   }                                                        │
│                                                             │
│   注意：                                                   │
│   - 锁住的是对象，不是代码                                  │
│   - 多个线程必须使用同一个锁对象                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 同步代码块

```java
public class MyThread extends Thread {
    static int count = 0;

    @Override
    public void run() {
        while (true) {
            synchronized (MyThread.class) {
                if (count >= 100) {
                    break;
                }
                count += 1;
                System.out.println(Thread.currentThread().getName() + ":" + count);
            }
            // 其他不需要同步的代码
        }
    }
}
```

### 同步方法

```java
public synchronized void method() {
    // 同步方法，锁对象是 this
}

public static synchronized void staticMethod() {
    // 静态同步方法，锁对象是类名.class
}
```

## 死锁

多个线程互相等待对方释放锁：

```java
// 死锁示例
public class DeadLock implements Runnable {
    private boolean flag;

    public DeadLock(boolean flag) {
        this.flag = flag;
    }

    @Override
    public void run() {
        if (flag) {
            synchronized (LockA.objA) {
                System.out.println("线程1拿到LockA，等待LockB");
                synchronized (LockB.objB) {
                    System.out.println("线程1拿到LockB");
                }
            }
        } else {
            synchronized (LockB.objB) {
                System.out.println("线程2拿到LockB，等待LockA");
                synchronized (LockA.objA) {
                    System.out.println("线程2拿到LockA");
                }
            }
        }
    }
}

class LockA {
    static Object objA = new Object();
}

class LockB {
    static Object objB = new Object();
}
```

## 线程池

线程池复用线程，避免频繁创建/销毁的性能开销：

```
┌─────────────────────────────────────────────────────────────┐
│                  线程池工作原理                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   线程池：预先创建一批线程                                  │
│                                                             │
│   ┌────────────────────────────────────────────┐           │
│   │         线程池（ThreadPoolExecutor）        │           │
│   │   [线程1] [线程2] [线程3] ...              │           │
│   └────────────────────────────────────────────┘           │
│        ↑           ↑           ↑                            │
│   提交任务1    提交任务2    提交任务3                        │
│   执行完复用   执行完复用   执行完复用                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 使用 Executors 创建线程池

```java
// 创建固定大小的线程池
ExecutorService executor = Executors.newFixedThreadPool(2);

// 提交任务
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(2000);
    return 42;
});

// 获取结果（阻塞）
Integer result = future.get();
System.out.println("结果: " + result);

// 关闭线程池
executor.shutdown();
executor.shutdownNow();  // 立即关闭
```

### 自定义线程池（推荐）

```java
// 自定义线程池
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,                          // 核心线程数
    5,                          // 最大线程数
    60L,                        // 空闲线程存活时间
    TimeUnit.SECONDS,           // 时间单位
    new LinkedBlockingQueue<>(100),  // 任务队列
    Executors.defaultThreadFactory(), // 线程工厂
    new ThreadPoolExecutor.AbortPolicy()  // 拒绝策略
);

// 提交任务
executor.submit(() -> {
    System.out.println("任务执行");
});

// 关闭
executor.shutdown();
```

### 拒绝策略

| 策略 | 说明 |
|------|------|
| AbortPolicy | 抛出RejectedExecutionException |
| CallerRunsPolicy | 由调用线程执行任务 |
| DiscardPolicy | 直接丢弃任务 |
| DiscardOldestPolicy | 丢弃最老的任务 |

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  多线程核心要点                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   实现方式：                                                │
│   - 继承 Thread                                             │
│   - 实现 Runnable（推荐）                                   │
│   - 实现 Callable + FutureTask                             │
│                                                             │
│   同步：synchronized                                        │
│                                                             │
│   线程池：复用线程                                          │
│   - Executors.newFixedThreadPool()                        │
│   - ThreadPoolExecutor 自定义                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
