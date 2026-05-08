'use strict';

(function() {
  var { createApp, ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } = Vue;
  var { createRouter, createWebHashHistory } = VueRouter;

  var routes = [
    { path: '/', redirect: '/dps' },
    { path: '/dps', component: DpsOverlay },
    { path: '/dps/setting', component: DpsSettings },
    { path: '/simple-dps', component: SimpleDPS },
    { path: '/timeline', component: Timeline },
    { path: '/simple-timeline', component: SimpleTimeline },
    { path: '/log-tool', component: LogTool },
    { path: '/log-tool-single', component: LogToolSingle },
    { path: '/log-tool-single/setting', component: LogsSettings },
  ];

  var router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  });

  var app = createApp({});

  app.component('ccino-select', CcinoSelect);
  app.component('ccino-switch', CcinoSwitch);

  app.use(router);
  app.mount('#app');
})();
