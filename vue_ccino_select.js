Vue.component('ccino-select', {
    model:{
        prop:"value",
        event:"change"
    },
    props: {
        options:Array, 
        value:Object,
    },
    data:function(){
        return {
            open:false,
            value:"",
        }
    },
    template:`
  <div class="select" :class="{'select-open':open,'select-closed':!open}">
    <div class="select-value" @click="open=!open">
        <slot name="prefix" v-bind:value="value"></slot>
        <slot v-bind:value="value">
            {{ value }} &nbsp;
        </slot>
    </div>
    <div class="select-option">
        <div v-for="i in options" @click="value=i;open=false;$emit('change', i)">
            <slot v-bind:value="i">
                {{ i }} 
            </slot>
        </div>
    </div>
  </div>
  `
  });