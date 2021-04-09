<template>
  <div class="item">
    <!-- 如果是模板则显示封面 -->
    <div v-if="isTemplate && fold==true" @mouseenter="templateMaskShow = true">
      <img :src="datas.Cover" class="templateCover">
    </div>
    <!-- 如果点击分块使用则拆解显示 -->
    <div v-else v-html="html" @click.stop="renderMaterial($event)" :class="{partContent:isTemplate && fold==false}"></div>
    <!-- 收藏按钮 -->
    <i class="fa media " :class="{'fa-star':IsCollect,'fa-star-o':!IsCollect}" v-show="fold==true" @click="collectItem"></i>
    <!-- 退出分块 -->
    <i aria-hidden="true" class="fa fa-sign-out media" v-show="isTemplate && fold==false" @click="quitUsePart"></i>
    <!-- 是否是vip -->
    <div class="iconfont icon-VIP" v-if="IsVip"></div>
    <!-- 显示分块使用和整套使用 -->
    <div class="templateSelect" v-if="isTemplate && fold==true && templateMaskShow" @mouseleave="templateMaskShow = false">
      <p>
        <button type="button" class="el-button el-tooltip el-button--default" @click="showTemplateAllSection">
          <span>
            <i class="iconfont icon-quanbufenlei"></i>
            <span>分块使用模板</span>
          </span>
        </button>
        <button type="button" class="el-button el-tooltip el-button--default" @click="useAll">
          <span>
            <i aria-hidden="true" class="iconfont icon-quanbu"></i>
            <span>整套使用模板</span>
          </span>
        </button>
      </p>
    </div>
    <am-alert :show.sync="showAlert" v-model="alertText" @ensure="hideAlert" type="error" />
    <login-dialog :show.sync="showLoginDialog" />
  </div>
</template>
 
<script>
import amAlert from "../components/BaseAlert";
import LoginDialog from "../components/LoginDialog";
import { mapState } from "vuex";

export default {
  data() {
    return {
      fold: true, // 是否折叠
      templateMaskShow: false,
      showAlert: false,
      alertText: "",
      IsCollect: this.datas.IsCollect,
      IsVip: this.datas.is_vip,
      showLoginDialog: false,
      event:null,// 这个是当前点击的事件对象，用于登陆后直接把素材放入选区
    };
  },
  methods: {
    loginShow() {
      this.showLoginDialog = true;
    },
    loginSuccess(type) {
      // 登陆成功的回调，去处理一些事务
      // 收藏后登陆，登陆后自动收藏
      if (type == "collect") this.collectCallback();
      // vip素材点击后放入编辑器
      if (type == "open") this.openCallback();
    },
    collectCallback() {
      this.collectItem();
    },
    openCallback(){
      this.renderMaterial(this.event)
    },
    //  向编辑器中构建素材
    renderMaterial(event) {
      this.event = event;
      if (this.datas.IfSystem == 1) {
        return false;
      } else if (
        $(".sidebar")
          .find("li.active")
          .attr("data-type") == "imglist" &&
        $(this.ue.body).find(".checkSelected").length > 0 &&
        $(this.ue.body)
          .find(".checkSelected")
          .children()[0].localName == "img"
      ) {
        $(this.ue.body)
          .find(".checkSelected")
          .children("img")
          .attr(
            "src",
            $(event.currentTarget)
              .find("img")
              .attr("src")
          );
        $(this.ue.body)
          .find(".checkSelected")
          .children("img")
          .attr(
            "_src",
            $(event.currentTarget)
              .find("img")
              .attr("src")
          );
        this.clearselectline();
      } else {
        if (
          ($(event.currentTarget).find(".isvip").length > 0 &&
            !!Number(topnavInfo.userInfo.IsVip)) ||
          $(event.currentTarget).find(".isvip").length == 0
        ) {
          var range = this.ue.selection.getRange().cloneContents(); //获得选区【秒刷】
          var _this =
            $(event.currentTarget)[0].nodeName.toLowerCase() == "p"
              ? $(event.currentTarget)
                  .parents(".item")
                  .find(".KolEditor:first")
                  .clone()
              : $(event.currentTarget)
                  .find(".KolEditor:first")
                  .clone();
          if (this.type == "mysign") {
            //侧边栏在我的签名上，点击为添加签名
            //头部
            if ($(this.ue.body).find(".materialTop").length > 0) {
              $(this.ue.body)
                .find(".materialTop")
                .empty()
                .append(
                  $(event.currentTarget)
                    .find(".materialTop")
                    .html()
                );
            } else {
              var _node = this.ue.body.firstChild;
              $(event.currentTarget)
                .find(".materialTop")
                .clone()
                .insertBefore($(_node));
            }
            // 尾部
            if ($(this.ue.body).find(".materialBottom").length > 0) {
              $(this.ue.body)
                .find(".materialBottom")
                .empty()
                .append(
                  $(event.currentTarget)
                    .find(".materialBottom")
                    .html()
                );
            } else {
              $(this.ue.body).append(
                $(event.currentTarget)
                  .find(".materialBottom")
                  .clone()[0]
              );
            }
          } else {
            if (range != null) {
              this.secondBrush(_this);
            } else {
              var _style = $(event.currentTarget)
                .find(".KolEditor:first")
                .attr("style");
              this.ue.execCommand(
                "inserthtml",
                '<section  class="KolEditor" style="' +
                  _style +
                  '">' +
                  _this.html() +
                  "</section>"
              );
              //  ====== 带序号的素材，点击实现数字自增  ======
              if (
                $(event.currentTarget)
                  .find(".KolEditor:first")
                  .find("p.count").length > 0
              ) {
                $(event.currentTarget)
                  .find(".KolEditor:first")
                  .find("p.count")
                  .each(function() {
                    var count = Number($(this).html());
                    var _length = $(this).html().length;
                    if (String(count + 1).length < _length) {
                      var zero = new Array(
                        _length - String(count + 1).length + 1
                      ).join("0");
                      $(this).html(zero + (count + 1));
                    } else {
                      $(this).html(count + 1);
                    }
                  });
              }
            }
          }
          this.clearselectline();
        } else {
          this.dialog.vipTips = true;
          this.vipMessage = "成为VIP会员，VIP素材免费用";
          $(".purchvip")
            .find("button")
            .attr({ statsmark: "查看VIP特权关闭", statstype: "2" });
        }
      }
    },
    // 删除选中框
    clearselectline() {
      $(this.ue.body)
        .find(".checkSelected")
        .removeClass("checkSelected");
    },
    //秒刷代码
    secondBrush(_this) {
      var rangeLength = this.ue.selection.getRange().endOffset;
      var textLength = _this.find("p").length;
      var imgLength = _this.find("img.KolImg").length;
      var startIndex = 0;
      var imgIndex = 0;
      var innertext = _this.html();
      this.ue.selection
        .getRange()
        .adjustmentBoundary()
        .traversal(function(node) {
          var isHasImg = 0;
          if (node.localName == "img" || $(node).find("img").length > 0) {
            var imgsrc = node.currentSrc
              ? node.currentSrc
              : $(node)
                  .find("img")
                  .attr("src");
            _this
              .find("img.KolImg")
              .eq(imgIndex)
              .attr("src", imgsrc);
            isHasImg = 1;
            imgIndex++;
          } else {
            if (node.localName != "br" && $.trim(node.textContent) != "") {
              if (startIndex >= textLength) {
                var beforeStyle = _this.find("p:last").attr("style");
                _this
                  .find("p:last")
                  .after(
                    '<p style="' +
                      beforeStyle +
                      '">' +
                      node.textContent +
                      "</p>"
                  );
              } else {
                _this
                  .find("p")
                  .eq(startIndex)
                  .html(node.textContent);
              }
              startIndex++;
            }
          }
        });
      this.ue.execCommand(
        "inserthtml",
        '<section  class="KolEditor">' + _this.html() + "</section>"
      );
    },
    // 分块使用
    showTemplateAllSection() {
      this.fold = false;
      const self = this;
      // 为分块绑定事件
      $(document)
        .off("mouseenter.part")
        .on(
          "mouseenter.part",
          ".partContent .KolEditor:first .KolEditor",
          function() {
            $(this).css("position", "relative");
            $(this).append(
              '<section class="usePart" style="position:absolute;left:-10px;top:-10px;width:calc(100% + 20px);height:calc(100% + 20px);background-color:rgba(0,0,0,0.4);z-index:88;border-radius:4px;"><i class="fa fa-arrow-circle-o-right" data-type="fa-arrow-circle-o-right" style="cursor:pointer;font-size:40px;color:#fff;display:inline-block;position:absolute;left:50%;top:50%;margin-left:-20px;margin-top:-20px;"></i></section>'
            );
            $(".usePart").click(function(event) {
              var range = self.ue.selection.getRange().cloneContents();
              var _this = $(this).parents(".KolEditor:first");
              $(this).remove();
              if (range != null) {
                secondBrush(_this.clone());
              } else {
                self.ue.execCommand(
                  "inserthtml",
                  '<section class="KolEditor">' + _this.html() + "</section>"
                );
              }
            });
          }
        );

      $(document).on(
        "mouseleave",
        ".partContent .KolEditor:first .KolEditor",
        function() {
          $(this)
            .find(".usePart")
            .remove();
        }
      );
    },
    // 退出分块使用
    quitUsePart() {
      this.fold = true;
    },
    useAll: function() {
      if (this.datas.is_vip) {
        this.ue.execCommand("inserthtml", this.datas.content);
      } else {
        this.showAlert = true;
        this.alertText = "成为VIP会员，VIP素材免费用";
      }
    },
    hideAlert() {
      console.log("goto vippage");
    },
    collectItem() {
      if (!this.isLogin) {
        this.showLoginDialog = true;
        return;
      }
      this.IsCollect = !this.IsCollect;
    },
    hideQrcodeDia() {
      console.log("close dialog qroce");
    }
  },
  props: {
    type: {
      // template mertial
      type: String,
      default: "mertial"
    },
    html: {
      // html
      type: String,
      default: ""
    },
    datas: {
      // 全部的data
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState("user", ["user"]),
    isTemplate() {
      return !!this.datas.IfSystem;
    },
    isLogin() {
      return !!this.user;
    },
    isVip() {
      return !!this.user;
    }
  },
  components: {
    amAlert,
    LoginDialog
  }
};
</script>
<style lang="scss" scoped>
.item {
  margin-top: 10px;
  // 分块使用
  .templateCover {
    vertical-align: middle;
  }
}
i.media {
  position: absolute;
  right: 0px;
  top: 0px;
  color: #f7ba2a;
  font-size: 20px;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  padding-left: 8px;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 100%;
  display: none;
  z-index: 99;
}
i.fa-trash-o {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  border-radius: 50%;
  display: none;
}
.isvip {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 99;
  width: 25px;
}
i.fa-times {
  color: #ff4949 !important;
}
.item {
  &:hover {
    transition: all 0.3s ease;
    i.media {
      display: block;
    }
    i.fa-trash-o {
      display: block;
    }
    .isvip {
      display: block;
    }
    .templateSelect {
      display: block;
    }
    i.pasterAbout {
      display: block !important;
    }
  }
  &.item {
    position: relative;
    overflow: hidden;
    background: #fff;
    padding: 10px 10px;
    cursor: pointer;
    min-height: 60px;
    border-radius: 2px;
    border-top: none;
    margin-bottom: 4px;
    overflow: hidden;
    transition: background, 0.3s, ease;
    &.designTemplate,
    &.template {
      .mytemplate-Name,
      .mytemplate-title {
        display: none;
      }
    }
    &.draft,
    &.myTemplate,
    &.mysign {
      max-height: 240px;
      border: 1px solid #e6e6e6;
      padding: 0px;
      > div {
        > div {
          padding: 10px;
        }
      }
      .mytemplate-Name {
        height: 33px;
        line-height: 33px;
        background-color: #f9fafc;
        color: #333333;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 12px;
      }
      .mytemplate-summary {
        line-height: 1.5px;
        background-color: #f9fafc;
        color: #333333;
        font-size: 12px;
        box-sizing: border-box;
        padding: 5px 12px;
      }
    }

    img {
      max-width: 100%;
    }
    .templateSelect {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 88;
      > p {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
      }
      button {
        &:hover {
          i,
          span {
            color: #f7ba2a;
          }
        }
        border: none;
        background-color: transparent;
        > span {
          i {
            font-size: 40px;
            width: 40px;
            color: #fff;
            line-height: 100%;
            height: 100%;
            text-align: center;
            display: inline-block;
          }
          > span {
            display: block;
            font-size: 16px;
            color: #fff;
            margin-top: 15px;
          }
        }
      }
    }
  }
}

.mytemplate {
  border-width: 1px;
  border-color: rgb(230, 230, 230);
  border-style: solid;
  border-radius: 4px;
  padding: 0px;
  margin-top: 12px;
  > div > div {
    margin: 12px;
    max-height: 180px;
    overflow: hidden;
    overflow-y: auto;
  }
  p.mytemplate-title {
    height: 34px;
    line-height: 34px;
    padding: 0px 12px;
    background-color: #f9fafc;
    font-size: 14px;
    color: #333333;
  }
  p.mytemplate-summary {
    height: 34px;
    line-height: 34px;
    padding: 0px 12px;
    background-color: #f9fafc;
    font-size: 14px;
    color: #333333;
  }
}
p.mytemplate-title {
  height: 34px;
  line-height: 34px;
  padding-left: 12px;
  background-color: #f9fafc;
  font-size: 14px;
  color: #333333;
}
p.designTemplat-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  margin-top: 6px;
  span {
    &:nth-child(1) {
      font-size: 14px;
      color: #666666;
      i {
        font-size: 16px;
        margin-right: 3px;
      }
    }
    &:nth-child(2) {
      font-size: 20px;
      color: #ff5e45;
      i {
        font-style: normal;
        font-size: 14px;
      }
    }
  }
}
qqmusic {
  min-height: 60px;
  width: 100%;
  border: 1px solid #e7e7ed;
  margin: 17px 1px 16px 0;
  display: block;
  // background-image: url("../../javascript/lib/ueditor/themes/default/images/icon_qqmusic_audio_default.png");
  background-position: right center;
  background-repeat: no-repeat;
  position: relative;
  padding: 9px 12px;
}
qqmusic:before {
  content: "QQ音乐";
  display: block;
  text-align: left;
}
qqmusic:after {
  content: "QQ音乐--预览查看";
  color: #8d8d8d;
  display: block;
  text-align: left;
}
.icon-VIP {
  color: #ef2a36;
  font-size: 35px;
  position: absolute;
  top: 0;
  right: 7px;
}
</style>
