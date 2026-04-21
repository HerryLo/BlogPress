<template>
  <footer class="page-footer">
    <div class="footer-running">
      <span class="footer-running__label">{{ desc }}</span>
      <span class="footer-running__time">{{ intervalTime }}</span>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <div class="footer-copyright">
        Copyright © {{ currentYear }} <a href="https://github.com/HerryLo" target="_blank" rel="noopener noreferrer">Herrylo</a>
      </div>
      <div class="footer-built">
        Built with <a href="https://vuepress-theme-hope.github.io/" target="_blank" rel="noopener noreferrer">VuePress Theme Hope</a>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "PageFooter",
  data() {
    return {
      starttime: "2018/12/27 00:00:00",
      intervalTime: "--天--时--分--秒",
      currentYear: new Date().getFullYear(),
    };
  },
  props: {
    desc: {
      type: String,
      default: "已运行时间",
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      const start = dayjs(this.starttime).valueOf();
      const current = dayjs().valueOf();
      const totalDays = parseInt((current - start) / 1000 / 60 / 60 / 24);
      const totalHours = parseInt((current - start) / 1000 / 3600);
      const totalMinutes = parseInt((current - start) / 1000 / 60);
      const totalSeconds = parseInt((current - start) / 1000);
      const days = totalDays;
      const hours = totalHours - totalDays * 24;
      const minutes = totalMinutes - totalHours * 60;
      const seconds = totalSeconds - totalMinutes * 60;
      this.intervalTime = `${days}天${hours}时${minutes}分${seconds}秒`;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.page-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-color);
  background: var(--bg-color);
  transition: background-color 0.3s, color 0.3s;
}

.footer-running {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.footer-running__label {
  color: var(--accent-color);
  font-weight: 600;
}

.footer-running__time {
  color: var(--text-color);
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--border-color),
    transparent
  );
  margin: 0.75rem auto;
  max-width: 60%;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-copyright,
.footer-built {
  color: var(--text-color);
  opacity: 0.75;
}

.footer-bottom a {
  color: var(--accent-color);
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer-bottom a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* 响应式适配 */
@media (max-width: 640px) {
  .page-footer {
    padding: 1rem;
    font-size: 0.8125rem;
  }

  .footer-running {
    flex-direction: column;
    gap: 0.25rem;
  }

  .footer-running__time {
    font-size: 0.75rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (min-width: 768px) {
  .page-footer {
    padding: 1.5rem 2rem;
    font-size: 0.875rem;
  }
}
</style>
```

<style>
/* 全局样式：覆盖 theme 默认 footer 样式 */
.theme-default-content + .page-footer,
.vp-doc-footer {
  display: none;
}

.page-footer {
  margin-top: 0;
}
</style>
