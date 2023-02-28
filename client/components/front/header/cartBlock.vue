<template>
	<router-link 
		:to="localePath('cart')"
	>
		<div
			v-if="cartSum > 0"
			class="cartBlock"
		>
			<font-awesome-icon 
				:icon="['fa', 'cart-plus']"
				style="width: 20px; height: 20px;"
				class="fa-icon"
			/>
			<div class="nums">
				<!-- <div>{{cartAmount}}</div> -->
				<div><span>{{cartSum.toFixed(2)}}</span> грн</div>
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
	background-color: #ffcb1f;
    width: 145px;
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
		left: 50%;
		transform: translateX(-50%);
		bottom: 20px;
		top: auto;
	}
}
</style>