'use strict';

function useLocalStorage(key, defaultValue) {
  const { ref, watch, isRef } = Vue;
  const stored = localStorage.getItem(key);
  const data = ref(stored ? JSON.parse(stored) : defaultValue);

  watch(data, function(val) {
    if (val !== null && val !== undefined) {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }, { deep: true });

  return data;
}
