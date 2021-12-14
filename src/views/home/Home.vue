<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
      class="tab-control" 
      @tabClick='tabClick'
      ref="tabControl1" 
      :titles="['流行','新款','精选']"
      v-show="isTabFixed">
    </tab-control>
    <scroll 
      class="content" 
      ref="scroll" 
      :probe-type="3" 
      :pull-up-load="true"
      @scroll="scrollClick"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <reecommend-view :recommends="recommends"></reecommend-view>
      <div class="feature">
        <a href="https://act.mogujie.com/zzlx67"></a>
        <img src="~assets/images/recommend/recommend_bg.jpg" alt="">
      </div>
      <tab-control 
        @tabClick='tabClick' 
        ref="tabControl2" 
        :titles="['流行','新款','精选']"></tab-control>
      <!-- <goods-list :goods="goods[currentType].list"></goods-list> 两种写法 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="bcakClick"></back-top>    
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'network/home';

import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from './childcomps/HomeSwiper';
import ReecommendView from './childcomps/RecommendView';

import Scroll from 'components/common/scroll/Scroll';

import TabControl from 'components/content/tabControl/tabControl';
import GoodsList from 'components/content/Goods/GoodsList';
import backTop from 'components/content/backTop/backTop';

export default {
  name: 'Home',
  components: { NavBar, HomeSwiper, ReecommendView, TabControl, GoodsList, Scroll, backTop },
  data() {
    return {
      banners: [], // 轮播图数据
      recommends: [], // 抢券福利数据
      goods: {
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false, // 回到顶部的按钮
      tabOffsetTop: 0, // 吸顶效果默认为0
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  destroyed() {
    console.log('home destroyed');
  },

  // 点击其他分类的时候回到原来的位置（不写bug出现的频率也很低）
  // activated() {
  //   this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
  // },

  // deactivated() {
  //   this.saveY = this.$refs.scroll.scroll.y;
  // },
  // 

  mounted() {
    console.log(this.$refs.tabControl2.$el.offsetTop);
  },

  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    /**
     * 事件监听相关方法
     */

    // 点击tab选项切换
    tabClick(index) {
      console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 点击回到顶部
    bcakClick() {
      this.$refs.scroll.bcakClick(0,0); // 调用scroll的方法
    },

    // 判断backTop是否显示
    scrollClick(position) {
      // console.log(position);
      if(position.y < -1000) {  
        this.isShowBackTop = true;
      }else {
        this.isShowBackTop = false;
      }
      // this.isShowBackTop = -(position.y) > 1000

      // 决定tabControl是否吸顶
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },

    // 上拉加载
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })      
    },

    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      })     
    }
  }
}
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  z-index: 999;
  background: var(--color-tint);
  color: #fff;
}

.feature img {
  width: 100%;
}

.tab-control {
  position: relative;
  z-index: 999;
}

.content {
  /* margin-top: 44px; */
  height: calc(100% - 93px);
  overflow: hidden;
}


/* .content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
} */
</style>