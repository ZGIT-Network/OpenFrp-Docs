import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenFrp Docs",
  description: '分享每一份技术。',
  srcExclude: ['**/README.md'],
  cleanUrls: true,
  lang: "zh-CN",
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
  ignoreDeadLinks: true,
  //主题配置
  themeConfig: {
    //头上角要主题切换的文字 Appearance
    darkModeSwitchLabel: "切换主题",
    // 文章翻页
    docFooter: {
      prev: "上一篇", //Next page
      next: "下一篇", //Previous page
    },
    //当前页面 On this page
    outlineTitle: "页面内容",

    // 返回顶部 Return to top
    returnToTopLabel: "返回顶部",

    // 菜单  Menu
    sidebarMenuLabel: "菜单",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '常见问题', link: '/problems/' },
      { text: '使用教程', link: '/use/' },
      { text: '配置指南', link: '/guides/' }
    ],

    sidebar: {
      '/use/': [
        {
          text: '使用教程',
          collapsed: true,
          items: [
            { link: '/use/', text: '基本教程' },
            { link: '/use/desktop-launcher', text: '桌面启动器' },
            { link: '/use/frpc', text: 'FRPC 使用教程' },
            { link: '/use/boot-on-startup', text: 'FRPC 自启动指南' },
            { link: '/use/proxy-protocol', text: '反馈用户真实IP' }
          ]
        },
        {
          text: '场景配置',
          items: [
            {
              text: 'Web应用',
              collapsed: true,
              items: [
                { link: '/use/configuration/bt', text: '宝塔Web面板' },
                { link: '/use/configuration/others', text: '其他Web应用' },
                { link: '/use/configuration/advanced', text: '进阶配置' },
              ]
            },
            {
              text: '远程服务',
              collapsed: true,
              items: [
                { link: '/use/configuration/rdp', text: 'RDP远程桌面' },
                { link: '/use/configuration/vnc', text: 'VNC远程桌面' },
                { link: '/use/configuration/ssh', text: 'SSH远程终端' },
              ]
            },
            {
              text: '游戏服务',
              collapsed: true,
              items: [
                { link: '/use/configuration/minecraft', text: '我的世界(Minecraft)' },
                { link: '/use/configuration/terraria', text: '泰拉瑞亚(Terraria)' },
              ]
            },
            {
              text: '其他应用',
              collapsed: true,
              items: [
                { link: '/use/configuration/teamspeak', text: 'Teamspeak语音服务' },
              ]
            },
          ]
        },
        {
          text: '第三方服务',
          items: [
            { link: '/use/other/free-domain', text: '使用Natayark免费域名' },
            { link: '/use/other/minecraft-service', text: 'Minecraft 服务端帮助' }
          ],
        }

      ],
      // '/problems/': 'auto',
      // '/guides/': 'auto'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZGIT-Network/OpenFrp-Docs' }
    ],
    editLink: {
      pattern: 'https://github.com/ZGIT-Network/OpenFrp-Docs/edit/main/docs/:path'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '切换内容显示',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    notFound: {
      title: "页面未找到",
      quote: "可能是这一篇没写完把？",
      linkText: "返回首页",
    },
  },

  lastUpdated: true
})
