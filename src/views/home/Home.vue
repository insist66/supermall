<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <reecommend-view :recommends="recommends"></reecommend-view>
    <div class="feature">
      <a href="https://act.mogujie.com/zzlx67"></a>
      <img src="~assets/images/recommend/recommend_bg.jpg" alt="">
    </div>
    <tab-control :titles="['流行','新款','精选']"></tab-control>

    <div style="height:100px">111</div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import { getHomeMultidata } from 'network/home';
import HomeSwiper from './childcomps/HomeSwiper';
import ReecommendView from './childcomps/RecommendView';

import TabControl from 'components/content/tabControl/tabControl';

export default {
  name: 'Home',
  components: { NavBar, HomeSwiper, ReecommendView, TabControl },
  data() {
    return {
      banners: [],
      recommends: [],
    }
  },

  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      // console.log(this.banners);
      // console.log(this.recommends);
    })
  }
}
</script>
<style scoped>
#home {
  padding-top: 40px;
}

.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--color-tint);
  color: #fff;
}

.feature img {
  width: 100%;
}
</style>