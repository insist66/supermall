<template>
  <div class="swiper-detail">
    <swiper :options="swiperOptionsObject">
      <swiper-slide class="swiper-item" v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'DetailSwiper',
  components: { Swiper, SwiperSlide },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOptionsObject: {
        loop: true, //无限滑动
        pagination: '.swiper-pagination', //与slot="pagination"处 class 一致
      }    
    }
  }
}
</script>

<style scoped>
.swiper-detail {
  overflow: hidden;
}

.swiper-item img {
  height: 220px;
  width: 100%;
}

.swiper-button-prev:after {
  display: none;
}

.swiper-button-next {
  display: none;
}
</style>