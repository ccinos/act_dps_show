'use strict';

function useWindowPopup() {
  var popupWindow = null;
  var pollTimer = null;

  function openPopup(routeHash, width, height) {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.focus();
      return;
    }
    var baseUrl = window.location.href.split('#')[0];
    var fullUrl = baseUrl + '#' + routeHash;
    popupWindow = window.open(fullUrl, '_blank',
      'height=' + height + ',innerHeight=' + height +
      ',width=' + width + ',innerWidth=' + width +
      ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
  }

  function pollClosed(onClosed) {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(function() {
      if (!popupWindow || popupWindow.closed) {
        clearInterval(pollTimer);
        popupWindow = null;
        pollTimer = null;
        if (onClosed) onClosed();
      }
    }, 300);
  }

  function closePopup() {
    if (pollTimer) clearInterval(pollTimer);
    popupWindow = null;
    pollTimer = null;
  }

  return { openPopup, pollClosed, closePopup };
}
