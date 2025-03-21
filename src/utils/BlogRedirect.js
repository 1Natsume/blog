import BlogContext from "@/context/BlogContext";
let matchUrlType = (pathname) => {
  let regexps=[
    /*请求打开文章*/
    new RegExp("^/" + BlogContext.blogName + "/p/(.+)?"),
    /*请求打开类别*/
    new RegExp("^/" + BlogContext.blogName + "/category/(.+)?")
  ];
  for(let i in regexps){
    if(regexps[i].test(pathname)){
      return pathname.replace('/'+ BlogContext.blogName,'');
    }
  }
};
export default {
  redirect: function (e) {
    let pathname = window.location.pathname;
    let relPath = matchUrlType(pathname);
    relPath = relPath ? relPath : BlogContext.home;
    return {
      path: relPath
    };
  }
}
