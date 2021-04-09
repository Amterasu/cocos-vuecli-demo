<template>
  <div class="f--hlc ant-row ant-form-item" :class="{ 'ant-form-full':full,'ant-form-half':!full} ">
    <div class="ant-col-l ant-form-item-label">
      <label>
        <slot name="label">
          {{label}}
        </slot>
      </label>
    </div>
    <div class="ant-col-r">
      <div class="ant-form-item-control" style="text-align: left;">
        <el-switch v-model="status" active-color="#ffa800" inactive-color="#151515" style="margin-top:3px;" @change="changeSwitch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: this.value
    };
  },
  methods: {
    changeSwitch() {
      this.emitSwitch();
    },
    emitSwitch() {
      this.$emit("changeSwitch", this.status);
    }
  },
  props: {
    value: {
      // 状态
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: ""
    },
    full: {
      // 容器全宽或者半宽
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(newVal) {
      this.status = newVal;
    }
  }
};
</script>
