import { createStore } from 'vuex';

import type Phone from '@/types/Phone';
import type CartPhone from '@/types/CartPhone';

interface State {
  cartProducts: CartPhone[];
}

const store = createStore<State>({
  state: {
    cartProducts: [],
  },
  getters: {
    cartSum(state: State): number {
      return state.cartProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    cartQuantity(state: State): number {
      return state.cartProducts.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
  },
  mutations: {
    addToCart(state: State, product: Phone | CartPhone) {
      const current = state.cartProducts.find((item) => item.id === product.id);

      if (current) {
        current.quantity++;
      } else {
        state.cartProducts.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state: State, product: CartPhone) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== product.id
      );
    },
    reduceQuantity(state: State, product: CartPhone) {
      const current = state.cartProducts.find((item) => item.id === product.id);

      if (current && current.quantity > 1) {
        current.quantity--;
      } else {
        state.cartProducts = state.cartProducts.filter(
          (item) => item.id !== product.id
        );
      }
    },
    clearAllCart(state: State) {
      state.cartProducts.length = 0;
    }
  },
});

export default store;
