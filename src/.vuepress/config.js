module.exports = {
    title: 'OpenFrp Docs',
    description: '分享每一份技术。',
    plugins: [
        // [
        //     // "vuepress-plugin-md-enhance",
        //     // {
        //     //     // 添加选项卡支持
        //     //     enableAll: true,
        //     //     tabs: true,
        //     // },
        // ],
    ],
    themeConfig: {
        sidebar: {
            '/use/': [
                {
                    title: '使用教程',
                    path: '/use/',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: [
                        ['', '基本教程'],
                        ['desktop-launcher', '桌面启动器'],
                        ['frpc', 'FRPC 使用教程'],
                        ['boot-on-startup', 'FRPC 自启动指南'],
                        ['proxy-protocol', '反馈用户真实IP']
                    ]
                },
                {
                    title: '场景配置',
                    collapsable: false,
                    sidebarDepth: 2,
                    initialOpenGroupIndex: -1,
                    children: [
                        {
                            title: 'Web应用',
                            path: '/use/configuration/bt',
                            collapsable: false,
                            initialOpenGroupIndex: -1,
                            children: [
                                ['/use/configuration/bt', '宝塔Web面板'],
                                ['/use/configuration/others', '其他Web应用'],
                                ['/use/configuration/advanced', '进阶配置'],
                            ]
                        },
                        {
                            title: '远程服务',
                            path: '/use/configuration/rdp',
                            collapsable: false,
                            initialOpenGroupIndex: -1,
                            children: [
                                ['/use/configuration/rdp', 'RDP远程桌面'],
                                ['/use/configuration/vnc', 'VNC远程桌面'],
                                ['/use/configuration/ssh', 'SSH远程终端'],
                            ]
                        },
                        {
                            title: '游戏服务',
                            path: '/use/configuration/minecraft',
                            collapsable: false,
                            initialOpenGroupIndex: -1,
                            children: [
                                ['/use/configuration/minecraft', '我的世界(Minecraft)'],
                                ['/use/configuration/terraria', '泰拉瑞亚(Terraria)'],
                            ]
                        },
                        {
                            title: '其他应用',
                            path: '/use/configuration/teamspeak',
                            collapsable: false,
                            initialOpenGroupIndex: -1,
                            children: [
                                ['/use/configuration/teamspeak', 'Teamspeak语音服务'],
                            ]
                        },
                    ]
                },
                {
                    title: '第三方服务',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ['/use/other/free-domain', '使用Natayark免费域名'],
                        ['/use/other/minecraft-service', 'Minecraft 服务端帮助']
                    ],
                    initialOpenGroupIndex: -1
                }

            ],
            '/problems/': 'auto',
            '/guides/': 'auto'
        },

        docsRepo: 'ZGIT-Network/OpenFrp-Docs',
        docsDir: 'src',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '帮我们编辑该页面!',

        nav: [
            { text: '首页', link: '/' },
            { text: '常见问题', link: '/problems/' },
            { text: '使用教程', link: '/use/' },
            { text: '配置指南', link: '/guides/' }
        ],

        lastUpdated: '该文章最后更新于 ', // string | boolean
        smoothScroll: true
    }
}
