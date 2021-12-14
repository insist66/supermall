<template>
  <div class="goods">
    <div class="goods-item" v-for="(item,index) in goods" :key="index" @click="itemClick(item)">
      <img :src="showImage(item)" alt="">
      <div class="goods-info">
        <p>{{ item.title }}</p>
        <span class="goods-price">{{ item.price }}</span>
        <span>收藏</span>
        <span class="goods-collect">{{ item.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  
  // computed: {
  //   showImage() {
  //     return this.item.image || this.item.show.img;
  //   }
  // },

  methods: {
    itemClick(item) {
      this.$router.push({
        path: '/detail',
        query: {
          id: item.iid
        }
      });
      // this.$router.push(`/detail/${item.iid}`);
    },

    showImage(item) {
      return item.image || item.show.img;
    }    
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}

.goods-item {
  width: 48%;
}

.goods-item img {
  width: 100%;
  height: 267px;
}

.goods-info {
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.goods-price {
  color: red;
}
</style>