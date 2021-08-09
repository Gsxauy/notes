module.exports = {
  title: 'Gsxauy',
  base: '/',
  description: '我还年轻，我没有时间。',
  searchMaxSuggestions: 10,
  lastUpdated: true,
  themeConfig: {
    logo: 'avatar.jpg',
    nav: [
    {
        "text": "首页",
        "link": "/"
    },
    {
        "text": "引导",
        "items": [
            {
                "text": "Js-Base",
                "link": "/Js-Base/"
            },
            {
                "text": "Js-adv",
                "link": "/Js-adv/"
            }
        ]
    },
    {
        "text": "Gitee",
        "link": "https://gitee.com/gxsary",
        "target": "_blank"
    }
],
    sidebar: [
    {
        "title": "首页",
        "path": "/",
        "collapsable": false
    },
    {
        "title": "Js-Base",
        "path": "/Js-Base",
        "children": [
            "/Js-Base/Array",
            "/Js-Base/Class",
            "/Js-Base/Closure",
            "/Js-Base/Code",
            "/Js-Base/Codes-promise",
            "/Js-Base/Copy",
            "/Js-Base/EventLoop",
            "/Js-Base/Function",
            "/Js-Base/Map&Set",
            "/Js-Base/Methods",
            "/Js-Base/Modular",
            "/Js-Base/Object",
            "/Js-Base/Promise",
            "/Js-Base/Prototype",
            "/Js-Base/RegExp",
            "/Js-Base/Sub",
            "/Js-Base/Symbol"
        ]
    },
    {
        "title": "Js-adv",
        "path": "/Js-adv",
        "children": [
            "/Js-adv/Type"
        ]
    }
]
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