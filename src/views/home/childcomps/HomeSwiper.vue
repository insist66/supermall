<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptionsObject">
      <swiper-slide class="swiper-image" v-for="(item,index) in banners" :key="index">
        <img :src="item.image" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide     } from 'vue-awesome-swiper';

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return[]
      }
    }
  },
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperOptionsObject: {
        pagination: '.swiper-pagination', //与slot="pagination"处 class 一致
        loop: true,
        autoplay: {
          delay: 1000, //自动切换的时间间隔，单位ms
        }, 
      }
    }
  }
}
</script>

<style>
.swiper {
  height: 200px;
  width: 100%;
}

.swiper-image img {
  height: 200px;
  width: 100%;
  /* padding: 10px; */
}

.swiper-button-prev:after {
  display: none;
}

.swiper-button-next {
  display: none;
}
</style>