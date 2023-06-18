<template>
	<div class="cartItem">
		<img class="cartItem__image" :src="'src/assets/' + product.image" :alt="product.name" />

		<p class="cartItem__title">{{ product.name }}</p>
		
		<div class="cartItem__amount">
			<button class="cartItem__amount-button" @click="reduceQuantity()">-</button>
			<p class="cartItem__amount-value">{{ product.quantity }}</p>
			<button class="cartItem__amount-button" @click="addToCart()">+</button>
		</div>
		
		<p class="cartItem__price">{{ product.price }}</p>
		
		<a class="cartItem__delete" @click="removeFromCart()">usuń</a>
	</div>
</template>

<script lang="ts">
import type CartPhone from '@/types/CartPhone';
import { useStore } from 'vuex';

export default {
  props: ['product'],
	setup(props) {
		const store = useStore();
		const product: CartPhone = props.product;

		const addToCart = () => store.commit('addToCart', product);
		const removeFromCart = () => store.commit('removeFromCart', product);
		const reduceQuantity = () => store.commit('reduceQuantity', product);

		return {
			addToCart,
			removeFromCart,
			reduceQuantity
		}
	}
}
</script>

<style scoped>
	.cartItem {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 25px;
		gap: 25px;
		border: 1px solid #E2E6E9;
		position: relative;
		min-width: 550px;
	}

	.cartItem__delete {
		height: 100%;
		color: #B4BDC3;
		cursor: pointer;
	}

	.cartItem__delete:hover {
		color: #5c5c5c;
	}

	.cartItem__image {
		width: 65px;
		display: inline;
	}

	.cartItem__title {
		font-size: 14px;
		min-width: 30%;
	}

	.cartItem__amount {
		display: flex;
		align-items: center;
	}

	.cartItem__amount-button {
		width: 25px;
		height: 25px;
		border-radius: 0;
		cursor: pointer;
		background-color: white;
		border: 1px solid #B4BDC3
	}

	.cartItem__amount-button:hover {
		border-color: #5c5c5c;
	}

	.cartItem__amount-value {
		width: 25px;
		text-align: center;
	}

	.cartItem__price {
		width: 100%;
		text-align: center;
		font-size: 22px;
	}
	.cartItem__price::before {
		content: '$';
	}
</style>