<template>
	<div>
		<h5 class="mb-3">Меню</h5>
		<spinner v-if="$store.state.adminMenuItems.showSpinner"></spinner>
		<spinner v-if="showSpinner"></spinner>
		<div class="menu-top-row">
			<div class="menu-top-row__left">
				<router-link
					:to="{name: 'admin-menu-add'}"
				>
					Добавить блюдо
				</router-link>
			</div>
			<div>
				<router-link
					:to="{name: 'admin-menu-categories'}"
				>
					Категории меню
				</router-link>
			</div>
		</div>
		<div class="row seacrh-block mt-4">
			<div class="form-group col-md-12 mt-4">
				<span 
					@click="getItemsByCategory(cat.id)"
					v-for="cat in categories" :key="cat.id"
					:style="$store.state.adminMenuItems.choosedCategory === cat.id ? 'font-weight: bold' : ''"
					class="categoryBtn">
						<span
							:style="!cat.show ? 'color: red' : ''"
						>
							{{ cat.title_ru }}
						</span>
				</span>
			</div>
		</div>

		
		<table class="table">
			<tbody>
				<tr v-for="(item, index) in $store.state.adminMenuItems.menuItems" :key="item.id">
					<th scope="row">{{ item.id }}</th>
					<td class="w-100">
						{{item.title_ru}}
						<div class="subItemsHolder mt-2">
							<div  v-for="subItem in item.items" :key="subItem.id" class="subItemsHolderFlex">
								<div class="price-holder mb-1">
									<small class="form-text text-muted w-100show: 1, ">
										{{subItem.title_ru}} {{subItem.weight}} {{subItem.weightKind}}
									</small>
									<div class="subItemHandler">
										<input
											disabled="disabled"
											@change="changePriceHandler($event)"
											:value="subItem.price"
											type="text"
											class="w-100 form-control priceInput"
										>
										<div
											@click="changePriceActive($event)"
											class="editPrice"
										>
											<font-awesome-icon 
												:icon="['fas', 'edit']"
												style="width:13px; height: 13px"
												class="fa-icon"
											/>
										</div>
										<div
											@click="changePriceFetch(subItem)" 
											class="done"
										>
											<font-awesome-icon 
												:icon="['fas', 'check']"
												style="width:13px; height: 13px"
												class="fa-icon"
											/>
										</div>
										<div class="ml-2">
											<div 
												@click="showSubItem(subItem)"
												v-if="!subItem.show" 
												class="btn btn-outline-secondary btn-sm"  
												style="color:green"
											>
												
												<font-awesome-icon 
													:icon="['fas', 'eye']"
													style="width:13px; height: 13px"
													class="fa-icon"
												/>
											</div>
											<div 
												@click="showSubItem(subItem)"
												v-else 
												class="btn btn-outline-secondary btn-sm" 
												style="color:red"
											>
												<font-awesome-icon 
													:icon="['fas', 'eye-slash']"
													style="width:13px; height: 13px"
													class="fa-icon"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>	
					</td>
					<td class="btns-holder">
						<div class="d-flex justify-content-between mb-2" style="gap:10px;">
							<router-link 
								:to="'/admin/menu/'+item.id"  
								class="btn btn-outline-primary btn-sm"
							>
								Ред
							</router-link>
							<div 
								@click="showItem(item)"
								v-if="item.show" 
								class="btn btn-outline-secondary btn-sm"
							>
								Скрыть
							</div>
							<div 
								@click="showItem(item)"
								v-else 
								class="btn btn-outline-secondary btn-sm"
							>
								Показать
							</div>
						</div>
						<div class="upDownHolder">
							<span
								v-if="index !== $store.state.adminMenuItems.menuItems.length - 1"
								@click="orderBottom(item)" 
								class="fa-icon-holder mr-2 ml-2"
							>
								<font-awesome-icon 
									:icon="['fas', 'arrow-down']"
									style="width:16px; height: 16px"
									class="fa-icon"
								/>
							</span>
							<span
								v-if="index !== 0"
								@click="orderTop(item)" 
								class="fa-icon-holder ml-2 mr-2"
							>
								<font-awesome-icon 
									:icon="['fas', 'arrow-up']"
									style="width:16px; height: 16px"
									class="fa-icon"
								/>
							</span>
						</div>
					</td>
				</tr>
				
			</tbody>
		</table>

	</div>
</template>

<script>
import spinner from '@/components/admin/spinner.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'

export default {
  components: { spinner },
	middleware: 'auth',
	layout: 'admin',

	computed: mapGetters({
		user: 'auth/user',
	}),
	
	data(){
		return{
			showSpinner: true,
			categories:[],
		}
	},
	mounted(){
		this.getGoodsCats()
	},
	methods:{
		async getGoodsCats(){
			this.showSpinner = true
			try {
				const response = await axios.get('/admin/getGoodsCats')
				this.categories = response.data

			} catch (e) {
				console.log('some getGoodsCats error')
				// console.log(e.response.data)
			}

			this.showSpinner = false
		},
		...mapActions({
			fetchItems: 'adminMenuItems/fetchItems',
			getItemsByCategory: 'adminMenuItems/getItemsByCategory',
			showSubItem: 'adminMenuItems/showSubItem',
			showItem: 'adminMenuItems/showItem',
			orderTop: 'adminMenuItems/orderTop',
			orderBottom: 'adminMenuItems/orderBottom',
			changePriceHandler: 'adminMenuItems/changePriceHandler',
			changePriceFetch: 'adminMenuItems/changePriceFetch',
		}),
		...mapMutations({
		}),


		// getItemsBySearchQuery(event){
		// 	this.searchQuery = event.target.value
		// 	console.log(event.target.value)
		// },


	changePriceActive(event){
		let targetParent = event.target.closest('.subItemHandler')
		targetParent.classList.add('priceRowFocus')
		let targetInput = targetParent.firstChild
		targetInput.classList.add('priceInputFocus')
		targetInput.removeAttribute('disabled')
		document.querySelectorAll('.editPrice').forEach(el => {
			el.classList.add('d-none')
		})
	},




	}


}
</script>

<style lang="scss" scoped>
	.menu-top-row{
		display: flex;
		justify-content: space-between;
		&__left{
			a{
				margin-right: 20px;
			}
		}
	}
	.categoryBtn{
		margin-right: 20px;
	}
	.btns-holder{
		white-space: nowrap;
		text-align: right;
	}
	.price-holder{
		position: relative;
		width: 170px;
		display: flex;
   		align-items: center;
		justify-content: flex-end;
    	width: 100%;
		&+.price-holder{
			margin-top: 10px;
		}
		input{
			margin-left: 5px;
			min-width: 90px;
		}
	}

	.nowrap{
		white-space: nowrap;
	}
	.categoryBtn{
		cursor: pointer;
		display: inline-block;
		&:hover{
			text-decoration: underline;
		}
	}
	.categoryBtn + .categoryBtn {
		// margin-left: 10px;
		margin-bottom: 10px;
	}
	.subItemsHolder{
		max-width: 80%;
		margin-left: auto;
	}
	.subItemHandler{
		display: flex;
		align-items: center;
		width: 180px;
		min-width: 180px;
	    max-width: 180px;
	}	
	.done{
		display: none;
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
	.editPrice{
		display: none;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: lightblue;
		border-radius: 50%;
		padding: 13px;
		margin-left: 5px;
		cursor: pointer;
		svg{
			color:#000;
		}
	}
	.subItemHandler{
		.done{
			display: none;
		}
		.editPrice{
			display: flex;
		}
	}
	.subItemHandler.priceRowFocus{
		.done{
			display: flex;
		}
		.editPrice{
			display: none;
		}
	}
	.subItemsHolderFlex{
		display: flex;
		align-items: center;
	}
	.saveOrderButton{
		position: fixed;
		right: 20px;
		bottom: 20px;
		background: green;
		color: #fff;
		padding: 10px 20px;
		cursor: pointer;
		transition: opacity 0.25s ease-in-out;
		&:hover{
			opacity: 0.7;
		}
	}
	.orderNum{
		width: 50px;
		margin-right: 50px;
	}
	.upDownHolder{
		display: flex;
		justify-content: center;
		margin-top: 30px;
		span {
			cursor: pointer;
			padding: 0 10px;
		}
	}
</style>