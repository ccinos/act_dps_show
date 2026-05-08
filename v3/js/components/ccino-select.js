'use strict';

var CcinoSelect = {
  name: 'ccino-select',
  props: {
    options: Array,
    modelValue: [Object, String, Number],
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const { ref } = Vue;
    const open = ref(false);

    function selectOption(item) {
      emit('update:modelValue', item);
      emit('change', item);
      open.value = false;
    }

    return { open, selectOption };
  },
  template: `
  <div class="select" :class="{'select-open':open,'select-closed':!open}">
    <div class="select-value" @click="open=!open">
      <slot name="prefix" v-bind:modelValue="modelValue"></slot>
      <slot v-bind:modelValue="modelValue">
        {{ modelValue }} &nbsp;
      </slot>
    </div>
    <div class="select-option">
      <div v-for="i in options" @click="selectOption(i)">
        <slot v-bind:modelValue="i">
          {{ i }}
        </slot>
      </div>
    </div>
  </div>
  `
};
