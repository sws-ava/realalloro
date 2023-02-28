<template>
<div class="range">
	
	<!-- <h4>{{menuItems}}</h4> -->
	<div 
		v-for="menuItem in menuItems"
		:key="menuItem.id"
		class="cell-sm-12 cell-md-6 item_holder"
	>
		<div
			v-if="menuItem.picture"
			class="image_holder"
		>
			<img 
				class="image 2"
				:src="imagesBaseUrl + menuItem.picture">
		</div>
		<h4>{{ menuItem.title }}</h4>
		<p class="description">{{ menuItem.description }}</p>
		<template
			v-if="menuItem.goodsItems.length > 1"
		>
			<div 
				v-for="item in menuItem.goodsItems"
				:key="item.id"
				class="price_weight text_left" style="justify-content: space-between; align-items: center;"	
			>
				<span style="font-size: 12px; text-align: left;padding-right: 20px;">
					{{ item.title }} {{ item.weight }} {{ item.weightKind }}
				</span>
				<span 
					@click="addToCart(item)"
					class="price"
				>
					{{ item.price }}
					<font-awesome-icon 
						:icon="['fa', 'cart-plus']"
						class="fa-icon"
					/>
				</span>
			</div>	
		</template>
		<template
			v-else
		>
			<div 
				v-for="item in menuItem.goodsItems"
				:key="item.id"
				class="price_weight"	
			>
				<span
					v-if="item.weight && item.weightKind"
				>
					{{ item.weight }} {{ item.weightKind }}
				</span>
				<span 
					@click="addToCart(item)"
					class="price"
				>
					{{ item.price }}
					<font-awesome-icon 
						:icon="['fa', 'cart-plus']"
						class="fa-icon"
					/>
				</span>
			</div>	
		</template>
	</div>
</div>
</template>

<script>
import {  mapActions } from 'vuex'

export default {
	props:{
		menuItems:{
			type: Array,
			default: []
		}
	},
	data(){
		return{
			imagesBaseUrl: process.env.imagesBaseUrl + 'storage/'
		}
	},
	methods:{
		addToCart(item){
			let cart = localStorage.getItem("cart")
			if(!cart){
				let cart = []
				const cartItem = {
					id: item.id,
					price: item.price,
					amount: 1
				}
				cart.push(cartItem)
				localStorage.setItem("cart", JSON.stringify(cart));
				this.countCartNums()
			}else{
				let isNewItem = true
				let cartList = JSON.parse(localStorage.getItem("cart"))
				cartList.forEach(el => {
					if(el.id == item.id){
						el.amount += 1
						isNewItem = false
					}
				});
				if(isNewItem){
					const cartItem = {
						id: item.id,
						price: item.price,
						amount: 1
					}
					cartList.push(cartItem)
				}
				localStorage.setItem("cart", JSON.stringify(cartList));
				this.countCartNums()
			}
		},
		countCartNums(){
			let cartList = JSON.parse(localStorage.getItem("cart"))
			let cartAmount = 0
			let cartSum = 0
			cartList.forEach(el => {
				cartAmount += el.amount
				cartSum += el.amount * el.price
			});
			this.setCartAmount(cartAmount)
			this.setCartSum(cartSum)
		},
		
		...mapActions({
			setCartAmount: 'cart/setCartAmount',
			setCartSum: 'cart/setCartSum',
		}),
	}
	
}
</script>


<style lang="scss" scoped>
	.price_weight {
		max-width: 80%;
    	margin: 0 auto 12px;
		@media (max-width: 992px){
    		margin: 0 auto 20px;
		}	
	} 
	.price{
		display: flex;
    	align-items: center;
		cursor: pointer;
		opacity: 1;
		transition: opacity 0.25s ease-in-out;
		&:hover{
			opacity: 0.7;
			transition: opacity 0.25s ease-in-out;
		}
		svg{
			margin-left: 10px;
			// color: greenyellow;
			color: #e0ca8f;
			width: 36px;
			height: 21px;
		}
	}
	.image_holder{
		img{
			max-width: 250px;
		}
	}
</style>


