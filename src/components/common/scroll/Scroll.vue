<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },

    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },

  mounted() {
    // 1 创建scrool对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType, //设置滚动
      click: true, // 点击方法设置位true才能点击
      pullUpLoad: this.pullUpLoad, // 监听滚动底部上拉加载更多
      observeDOM: true, // 解决滚动高度问题
      observeImage: true // 解决滚动高度问题
    })

    // 2 监听scroll实时滚动的区域
    if(this.probeType === 2 | this.probeType === 3 ) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }

    // 3 监听上拉加载更多
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    }

    // console.log(this.scroll);
  },

  methods: {
    // 回到顶部
    bcakClick(x,y, time=1000) {
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    
    // 并且是为了保证this.scroll存在才执行
    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 结束上啦加载更多触发下一次
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
}
</script>

<style>
.wrapper {
  height: 100%;
}
</style>