<template>
  <div id="blog_info_page">
    <div class="menu-body-item">
      <div class="menu-body-item-title">
        <div>博客信息</div>
      </div>
      <div class="menu_blog_info_wrap_clz">
        <div class="menu-body-info">
          <div class="info-item">
              <span class="info-item-left">
                <span class="icon iconfont paper"></span>
                <span>昵称</span>
              </span>
            <span class="info-item-right">
                 <span class="info-item-bg"><span>{{info.username}}</span></span>
              </span>
          </div>
          <div class="info-item">
                <span class="info-item-left">
                     <span class="icon iconfont comment"></span>
                     <span>园龄</span>
                </span>
            <span class="info-item-right">
                     <span class="info-item-bg"><span>{{info.age}}</span></span>
                </span>
          </div>
          <div class="info-item">
               <span class="info-item-left">
                     <span class="icon iconfont equalizer"></span>
                     <span>粉丝</span>
               </span>
            <span class="info-item-right">
               <span class="info-item-bg">
                     <span>{{info.follow}}</span>
               </span>
          </span>
          </div>
          <div class="info-item">
               <span class="info-item-left">
                     <span class="icon iconfont refresh"></span>
                     <span>关注</span>
               </span>
            <span class="info-item-right">
                     <span class="info-item-bg">
                       <span>{{info.focus}}</span>
                     </span>
               </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import blogApi from "@/utils/BlogApi";
  export default {
    name: "BlogInfoPage",
    created: function () {
      blogApi.loadAuthorBlogInfo().then((data) => {
          this.info=data;
      })
    },
    data: () => {
      return {
        info: {}
      }
    }
  }
</script>
