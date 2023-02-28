<template>
	<div>
		<div class="logo-holder">
			<img src="/logo.png" alt="">
		</div>
		Меню
		<nav class="nav flex-column">
			<router-link 
				:to="{name: 'admin-orders'}" 
				class="nav-link"
			>
				Заказы с сайта
				<span v-if="countUnreadedOrders">
					{{countUnreadedOrders}}
				</span>
			</router-link>
			<!-- <router-link 
				:to="{name: 'admin-reviews'}" 
				class="nav-link"
			>
				Отзывы
				<span v-if="countUnreadedReviews">
					{{countUnreadedReviews}}
				</span>
			</router-link> -->
			<router-link 
				:to="{name: 'admin-menu'}" 
				class="nav-link"
			>
				Меню
			</router-link>
			<!-- <router-link
				:to="{name: 'admin-feedback'}" 
				class="nav-link"
			>
				Обратная связь
				
				<span v-if="countUnreadedFeedbacks">
					{{countUnreadedFeedbacks}}
				</span>
			</router-link> -->
			<router-link 
				:to="{name: 'admin-pages'}" 
				class="nav-link"
			>
				Страницы
			</router-link>
			<router-link
				:to="{name: 'admin-gallery'}"
				class="nav-link"
			>
				Галерея
			</router-link>
			<router-link
				:to="{name: 'admin-interior'}"
				class="nav-link"
			>
				Интерьер
			</router-link>

			<router-link
				:to="{name: 'admin-news'}"
				class="nav-link"
			>
				Новости / Акции
			</router-link>
			<router-link
				:to="{name: 'admin-blocks'}"
				class="nav-link"
			>
				Блоки
			</router-link>
			<router-link
				:to="{name: 'admin-images'}"
				class="nav-link"
			>
				Картинки
			</router-link>
			<router-link
				:to="{name: 'admin-paper'}"
				class="nav-link"
			>
				Фото меню
			</router-link>
		</nav>
</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
export default {


	methods:{
	},

	mounted(){
		
	},

  computed: mapGetters({
	
    countUnreadedReviews: 'countMenuNums/countUnreadedReviews',
    countUnreadedFeedbacks: 'countMenuNums/countUnreadedFeedbacks',
    countUnreadedOrders: 'countMenuNums/countUnreadedOrders'
  })
	
}
</script>


<style scoped lang="scss">
	.nav-link{
		display: flex;
		align-items: center;
		span{
			margin-left: 5px;
			color: #fff;
			background: red;
			font-size: 12px;
			font-weight: bold;
			height: 16px;
			width: 16px;
			display: flex  !important;
			align-items: center;
			justify-content: center;
			padding: 5px;
			display: inline-block;
			padding: 5px;
			border-radius: 50%;
		}
		.order-in-progress{
			background: blue;
		}
	}
</style>