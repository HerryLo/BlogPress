<template>
  <div class="links-container">
    <div class="links-header">
      <h2>🌐 友情链接</h2>
      <p>交换友链可联系微信：1169170165</p>
    </div>
    <div class="links-grid">
      <a
        v-for="(item, index) in dataList"
        :key="index"
        :href="item.blog || item.link"
        target="_blank"
        class="link-card"
      >
        <div class="link-icon">🔗</div>
        <div class="link-info">
          <h3>{{ item.name }}</h3>
          <span class="blog-tag">博客</span>
        </div>
        <div class="link-url">{{ item.link }}</div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dataList = ref([
  {
    name: "Abin tools",
    link: "https://web-abin.gitee.io/abin-web/tools",
    blog: "http://web-abin.gitee.io/blog/",
  },
  {
    name: "Sky's blog",
    link: "https://www.iceice.top/",
    blog: "https://www.iceice.top/",
  },
  {
    name: "衔蝉 Blog",
    link: "https://www.xianchan.ah.cn",
    blog: "https://www.xianchan.ah.cn",
  },
  {
    name: "blogweb",
    link: "https://blogweb.cn/",
    blog: "https://blogweb.cn/",
  },
  {
    name: "krimeshu",
    link: "https://blog.krimeshu.com/",
    blog: "https://blog.krimeshu.com/",
  },
  {
    name: "Tsix's 编程日记",
    link: "https://www.tsix.top/",
    blog: "https://www.tsix.top/",
  }
]);
</script>

<style scoped>
.links-container {
  min-height: 100vh;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.links-header {
  text-align: center;
  margin-bottom: 2rem;
}

.links-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.links-header p {
  color: #6b7280;
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .links-header h2 {
    color: #f9fafb;
  }
  .links-header p {
    color: #9ca3af;
  }
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .links-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.link-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.link-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.link-card:hover::before {
  opacity: 1;
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #10b981;
}

@media (prefers-color-scheme: dark) {
  .link-card {
    background: #1f2937;
    border-color: #374151;
  }
  .link-card::before {
    background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
  }
  .link-card:hover {
    border-color: #10b981;
  }
}

.link-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.4);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.link-card:hover .link-icon {
  transform: scale(1.1);
}

.link-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.link-info h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .link-info h3 {
    color: #f9fafb;
  }
}

.blog-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #d1fae5;
  color: #059669;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

@media (prefers-color-scheme: dark) {
  .blog-tag {
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
  }
}

.link-url {
  font-size: 0.75rem;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}
</style>
