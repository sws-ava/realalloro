<template>
	<div>
		<h5 class="mb-3">Категория</h5>
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
				<li class="breadcrumb-item">
					<router-link :to="{name: 'admin-menu-categories'}">
						Категории меню
					</router-link>
				</li>
				<li class="breadcrumb-item active" aria-current="page">Изменить категорию</li>
			</ol>
		</nav>
		<div class="row">
			<div class="d-flex justify-content-between col-12">
				<div class="form-group mt-2">
					<button 
						v-if="category.show === 1"
						@click="showCategory(0)"
						class="btn btn-sm btn-danger"
					>
						Скрыть категорию

					</button>
					<button 
						v-if="category.show === 0"
						@click="showCategory(1)"
						class="btn btn-sm btn-success"
					>
						Показывать категорию

					</button>
				</div>
			</div>
		</div>
		<form @submit.prevent>
			<div class="row">
				<div class="form-group col-lg-7">
					<small class="form-text text-muted">Название категории ру</small>
					<input 
						v-model="category.title_ru" 
						type="text" 
						class="form-control"
					>
				</div>
				<div class="form-group col-lg-7">
					<small  class="form-text text-muted">Название категории укр</small>
					<input  
						v-model="category.title_ua" 
						type="text" 
						class="form-control"
					>
				</div>
				<div class="form-group col-lg-7">
					<small class="form-text text-muted">Описание категории ру</small>
					<input 
						v-model="category.description_ru" 
						type="text" 
						class="form-control"
					>
				</div>
				<div class="form-group col-lg-7">
					<small  class="form-text text-muted">Описание категории укр</small>
					<input  
						v-model="category.description_ua" 
						type="text" 
						class="form-control"
					>
				</div>
				<div class="form-group col-lg-7">
					<small class="form-text text-muted">Ссылка категории</small>
					<input 
						v-model="category.slug"
						type="text"
						class="form-control"
					>
				</div>

				<div class="d-flex justify-content-between col-12">
					<div class="form-group mt-2">
						<button 
							@click="saveCategory()"
							type="submit" 
							class="btn btn-sm btn-success"
						>
							Сохранить

						</button>
					</div>
					<div class="form-group mt-2">
						<button 
							@click="saveCategoryAndExit()"
							type="submit" 
							class="btn btn-sm btn-primary"
						>
							Сохранить и выйти

						</button>
					</div>
					<div class="form-group mt-2">
						<button 
						@click="backToCategories()"
						class="btn btn-sm btn-secondary"
						>
							Назад

						</button>
					</div>
				</div>
				<div class="d-flex justify-content-between mt-4 pt-4 col-12">
					<div class="form-group mt-2">
						<button 
							v-if="!category.isChilds"
							@click="showDeleteModal = true"
							class="btn btn-sm btn-danger"
						>
							Удалить

						</button>
					</div>
				</div>
			</div>
		</form>
		
		

		<modal-delete-window
			:showDeleteModal="showDeleteModal"
		>
			<h5 class="text-center mb-4">Удалить эту категорию меню?</h5>
			<p class="text-center">
				{{category.title_ru}}
			</p>
			<div class="d-flex justify-content-around mt-4">
				<div 
					@click="deleteCategory()"
					class="btn btn-outline-danger btn-sm"
				>
					Удалить
				</div>
				<div 
					@click="showDeleteModal = false"
					class="btn btn-outline-secondary btn-sm"
				>
					Отменить
				</div> 
			</div>
		</modal-delete-window>
		

	</div>
</template>

<script>
import spinner from '@/components/admin/spinner.vue'
import ModalDeleteWindow from '@/components/admin/modalDeleteWindow.vue';
import axios from 'axios'

export default {
  components: { spinner, ModalDeleteWindow },
	middleware: 'auth',
	layout: 'admin',

	data(){
		return{
			category:{},
			showSpinner: false,
			showDeleteModal: false,
		}
	},
	mounted(){
		this.fetchCategory()
	},
	methods:{
		async fetchCategory(){
			try{
				this.showSpinner = true	
				const category = await axios.get('/admin/getCategory', {
					params:{
						id: this.$route.params.id
					}
				})
				this.category = category.data
				console.log(category.data)
			} catch (e) {
				console.log('some fetchCategory error ')
				console.log(e.response.data)
			}finally{
				this.showSpinner = false
			}
		},
		clearInputs(){
			this.category = {}
		},
		backToCategories(){
			this.clearInputs()
			this.$router.push('/admin/menu-categories')
		},
		async saveCategory(){
		  this.showSpinner = true
			try{
				const response = await axios.post('/admin/saveCategory/', {
					category: this.category
				})     
			} catch (e){
				console.log('some saveCategory error')
				console.log(e.response.data)
			} finally{
					this.showSpinner = false
			}
		},
		saveCategoryAndExit(){
			this.saveCategory()
			this.backToCategories()
		},
		async deleteCategory(){
		  this.showSpinner = true
			try{
				this.showDeleteModal = false
				const response = await axios.post('/admin/deleteCategory/', {
					category: this.category
				})      
				this.backToCategories()
			} catch (e){
				console.log('some deleteCategory error')
				console.log(e.response.data)
			} finally{
					this.showSpinner = false
			}
		},
		async showCategory(num){
			this.showSpinner = true
			try{
				const response = await axios.post('/admin/showCategory/', {id:this.category.id, show: num})
				this.category.show = num   
				console.log(response.data)   
			} catch (e){
				console.log('some showCategory error')
				console.log(e.response.data)
			} finally{
				this.showSpinner = false
			}
		}
	},
}

</script>

<style lang="scss" scoped>

</style>