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

多线程让程序同时执行多个任务，显著提升程序效率。典型应用场景包括：同时处理多个客户端请求、后台定时任务、数据批量处理、大任务拆分并行计算等。相比单线程顺序执行，多线程能充分利用CPU多核资源。

在单线程程序中，任务依次执行，后一个任务必须等待前一个任务完成；而多线程允许同时执行多个任务，CPU可在不同线程间快速切换，宏观上呈现并行执行的效果。

## 线程与进程

进程是程序运行时的实例，拥有独立内存空间；线程是进程内的执行单元，共享进程内存空间。一个进程至少包含一个主线程，线程之间可以并发执行。现代操作系统以线程作为基本调度单位。

以QQ程序为例，进程相当于整个QQ程序，而接收消息、发送消息、界面渲染分别由不同线程负责，这些线程共享进程内存，可直接访问进程资源。

## Runnable实现方式

实现Runnable接口是创建线程的推荐方式，因为接口可以多实现且不占用继承位置。实现Runnable后重写run方法定义线程业务逻辑，通过new Thread(runnable).start()启动线程。Lambda写法可进一步简化匿名内部类形式。

```java
// 实现Runnable接口
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
}

// 启动线程
new Thread(new MyRunnable()).start();

// Lambda简化写法
new Thread(() -> System.out.println("Lambda线程")).start();
```

## Callable与Future

Callable接口的call方法可以有返回结果，通过FutureTask包装后提交给Thread执行。FutureTask的get方法会阻塞等待线程完成并返回结果，适用于需要获取异步任务执行结果的场景。

```java
Callable<String> callable = () -> {
    Thread.sleep(1000);
    return "任务完成";
};

FutureTask<String> futureTask = new FutureTask<>(callable);
new Thread(futureTask).start();

String result = futureTask.get();  // 阻塞等待结果
System.out.println(result);
```

## synchronized同步

多线程访问共享资源时需要同步，否则可能导致数据不一致。synchronized通过加锁保证同一时刻只有一个线程执行同步代码块。锁对象需多个线程共享，锁住的是对象而非代码。同步方法锁对象是this，静态同步方法锁对象是类名.class。

同步的本质是悲观锁思想：假设多个线程会冲突，所以先获取锁的线程独享资源，执行完毕后释放锁，其他线程才能继续。

## 同步代码示例

```java
public class Counter {
    private int count = 0;

    // 同步方法
    public synchronized void increment() {
        count++;
    }

    // 同步代码块（更灵活）
    public void decrement() {
        synchronized (this) {
            count--;
        }
    }

    // 使用
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.increment();
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.decrement();
        });

        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println(counter.count);  // 最终为0
    }
}
```

## 线程池原理

线程池预先创建一组线程，任务提交后分配给空闲线程执行，执行完毕后线程归还池中复用。相比频繁创建销毁线程，线程池避免了线程创建销毁的性能开销，适合高并发场景。核心参数包括核心线程数、最大线程数、任务队列容量等。

```
┌─────────────────────────────────────────────────────────────┐
│                  线程池工作原理                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────┐              │
│   │  线程池（核心线程数N，最大线程数M）      │              │
│   │  [线程1] [线程2] [线程3] ...            │              │
│   └─────────────────────────────────────────┘              │
│        ↑           ↑           ↑                           │
│   任务1提交    任务2提交    任务3提交                      │
│   分配线程1    分配线程2    分配线程3                      │
│   执行完复用   执行完复用   执行完复用                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

线程池工作流程：任务提交时，若有空闲线程则分配执行；若都在忙且未达最大线程数则创建新线程；若已达最大线程数则加入任务队列等待。

## Executors使用

JDK提供了几种常用的线程池创建方式：newFixedThreadPool固定大小线程池、newCachedThreadPool可缓存线程池、newSingleThreadExecutor单线程池。实际开发中推荐使用ThreadPoolExecutor自定义参数以更好控制资源。

```java
// 固定大小线程池（适合长期任务）
ExecutorService executor = Executors.newFixedThreadPool(2);

// 提交任务
executor.submit(() -> {
    System.out.println("任务执行");
});

// 关闭线程池
executor.shutdown();
```

实际项目推荐使用ThreadPoolExecutor直接创建，可配置核心线程数、最大线程数，空闲存活时间、任务队列、线程工厂、拒绝策略等参数。

## 总结

多线程核心在于并发执行提升效率。创建线程推荐实现Runnable接口，线程同步用synchronized关键字。线程池通过复用线程避免频繁创建销毁，是高并发开发的基础。合理设置线程池参数需要根据任务特性调整。
