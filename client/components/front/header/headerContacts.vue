<template>
	<div 
		class="header-contacts"
		:class="scrollPosition > 200 
			? ' d-none' 
			: ' d-flex'"
	>
		<div class="addr"  v-html="$t('static.address')">
		</div>
		<div
			class="header-contacts-right"
		>
			<front-locales />
			<a 
				class="d-block phone"
				:href="'tel:'+$t('static.phone1full')"
			>
				{{$t('static.phone1')}}
			</a>
		</div>
	</div>
</template>

<script>

		

import frontLocales from '@/components/front/header/frontLocales.vue'


export default {
  	components: {
		frontLocales,
	},

mounted(){
		window.addEventListener('scroll', this.updateScroll);
		
	},
	data(){
		return{
			scrollPosition: null
		}
	},
	methods:{
		updateScroll() {
		this.scrollPosition = window.scrollY
		},

	}

}

</script>


<style lang="scss" scoped>
	.header-contacts{
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-weight: 600;
		@media (max-width: 1201px){
			display: none!important;
		}
		.phone{
			color: #f7be27;
			font-weight: 600;
			transition: all 0.25s ease-in-out;
			&:hover{
				scale: 1.05;
				transition: all 0.25s ease-in-out;
			}
		}
		.header-contacts-right{
			display: flex;
		}
		.addr{
			color: #f7be27;
			font-weight: 600;
			transition: all 0.25s ease-in-out;
			cursor: pointer;
			&:hover{
				scale: 1.05;
				transition: all 0.25s ease-in-out;
			}
		}
	}
</style>