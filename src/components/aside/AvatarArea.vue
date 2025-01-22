<template>
  <div id="avatar_area" class="panel-avatar-dec">
    <div class="avatar-area-wrap">
      <router-link :to="'/c/author'"  :onerror="'this.src=\''+avatarObj.face+'\';this.onerror=null;'"><img :src="avatarObj.avatar"/></router-link>
      <div class="panel-avatar-sign">
        <div class="name-wrap panel-aside-color">
          <span>{{avatarName}}</span>
          <span class="icon iconfont angeldown1"></span>
        </div>
        <div class="sign-wrap panel-aside-color">
          <span>{{avatarSign}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import blogUtils from "@/utils/BlogUtils";
  import BlogContext from "@/context/BlogContext";
  import blogApi from "@/utils/BlogApi";
  export default {

    name: "AvatarArea",
    components: {},
    created: function () {
       blogApi.loadAuthorHeadImg().then(res=>{
        this.avatarObj=res
      });
    },
    data: () => {
      return {
        avatarSign: BlogContext.avatarSign,
        avatarName:BlogContext.blogName,
        avatarObj:{face:'',avatar:''}
      }
    },
    methods:{
      showDefaultImg:function(dom){
        if(this.isInitError){
          return;
        }
        this.isInitError=true;
      },
      foucsMe: () => {
        blogApi.blogFollow().then((data) => {
          blogUtils.showInfoMsg(data);
        });
      },
    }
  }
</script>
