<template>
	<div
		:class="scX > 767 ? 'desktop  rd-navbar-fullwidth-linked' : 'desktop  rd-navbar-fixed-linked'"
	>
		<div class="page text-center">
			<front-header />
			<warning-block />
			<cart-block ref="cartBlock" />
			<main>
				<nuxt />
			</main>
			<front-footer />
			<a  
				:class="scY > 1000 ? 'active' : ''"
				@click="toTop" 
				href="#" 
				id="ui-to-top" 
				class="ui-to-top fa fa-angle-up"
			></a>
		</div>
	</div>
</template>

<script>

import {  mapActions } from 'vuex'

import frontFooter from '@/components/front/footer/frontFooter.vue'
import frontHeader from '@/components/front/header/frontHeader.vue'
import cartBlock from '@/components/front/header/cartBlock.vue'
import warningBlock from '@/components/front/warningBlock.vue'

export default {
  	components: {
		frontFooter,
		frontHeader,
		cartBlock,
		warningBlock
	},
	head() {
		return {
			link: [
				{rel: 'stylesheet', type: 'text/css', href: '/css/style.css'}
			],
			script: [
				// {src: '/js/core.min.js', defer: true},
				// {src: '/js/script.js', defer: true},
			],
		}
	},
	data(){
		return{
        	scTimer: 0,
        	scY: 0,
        	scX: '',
		}
	},
	mounted(){
		this.getWidth()
		this.countCartNums()
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.adaptiveHandler);
		
	},
	// created(){
	// },
	methods:{
		async countCartNums(){
			let cartList = JSON.parse(localStorage.getItem("cart"))
			if(cartList){
				let cartAmount = 0
				let cartSum = 0
				cartList.forEach(el => {
					cartAmount += el.amount
					cartSum += el.amount * el.price
				});
				this.setCartAmount(cartAmount)
				this.setCartSum(cartSum)
			}
		},
		getWidth(){
			this.scX = window.innerWidth
		},
		adaptiveHandler: function (){
			this.scX = window.innerWidth;
		},
		handleScroll: function () {
		if (this.scTimer) return;
		this.scTimer = setTimeout(() => {
			this.scY = window.scrollY;
			clearTimeout(this.scTimer);
			this.scTimer = 0;
		}, 100);
		},
		toTop: function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		},
		
		...mapActions({
			setCartAmount: 'cart/setCartAmount',
			setCartSum: 'cart/setCartSum',
		}),
	}


}

</script>


