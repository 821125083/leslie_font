<template>
  <div>
    <cn-map ></cn-map>
  </div>
</template>
<script>

import CnMap from './element/CnMap.vue';

export default {
  components: { CnMap },
    data(){
        return {
          url:this.url.testUrl,
            location:{
                lng:'104.114129',
                lat:'40'
            },
            zoom:5,
        }
    },
    mounted(){
    },
    methods:{
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
