<template>
  <div class="wrapper">
    <ul class="content">
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
    </ul>
  </div>
</template>

<script>
import BScroll  from 'better-scroll'
export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },

  mounted() {
    this.scroll = new BScroll('.wrapper', {
      probeType: 3, //设置滚动
      pullUpLoad: true,
      observeDOM: true,
      observeImage: true
    })

    // this.scroll.on('scroll', position => {
    //   console.log(position);
    // })

    this.scroll.on('pullingUp', ()=> {
      console.log('上拉加载更多');
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  background: skyblue;
}
</style>