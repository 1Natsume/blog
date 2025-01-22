import Vuex from "vuex";
import { createStore } from 'vuex';
function loadStateConfig() {
  try {
    //localStorage.clear();
    const serializedState = localStorage.getItem("config");
    if (serializedState) {
      return JSON.parse(serializedState);
    } else {
      const config = {
        theme: "style0",
        bg: ["https://cdn.54yt.net/usr/uploads/61568506_p0.webp"],
        headcolor: "#7266ba",
        asidecolor: "",
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
          theme: "style0",
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
