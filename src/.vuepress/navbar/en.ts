import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en",
  {
    text: "Technology",
    icon: "code",
    link: "/front/",
  },
  {
    text: "React",
    icon: "fab fa-react",
    link: "/react/",
  },
  {
    text: "Essay",
    icon: "pen-to-square",
    link: "/essay/",
  },
  {
    text: "Recommend",
    icon: "thumbs-up",
    link: "/recommend/",
  },
  {
    text: "More",
    icon: "ellipsis",
    children: [
      {
        text: "Links",
        icon: "link",
        link: "/en/links/",
      },
      {
        text: "GitHub",
        icon: "fab fa-github",
        link: "https://github.com/HerryLo/BlogPress",
      },
    ],
  },
]);
