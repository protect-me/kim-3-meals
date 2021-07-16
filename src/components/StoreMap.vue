<template>
  <div
    id="map"
    class="map">
  </div>
</template>

<script>
export default {
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=486a425ae547a5bc41030e47f9828d0a"; 
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(37.5662952, 126.9757511), //지도의 중심좌표.
        level: 6 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      console.log(map);
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  display: block;
  width: 100%;
  height: 500px; 
  /* 100vh에서 빼는 header 부분을 빼는 식으로 설정해야겠다. 
  media에 따라서 달라지는 input 부분도 고려해야함 */
}
</style>