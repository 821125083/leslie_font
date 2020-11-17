<template>
  <baidu-map class="map" :center="location" :zoom="zoom" :scroll-wheel-zoom="false">
  </baidu-map>
</template>
<script>
export default {
    data(){
        return {
            location:{
                lng:'104.114129',
                lat:'40'
            },
            zoom:5,
        }
    }
}
</script>


<style>
/* The container of BaiduMap must be set width & height. */
.map {
  width: 100%;
  height: 600px;
}
</style>
