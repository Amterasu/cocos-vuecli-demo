<template>
  <div
    class="f--hlc ant-row ant-form-item"
    :class="{ 'ant-form-full':full,'ant-form-half':!full} "
  >
    <div class="ant-col-l ant-form-item-label">
      <label>
        <slot name="label">
          {{label}}
        </slot>
      </label>
    </div>
    <div class="ant-col-r">
      <div class="ant-form-item-control">
        <div :class="['ant-input-'+icon]">
          <div
            class="ant-input-number ant-input-number-sm"
            :class="{'input-com-number':fullInput,'slider-input':!fullInput}"
          >
            <div
              class="ant-input-number-handler-wrap"
              v-if="count"
            >
              <a
                class="ant-input-number-handler ant-input-number-handler-up "
                :class="{'ant-input-number-handler-down-disabled':maxDisabled}"
                @keydown.enter="increase"
                @click="increase"
              >
                <span class="ant-input-number-handler-up-inner"></span>
              </a>
              <a
                class="ant-input-number-handler ant-input-number-handler-down "
                :class="{'ant-input-number-handler-down-disabled':minDisabled}"
                @keydown.enter="decrease"
                @click="decrease"
              >
                <span class="ant-input-number-handler-down-inner"></span>
              </a>
            </div>
            <div class="ant-input-number-input-wrap">
              <input
                class="ant-input-number-input"
                :step="step"
                :max="max"
                :min="min"
                :value="currentValue"
                @keydown.up="increase($event)"
                @keydown.down="decrease($event)"
                ref="input"
                @input="inputEventChangeVal($event)"
              >
            </div>
          </div>
          <div
            class="ant-slider slider-per"
            v-if="showSlider"
          >
            <el-slider
              v-model="currentValue"
              @change="setCurrentValue"
            ></el-slider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: parseFloat(this.value)
    };
  },
  props: {
    full: {
      // 容器全宽或者半宽
      type: Boolean,
      default: true
    },
    count: {
      // 是否有计数功能
      type: Boolean,
      default: true
    },
    icon: {
      // 单位图标 rate:% px:px degree:度
      type: String,
      default: ""
    },
    step: {
      // 点击一次数值增长或者减少的数值
      type: Number,
      default: 1
    },
    max: {
      // 最大
      type: [Number, String],
      default: 9999
    },
    min: {
      // 最小
      type: [Number, String],
      default: 0
    },
    value: {
      // input值
      type: [String, Number],
      default: ""
    },
    showSlider: {
      // 是否显示滑动条
      type: Boolean,
      default: false
    },
    label: {
      // 文字
      type: [String, Number],
      default: ""
    }
  },
  methods: {
    increase(e) {
      if (!this.count || this.maxDisabled) return;
      const value = this.value || 0;
      const newVal = this._increase(value, this.step);
      this.setCurrentValue(newVal);
      e.currentTarget.focus();
    },
    decrease(e) {
      if (!this.count || this.minDisabled) return;
      const value = this.value || 0;
      const newVal = this._decrease(value, this.step);
      this.setCurrentValue(newVal);
      e.currentTarget.focus();
    },

    _increase(val, step) {
      if (typeof val !== "number" && val !== undefined)
        return this.currentValue;
      const precisionFactor = Math.pow(10, this.precision);
      return this.toPrecision(
        (precisionFactor * val + precisionFactor * step) / precisionFactor
      );
    },
    _decrease(val, step) {
      if (typeof val !== "number" && val !== undefined)
        return this.currentValue;
      const precisionFactor = Math.pow(10, this.precision);
      return this.toPrecision(
        (precisionFactor * val - precisionFactor * step) / precisionFactor
      );
    },
    getPrecision(value) {
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (newVal >= this.max) newVal = parseFloat(this.max ? this.max : 0);
      if (newVal <= this.min) newVal = parseFloat(this.min ? this.min : 0);
      // if (oldVal === newVal) {
      //   this.$refs.input.setCurrentValue(this.currentValue);
      //   return;
      // }
      if (this.count) {
        this.$emit("input", newVal);
        this.$emit("change", newVal, oldVal);
        this.currentValue = parseFloat(newVal ? newVal : 0);
      } else {
        this.$emit("input", parseFloat(newVal));
        this.$emit("change", parseFloat(newVal), oldVal);
        this.currentValue = parseFloat(newVal ? newVal : 0);
      }
    },
    inputEventChangeVal(e) {
      const newVal = parseFloat(
        e.currentTarget.value ? e.currentTarget.value : 0
      );
      this.setCurrentValue(newVal);
      e.currentTarget.focus();
    },
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.precision;
      return parseFloat(parseFloat(Number(num ? num : 0).toFixed(precision)));
    }
  },
  computed: {
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
    precision() {
      const { value, step, getPrecision } = this;
      return Math.max(getPrecision(value), getPrecision(step));
    },
    fullInput() {
      // input全宽或者半宽
      return !this.showSlider && this.full;
    }
  },
  watch: {
    value(newVal) {
      this.currentValue = parseFloat(newVal);
    }
  }
};
</script>

<style  lang="scss">
@import "../styles/css/toolbar";
@import "../styles/css/toolbarfont";
</style>
