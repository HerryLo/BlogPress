import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  {
    text: "Articles",
    icon: "code",
    link: "/en/front/",
  },
  {
    text: "React",
    icon: "code",
    link: "/en/react/",
  },
  {
    text: "Java",
    icon: "code",
    link: "/en/java/",
  },
  {
    text: "Essays",
    icon: "pen-to-square",
    link: "/en/essay/",
  },
  {
    text: "Recommend",
    icon: "thumbs-up",
    link: "/en/recommend/",
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
