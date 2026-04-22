import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "技术",
    icon: "code",
    link: "/frontend/",
  },
  {
    text: "React",
    icon: "atom",
    link: "/react/",
  },
  {
    text: "Java",
    icon: "mug-saucer",
    link: "/java/",
  },
  {
    text: "AI",
    icon: "robot",
    link: "/ai/",
  },
  {
    text: "随笔",
    icon: "pen-to-square",
    link: "/essay/",
  },
  {
    text: "推荐",
    icon: "thumbs-up",
    link: "/recommend/",
  },
  {
    text: "更多",
    icon: "face-smile-beam",
    children: [
      {
        text: "友链",
        icon: "link",
        link: "/links/",
      },
      {
        text: "GitHub",
        icon: "link",
        link: "https://github.com/HerryLo/BlogPress",
      },
    ],
  },
]);
