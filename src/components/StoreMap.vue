<template>
  <div id="map" class="map"></div>
</template>

<script>
export default {
  props: {
    stores: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      selectedMarker: null,
    };
  },
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    stores() {
      // console.log(this.map);
      // stores가 변경되면 marker를 다시 그림
      this.setMarker();
    },
  },
  methods: {
    handleResize() {
      // console.log(event, window.innerWidth, window.innerHeight);

      let that = this;
      // const w = window.innerWidth;
      const h = window.innerHeight;
      const calcH = h - 315 + "px";

      function resizeMap() {
        var mapContainer = document.getElementById("map");
        // mapContainer.style.width = '650px';
        mapContainer.style.height = calcH;
      }
      function relayout() {
        that.map.relayout();
      }
      resizeMap();
      relayout();
    },
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_JAVASCRIPT_KEY}`;
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        // 지도 생성 기본 옵션
        // center: new kakao.maps.LatLng(37.5662952, 126.9757511), //지도의 중심좌표. // 서울 중심
        // center: new kakao.maps.LatLng(37.555946, 126.9635623), //지도의 중심좌표. // 서울역
        center: new kakao.maps.LatLng(37.5609532, 126.9789347), //지도의 중심좌표. // 시청
        level: 8, //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      var zoomControl = new kakao.maps.ZoomControl(); //줌 컨트롤 생성
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      this.map = map;
      this.setMarker();
    },
    setMarker() {
      this.initMarkers(); // 기존 마커 초기화
      let that = this;
      let map = this.map;

      // 마커 이미지의 이미지 주소
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // var clickedImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      // 마커 이미지의 이미지 크기 세팅
      var imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성
      var normalImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      // var clickedImage = new kakao.maps.MarkerImage(clickedImageSrc, imageSize);
      // set store latlng
      for (var i = 0; i < this.stores.length; i++) {
        // 마커 생성
        const latlng = new kakao.maps.LatLng(
          this.stores[i].lat,
          this.stores[i].lng
        );
        var marker = new kakao.maps.Marker({
          // eslint-disable-line no-unused-vars
          map: map, // 마커를 표시할 지도
          position: latlng, // 마커를 표시할 위치
          title: this.stores[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: normalImage, // 마커 이미지
        });

        var basicInfo = `<div class="customoverlay">
            <a href="https://map.kakao.com/link/map/11394059" 
              target="_blank">
              <span class="title">
                ${this.stores[i].name}
              </span>
            </a>
          </div>`;
        var customOverlay = new kakao.maps.CustomOverlay({
          clickable: true,
          content: basicInfo,
          position: latlng,
          xAnchor: 0.5,
          yAnchor: 2.3,
          zIndex: 3,
        });

        var moreInfo = `<div class="store-card-item-map">
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
                    ${this.stores[i].addressLocal} · ${this.stores[i].category}
                  </div>          
                </div>
                <div class="address">
                  ${this.stores[i].address}
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
          </div>`;
        var customOverlayMore = new kakao.maps.CustomOverlay({
          clickable: true,
          content: moreInfo,
          position: latlng,
          xAnchor: 0.5,
          yAnchor: 1.25,
          zIndex: 3,
        });
        kakao.maps.event.addListener(map, "click", function () {
          // 지도 클릭 시 선택되어 있는 customOverlay 제거
          if (that.selectedMarker) {
            that.selectedMarker.overlay.setMap(null); // 기존 ovelay 제거
            if (that.selectedMarker) {
              that.selectedMarker = null;
            }
          }
        });
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, customOverlay)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(map, customOverlay)
        );
        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverClickListener(map, marker, customOverlayMore)
        );
        this.markers.push(marker); // this.markers 배열에 추가
      }
      function makeOverListener(map, marker, customOverlay) {
        return function () {
          if (that.selectedMarker) {
            // 선택되어 있는 마커가 있을 경우
            if (marker.Fb !== that.selectedMarker.Fb) {
              // 선택되어 있는 마커와 새로 선택된 마커의 상호명이 다를 경우
              customOverlay.setMap(map); // 지도에 올림
            }
          } else {
            // 선택되어 있는 마커가 없을 경우
            customOverlay.setMap(map); // 지도에 올림
            customOverlay.setVisible(true); // 지도에서 보이게 함
          }
        };
      }
      function makeOutListener(map, customOverlay) {
        return function () {
          // customOverlay.setMap(null); // 지도에서 제거
          customOverlay.setVisible(null); // 지도에서 보이지 않게 함
        };
      }
      function makeOverClickListener(map, marker, customOverlayMore) {
        return function () {
          if (that.selectedMarker) {
            that.selectedMarker.overlay.setMap(null); // 기존 ovelay 제거
            that.selectedMarker.overlay = null;
          }
          that.selectedMarker = marker;
          customOverlayMore.setMap(map); // 지도에 올림
          marker.overlay = customOverlayMore;
          // console.log("marker", marker.getPosition());
          panTo(map, marker.getPosition());
        };
      }
      function panTo(map, latlng) {
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동)
        map.panTo(latlng);
      }
    },
    initMarkers() {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
    },
  },
};
</script>

<style lang="scss">
.map {
  display: block;
  width: 100%;
  min-height: 300px;
}
.customoverlay {
  position: relative;
  bottom: 0px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  a {
    display: block;
    text-decoration: none;
    color: #000;
    text-align: center;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    background: $primary;
    /* background: $primary url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center; */
  }
  .title {
    display: block;
    text-align: center;
    background: #fff;
    margin-right: 35px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
  }
}
.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.store-card-item-map {
  position: relative;
  bottom: 0px;
  width: 200px;
  height: 150px;
  margin: 10px;
  line-height: 1.2;
  border: 2px solid $info;
  .thumbnail {
    $width: 196px;
    width: $width;
    /* height: $width * 9 / 16; */
    height: $width * 9 * 0.0625;
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
        text-decoration: none;
      }
    }
  }
}
</style>