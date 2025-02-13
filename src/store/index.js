import Vuex from "vuex";
import { createStore } from 'vuex';
function loadStateConfig() {
  try {
    localStorage.clear();
    const serializedState = localStorage.getItem("config");
    if (serializedState) {
      return JSON.parse(serializedState);
    } else {
      const config = {
        theme: "handsome",
        bg: ["http://www.dmoe.cc/random.php"],
        headcolor: "#7266ba",
        asidecolor: "#fff",
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
        musicIds: ["7282638202"],
        menu: [
          { title: "首页", url: "/subject/category/default", icon: "fc-lol-huli fc-icon-40" },
          { title: "反馈", url: '/c/subject/p/12494785', icon: "fc-lol-naima fc-icon-40" },
          { title: "关注", url: 'me', icon: "fc-lol-ruiwen fc-icon-40" },
          { title: "后台", url: '/admin', icon: "fc-lol-goutou fc-icon-40" }
        ],
        link: [
          { title: 'C君博客', url: 'https://www.cnblogs.com/cjunn/' }
        ]
      };
      localStorage.setItem("config", JSON.stringify(config));
      return config;
    }
  } catch (e) {
    // 处理解析错误

    return null;
  }
}
function loadStateThemes() {
  try {
    const serializedState = localStorage.getItem("themes");
    if (serializedState) {
      return JSON.parse(serializedState);
    } else {
      const themes = [
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
      ];
      localStorage.setItem("themes", JSON.stringify(themes));
      return themes;
    }
  } catch (e) {
    // 处理解析错误
    return null;
  }
}
const config = loadStateConfig();
const themes = loadStateThemes();
export default new Vuex.Store({
  state: {
    config: config,
    themes: themes,
    recruitScrollY: 0
  },
  getters: {
    recruitScrollY: state => state.recruitScrollY
  },
  mutations: {
    changeRecruitScrollY(state, recruitScrollY) {
      state.recruitScrollY = recruitScrollY;
    }
  },
  actions: {},
});
