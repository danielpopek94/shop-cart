<template>
  <div class="cart">
    <h3 class="cart__title">Koszyk</h3>
  </div>
  <div class="cart__content">
    <div class="cart__products">
      <div v-for="product in cartProducts" :key="product.id">
        <CartItem :product="product" />
      </div>
    </div>
    <div class="cart__checkout">
      <div class="checkout">
        <div class="checkout__info">
        <p class="checkout__sum">{{ cartSum }}</p>
        <p class="checkout__items">Ilość produktów: {{ cartQuantity }}</p>
      </div>
      <p v-if="errorMessage" class="checkout__error">{{errorMessage}}</p>
      <p v-if="isOrderPlaced" class="checkout__success">Zamówienie wysłane</p>
      <button 
        class="checkout__button" 
        :class="{ 'checkout__disabled': cartQuantity === 0 }"
        @click="submitOrder"
      >
        Złóż zamówienie
      </button>
      <div v-if="isLoading" class="loading"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CartItem from './CartItem.vue';
import type CartPhone from '@/types/CartPhone';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import {placeOrder} from '@/api';

export default {
  components: {
    CartItem,
  },
  setup() {
    const store = useStore();

    let isLoading = ref(false);
    let errorMessage = ref('');
    let isOrderPlaced = ref(false);

    const cartProducts = computed<CartPhone[]>(() => store.state.cartProducts);
    const cartSum = computed<number>(() => store.getters.cartSum);
    const cartQuantity = computed<number>(() => store.getters.cartQuantity);

    const addToCart = (product: CartPhone) => store.commit('addToCart', product);
    const clearAllCart = () => store.commit('clearAllCart');

    const submitOrder = async () => {
      isOrderPlaced.value = false;

      if (!cartProducts.value.length) {
        errorMessage.value = 'Twój koszyk jest pusty';
        return;
      }
      
      isLoading.value = true;
      
      try {
        const response = await placeOrder(cartProducts.value);

        isOrderPlaced.value = true;
        console.log(response);
        clearAllCart();
      } catch (error: any) {
        console.error('Error sending the order:', error.message);
        errorMessage.value = 'Nie można złożyć zamówienia.';
      } finally {
        isLoading.value = false;
      }
    }

    return {
      isLoading,
      errorMessage,
      isOrderPlaced,
      cartProducts,
      cartSum,
      cartQuantity,
      addToCart,
      clearAllCart,
      submitOrder
    }
  }
};
</script>

<style scoped>
  .cart__title {
    font-size: 32px;
    font-weight: 700;
  }

  .cart__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 15px;
    margin-top: 30px;
  }

  .cart__products {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .checkout {
    border: 1px solid #E2E6E9;
    padding: 0 25px;
    text-align: center;
  }

  .checkout__info {
    border-bottom: 1px solid #E2E6E9;
    text-align: center;
    padding: 10px;
  }

  .checkout__sum {
    font-size: 32px;
  }

  .checkout__sum::before {
    content: '$';
  }

  .checkout__button {
    width: 100%;
    border-radius: 0;
    background-color: #313237;
    border: 1px solid rgba(0, 0, 0, 0);
    color: white;
    padding: 15px;
    margin: 15px 0;
  }

  .checkout__button:hover {
    border: 1px solid #313237;
    color: #313237;
    background-color: white;
    cursor: pointer;
  }

  .checkout__disabled {
    width: 100%;
    border-radius: 0;
    background-color: #b4b4b4;
    border: 1px solid rgba(0, 0, 0, 0);
    color: white;
    padding: 15px;
    margin: 15px 0;
  }

  .checkout__disabled:hover {
    width: 100%;
    border-radius: 0;
    background-color: #b4b4b4;
    border: 1px solid rgba(0, 0, 0, 0);
    color: white;
    padding: 15px;
    margin: 15px 0;
  }

  .checkout__error {
    color: rgb(172, 0, 0);
  }

  .checkout__success {
    color: rgb(0, 136, 61);
  }
</style>