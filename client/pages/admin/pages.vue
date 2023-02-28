<template>
<div>
	<h5>Страницы сайта</h5>
	<spinner v-if="showSpinner" />
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
							:to="'/admin/page-edit/'+page.id"  
							class="btn btn-outline-primary btn-sm"
						>
							Редактировать
						</router-link>
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
		}
	},
	mounted(){
		this.fetchPages()
	},
	methods:{
		async fetchPages(){
			this.showSpinner = true
			try {
				const pages = await axios.get('/admin/getPages')
				this.pages = pages.data
			} catch (e) {
				console.log('some fetchPages error')
				console.log(e.response.data)
			} finally{
				this.showSpinner = false
			}
		}
	}
	

}
</script>

<style>

</style>