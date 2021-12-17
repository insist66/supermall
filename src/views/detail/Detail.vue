<template>
  <div class="detail">
    <nav-bar class="detail-nav" ref="contentbar">
      <div slot="left" @click="backClick" class="back">
        <img src="~/assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-title">
        <div 
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="itemClick(index)" 
          v-for="(item, index) in titles" 
          :key="index">{{ item }}
        </div>
      </div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shops" />
      <detail-goods-info :GoodsInfo="detailsInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramsInfo" class="detail-set-scroll" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" class="detail-set-scroll" />
      <goods-list ref="recommend" :goods="recommendList"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>

    <back-top v-show="isShowBackTop" @click.native="bcakClick"></back-top>
  </div>
</template>

<script>
import { getDetail, getRecommend, Goods, Shops, GoodsParams } from 'network/detail';

import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';

import GoodsList from 'components/content/Goods/GoodsList';

import DetailSwiper from './childcomps/DetailSwiper.vue'
import DetailBaseInfo from "./childcomps/DetailBaseInfo.vue";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import DetailBottomBar from "./childcomps/DetailBottomBar.vue";

import backTop from 'components/content/backTop/backTop';

export default {
  name: 'Detail',
  components: {  
    NavBar, 
    Scroll, 
    DetailSwiper, 
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo, 
    DetailCommentInfo,
    GoodsList, DetailBottomBar, backTop},
  data() {
    return {
      iid: null,
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
      topImages: [], // 轮播图数据
      goods: {}, // 商品信息
      shops: {}, // 店铺数据
      detailsInfo: {}, // 商品详情数据
      paramsInfo: {}, // 尺寸数据
      commentInfo: {}, // 获取评论信息
      recommendList: [],
      themeTopYs: [0, 1000, 2000, 3000],
      scrollIndex: 0,
      isShowBackTop: false, // 回到顶部的按钮
    }
  },
  created() {
    // 获取页面传过来的id
    this.iid = this.$route.query.id;
    // console.log(this.$route.params);
    // this.iid = this.$route.params.id;
    
    // 根据iid请求的详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);

      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // console.log(this.goods);

      // 创建店铺的信息对象
      this.shops = new Shops(data.shopInfo);

      // 保存商品的详情数据
      this.detailsInfo = data.detailInfo;

      // 获取尺寸数据
      this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

      // 获取评论信息
      if(data.rate.cRate !== 0)
      this.commentInfo = data.rate.list[0]
    })

    getRecommend().then(res => {
      console.log(res);
      this.recommendList = res.data.list;
    })
  },


  updated() {
      // 第一次获取 值不对
      // 值不对的原因：this.$refs.params.$el压根就没有渲染
      // this.themeTopYs = [];
      
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);


      this.$nextTick(() => {
        // 第二次获取 值不对
        // 值不对的原因：图片没有计算在内
        // 根据最新的数据，对应的dom是已经渲染出来了
        // 但是图片依然没有加载完（目前获取到的offsetTop是不包含其中的图片的）
        // offsetTop值不对的时候 都是因为图片的问题
        this.themeTopYs = [];
    
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      })
  },

  methods: {
    backClick() {
      this.$router.back();
    },

    itemClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },

    imgLoad() {
      this.$refs.scroll.refresh();
      // this.themeTopYs = [];
      
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    },

    // 点击回到顶部
    bcakClick() {
      this.$refs.scroll.bcakClick(0,0); // 调用scroll的方法
    },

    contentScroll(position) {
      // console.log(position);
      if(position.y < -1000) {  
        this.isShowBackTop = true;
      }else {
        this.isShowBackTop = false;
      }
      // this.isShowBackTop = -(position.y) > 1000

      // 决定tabControl是否吸顶
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 999;
  background: #fff;
  height: 100vh;
}

.detail-title {
  display: flex;
  /* justify-content: space-evenly; */
}

.title-item {
  flex: 1;
}

.active {
  color: red;
}

.back img {
  margin-top: 10px;
}

.detail-nav {
  position: relative;
  z-index: 999;
  background: #fff;
}

.content {
  height: calc(100% - 44px - 55px);
}
</style>