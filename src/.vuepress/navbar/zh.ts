import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "技术",
    icon: "code",
    link: "/front/",
  },
  {
    text: "React",
    icon: "fab fa-react",
    link: "/react/",
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
    icon: "ellipsis",
    children: [
      {
        text: "外链",
        icon: "link",
        link: "/links/",
      },
      {
        text: "GitHub",
        icon: "fab fa-github",
        link: "https://github.com/HerryLo/BlogPress",
      },
    ],
  },
]);
