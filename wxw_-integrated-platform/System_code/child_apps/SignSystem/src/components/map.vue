<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
// 加载地图组件
import { debouncedShowMessage } from "../../src/utils/debounce.ts";
import { onMounted, defineEmits } from "vue";
const emit = defineEmits(["getlocation"]);
//传参到 signinitiate
const latlng = {
  longitude: null,
  latitude: null,
};
// const currentAddress = ref<string>("");
// @ts-ignore
const initmap = (log: number, lat: number) => {
  console.log(log, lat);
  // @ts-ignore
  let myLatlng = new window.qq.maps.LatLng(
    23.43062354605329,
    113.1743531362457
  );
  var myOptions = {
    zoom: 17,
    center: myLatlng,
  };
  // @ts-ignore
  //地图属性
  var map = new window.qq.maps.Map(
    document.getElementById("container"),
    myOptions
  );
  // @ts-ignore
  //指针
  var marker = new window.qq.maps.Marker({
    // @ts-ignore
    position: new window.qq.maps.LatLng(23.43062354605329, 113.1743531362457), //广城理坐标
    map: map,
    draggable: true,
  });
  // @ts-ignore
  //指针移动 监听
  qq.maps.event.addListener(marker, "dragend", function (event: any) {
    marker.setPosition(event.latLng);
    console.log(marker.getPosition());
    debouncedShowMessage("位置更新", "success");
    //子传父更新坐标
    latlng.longitude = marker.getPosition().lng;
    latlng.latitude = marker.getPosition().lat;
    emit("getlocation", latlng);
  });
};

const loadScript = (log: number, lat: number) => {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://map.qq.com/api/js?v=2.exp&key=4ISBZ-5NDCM-GPY6B-6NAQO-TSJW6-XDFRL";
  initmap(log, lat);
  //初始化地图
  document.body.appendChild(script);
};

const initTencentMap = (mapSecret = "4ISBZ-5NDCM-GPY6B-6NAQO-TSJW6-XDFRL") => {
  if (!mapSecret) {
    console.log("请到系统管理设置地图秘钥");
    return;
  }
  // @ts-ignore
  const geolocation = new window.qq.maps.Geolocation(mapSecret, "dessign");
  console.log(geolocation);
  const options = { timeout: 8000 };
  geolocation.getLocation(
    (position: any) => {
      let latitude = position.lat;
      let longitude = position.lng;
      // fetchAddress(latitude, longitude);
      console.log(longitude, latitude);
      loadScript(longitude, latitude);
      latlng.longitude = longitude;
      latlng.latitude = latitude;
      emit("getlocation", latlng);
    },
    () => {
      console.log("定位失败");
    },
    options
  );
  // const fetchAddress = (latitude: number, longitude: number) => {
  //   fetch(
  //     `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${mapSecret}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === 0) {
  //         currentAddress.value =
  //           data.result.formatted_addresses.recommend || "";
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("获取地址失败：", error);
  //     });
  // };
};
window.addEventListener(
  "message",
  function (event) {
    // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
    var loc = event.data;
    if (loc && loc.module == "locationPicker") {
      //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
      console.log("location", loc);
    }
  },
  false
);
onMounted(() => {
  initTencentMap();
});
</script>
<style scoped>
#container {
  width: 500px;
  height: 300px;
}
</style>
