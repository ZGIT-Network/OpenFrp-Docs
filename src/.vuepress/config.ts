import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "OpenFRP 官方文档",
  description: "解决使用问题，提供技术支持。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
