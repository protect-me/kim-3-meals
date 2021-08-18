function getCookie(cookie_name) {
  let x = "";
  let y = "";
  const val = document.cookie.split(";");

  for (let i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf("="));
    y = val[i].substr(val[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, ""); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

function setCookie(name, value, hours) {
  let exdate = new Date();
  exdate.setHours(exdate.getHours() + hours);

  document.cookie =
    name + "=" + value + ";expires=" + exdate.toUTCString() + ";path=/";
}

export { getCookie, setCookie }
