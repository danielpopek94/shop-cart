<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="header__link">Produkty</RouterLink>
      <RouterLink to="/cart" class="cart__link">
        <img class="cart__icon" src="/cart.svg" alt="cart icon">
        <span v-if="cartQuantity" class="cart__counter">{{ cartQuantity }}</span>
      </RouterLink>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    const cartQuantity = computed(() => (
      store.getters.cartQuantity
    ));

    return {
      cartQuantity,
    };
  },
});
</script>


<style scoped>
  .header {
    position: absolute;
    top: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 0 30px 0 30px;
  }

  .header__link {
    background-color: rgb(76, 81, 122);
    border: 1px solid rgba(76, 146, 76, 0);
    padding: 7px;
    text-decoration: none;
    color: white;
    transition: .3s ease;
  }

  .header__link:hover {
    background: none;
    cursor:pointer;
    border: 1px solid rgb(76, 81, 122);
    color: rgb(76, 81, 122)
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    min-height: 50px;
  }

  .cart__icon {
    width: 30px;
    height: 30px;
    transition: .3s ease;
  }

  .cart__icon:hover {
    transform: rotate(-10deg) scale(1.1);
    
  }

  .cart__link {
    position: relative;
  }

  .cart__counter {
    display: block;
    background-color: rgb(76, 81, 122);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    color: white;
    text-align: center;
    font-size: 14px;
    position: absolute;
    bottom: -10px;
    right: -10px;
  }
</style>