<template>
  
	<div>
		<h5 class="mb-3">Галерея</h5>
		<spinner v-if="showSpinner" />
		<form enctype="multipart/form-data">
			<div class="form-group">
				<label>Добавить фото</label>
				<input 
					accept="image/*"
					type="file" 
					class="form-control-file"
					@change="uploadPhoto($event)"
				>
			</div>
		</form>
		<div class="row">
			<div  v-for="photo in photos" :key="photo.id" class="col-lg-3 mb-4 mt-4" >
				<div  class="block-holder">
					<div @click="showFullImg(photo.id)" class="image-holder">
						<img :src="imagesBaseUrl + photo.path">
					</div>
				</div>
				<div style="text-align: center; font-size: 15px;">
					{{imagesBaseUrl}}{{photo.path}}
				</div>
				<div class="arrows">
					<span 
						@click="showDelModal(photo)"
						class="fa-icon-holder"
					>
						<font-awesome-icon 
							:icon="['fas', 'trash']"
							style="width:16px; height: 16px"
							class="fa-icon"
						/>
					</span>
				</div>
			</div>
		</div>
		<modal-show-full-img
			:showModal="showModal"
			@hideModal="hideModal"
		>
			<img :src="imageToShowPath" alt="">
		</modal-show-full-img>
		<modal-delete-window
			:showDeleteModal="showDeleteModal"
			@hideDeleteModal="hideDeleteModal"
		>
			<h5 class="text-center mb-4">Удалить фото c сайта?</h5>
			<div class="d-flex justify-content-around mt-4">
				<div 
					@click="deletePhoto(photoToDelete)"
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
import modalShowFullImg from '@/components/admin/modalShowFullImg.vue'
import Spinner from '@/components/admin/spinner.vue'
import ModalDeleteWindow from '@/components/admin/modalDeleteWindow.vue';
import axios from 'axios'

export default {
	components: { modalShowFullImg, Spinner, ModalDeleteWindow },
	middleware: 'auth',
	layout: 'admin',

	data(){
		return{
			imagesBaseUrl: '',
			photos:[],
			showModal: false,
			imageToShowPath: '',
			showSpinner: false,
			showDeleteModal: false,
			photoToDelete : {},
		}
	},
	mounted(){
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
		this.getPhotos()
	},
	methods:{
		async getPhotos(){
			this.showSpinner = true
			try {
				const response = await axios.get('/admin/getSiteImages')
				this.photos = response.data

			} catch (e) {
				console.log('some getPhotos error')
				console.log(e.response.data)
			}

			this.showSpinner = false
		},
		hideModal(){
			this.showModal = false
			this.imageToShowPath = ''
		},
		showFullImg(photoId){
			this.showModal = true
			this.photos.forEach(element => {
				if(element.id == photoId){
					this.imageToShowPath =  this.imagesBaseUrl + element.path
				}
			});
		},
		async deletePhoto(photo){
			this.showDeleteModal = false
			this.showSpinner = true

			try {
				const response = await axios.post('/admin/deleteSiteImage', {photo})
				// console.log(response)
			} catch (e) {
				console.log(e.response.data)
			}


				this.photos = this.photos.filter(r => r.id !== photo.id)
				let i = 1
				this.photos.forEach(el => {
					el.order = i
					i++
				})
				this.showSpinner = false
		},
		showDelModal(photo){
			this.showDeleteModal = true
			this.photoToDelete = photo
		},
		hideDeleteModal(){
			this.showDeleteModal = false
		},
		async uploadPhoto(e){
			
			let formData = new FormData()
			formData.append('file', e.target.files[0])
			const response = await axios.post( '/admin/uploadSiteImage', formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
				// 			
        	})
       		.catch(function(e){
				console.log('FAILURE!!');
			});
			this.getPhotos()	
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
	.arrows{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
		span{
			cursor: pointer;
		}
	}
	.fa-icon-holder {
		& + .fa-icon-holder{
			margin-left: 50px;
		}
	}
</style>