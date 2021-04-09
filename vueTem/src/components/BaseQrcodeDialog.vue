<template>
  <div class="qrCode-layer f--hcc" v-show="showStatus">
    <div class="qrCode">
      <div class="qrCode-header f--hlc">
        <span class="title-icon"></span>
        <span class="flex-1">预览二维码</span>
        <span class="close-icon" @click="close"></span>
      </div>
      <div class="qrCode-content">
        <div class="qrCode-div">
          <div class="qrCode-bg">
            <img :src="src" alt="">
          </div>
        </div>
        <p>扫码查看手机效果</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showStatus: this.value,
      src: ""
    };
  },
  methods: {
    changeSwitch() {
      this.emitSwitch();
    },
    close() {
      this.showStatus = false;
      this.$emit("update:show", this.showStatus);
      this.$emit("close");
    }
  },
  props: {
    value: {
      // 地址
      type: String,
      default: false
    },
    show: {
      // 状态
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newVal) {
      this.src = newVal;
    },
    show(newVal) {
      this.showStatus = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.qrCode-layer {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  .qrCode {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -ms-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    width: 214px;
    background: #353535;
    .qrCode-header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #545454;
      font-size: 14px;
      color: #fff;
      .title-icon {
        width: 30px;
        height: 40px;
        background: url(../images/icon1.svg) no-repeat -1520px -240px;
        display: block;
      }
      .close-icon {
        cursor: pointer;
        width: 30px;
        height: 40px;
        background: url(../images/icon1.svg) no-repeat -1203px -235px;
        display: block;
        &.close-icon:hover {
          background-position: -1203px -275px;
        }
      }
    }
    .qrCode-content {
      width: 100%;
      p {
        text-align: center;
        font-size: 12px;
        color: #b5b5b5;
        padding: 0 10px;
        margin: 0 0 9px;
      }
      .qrCode-div {
        border-radius: 2px;
        width: 194px;
        height: 194px;
        margin: 10px auto;
        padding: 5px;
        background: #545454;
        .qrCode-bg {
          width: 100%;
          height: 100%;
          background: #d2d2d2;
          padding: 5px;
          img {
            border-style: none;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>

