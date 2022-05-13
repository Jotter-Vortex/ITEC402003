$(document).ready(function () {
  var obj = document.getElementById("fix_mainNav");
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  if(isMobile()){
      obj.setAttribute("id", "mainNav");
  }
});