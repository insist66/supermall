<template>
  <div class="Cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ $store.state.cartList.length }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: 'Cart',
  components: {
    NavBar
  }
}
</script>

<style>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>