let BlogContext = {
  blogAcc: `newjersey`,
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
  contact: [
    { title: "", dec: "", icon: "" }
  ],
  theme: "handsome",
  bg: ["http://www.dmoe.cc/random.php"],
  headcolor: "#7266ba",
  asidecolor: "#fff",
  musicIds: ["7282638202"],
  logo: `<span class="logolink logo">
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
  menu: [
    { name: "HOME", title: "首页", url: "/category/default", icon: "fc-lol-huli fc-icon-40" },
    { name: "BUG", title: "反馈", url: '', icon: "fc-lol-naima fc-icon-40" },
    { name: "FOLLOW", title: "关注", url: 'me', icon: "fc-lol-ruiwen fc-icon-40" },
    { name: "SONG", title: "歌曲", url: '/song', icon: "fc-lol-goutou fc-icon-40" }
  ],
  link: [
    { title: 'C君博客', url: 'https://www.cnblogs.com/cjunn/' }
  ],
  movies: ['https://video.cdn.queniuqe.com/store_trailers/256982456/movie480_vp9.webm?t=1703239286'],
  themes: [
    {
      id: 1,
      theme: "style1",
      icon: "icon iconfont link",
      dec: ""
    },
    {
      id: 2,
      theme: "handsome",
      icon: "icon iconfont link",
      dec: ""
    },
    {
      id: 3,
      theme: "Sakura",
      icon: "icon iconfont link",
      dec: "Sakura"
    },
  ],
}

export default BlogContext