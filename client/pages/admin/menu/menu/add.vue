<template>
	<div>
		<h5 class="mb-3">Добавить новое блюдо</h5>
    	<spinner v-if="showSpinner" />
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb-my">
				<li class="breadcrumb-item">
					<router-link :to="{name: 'dashboard'}">
					Главная
					</router-link>
				</li>
				<li class="breadcrumb-item">
					<router-link :to="{name: 'admin-menu'}">
						Меню
					</router-link>
				</li>
				<li class="breadcrumb-item active" aria-current="page">Редактирование блюда</li>
			</ol>
		</nav>
		<form @submit.prevent>
			<div class="row">
				<div class="col-lg-7" >
					<div class="form-group">
						<small class="form-text text-muted">Выбрать категорию</small>
						<select
							required
							v-model="item.category"
							class="form-control"
						>	
							<option
								v-for="cat in categories" 
								:key="cat.id"
								:value="cat.id"
							>
								{{ cat.title_ru }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<small class="form-text text-muted">Название блюда ру</small>
						<input 
							v-model="item.title_ru" 
							type="text" 
							required 
							class="form-control"
						>
					</div>
					<div class="form-group">
						<small class="form-text text-muted">Название блюда укр</small>
						<input 
							v-model="item.title_ua" 
							type="text" 
							required 
							class="form-control"
						>
					</div>


				
					<div class="d-flex justify-content-between col-12 mt-4 mb-4">
						<div class="form-group mt-2">
							<button 
								@click="saveItem()"
								type="submit" 
								class="btn btn-success btn-sm"
							>
								Сохранить

							</button>
						</div>
						<div class="form-group mt-2">
							<button 
								@click.prevent="backToItems()"
								type="button" 
								class="btn btn-secondary btn-sm"
							>
								Назад

							</button>
						</div>
					</div>
				</div>
			</div>
		</form>

	</div>
</template>

<script>

import spinner from '@/components/admin/spinner.vue'
import axios from 'axios'

export default {
	middleware: 'auth',
	layout: 'admin',

	
	components: {spinner },

	data(){
		return{
			categories:[],
			item: {},
			showSpinner: false,
		}
	},
	async mounted(){
		await this.fetchCategories()
	},
	methods:{
		async fetchCategories(){
			this.showSpinner = true	
			try {
				const response = await axios.get('/admin/getGoodsCats')
				this.categories = response.data
			} catch (e) {
				console.log('some fetchCategories error')
				console.log(e.response.data)
			}
			this.showSpinner = false
		},
		async saveItem(){
			if(this.item.title_ru && this.item.title_ua && this.item.category){
				this.showSpinner = true	
				try {
					const response = await axios.post('/admin/addItem', {item: this.item})
					this.$router.push('/admin/menu/'+response.data)
				} catch (e) {
					console.log('some saveItem error')
					// console.log(e.response.data)
				}
			}
		},
		
		backToItems(){
			this.$router.push('/admin/menu')
		},
	}
	

	
}

</script>

<style lang="scss" scoped>

	.price-holder{
		position: relative;
		width: 170px;
		display: flex;
   		align-items: center;
		&+.price-holder{
			margin-top: 10px;
		}
	}
	.plus-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: green;
		border-radius: 50%;
		padding: 13px;
		margin-left: 5px;
		cursor: pointer;
		svg{
			color:#fff;
		}
	}
	.minus-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: red;
		border-radius: 50%;
		padding: 13px;
		margin-left: 5px;
		cursor: pointer;
		svg{
			color:#fff;
		}
	}
</style>