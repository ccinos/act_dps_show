'use strict';

var SimpleDPS = {
  template: `
    <div :style="{backgroundColor:'rgba(0,0,0,0.3)',borderRadius:'10px',padding:'5px',color:'white',textShadow:'0 0 3px gold',fontSize:'14px'}">
      <div style="display:flex">
        <div style="flex:50%">合计</div>
        <div style="flex:50%">{{ encounter['encdps-*'] || '0' }}</div>
      </div>
      <div style="display:flex" v-for="(c, name) in combatant" :key="name">
        <div style="flex:50%">{{ c.name }}</div>
        <div style="flex:50%">{{ c['encdps-*'] || '0' }}</div>
      </div>
    </div>
  `,
  setup() {
    const { ref, onMounted, onUnmounted } = Vue;
    const combatant = ref({});
    const encounter = ref({});

    function onDataUpdate(e) {
      combatant.value = e.detail.Combatant || {};
      encounter.value = e.detail.Encounter || {};
    }

    onMounted(function() {
      document.addEventListener('onOverlayDataUpdate', onDataUpdate);
    });

    onUnmounted(function() {
      document.removeEventListener('onOverlayDataUpdate', onDataUpdate);
    });

    return { combatant, encounter };
  }
};
