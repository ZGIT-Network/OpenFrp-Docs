import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  '/use/': [
    {
      text: "概述",
      link: "/use/",
    },
    {
      text: "桌面启动器",
      link: "/use/desktop-launcher",
    },
    {
      text: "FRPC 使用教程",
      link: "/use/frpc",
    },
    {
      text: "FRPC 自启动指南",
      link: "/use/boot-on-startup",
    },
    {
      text: "反馈用户真实 IP",
      link: "/use/proxy-protocol",
    },
    {
      text: "第三方服务 Minecraft 服务端帮助",
      link: "/use/other/minecraft-service",
    },
  ],
  '/problems/': [
    {
      text: "总目录",
      link: "/problems/",
    },
    {
      text: "客户端报错",
      link: "/problems/#客户端报错",
    },
    {
      text: "启动器相关",
      link: "/problems/#启动器相关",
    },
    {
      text: "FRPC 相关",
      link: "/problems/#FRPC相关",
    },
    {
      text: "节点相关",
      link: "/problems/#节点相关",
    },
    {
      text: "速率问题",
      link: "/problems/#速率问题",
    },
    {
      text: "管理面板",
      link: "/problems/#管理面板",
    },
    {
      text: "其他",
      link: "/problems/#其他",
    },
  ],
  '/guides/':[
    {
      text: "总目录",
      link: "/guides/",
    },
    {
      text: "发布网站",
      link: "/guides/#发布网站",
    },
    {
      text: "远程桌面",
      link: "/guides/#远程桌面",
    },
    {
      text: "Linux 远程桌面（VNC）",
      link: "/guides/#Linux 远程桌面（VNC）",
    },
    {
      text: "群晖 NAS 远程管理",
      link: "/guides/#群晖 NAS 远程管理",
    },
    {
      text: "群晖 NAS 远程管理",
      link: "/guides/#群晖 NAS 远程管理",
    },
    {
      text: "更多...",
      link: "/guides/#更多...",
    },
  ]
});
