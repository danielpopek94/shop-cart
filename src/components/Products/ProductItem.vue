<template>
  <div class="productItem">
    <img class="productItem__image" :src="'src/assets/' + product.image" :alt="product.name">

    <div class="productItem__product-info">
      <h2 class="productItem__title">{{ product.name }}</h2>
      <p class="productItem__description">{{ product.description }}</p>
    </div>

    <div class="productItem__price">
      <div class="productItem__price-label">Cena:</div>
      <div class="productItem__price-value">{{ product.price }}</div>
    </div>

    <a href="#" class="productItem__button-link">
      <button class="productItem__button" @click="addToCart(product)">Dodaj do koszyka</button>
    </a>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import type Phone from '@/types/Phone';

export default {
  props: ['product'],
  setup() {
    const store = useStore();

    const addToCart = (product: Phone) => {
      store.commit('addToCart', product);
    };

    return {
      addToCart,
    };
  }
}
</script>

<style scoped>
.productItem {
  border: 1px solid rgb(141, 141, 141);
  border-radius: 5px;
  width: 166px;
  padding: 0px 16px 16px;
  display: flex;
  flex-direction: column;
  color: #060b35;
  align-items: center;
  justify-content: center;
}

.productItem__image {
  max-height: 190px;
  padding: 10px 0 10px 0;
}

.productItem__product-info {
  margin-bottom: 16px;
}

.productItem__title {
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 4px;
  line-height: 18px;
}

.productItem__description {
  color: #616070;
  font-size: 10px;
  text-align: center;
}

.productItem__price {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.productItem__price-label {
  font-size: 12px;
  color: #616070;
}

.productItem__price-value {
  font-weight: 700;
  font-size: 16px;
}

.productItem__price-value::before {
  content: '$';
  font-weight: 700;
}

.productItem__button-link {
  width: 100%;
}

.productItem__button {
  background-color: #060b35;
  width: 100%;
  border-radius: 5px;
  border-style: none;
  border: 1px solid #060b35;
  color: white;
  font-weight: 700;
  font-size: 12px;
  padding: 11px 0;
  transition: .3s ease;  
}

.productItem__button:hover {
  background-color: white;
  color: #060b35;
  cursor: pointer;
}
</style>