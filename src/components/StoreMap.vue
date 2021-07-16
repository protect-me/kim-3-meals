<template>
  <div
    id="map"
    class="map">
  </div>
</template>

<script>
export default {
  props: {
    stores: {
      type: Object,
      default: () => ({})
    }
  },
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
        level: 8 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      var zoomControl = new kakao.maps.ZoomControl(); //줌 컨트롤 생성
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커 이미지의 이미지 주소
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
      for (var i = 0; i < this.stores.length; i ++) {         
        // 마커 이미지의 이미지 크기 세팅
        var imageSize = new kakao.maps.Size(24, 35); 
        // 마커 이미지를 생성
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        // set store latlng 
        const latlng = new kakao.maps.LatLng(this.stores[i].lat, this.stores[i].lng)        
        // 마커 생성
        var marker = new kakao.maps.Marker({ // eslint-disable-line no-unused-vars
          map: map, // 마커를 표시할 지도
          position: latlng, // 마커를 표시할 위치
          title : this.stores[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지
        });

        // 인포윈도우의 스타일을 강제로 변경할 수는 있지만, 카카오 지도의 정책에 맞게 커스텀 오버레이를 활용        
        var content = 
          `<div class="customoverlay">
            <a href="https://map.kakao.com/link/map/11394059" 
              target="_blank">
              <span class="title">
                ${this.stores[i].name}
              </span>
            </a>
          </div>`
        var customOverlay = new kakao.maps.CustomOverlay({
          clickable: true,
          content: content,
          position: latlng,
          xAnchor: 0.5,
          yAnchor: 2.3,
          zIndex: 3
        });


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, customOverlay));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(map, customOverlay));
        // 다른 infowindowMore을 열면 이전에 열린 요소가 닫혀야하는데 이러면 이벤트 위임으로 부모 요소에 적용하면 되겠다.
      }
      function makeOverListener(map, customOverlay){
        return function() {
          customOverlay.setMap(map); // 지도에 올림
        };
      }
      function makeOutListener(map, customOverlay) {
        return function() {
          customOverlay.setMap(null); // 지도에 제거
        };
      }
    }
  }
};
</script>

<style lang="scss">
.map {
  display: block;
  width: 100%;
  height: 500px; 
  /* 100vh에서 빼는 header 부분을 빼는 식으로 설정해야겠다. 
  media에 따라서 달라지는 input 부분도 고려해야함 */
}
.customoverlay {
  position:relative;bottom:0px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;
  a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: $primary;background: $primary url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
  .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
}
.customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}

</style>