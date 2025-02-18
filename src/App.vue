<template>
    <div id="blog" :class="this.$store.state.config.theme">
        <div id="bg" :style="bg(this.$store.state.config.bg)"></div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: "App",
    data() {

        return {
            
        }

    },
    methods: {
        themeStyle: () => {
            return null
        },
        bg(bg){
            return "background-image:url('"+ bg+"')"
        }
    },
};
</script>

<style lang="scss">
// #blog {
//     background-size: 100% 100%;
//     width: 100%;
//     height: 100%;
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     text-align: center;
// }

#bg {
    background-size: cover;
    background-position: right bottom;
    background-repeat: no-repeat;
    position: fixed;
    z-index: -1;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>