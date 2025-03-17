import Vuex from "vuex";
import { createStore } from 'vuex';
function loadStateConfig() {
  try {
    //localStorage.clear();
    const serializedState = localStorage.getItem("config");
    if (serializedState) {
      let json1 = JSON.parse(serializedState);
      let json2 = window._config;

      let configjson =Object.assign(json1, json2);
      return configjson
    } else {
      const config = {
        theme: "handsome",
        bg: ["http://www.dmoe.cc/random.php"],
        
      };
      localStorage.setItem("config", JSON.stringify(config));
      return config;
    }
  } catch (e) {
    // 处理解析错误

    return null;
  }
}
const config = loadStateConfig();
export default createStore({
  state: {
    config: config,
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
  actions: {
  },
});
