<template>
<div>
	<h5>Новости / акции на сайте</h5>
	<spinner v-if="showSpinner" />

	<div class="mt-4 mb-4 catsRow">
		<div>
			<span
				v-if="choosedCat"
				@click="fetchPagesByCat(0)"
				class="mr-4"
			>
				Все
			</span>
			<span
				@click="fetchPagesByCat(1)"
				class="mr-4"
				:style="choosedCatId == 1 ? 'font-weight: bold;' : 'font-weight: normal;'"
			>
				Новости
			</span>
			<span
				@click="fetchPagesByCat(2)"
				:style="choosedCatId == 2 ? 'font-weight: bold;' : 'font-weight: normal;'"
			>
				Акции
			</span>
		</div>
		<router-link 
			class="ml-auto"
			:to="{name: 'admin-news-add'}">
			Добавить новость
		</router-link>
	</div>

	<div class="mt-4">
		<table class="table">
			<thead>
				<tr>
				<th scope="col">ID</th>
				<th scope="col">Заголовок</th>
				<th scope="col">Просмотров</th>
				<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="page in pages" :key="page.id">
					<th scope="row">{{ page.id }}</th>
					<td>{{page.title_ru}}</td>
					<td>{{page.views}}</td>
					<td>
						<router-link 
							:to="'/admin/news-edit/'+page.id"  
							class="btn btn-outline-primary btn-sm"
						>
							Редактировать
						</router-link>
						<font-awesome-icon 
							v-if="!page.show"
							:icon="['fas', 'eye-slash']"
							style="width:13px; height: 13px; color: red;"
							class="fa-icon ml-2"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>


<script>

import spinner from "@/components/admin/spinner.vue"
import axios from 'axios'

export default {

	components:{
		spinner
	},

	middleware: 'auth',
	layout: 'admin',

	data() {
		return {
			pages:[],
			showSpinner: false,
			choosedCat: false,
			choosedCatId: '',
		}
	},
	mounted(){
		this.fetchPagesByCat(0)
	},
	methods:{
		async fetchPagesByCat(cat){
			this.showSpinner = true
			cat != 0 ? this.choosedCat = true : this.choosedCat = false
			this.choosedCatId = cat
			try {
				const pages = await axios.post('/admin/getNewsByCat', {cat:cat})
				this.pages = pages.data
			} catch (e) {
				console.log('some fetchPages error')
			} finally{
				this.showSpinner = false
			}
		},
	}
	

}
</script>

<style lang="scss" scoped>
.catsRow{
	font-size: 17px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	span{
		
		&:hover{
			text-decoration: underline;
		}
	}
}
</style>