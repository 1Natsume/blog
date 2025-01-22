let BlogContext = {
  blogAcc: "newjersey",
  logo:`<span class="logolink logo">
						<a href="/" target="_parent">
							<ruby>
								<span class="sakuraso">雪覆盖</span>
								<span class="no">の</span>
								<span class="shironeko">誓言</span>
								<rp></rp>
								<rt class="chinese-font">newjersey</rt>
								<rp></rp>
							</ruby>
						</a>
					</span>
`,
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
  headBackImg: `https://img2.baidu.com/it/u:1129333932,2974296147&fm:253&fmt:auto&app:138&f:JPEG?w:500&h:500`,
  bg: `../assets/pic/background.jpg`,
  panelItemPic: Array.from(Array(35), (v, k) => (`https://cjunn.gitee.io/blog_theme_atum/img/pageItem/page-item-$I.jpg`).replace("$I", k + 1)),
  panelRightImgPic: Array.from(Array(10), (v, k) => (`https://cjunn.gitee.io/blog_theme_atum/img/menuIcon/menuicon-$I.png`).replace("$I", k)),
  musicSignImg: `https://cjunn.gitee.io/blog_theme_atum/img/body/music_play.png`,
  blogSign: "",
  //aboutmeHtml: `<img src:'${extendStylePath}/img/ing/aboutme.jpg'/>`,
  avatarSign: "",
  ingTitle: "你的一字一句犹如刀疤划心上，我的一举一动随你改变多荒唐。",
   //{name: '', url: ''}格式
  blogFriendList: [],
  blogUsedLinks: [],
  musicIds: ["7282638202"],
  feelingBlogId: 13393903,
  menu: [
    { title: "首页", url: "/subject/category/default", icon: "fc-lol-huli fc-icon-40" },
    { title: "反馈", url: '/c/subject/p/12494785', icon: "fc-lol-naima fc-icon-40" },
    { title: "关注", url: 'me', icon: "fc-lol-ruiwen fc-icon-40" },
    { title: "后台", url: '/admin', icon: "fc-lol-goutou fc-icon-40" }
  ],
  contact:[
    {title:"",dec:"",icon:""}
  ]
}

export default BlogContext