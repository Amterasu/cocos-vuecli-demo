<template>
  <div class="f--hlc ant-row ant-form-item ant-form-full">
    <div class="ant-col-l ant-form-item-label">
      <label>
        <slot name="label">
          {{label}}
        </slot>
      </label>
    </div>
    <div class="ant-col-r">
      <div class="ant-form-item-control">
        <div>
          <span class="ant-input-wrapper" style="float:left">
            <el-color-picker v-model="currColor" size="mini" :disabled="!switchStatus" @change="emitColor" :show-alpha="false" />
          </span>
          <el-switch v-model="switchStatus" active-color="#ffa800" inactive-color="#151515" style="margin-top:3px;" @change="changeSwitch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchStatus: this.switch,
      currColor: this.value
    };
  },
  methods: {
    changeSwitch() {
      this.emitColor();
    },
    emitColor() {
      this.$emit("changeStauts", this.switchStatus, this.currColor);
    }
  },
  props: {
    switch: {
      // 开关的状态
      type: Boolean,
      default: true
    },
    value: {
      // 颜色
      type: String,
      default: "#fff"
    },
    label: {
      type: [String, Number],
      default: ""
    }
  },
  watch: {
    value(newVal) {
      this.currColor = newVal;
    },
    switch(newVal) {
      this.switchStatus = newVal;
    }
  }
};
</script>
