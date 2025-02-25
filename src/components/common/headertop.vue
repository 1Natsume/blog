<template>
    <div class="headertop filter-dot">
        <div id="video-container" style="">
            <video id="bgvideo" class="video" video-name="" src="" width="auto"
                preload="auto"></video>
            <div id="video-btn" class="loadvideo videolive"></div>
            <div id="video-add"></div>
            <div class="video-stu"></div>
        </div>
        <!-- <div class="headertop-down faa-float animated" onclick="headertop_down()">
            <span> <i class="fa fa-chevron-down" aria-hidden="true"></i> </span>
        </div> -->
    </div>
</template>
<script>
import { mapState } from "vuex";
import video from "@/utils/video"
export default {
    name: "headertop",
    computed: {
        ...mapState(["config"]),
    },

    methods: {
        loadvideo() {
            video.loadvideo(this.$store.state.config)
        }
    },
    created() {
        this.loadvideo();
    },
}

</script>