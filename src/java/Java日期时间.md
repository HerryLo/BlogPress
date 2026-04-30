---
title: Java日期时间
date: 2026-04-30T00:00:00+08:00
category:
  - java
tags:
  - java
  - 日期
  - LocalDate
  - LocalDateTime
  - DateTimeFormatter
---

# Java日期时间

原文链接：https://www.yuque.com/yopai/pp6bv5

## JDK7 旧日期 API 问题

JDK7 的 `Date` 和 `SimpleDateFormat` 不是线程安全的，且 `Calendar` API 复杂难用。

```
┌─────────────────────────────────────────────────────────────┐
│                  JDK7 日期 API 问题                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Date：                              │
│   - 可变对象，线程不安全              │
│   - 月份从 0 开始（坑）               │
│                                                             │
│   SimpleDateFormat：                  │
│   - 线程不安全，不能声明为 static     │
│   - 多线程下可能出现异常结果          │
│                                                             │
│   Calendar：                         │
│   - API 复杂，很多废弃方法            │
│   - 可变对象，线程不安全              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## JDK8 新日期 API

JDK8 引入了 `java.time` 包下的新 API，**不可变、线程安全、设计合理**。

```
┌─────────────────────────────────────────────────────────────┐
│                  JDK8 日期时间 API 体系                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      java.time                              │
│                         │                                   │
│     ┌───────────────────┼───────────────────┐               │
│     │                   │                   │               │
│   LocalDate          LocalTime        ZoneId               │
│   （日期）            （时间）          （时区）             │
│     │                   │                   │               │
│     └──────────┬────────┘                   │               │
│                │                            │               │
│          LocalDateTime                   ZonedDateTime      │
│          （日期时间）                     （带时区）         │
│                                                             │
│   Instant（瞬时） ──→ Duration（时间段） ──→ Period（日期段） │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## LocalDate 日期

只处理日期，不涉及时间：

```java
// 创建当前日期
LocalDate today = LocalDate.now();

// 创建指定日期
LocalDate date = LocalDate.of(2024, 1, 15);
LocalDate date2 = LocalDate.of(2024, 1, 15);

// 获取信息
int year = today.getYear();           // 2024
int month = today.getMonthValue();    // 4（直接是数字）
int day = today.getDayOfMonth();      // 30
int dayOfWeek = today.getDayOfWeek().getValue();  // 2（周一=1）
int dayOfYear = today.getDayOfYear(); // 120

// 判断
today.isLeapYear();                   // 是否闰年
today.isAfter(date);                  // 是否在之后
today.isBefore(date);                 // 是否在之前
today.isEqual(date);                  // 是否相等
```

### 日期加减

```java
LocalDate date = LocalDate.of(2024, 1, 15);

// 加减年份、月份、天
date.plusYears(1);      // 2025-01-15
date.plusMonths(2);     // 2024-03-15
date.plusDays(10);      // 2024-01-25

// 减
date.minusYears(1);     // 2023-01-15
date.minusDays(5);      // 2024-01-10

// 常用组合
date.plusDays(1).minusMonths(1);  // 灵活组合
```

### 日期调整

```java
LocalDate date = LocalDate.of(2024, 1, 15);

// 月初
date.withDayOfMonth(1);           // 2024-01-01
date.truncatedTo(ChronoUnit.DAYS);// 另一种写法

// 月末
date.with(TemporalAdjusters.lastDayOfMonth());  // 2024-01-31

// 下个月月初
date.plusMonths(1).withDayOfMonth(1);           // 2024-02-01

// 下个周日
date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

// 年末
date.with(TemporalAdjusters.lastDayOfYear());
```

### 计算日期差

```java
LocalDate date1 = LocalDate.of(2024, 1, 15);
LocalDate date2 = LocalDate.of(2024, 4, 20);

// 使用 Period（年、月、日）
Period period = Period.between(date1, date2);
int months = period.getMonths();     // 3
int days = period.getDays();         // 5

// 直接算天数
long daysDiff = java.time.temporal.ChronoUnit.DAYS.between(date1, date2);  // 96
```

## LocalTime 时间

只处理时间，不涉及日期：

```java
// 创建当前时间
LocalTime now = LocalTime.now();

// 创建指定时间
LocalTime time = LocalTime.of(14, 30);          // 14:30
LocalTime time2 = LocalTime.of(14, 30, 15);     // 14:30:15

// 获取信息
int hour = now.getHour();       // 时
int minute = now.getMinute();   // 分
int second = now.getSecond();   // 秒
int nano = now.getNano();       // 纳秒

// 判断
time.isAfter(time2);
time.isBefore(time2);

// 加减
time.plusHours(1);
time.plusMinutes(30);
time.minusSeconds(10);
```

## LocalDateTime 日期时间

最常用的日期时间类：

```java
// 创建当前时间
LocalDateTime now = LocalDateTime.now();

// 创建指定时间
LocalDateTime dt = LocalDateTime.of(2024, 1, 15, 14, 30);
LocalDateTime dt2 = LocalDateTime.of(date, time);  // 由 LocalDate + LocalTime 组合

// 获取各部分
now.getYear();
now.getMonth();              // 返回 Month 枚举（APRIL）
now.getMonthValue();         // 返回 int（4）
now.getDayOfMonth();
now.getHour();
now.getMinute();
now.getSecond();

// 加减
now.plusDays(1);
now.plusHours(2);
now.minusMinutes(30);

// 转其他类型
LocalDate date = now.toLocalDate();   // 2024-01-15
LocalTime time = now.toLocalTime();   // 14:30:00
```

## ZonedDateTime 带时区

```java
// 当前时区的日期时间
ZonedDateTime zdt = ZonedDateTime.now();

// 指定时区
ZonedDateTime zdt1 = ZonedDateTime.of(2024, 1, 15, 14, 30, 0, 0, ZoneId.of("Asia/Shanghai"));
ZonedDateTime zdt2 = ZonedDateTime.of(2024, 1, 15, 14, 30, 0, 0, ZoneId.of("America/New_York"));

// 获取时区
ZoneId zone = zdt.getZone();  // Asia/Shanghai

// 时区转换
zdt.withZoneSameInstant(ZoneId.of("America/New_York"));

// 时差
zdt.getOffset();  // +08:00
```

## Instant 瞬时时间戳

类似 JDK7 的 `Date`，但精度更高（纳秒）：

```java
// 当前时间戳
Instant now = Instant.now();
long epochMilli = now.toEpochMilli();    // 毫秒
long epochSecond = now.getEpochSecond(); // 秒

// 从时间戳创建
Instant instant = Instant.ofEpochMilli(1704067200000L);
Instant instant2 = Instant.ofEpochSecond(1704067200);

// 加减
instant.plusSeconds(3600);      // 加1小时
instant.minusSeconds(3600);     // 减1小时

// 判断
instant.isAfter(instant2);
instant.isBefore(instant2);

// 转为 ZonedDateTime
ZonedDateTime zdt = instant.atZone(ZoneId.systemDefault());
```

## Duration 时间段

用于测量时间差（秒、纳秒）：

```java
Instant start = Instant.now();
// ... 做一些事情
Instant end = Instant.now();

// 创建 Duration
Duration duration = Duration.between(start, end);

// 获取
long seconds = duration.getSeconds();     // 秒
long millis = duration.toMillis();        // 毫秒
long minutes = duration.toMinutes();      // 分钟
long hours = duration.toHours();          // 小时

// 用于 LocalDateTime
LocalDateTime dt1 = LocalDateTime.of(2024, 1, 15, 10, 0);
LocalDateTime dt2 = LocalDateTime.of(2024, 1, 15, 12, 30);

Duration duration2 = Duration.between(dt1, dt2);  // PT2H30M
```

## Period 日期段

用于测量日期差（年、月、日）：

```java
LocalDate date1 = LocalDate.of(2024, 1, 15);
LocalDate date2 = LocalDate.of(2026, 4, 20);

Period period = Period.between(date1, date2);
// period.getYears()  = 2
// period.getMonths() = 3
// period.getDays()   = 5

// 转为总天数
period.toTotalDays();  // 约 826 天
```

## DateTimeFormatter 格式化

```java
LocalDateTime now = LocalDateTime.now();

// 使用预定义格式
String s1 = now.format(DateTimeFormatter.ISO_DATE);          // 2024-01-15
String s2 = now.format(DateTimeFormatter.ISO_DATE_TIME);     // 2024-01-15T14:30:00

// 自定义格式
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String s3 = now.format(fmt);                                 // 2024-01-15 14:30:00

DateTimeFormatter fmt2 = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm");
String s4 = now.format(fmt2);                                // 2024年01月15日 14:30

// 解析
LocalDateTime parsed = LocalDateTime.parse("2024-01-15 14:30:00", fmt);

// LocalDate 格式化
LocalDate date = LocalDate.now();
date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));      // 2024/01/15
date.format(DateTimeFormatter.ofPattern("MMddyyyy"));        // 01302024
```

### 常用格式模式

```
┌─────────────────────────────────────────────────────────────┐
│                  DateTimeFormatter 格式模式                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   年：yyyy（2024）/ yy（24）                                │
│   月：MM（01）/ M（1）/ MMM（Jan）/ MMMM（January）        │
│   日：dd（15）/ d（15）                                    │
│   时：HH（24小时）/ hh（12小时）                            │
│   分：mm                                                    │
│   秒：ss                                                    │
│   毫秒：SSS                                                 │
│                                                             │
│   星期：E（Mon）/ EEEE（Monday）                           │
│                                                             │
│   示例：                                                    │
│   "yyyy-MM-dd HH:mm:ss"     → 2024-01-15 14:30:00          │
│   "yyyy/MM/dd"              → 2024/01/15                   │
│   "MMddyyyy"                → 01152024                      │
│   "yyyy年MM月dd日"          → 2024年01月15日                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## TemporalAdjusters 日期调整

```java
LocalDate date = LocalDate.of(2024, 1, 15);  // 周一

// 本月第一天
date.with(TemporalAdjusters.firstDayOfMonth());     // 2024-01-01

// 本月最后一天
date.with(TemporalAdjusters.lastDayOfMonth());      // 2024-01-31

// 本年第一天
date.with(TemporalAdjusters.firstDayOfYear());      // 2024-01-01

// 本年最后一天
date.with(TemporalAdjusters.lastDayOfYear());       // 2024-12-31

// 下个周日
date.with(TemporalAdjusters.next(DayOfWeek.SUNDAY)); // 2024-01-21

// 下个周日（如果是周日则返回当天）
date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

// 上个周一
date.with(TemporalAdjusters.previous(DayOfWeek.MONDAY));

// 上个周一（如果是周一则返回当天）
date.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

// 月份第一天（通用）
date.withDayOfMonth(1);

// 月份最后一天（通用）
LocalDate lastDay = date.with(TemporalAdjusters.lastDayOfMonth());
```

## 新旧 API 转换

```
┌─────────────────────────────────────────────────────────────┐
│                  新旧日期 API 转换                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Date ──────────────→ Instant ──────────────→ LocalDateTime │
│     ↑                      │                       │         │
│     │                      │                       │         │
│     └──────────────────────┴───────────────────────┘         │
│                     atZone(zone)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```java
// Date → LocalDateTime
Date date = new Date();
Instant instant = date.toInstant();
LocalDateTime ldt = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());

// LocalDateTime → Date
LocalDateTime ldt = LocalDateTime.now();
Instant instant = ldt.atZone(ZoneId.systemDefault()).toInstant();
Date date2 = Date.from(instant);

// Date → LocalDate
LocalDate ld = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

// LocalDate → Date（中午12点）
LocalDate ld = LocalDate.of(2024, 1, 15);
Date date3 = Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());

// SimpleDateFormat → DateTimeFormatter
// 不能直接转换，但可以：
// 1. 用旧 API 解析成 Date
// 2. Date 转 Instant
// 3. Instant 转 LocalDateTime
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Date oldDate = sdf.parse("2024-01-15");
LocalDate newDate = oldDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
```

## 线程安全对比

```java
// JDK7：每次调用都要创建新实例，否则线程不安全
public String formatDate(Date date) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  // 每次 new
    return sdf.format(date);
}

// JDK8：可以声明为 static 常量，线程安全
private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

public String formatDate(LocalDate date) {
    return date.format(FMT);  // 复用 FMT，线程安全
}
```

## 总结

```
┌─────────────────────────────────────────────────────────────┐
│                  Java 日期时间核心要点                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   LocalDate：日期（年月日）                                  │
│   LocalTime：时间（时分秒）                                  │
│   LocalDateTime：日期时间（最常用）                          │
│   ZonedDateTime：带时区的日期时间                            │
│                                                             │
│   Instant：时间戳（对应旧 Date）                             │
│   Duration：时间段（秒/纳秒）                                │
│   Period：日期段（年/月/日）                                 │
│                                                             │
│   DateTimeFormatter：格式化与解析                            │
│   TemporalAdjusters：日期调整（月初、月末等）                 │
│                                                             │
│   特点：不可变、线程安全、设计合理                           │
│                                                             │
│   新旧转换：Date → Instant → LocalDateTime                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```