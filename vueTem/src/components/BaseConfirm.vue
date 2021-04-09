<template>
  <div class="confirm-layer f--hcc" v-show="showStatus">
    <div class="confirm-box">
      <div class="confirm-header f--hlc">
        <span class="icon paid-service-icon"></span>
        <div class="">{{title}}</div>

      </div>
      <div class="confirm-content">
        <div class="content f--hlc warning">
          <span :class="iconClass"></span>
          <div class="margin-content">
            <div>{{text}}</div>
          </div>
        </div>
        <div class="btn-group f--hcc">
          <button class="btn-clear sure-btn" @click="close">取消</button>
          <button class="btn-clear sure-btn" @click="ensure">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TYPE_CLASSES_MAP = {
  success: "am-icon-circle-check",
  warning: "am-icon-warning",
  error: "am-icon-circle-cross"
};
export default {
  data() {
    return {
      showStatus: this.show,
      text: this.value
    };
  },
  methods: {
    ensure() {
      this.close();
      this.$emit("ensure");
    },
    close(){
      this.showStatus = false;
      this.$emit("update:show", this.showStatus);
    }
  },
  props: {
    show: {
      // 开关的状态
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ""
    },
    title: {
      type: [String, Number],
      default: "提示"
    },
    type: {
      type: String,
      default: "info"
    }
  },
  watch: {
    value(newVal) {
      this.text = newVal;
    },
    show(newVal) {
      this.showStatus = newVal;
    }
  },
  computed: {
    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || "am-icon-circle-check";
    }
  }
};
</script>
<style lang="scss" scoped>
.confirm-layer {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  .confirm-box {
    border-radius: 4px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -ms-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    width: 400px;
    background: #353535;
    overflow: hidden;
    .confirm-header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #545454;
      font-size: 14px;
      color: #fff;
      position: relative;
      .icon {
        width: 30px;
        height: 40px;
        background: url(../images/icon1.svg) no-repeat -1400px -560px;
        display: block;
      }
    }
    .confirm-content {
      padding: 0 30px;
      .content {
        border-radius: 2px;
        width: 100%;
        line-height: 25px;
        margin-top: 16px;
        background: #232323;
        padding: 1px;
        font-size: 14px;
        color: #b5b5b5;
        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) inset;
        .am-icon-circle-check {
          width: 28px;
          height: 28px;
          min-width: 28px;
          display: block;
          margin: 10px;
          background: url(../images/icon1.svg) no-repeat -1480px -200px;
        }
        .am-icon-warning {
          width: 28px;
          height: 28px;
          min-width: 28px;
          display: block;
          margin: 10px;
          background: url(../images/icon1.svg) no-repeat -1480px -240px;
        }
        .am-icon-circle-cross {
          width: 28px;
          height: 28px;
          min-width: 28px;
          display: block;
          margin: 10px;
          background: url(../images/icon1.svg) no-repeat -1600px -200px;
        }
        .margin-content {
          margin: 10px 10px 10px 0;
          width: 100%;
        }
      }
      .sure-btn {
        border-radius: 2px;
        width: 100px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        text-align: center;
        color: #151515;
        cursor: pointer;
        display: block;
        background: #b5b5b5;
        margin: 12px auto;
      }
    }
  }
}
</style>

