<template>
  <div data-item="value" class="f--hlc ant-row ant-form-item ant-form-full">
    <div class="ant-col-l ant-form-item-label">
      <label>
        <slot name="label">
          {{label}}
        </slot>
      </label>
    </div>
    <div class="ant-col-r">
      <div class="ant-form-item-control">
        <div class="input-com ">
          <div>
            <div class="input-com-wrapper">
              <textarea class="input-com-input input-com-textarea" type="textarea" :value='currentValue' @blur="changeTextarea"></textarea>
            </div>
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
      currentValue: this.value
    };
  },
  methods: {
    changeTextarea() {
      this.setCurrentValue();
    },
    setCurrentValue() {
      this.$emit("changeTextarea", this.value);
    }
  },
  watch:{
    value(newVal) {
      this.currentValue = newVal
    }
  },
  props: {
    value: {
      // input值
      type: [String, Number],
      default: ""
    },
    label: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>
