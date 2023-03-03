<template>
	<router-link 
		:to="localePath('cart')"
	>
		<div
			v-if="cartSum > 0"
			class="cartBlock"
		>
			<div class="nums">
				<span class="basket-ico ico-30">
					<span class="ico-holder">
						<span class="flaticon-shopping-bag"></span>
						<em class="roundpoint">{{cartAmount}}</em></span>
				</span>
				<!-- <div>{{cartAmount}}</div> -->
			</div>
		</div>
	</router-link>
</template>

<script>

import {  mapGetters } from 'vuex'
		

export default {

	computed: mapGetters({
		cartAmount: 'cart/countCartAmount',
		cartSum: 'cart/countCartSum',
	}),

}

</script>


<style lang="scss" scoped>
.cartBlock {
	background-color: #f7be27;
    width: 66px;
    border-radius: 5px;
    color: #000;
    padding: 10px;
    position: fixed;
    right: 20px;
    top: 102px;
    z-index: 10;
	display: flex;
    justify-content: space-between;
	align-items: center;
    gap: 10px;
	cursor: pointer;
	.nums{
		margin-left: 10px;
		span{
			font-weight: 700;
		}
	}
	@media (max-width: 700px){
		right: 10px;
	}
}
</style>