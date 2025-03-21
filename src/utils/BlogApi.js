import BlogContext from "@/context/BlogContext";
import request from "./request";
let blogApi = {
  /*音乐播放器API*/
  loadMusicSong: (id) => {
    return BlogContext.apiLoadMusicSong(
      BlogContext.musicApiUrl
        .replace(":type", "song")
        .replace(":id", id)
        .replace(":r", Math.random())
    );
  },
  loadMusicSonglrc: (url) => {
    return request.get(url).then((res) => {
      return res
    });


  },
  loadMusicPlayList: (id) => {
    return BlogContext.apiLoadMusicPlayList(
      BlogContext.musicApiUrl
        .replace(":type", "playlist")
        .replace(":id", id)
        .replace(":r", Math.random())
    );
  },
  loadMusicSongExt: (musicIds) => {
    return new Promise((oubresolve, oubreject) => {
      let proArr = [];
      musicIds.forEach((item) => {
        proArr.push(
          new Promise((resolve, reject) => {
            blogApi.loadMusicSong(item).then((data) => {
              resolve(data);
            });
          })
        );
      });
      Promise.all(proArr).then((list) => {
        oubresolve(list);
      });
    });
  },
  loadMusicPlayListExt: (musicIds) => {
    return new Promise((oubresolve, oubreject) => {
      blogApi.loadMusicPlayList(musicIds).then((list) => {
        oubresolve(list);
      });
    });
  },
  parseMusicInterface: function (list) {
    let reData = [];
    list.forEach((item, index) => {
      item = item[0] || item;
      reData.push({
        index: index,
        pic: item.pic,
        author: item.author,
        title: item.title,
        url: item.url,
        lrc: item.lrc,
      });
    });
    return reData;
  },
  loadMusicList: (musicIds) => {
    let promis;
    if (Array.isArray(musicIds)) {
      promis = blogApi.loadMusicPlayListExt(musicIds);
    } else {
      promis = blogApi.loadMusicSongExt(musicIds);
    }
    return new Promise((resolve, reject) => {
      promis.then((list) => {
        resolve(blogApi.parseMusicInterface(list));
      });
    });
  },
  loadArticleNum: () => {
    return BlogContext.apiLoadArticleNum(
      "/" + BlogContext.blogAcc + "/ajax/blogStats/"
    );
  },
  loadBlogPostInfo: (pageId) => {
    // return BlogContext.apiLoadBlogPostInfo(
    //   "/" +
    //   BlogContext.blogAcc +
    //   "/ajax/BlogPostInfo.aspx?blogId=" +
    //   BlogContext.blogId +
    //   "&postId=" +
    //   pageId +
    //   "&blogUserGuid=" +
    //   BlogContext.blogUserGuid
    // );

    return request.get("/newjersey/ajax/post-accessories?postId="+pageId).then((res) => {
      return {
        buryCount: res["postStats"]["buryCount"],
        diggCount: res["postStats"]["diggCount"],
      };
    });
  },
  loadBlogFollow: () => {
    return request.get("/newjersey/ajax/blog-accessories").then((res) => {
      if(res["followStatus"].search('unfollow')){
        return true
      }else{
        return false
      }
      
    });
  },
  loadAuthorHeadImg: () => {
    // let url = "/" + BlogContext.blogAcc + "/ajax/BlogPostInfo.aspx?blogId=" + BlogContext.blogId + "&postId=" + BlogContext.blogPostId + "&blogUserGuid=" + BlogContext.blogUserGuid
    // return BlogContext.apiLoadAuthorHeadImg(url);

    return request.get("/api/users").then((res) => {
      return {
        face: res["Face"],
        avatar: res["Avatar"],
      };
    });
  },
  loadConfig() {
    return request.get("/api/users").then((res) => {
      
      return {
        blogAcc :res["BlogApp"],
        face :'https://images.weserv.nl/?url=' + res["Face"],
        avatar : 'https://images.weserv.nl/?url=' + res["Avatar"],
        userId: res["UserId"]
      }
    })

  },
  loadCloudLabel: () => {
    return BlogContext.apiLoadCloudLabel(
      "/" + BlogContext.blogAcc + "/tag/"
    );
  },
  loadAuthorBlogInfo: () => {
    return BlogContext.apiLoadAuthorBlogInfo(
      "/" + BlogContext.blogAcc + "/ajax/news"
    );
    return request.get("/api/users").then((res) => {
      return {
        username: res["DisplayName"],
        age: res["Seniority"],
        follow: res["FollowerCount"],
        focus: res["FollowingCount"],
      };
    });
  },
  blogFollow: () => {
    return BlogContext.apiBlogFollow(
      "/" + BlogContext.blogAcc + "/ajax/Follow/FollowBlogger.aspx",{ blogAcc: BlogContext.blogAcc, blogUserGuid: BlogContext.blogUserGuid }
    );
  },
  getCommentBody: (commentId) => {
    return BlogContext.apiGetCommentBody(
      "/" + BlogContext.blogAcc + "/ajax/comment/GetCommentBody.aspx",{
        blogAcc: BlogContext.blogAcc,
        blogUserGuid: BlogContext.blogUserGuid,
        commentId: commentId,
      }
    );
  },
  addComment: (postId, body, parentCommentId) => {
    postId = parseInt(postId);
    parentCommentId = parentCommentId ? parseInt(parentCommentId) : 0;
    return BlogContext.apiAddComment(
      "/" + BlogContext.blogAcc + "/ajax/PostComment/Add.aspx",{
        blogAcc: BlogContext.blogAcc,
        postId: postId,
        body: body,
        parentCommentId: parentCommentId,
      }
    );
    var data = {
      body: body,
    };
    return request.post(
      "/api/blogs/newjersey/posts/" + postId + "/comments",
      data
    );
  },
  /*更新评论*/
  updateComment: (commentId, body) => {
    return BlogContext.apiUpdateComment(
      "/" + BlogContext.blogAcc + "/ajax/PostComment/Update.aspx",{ blogAcc: BlogContext.blogAcc, commentId: commentId, body: body }
    );
  },
  deleteComment: (commentId, pageIndex, parentId) => {
    return BlogContext.apiDeleteComment(
      "/" + BlogContext.blogAcc + "/ajax/comment/DeleteComment.aspx",{
        blogAcc: BlogContext.blogAcc,
        commentId: parseInt(commentId),
        pageIndex: pageIndex,
        parentId: parentId,
      }
    );
  },
  diggComment: (postId, commentId, isAbandoned) => {
    return BlogContext.apiDiggComment(
      "/" + BlogContext.blogAcc + "/ajax/vote/comment",{
        blogAcc: BlogContext.blogAcc,
        commentId: parseInt(commentId),
        isAbandoned: isAbandoned,
        postId: parseInt(postId),
        voteType: "Digg",
      }
    );
  },
  buryComment: (postId, commentId, isAbandoned) => {
    return BlogContext.apiBuryComment(
      "/" + BlogContext.blogAcc + "/ajax/vote/comment",{
        blogAcc: BlogContext.blogAcc,
        commentId: parseInt(commentId),
        isAbandoned: isAbandoned,
        postId: parseInt(postId),
        voteType: "Bury",
      }
    );
  },
  voteBlogPost: (postId, isAbandoned) => {
    return BlogContext.apiVoteBlogPost(
      "/" + BlogContext.blogAcc + "/ajax/vote/blogpost",{
        blogAcc: BlogContext.blogAcc,
        isAbandoned: isAbandoned,
        postId: parseInt(postId),
        voteType: "Digg",
      }
    );
  },
  buryBlogPost: (postId, isAbandoned) => {
    return BlogContext.apiBuryBlogPost(
      "/" + BlogContext.blogAcc + "/ajax/vote/blogpost",{
        blogAcc: BlogContext.blogAcc,
        isAbandoned: isAbandoned,
        postId: postId,
        voteType: "Bury",
      }
    );
  },
  loadCommentList: (articleId, page) => {
    return new Promise((resolve, reject) => {
      BlogContext.apiLoadCommentList(
        $,
        { blogAcc: BlogContext.blogAcc, postId: articleId, pageIndex: page },
        "/" +
        BlogContext.blogAcc +
        "/ajax/comments-block?postId=" +
        articleId +
        "&pageIndex=" +
        page
      ).then((obj) => {
        if (!obj.avatarUrl && !obj.avatarHdUrl) {
          obj.avatarUrl = BlogContext.defHeadImg;
          obj.avatarHdUrl = BlogContext.defHeadImg;
        }
        resolve(obj);
      });
    });
  },
  loadCategoriesTags: (articleId) => {
    return BlogContext.apiLoadCategoriesTags(
      "/" +
      BlogContext.blogAcc +
      "/ajax/CategoriesTags.aspx?blogId=" +
      BlogContext.blogId +
      "&postId=" +
      articleId,{
        blogAcc: BlogContext.blogAcc,
        blogId: BlogContext.blogId,
        postId: articleId,
      }
    );
  },
  loadCommentCount: (articleId) => {
    return BlogContext.apiLoadCommentCount(
      "/" +
      BlogContext.blogAcc +
      "/ajax/GetCommentCount.aspx?postId=" +
      articleId,{ blogAcc: BlogContext.blogAcc, postId: articleId }
    );
  },

  loadViewCount: (articleId) => {
    return BlogContext.apiLoadViewCount(
      "/" + BlogContext.blogAcc + "/ajax/GetViewCount.aspx?postId=" + articleId,{ blogAcc: BlogContext.blogAcc, postId: articleId }
    );
  },
  loadArticle: (articleId) => {
    return BlogContext.apiLoadArticle(
      "/" + BlogContext.blogAcc + "/p/" + articleId,{ blogAcc: BlogContext.blogAcc, articleId: articleId }
    );
    return request.get("/api/blogposts/" + articleId + "/body").then((res) => {
      return {
        body: res,
      };
    });
  },
  loadTagList: (tagId, pageNum) => {
    return BlogContext.apiLoadTagList(
      "/" + BlogContext.blogAcc + "/tag/" + tagId + "/?page=" + pageNum,{ blogAcc: BlogContext.blogAcc, tagId: tagId, page: pageNum }
    );
  },
  loadArchiveList: (archiveId, pageNum) => {
    return BlogContext.apiLoadArchiveList(
      "/" +
      BlogContext.blogAcc +
      "/archive/" +
      archiveId +
      ".html?page=" +
      pageNum,{ blogAcc: BlogContext.blogAcc, archiveId: archiveId, pageNum: pageNum }
    );
  },
  loadCategoryList: (categoryId, pageNum) => {
    return BlogContext.apiLoadCategoryList(
      "/" +
      BlogContext.blogAcc +
      "/category/" +
      categoryId +
      ".html?page=" +
      pageNum,{
        blogAcc: BlogContext.blogAcc,
        categoryId: categoryId,
        pageNum: pageNum,
      }
    );
  },
  loadPrevnext: (pageId) => {
    return BlogContext.apiLoadPrevnext(
      "/" + BlogContext.blogAcc + "/ajax/post/prevnext?postId=" + pageId,{ blogAcc: BlogContext.blogAcc, postId: pageId }
    );
  },
  loadDefaultCategoryList: (pageNum) => {
    return BlogContext.apiLoadDefaultCategoryList(
      "/" + BlogContext.blogAcc + "/default.html?page=" + pageNum,{ blogAcc: BlogContext.blogAcc, page: pageNum },
    );

    var list = [];
    return request
      .get("/api/blogs/newjersey/posts?pageIndex=" + pageNum)
      .then((res) => {
        res.forEach((item) => {
          let obj = {};
          obj.pageId = item["Id"];
          obj.title = item["Title"];
          obj.url = item["Url"];
          obj.desc = item["Description"];
          obj.time = item["PostDate"];
          obj.readNum = item["ViewCount"];
          obj.commentNum = item["CommentCount"];
          obj.recommendNum = item["DiggCount"];
          obj.editUrl = item["Url"];
          list.push(obj);
        });
        return { list };
      });
  },
  loadSideColumn: () => {
    let url = '/' + BlogContext.blogAcc + '/ajax/sidecolumn.aspx'
    return BlogContext.apiLoadSideColumn(url);
  },
  loadTopLists: () => {
    return BlogContext.apiLoadTopLists(
      "/" + BlogContext.blogAcc + "/ajax/TopLists.aspx"
    );
  },
  loadCommitterFaceUrl: (committerUrl, committerName) => {
    let pidSplTmp = committerUrl.split("/");
    let pid = pidSplTmp[pidSplTmp.length - 1].replace(".html", "");
    return BlogContext.apiLoadCommitterFaceUrl(
      "/" +
      BlogContext.blogAcc +
      "/ajax/GetComments.aspx?postId=" +
      pid +
      "&pageIndex=0",{ blogAcc: BlogContext.blogAcc, postId: pid },
    );
  },
  loadBlogTalkShort: () => {
    return new Promise((resolve, reject) => {
      blogApi.loadBlogTalk(-1).then((res) => {
        if (res.cnList.length <= 5) {
          resolve(res.cnList);
          return;
        }
        resolve(res.cnList.slice(5, res.cnList.length));
      });
    });
  },
  loadBlogTalk: (page) => {
    return new Promise((resolve, reject) => {
      blogApi.loadMyCommentList(BlogContext.feelingBlogId, page).then((l) => {
        resolve({
          cnList: l.list,
          count: l.size,
          pageNum: l.count,
          current: page,
        });
      });
    });
  },
  loadMyCommentList: (articleId, page) => {
    let list = [];
    return new Promise((resolve, reject) => {
      let mySize = BlogContext.myCommentSize;
      let blogSize = BlogContext.blogCommentSize;
      let list = [];
      request
        .get(
          "/newjersey/ajax/comments-block?postId=" +
          articleId +
          "&pageIndex=" +
          page +
          "&anchorCommentId=0&isDesc=true&order=0&loadCommentBox=false"
        )
        .then((res) => {
          let maxPage = Math.ceil(res["commentCount"] / mySize);
          page = page == -1 ? maxPage : page;
          let myScale = blogSize / mySize;
          let blogPage = Math.ceil(page / myScale);
          let blogSideLeft = parseInt((page - 1) % myScale) * 10;
          let blogSideRight = parseInt(page % myScale) * 10;
          if (blogSideLeft > blogSideRight) {
            blogSideRight = blogSideLeft + 10;
          }
          var parser = new DOMParser();
          var dom = parser.parseFromString(res["comments"], "text/html").body;
          //console.log(dom.querySelectorAll(".feedbackItem"))
          dom.querySelectorAll(".feedbackItem").forEach((v) => {
            let obj = {};
            obj.commentId = parseInt(
              $(v).find("[class='layer']").attr("href").replace("#", "")
            );
            obj.level = $(v).find(".layer").html();
            obj.label = $(v).find(".louzhu").html() || "";
            obj.date = $(v).find(".comment_date").html();
            obj.author = $(v).find("[id^='a_comment_author_']").text();
            obj.authorUrl = $(v).find("[id^='a_comment_author_']").attr("href");
            obj.desc = $(v)
              .find("[id^='comment_body_']")
              .html()
              .replace(new RegExp("_src", "g"), "src")
              .trim();
            obj.digg =
              $(v).find(".comment_digg").length >= 1
                ? $(v)
                  .find(".comment_digg")
                  .html()
                  .trim()
                  .replace("支持(", "")
                  .replace(")", "")
                : undefined;
            obj.burry =
              $(v).find(".comment_burry").length >= 1
                ? $(v)
                  .find(".comment_burry")
                  .html()
                  .trim()
                  .replace("反对(", "")
                  .replace(")", "")
                : undefined;
            obj.avatarUrl = (
              $(v).find("[id^='comment_'][id$='_avatar']").html() || ""
            ).trim();
            obj.avatarHdUrl = (
              $(v).find("[id^='comment_'][id$='_avatar']").html() || ""
            )
              .trim()
              .replace("face", "avatar");
            obj.replayBtn =
              $(v).find("[onclick^='return ReplyComment']").length > 0;
            obj.quoteBtn =
              $(v).find("[onclick^='return QuoteComment']").length > 0;
            obj.delBtn = $(v).find("[onclick^='return DelComment']").length > 0;
            obj.updateBtn =
              $(v).find("[onclick^='return GetCommentBody']").length > 0;
            list.push(obj);
          });

          resolve({
            list: list.slice(blogSideLeft, blogSideRight),
            count: blogPage,
            size: blogSize,
            current: page,
          });
        });
    });
    return request
      .get(
        "/api/blogs/newjersey/posts/" +
        articleId +
        "/comments?pageIndex=" +
        page +
        "&pageSize=10"
      )
      .then((res) => {
        list = [];
        if (res.length == 0) {
          return {
            list: list,
          };
        }
        res.forEach((item) => {
          let obj = {};
          obj.commentId = item["Id"];
          // obj.level = $(v).find(".layer").html();
          // obj.label = $(v).find(".louzhu").html() || "";
          obj.date = item["DateAdded"];
          obj.author = item["Author"];
          obj.authorUrl = item["AuthorUrl"];
          obj.desc = item["Body"];
          obj.digg = undefined;
          obj.burry = undefined;
          obj.avatarUrl = item["FaceUrl"];
          obj.avatarHdUrl = item["FaceUrl"];
          // obj.replayBtn=$(v).find("[onclick^='return ReplyComment']").length>0;
          // obj.quoteBtn=$(v).find("[onclick^='return QuoteComment']").length>0;
          // obj.delBtn=$(v).find("[onclick^='return DelComment']").length>0;
          // obj.updateBtn=$(v).find("[onclick^='return GetCommentBody']").length>0;
          list.push(obj);
        });
        return {
          list: list,
        };
      });
  },
  loadBlogs: () => {
    return request.get("/api/blogs/newjersey").then((res) => {
      console.log(res);
    });
  },
  loadkeywordList: (keyword) => {
    let list = [];
    request
      .get(
        "/api/ZzkDocuments/Blog?keyWords=" +
        keyword +
        "&pageIndex=1&viewTimesAtLeast=10"
      )
      .then((res) => {
        res.forEach((item) => {
          let obj = {};
          obj.Title = item["Title"];
          list.push(obj);
        });
      })
      .catch((e) => {
        list.push(e);
      });
    return {
      list,
    };
  },

  /*博客园API*/
};
export default blogApi;
