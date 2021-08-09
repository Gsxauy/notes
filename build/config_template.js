module.exports = {
  title: 'Gsxauy',
  base: '/',
  description: '我还年轻，我没有时间。',
  searchMaxSuggestions: 10,
  lastUpdated: true,
  themeConfig: {
    logo: 'avatar.jpg',
    nav,
    sidebar,
  },
  port: 8701,
  plugins: {
    '@vuepress/active-header-links':{
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    '@vuepress/back-to-top': true
  },
}