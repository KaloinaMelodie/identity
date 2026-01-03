(function (global) {
  function init() {
    if (typeof global.MainJS !== "function") {
      console.warn("MainJS n'est pas encore chargé");
      return;
    }
    global.MainJS(); 
  }

  global.AdminMain = { init };
})(window);
