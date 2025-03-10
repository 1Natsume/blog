<template>
    <div class="headertop filter-dot">
        <div id="video-container" style="">
            <video id="bgvideo" class="video" video-name="" src="" width="auto" preload="auto" autoplay loop></video>
            <div id="video-btn" class="loadvideo videolive"></div>
            <div id="video-add"></div>
            <div class="video-stu"></div>
        </div>
        <!-- <div class="headertop-down faa-float animated" onclick="headertop_down()">
            <span> <i class="fa fa-chevron-down" aria-hidden="true"></i> </span>
        </div> -->
        <div class="headertop-menu">
            <ul>
                <li v-for="item in this.$store.state.config.menu">
                    <a href="javascript:void(0)" @click="clickItem(item.url)">
                        <div class="font-big">{{ item.name }}</div>
                        <div class="font-small">{{ item.title }}</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import blogUtils from "@/utils/BlogUtils";
import blogApi from "@/utils/BlogApi";
import video from "@/utils/video"
export default {
    name: "headertop",
    methods: {
        loadvideo() {
            video.loadvideo(this.$store.state.config)
        },
        foucsMe: () => {
            blogApi.blogFollow().then((data) => {
                blogUtils.showInfoMsg(data);
            });
        },
        clickItem: function (url) {
            if (!url) {
                return;
            }
            if (url.startsWith("me")) {
                this.foucsMe()
                return;
            }
            if (url.startsWith("http")) {
                window.open(url);
                return;
            }
            if (this.$route.path == url) {
                $("#blog").attr('class', 'handsome');
                return;
            }
            this.$router.push(url);
        },
    },
    created() {
        this.loadvideo();
    },
}

</script>