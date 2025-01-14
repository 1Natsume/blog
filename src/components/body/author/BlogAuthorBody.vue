<template>
  <div>
    <BlogAuthorIng></BlogAuthorIng>
    <BlogAuthorAside></BlogAuthorAside>
  </div>
</template>

<script>
    import BlogAuthorIng from "./BlogAuthorIng.vue";
    import BlogAuthorAside from "./BlogAuthorAside.vue";

    export default {
        name: "BlogAuthorBody",
        components: {BlogAuthorAside, BlogAuthorIng}
    }
</script>

<style scoped>

</style>
