<template>
  <div class="tab-control">
    <div class="tab-control-item" 
    v-for="(item,index) in titles" :key="index"
    :class="{active:index===currentIndex}">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
  background: skyblue;
}

.active {
  color: red;
}
</style>