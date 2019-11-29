module.exports = {
    base: '/',
    title: "Yopai's Blog",
    description: '拾人牙慧 不是技术的创造者，只是技术的搬运工',
    themeConfig: {
        sidebarDepth: 5,
        repo: '',
        repoLabel: 'Github, 欢迎 🌟',
        lastUpdated: '更新于',
        editLinks: true,
        editLinkText: '欢迎斧正',
        sidebar: [
            ['/', '性能为何至关重要'],
            '/rail/'
        ],
    },
    plugins: [
        '@vuepress/nprogress',
        '@vuepress/last-updated',
        '@vuepress/back-to-top',
        '@vuepress/active-header-links',
    ]
}