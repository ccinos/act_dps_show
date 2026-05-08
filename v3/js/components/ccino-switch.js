'use strict';

var CcinoSwitch = {
  name: 'ccino-switch',
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    function toggle() {
      const newVal = !props.modelValue;
      emit('update:modelValue', newVal);
      emit('change', newVal);
    }
    return { toggle };
  },
  template: `
    <div class="switch-wrap" :class="{active: modelValue}" @click="toggle">
      <span></span>
    </div>
  `
};
