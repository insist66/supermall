<template>
  <div class="recommends">
    <div class="recommends-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link"></a>
      <img :src="item.image" alt="">
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
.recommends {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 10px 0 0;
  padding-bottom: 15px;
  width: 100%;
  font-size: 14px;
  border-bottom: 6px solid #eee;
}

.recommends-item {
  flex: 1;
}

.recommends img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>