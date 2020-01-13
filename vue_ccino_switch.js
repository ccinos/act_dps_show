Vue.component('ccino-switch', {
    model:{
        prop:"checked",
        event:"change"
    },
    props: {
        checked:Boolean,
    },
    data:function(){
        return {
        }
    },
    template:`
    <div class="switch-wrap" :class="{active:checked}"  @click="$emit('change', !checked)">
        <span></span>
    </div>
  `
});