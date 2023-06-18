<template>
  <div class="catalog">
    <div v-if="isLoading" class="loading"></div>
    <div v-if="isError" class="errorMessage">There was a problem downloading the data.</div>

    <div v-for="product in products" :key="product.id">
      <ProductItem :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ProductItem from './ProductItem.vue';
import {getProducts} from '@/api'
import type Phone from '@/types/Phone';

export default defineComponent({
  components: {
    ProductItem,
  },
  setup() {
    const products = ref<Phone[]>([]);
    const isError = ref(false);
    const isLoading = ref(true);
    
    onMounted(async () => {
      try {
        const response = await getProducts();

        products.value = response;
      } catch (error) {
        isError.value = true;
        console.error("Error fetching data from server:", error);
      } finally {
        isLoading.value = false;
      }
    });
      
    return {
      products,
      isLoading,
      isError
    };
  },
});
</script>

<style scoped>
  .catalog {
    --cart-width: 200px;
    
    display: grid;
    grid-template-columns: repeat(4, var(--cart-width));
    gap: 48px;
    max-width: 944px;
    margin: 0 auto;
    justify-content: center;
  }

  @media (max-width: 1023px) {
    .catalog {
      grid-template-columns: repeat(3, var(--cart-width));
    }
  }

  @media (max-width: 767px) {
    .catalog {
      grid-template-columns: repeat(2, var(--cart-width));
    }
  }

  @media (max-width: 487px) {
    .catalog {
      grid-template-columns: repeat(1, var(--cart-width));
    }
  }
</style>