let BlogContext = {
  blogAcc: "newjersey",
  blogName: `newjersey`,
  adDisplay: "",
  blogUrlPre: "https://www.cnblogs.com/",
  manPage: "https://i.cnblogs.com/",
  sendPage: "https://msg.cnblogs.com/send/${BLOG_ACC}",
  indexPage: "https://www.cnblogs.com/" + `"newjersey"`,
  autoInfoReset: true,
  blogId: "725204",
  blogPostId: "18156273",
  blogUserGuid: "c74cdce3-551f-4ab1-dbb7-08d9c527a5cc",
  pageBarImgs: 21,
  myCommentSize: 10,
  blogCommentSize: 50,
  commentLength: 10,
  openMathJax: false,
  urlMathJax: "https://mathjax.cnblogs.com/2_7_5/MathJax.js?config:TeX-AMS-MML_HTMLorMML",
  musicApiUrl: "https://api.i-meto.com/meting/api?server=netease&type=:type&id=:id&r=:r",
  extendStylePath: "https://cjunn.gitee.io/blog_theme_atum",
  panelItemPic: Array.from(Array(35), (v, k) => (`https://cjunn.gitee.io/blog_theme_atum/img/pageItem/page-item-$I.jpg`).replace("$I", k + 1)),
  panelRightImgPic: Array.from(Array(10), (v, k) => (`https://cjunn.gitee.io/blog_theme_atum/img/menuIcon/menuicon-$I.png`).replace("$I", k)),
  blogSign: "",
  //aboutmeHtml: `<img src:'${extendStylePath}/img/ing/aboutme.jpg'/>`,
  avatarSign: "",
  ingTitle: "你的一字一句犹如刀疤划心上，我的一举一动随你改变多荒唐。",
  feelingBlogId: 13393903,
  contact:[
    {title:"",dec:"",icon:""}
  ]
}

export default BlogContext