'use strict';

function useOverlayData() {
  const { ref, onMounted, onUnmounted } = Vue;
  const encounter = ref({});
  const isActive = ref(false);
  const combatants = ref([]);
  const yourData = ref({});
  const resizable = ref(true);
  const currentEvent = ref(null);

  var updateTimer = null;
  var ws = null;

  function update(e) {
    encounter.value = e.Encounter || {};
    isActive.value = e.isActive || false;

    var list = [];
    if (e.Combatant) {
      for (var i in e.Combatant) {
        list.push(e.Combatant[i]);
      }
    }
    combatants.value = list;

    yourData.value = (e.Combatant && e.Combatant.YOU) || {};
  }

  function handleEvent(e) {
    if (e.detail) {
      currentEvent.value = e;
    }
  }

  onMounted(function() {
    var uri = /[?&]HOST_PORT=(wss?:\/\/[^&\/]+)/.exec(location.search);
    uri = uri && uri[1];
    if (uri) {
      if (uri === 'ws://:10501') uri = 'ws://localhost:10501';
      uri += '/MiniParse';
      ws = new WebSocket(uri);
      ws.onmessage = function(e) {
        if (e.data === '.') return;
        var d;
        try { d = JSON.parse(e.data); } catch(err) { console.error(err, e.data); return; }
        if (d.type === 'broadcast' && d.msgtype === 'CombatData') {
          currentEvent.value = { detail: d.msg };
        }
      };
      ws.onerror = function(e) { ws.close(); console.error(e); };
    } else {
      document.addEventListener('onOverlayDataUpdate', handleEvent);
    }

    document.addEventListener('onOverlayStateUpdate', function(e) {
      resizable.value = !e.detail.isLocked;
    });

    if (window.addOverlayListener) {
      addOverlayListener('CombatData', function(e) {
        var dps = parseFloat(e.Encounter.encdps);
        if (dps <= 0 || dps === Infinity) return;
        currentEvent.value = { detail: e };
      });
    }

    updateTimer = setInterval(function() {
      if (currentEvent.value) {
        update(currentEvent.value.detail);
        currentEvent.value = null;
      }
    }, 1000);
  });

  onUnmounted(function() {
    if (updateTimer) clearInterval(updateTimer);
    if (ws) ws.close();
    document.removeEventListener('onOverlayDataUpdate', handleEvent);
  });

  return { encounter, isActive, combatants, yourData, resizable };
}
