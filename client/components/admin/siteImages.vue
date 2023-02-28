<template>
	<div>
		<div class="row">
			<div class="col-12">
				Фото:
			</div>
		</div>
		<div class="row mb-4" style="height: 500px;  overflow-y: scroll;">
		<div
			v-for="photo in photos"
			:key="photo.id"
			class="col-md-2 mt-4 mb-4"
		>
			<div  class="block-holder">
				<div @click="showFullImg(photo.id)" class="image-holder">
					<img :src="imagesBaseUrl + photo.path">
				</div>
			</div>
			<div style="text-align: center; font-size: 15px;">
				{{imagesBaseUrl}}{{photo.path}}
			</div>
		</div>
			<modal-show-full-img
				:showModal="showModal"
				@hideModal="hideModal"
			>
				<img :src="imageToShowPath" alt="">
			</modal-show-full-img>
		</div>
	</div>
</template>

<script>

import axios from 'axios'
import modalShowFullImg from '@/components/admin/modalShowFullImg.vue'

export default {

	components:{
		modalShowFullImg,
	},
	
	data(){
		return{
			photos: [],
			showModal: false,
			imageToShowPath: '',
			imagesBaseUrl: '',
		}
	},
	mounted(){
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
		this.getPhotos()
	},
	methods:{
		async getPhotos(){
			try {
				const response = await axios.get('/admin/getSiteImages')
				this.photos = response.data
			} catch (e) {
				console.log(e.response.data)
			}
		},
		
		showFullImg(photoId){
			this.showModal = true
			this.photos.forEach(element => {
				if(element.id == photoId){
					this.imageToShowPath =  this.imagesBaseUrl + element.path
				}
			});
		},
		hideModal(){
			this.showModal = false
			this.imageToShowPath = ''
		},
	}




}


</script>

<style lang="scss" scoped>

	.block-holder{
		position: relative;
		width: 100%;
		padding-top: 100%;
	}
	.image-holder{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font-size: 14px;
		display: flex;
		img{
			width: 100%;
			height: auto;
			// object-fit: cover;
			object-fit: contain;
			cursor: pointer;
		}
	}
</style>