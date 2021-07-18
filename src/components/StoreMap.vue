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
  data() {
    return {
      selectedMarker: null
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
      let that = this
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
      // var clickedImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; 
      // 마커 이미지의 이미지 크기 세팅
      var imageSize = new kakao.maps.Size(24, 35); 
      // 마커 이미지를 생성
      var normalImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      // var clickedImage = new kakao.maps.MarkerImage(clickedImageSrc, imageSize); 
      // set store latlng 
      for (var i = 0; i < this.stores.length; i ++) {         
        // 마커 생성
        const latlng = new kakao.maps.LatLng(this.stores[i].lat, this.stores[i].lng)        
        var marker = new kakao.maps.Marker({ // eslint-disable-line no-unused-vars
          map: map, // 마커를 표시할 지도
          position: latlng, // 마커를 표시할 위치
          title : this.stores[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : normalImage // 마커 이미지
        });
        
        var basicInfo = 
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
          content: basicInfo,
          position: latlng,
          xAnchor: 0.5,
          yAnchor: 2.3,
          zIndex: 3
        });

        var moreInfo = 
  // <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">
        `
          <div class="store-card-item">
            <div
              class="thumbnail"
              style="background-image: url(${this.stores[i].thumbnail});
                        background-position:center;">
            </div>
            <div class="info">
              <div class="left-side">
                <div class="first-line">
                  <div class="title">
                    ${this.stores[i].name}
                  </div>
                  <div class="subtitle">
                    ${this.stores[i].addressLocal } · ${this.stores[i].category }
                  </div>          
                </div>
                <div class="address">
                  ${this.stores[i].address }
                </div>
              </div>

              <div class="right-side">
                <a
                  href=${this.stores[i].url}
                  target="_blank">
                  <i
                    title="새 탭에서 유튜브 링크 열기"
                    class="fa fa-arrow-circle-o-right fa-2x"
                    aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>`
        var customOverlayMore = new kakao.maps.CustomOverlay({
          clickable: true,
          content: moreInfo,
          position: latlng,
          xAnchor: 0.5,
          yAnchor: 1.25,
          zIndex: 3
        });
        kakao.maps.event.addListener(map, 'click', function() {
          // 지도 클릭시 선택되어ㅣ있는 customOverlay 제거
          if (that.selectedMarker) {
            console.log('Map Clicked!');
            that.selectedMarker.overlay.setMap(null); // 기존 ovelay 제거
          }
        })
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, customOverlay));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(map, customOverlay));
        kakao.maps.event.addListener(marker, 'click', makeOverClickListener(map, marker, customOverlayMore));
      }
      function makeOverListener(map, marker, customOverlay){
        return function() {
          if (that.selectedMarker) {
            // 선택되어 있는 마커가 있을 경우
            if (marker.Fb !== that.selectedMarker.Fb) {
              // 선택되어 있는 마커와 새로 선택된 마커의 상호명이 같을 경우
              customOverlay.setMap(map); // 지도에 올림
            }
          } else {
            // 선택되어 있는 마커가 없을 경우
            customOverlay.setMap(map); // 지도에 올림
          }
        };
      }
      function makeOutListener(map, customOverlay) {
        return function() {
          customOverlay.setMap(null); // 지도에 제거
        };
      }
      function makeOverClickListener(map, marker, customOverlayMore){
        return function() {
          if (that.selectedMarker) {
            that.selectedMarker.overlay.setMap(null); // 기존 ovelay 제거
            that.selectedMarker.overlay = null;
          }
          that.selectedMarker = marker
          customOverlayMore.setMap(map); // 지도에 올림
          marker.overlay = customOverlayMore
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
  a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: $primary;
    /* background: $primary url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center; */
    }
  .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
}
.customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}

.store-card-item {
  position:relative;bottom:0px;width:200px;height:150px;
  margin: 10px;
  line-height: 1.2;
  border: 2px solid $info;
  .thumbnail {
    $width: 196px;
    width: $width;
    height: $width * 9 / 16;
    border-radius: 4px 4px 0 0;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }
  .info {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
    
    .left-side {
      margin-left: 6px;
      .first-line {
        /* display: flex;
        align-items: flex-end; */
        .title {
          font-size: 12px;
          color: $gray-700;
          margin-right: 10px;
        }
        .subtitle {
          font-size: 11px;
          color: $gray-500;
        }
      }
      .address {
        font-size: 11px;
        color: $gray-600;
      }
    }
    .right-side {
      margin-right: 6px;
      a {
        cursor: pointer;
        color: $primary;
        text-decoration:none;
      }
    }
  }
}
</style>