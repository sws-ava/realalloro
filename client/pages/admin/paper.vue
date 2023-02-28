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
					multiple="multiple"
					@change="uploadPhoto($event)"
				>
			</div>
		</form>
		<div class="row">
			<div  v-for="(photo, index) in photos" :key="photo.id" class="col-lg-3 mb-4">
				<div  class="block-holder">
					<div @click="showFullImg(photo.id)" class="image-holder">
						<img :src="imagesBaseUrl + photo.path">
					</div>
				</div>
				
				<div class="arrows">
					<span 
						@click="orderLeft(photo.order)"
						v-if="index  !== 0" 
						class="fa-icon-holder"
					>
						<font-awesome-icon 
							:icon="['fas', 'arrow-left']"
							style="width:16px; height: 16px"
							class="fa-icon"
						/>
					</span>
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
					<span 
						@click="orderRight(photo.order)"
						v-if="index !== photos.length - 1" 
						class="fa-icon-holder"
					>
						<font-awesome-icon 
							:icon="['fas', 'arrow-right']"
							style="width:16px; height: 16px"
							class="fa-icon"
						/>
					</span>
				</div>
			</div>
		</div>

		
        <div class="d-flex justify-content-start col-12">
          <div class="form-group mt-2">
             <button 
				@click="showDeleteAllModal = true"
              class="btn btn-sm btn-danger"
             >
              Удалить все фото

             </button>
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
		<modal-delete-window
			:showDeleteModal="showDeleteAllModal"
		>
			<h5 class="text-center mb-4">Удалить все фотографии меню?</h5>
			<div class="d-flex justify-content-around mt-4">
				<div 
					@click="deleteAllPhoto()"
					class="btn btn-outline-danger btn-sm"
				>
					Удалить
				</div>
				<div 
					@click="showDeleteAllModal = false"
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
			showDeleteAllModal: false,
			photoToDelete : {},
		}
	},
	mounted(){
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
		this.getPhotos()
		this.sortPhotos()
	},
	methods:{
		async getPhotos(){
			this.showSpinner = true
			try {
				const response = await axios.get('/admin/getPaper')
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
		async orderLeft(order){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/paperOrderLeft', {order})
				
				this.photos.forEach(el => {
					if(el.order == order - 1){
						el.order += 1
					}
					else if(el.order == order){
						el.order -= 1
					}
				})
				this.sortPhotos()
				this.showSpinner = false
			} catch (e) {
				console.log(e.response.data)
			}
		},
		async orderRight(order){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/paperOrderRight', {order})
				this.photos.forEach(el => {
					if(el.order == order){
						el.order += 1
					}
					else if(el.order == order + 1){
						el.order -= 1
					}
				})
				this.sortPhotos()
				this.showSpinner = false
			} catch (e) {
				console.log(e.response.data)
			}
		},
		sortPhotos(){
			this.photos.sort((a,b) => a.order - b.order)
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
				const response = await axios.post('/admin/deletePaper', {photo})
			} catch (e) {
				console.log(e.response.data)
			}


				this.photos = this.photos.filter(r => r.id !== photo.id)
				let i = 1
				this.photos.forEach(el => {
					el.order = i
					i++
				})
				this.sortPhotos()
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
			for (let i = 0; i < e.target.files.length; i++ ){
				let file = e.target.files[i];
				formData.append('files[' + i + ']', file);
			}
			console.log(formData)
			try {
				const response = await axios.post('/admin/uploadPaper', formData, {
					headers: {
					'Content-Type': 'multipart/form-data',
					}
				})
				console.log(response.data)
			} catch (e) {
				console.log(e.response.data)
			}
			// console.log(e.target.files)
			// const response = await axios.post( '/admin/uploadPaper', formData,
            //     {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            //   }
            // ).then(function(){		
			// 	console.log(response)
        	// })
       		// .catch(function(e){
			// 	console.log('FAILURE!!');
			// });
			
			this.getPhotos()	
		},
		showDeleteAllModalHandler(){
			// console.log('showDeleteAllModal')
			// this.showDeleteModal = false
		},
		async deleteAllPhoto(){
			this.showDeleteAllModal = false
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/deleteAllPaper')
				this.getPhotos()
			} catch (e) {
				console.log(e.response.data)
			}
			this.showSpinner = false
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