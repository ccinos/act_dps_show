Vue.component('ccino-switch', {
    model:{
        prop:"value",
        event:"change"
    },
    props: {
        value:Boolean,
    },
    data:function(){
        return {
            value:false,
        }
    },
    template:`
    <div class="switch-wrap" :class="{active:value}"  @click="value=!value;$emit('change', value)">
        <span></span>
    </div>
  `
});