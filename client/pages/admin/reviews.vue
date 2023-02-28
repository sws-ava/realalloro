<template>
	<div>
		<h5>Отзывы</h5>
		<spinner v-if="showSpinner" />
		<template v-if="reviews.length" >
			<div 
				v-for="review in reviews" 
				:key="review.id"
			>
				<review-item 
					:review="review"	
					@reviewRemove="reviewRemove"
					@publishReview="publishReview"
					@hideReview="hideReview"
					@reviewToDelete="reviewToDelete"
					@editReview="editReview"
				/>

				
			</div>
		</template>
		<div v-else class="text-center mt-4">
			<h5>Отзывов нет</h5>
		</div>
		<modal-delete-window
			:showDeleteModal="showDeleteModal"
			@hideDeleteModal="hideDeleteModal"
		>
			<h5 class="text-center mb-4">Удалить этот отзыв c сайта?</h5>
			<p>
				{{reviewItemToDelete.text}}
			</p>
			<div class="d-flex justify-content-around mt-4">
				<div 
					@click="reviewRemove(reviewItemToDelete)"
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
		<modal-review-edit-window
			:showEditReviewModal="showEditReviewModal"
			@hideEditReviewModal="hideEditReviewModal"
		>
			<div>
				<div class="review-header mb-2">
					<span class="mr-2">
						{{ reviewToEdit.name }}
					</span>
					<svg 
						v-for="(star,idx) in reviewToEdit.stars" 
						:key="idx" 
						class="star" 
						xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="m15.397 4.687 2.579 5.225a1 1 0 0 0 .753.547l5.766.838a1 1 0 0 1 .554 1.706l-4.173 4.067c-.236.23-.343.561-.288.885l.985 5.743a1 1 0 0 1-1.451 1.054l-5.158-2.712a1.002 1.002 0 0 0-.931 0l-5.158 2.712a1 1 0 0 1-1.451-1.054l.985-5.743a.999.999 0 0 0-.288-.885l-4.173-4.067a1 1 0 0 1 .554-1.706l5.766-.838a1 1 0 0 0 .753-.547L13.6 4.687c.37-.743 1.43-.743 1.797 0z"/></svg>
					
					<div class="ml-2 d-block">
						<b>{{reviewToEdit.date}}</b>
					</div>
				</div>
				
				<div>
					<b>Отзыв:</b>
					<textarea
						v-model="reviewToEdit.text"
						class="reviewTextarea"
					></textarea>
					
				</div>
				<div 
					class="mt-2 mb-3 answer1"
				>
					<b>Наш ответ:</b>
					<textarea
						v-model="reviewToEdit.answer"
						class="answerTextarea"
					></textarea>
				</div>
				<div class="buttons mt-2 w-100 d-flex justify-content-between">
					<div 
						@click="saveReview(reviewToEdit)"
						class="btn btn-outline-success btn-sm"
					>
						Сохранить
					</div>
					<div 
						@click="hideEditReviewModalNoChanges(reviewToEdit)"
						class="btn btn-outline-secondary btn-sm"
					>
						Назад
					</div>
				</div>
			</div>
		</modal-review-edit-window>
	</div>
</template>

<script>

import ReviewItem from '@/components/admin/reviews/reviewItem.vue'
import Spinner from '@/components/admin/spinner.vue';
import ModalDeleteWindow from '@/components/admin/modalDeleteWindow.vue';
import ModalReviewEditWindow from '@/components/admin/modalReviewEditWindow.vue';
import axios from 'axios';

export default {
	// name: 'qwe',
	components:{
		ReviewItem,
		Spinner,
		ModalDeleteWindow,
		ModalReviewEditWindow,
	},


	middleware: 'auth',
	layout: 'admin',

	data(){
		return{
			reviews: [],
			showSpinner: false,
			showDeleteModal: false,
			reviewItemToDelete : {},
			showEditReviewModal: false,
			reviewToEdit: {},
		}
	},
	mounted(){
		this.fetchReviews()
	},	
	methods:{
		async fetchReviews(){
			this.showSpinner = true
			try {
				const response = await axios.get('/admin/getReviews')
				this.reviews = response.data
				this.setUnrededReviews()
			} catch (e) {
				console.log('some fetchReviews error')
			} finally {
				this.showSpinner = false
			}
		},
		async publishReview(review){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/reviewShow', {reviewId: review.id})
				this.fetchReviews()
			} catch (e) {
				console.log('some publishReview error')
			} finally {
				this.setUnrededReviews()
			}
		},
		async hideReview(review){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/reviewHide', {reviewId: review.id})
				this.fetchReviews()
			} catch (e) {
				console.log('some hideReview error')
			} finally {
				this.setUnrededReviews()
			}
		},
		async reviewRemove(review){
			this.showSpinner = true
			try {
				this.showDeleteModal = false
				const response = await axios.post('/admin/reviewRemove', {reviewId: review.id})
				this.fetchReviews()
			} catch (e) {
				console.log('some reviewRemove error')
			} finally {
				this.setUnrededReviews()
			}
			
		},
		hideDeleteModal(){
			this.showDeleteModal = false
		},
		reviewToDelete(review){
			this.reviewItemToDelete = review
			this.showDeleteModal = true
		},
		hideEditReviewModal(){
			this.showEditReviewModal = false
		},
		hideEditReviewModalNoChanges(reviewToEdit){
			this.showEditReviewModal = false
			this.reviews.forEach(element => {
				if(element.id === reviewToEdit.id){
					this.reviewToEdit.text = element.text
					this.reviewToEdit.answer = element.answer
				}
			});
			
		},
		editReview(review){
			this.showEditReviewModal = true
			// this.reviewToEdit = review
			this.reviewToEdit = JSON.parse(JSON.stringify(review));
		},
		async saveReview(reviewToEdit){
			this.showEditReviewModal = false

			this.showSpinner = true
			try {
				this.showDeleteModal = false
				const response = await axios.post('/admin/saveReview', {reviewToEdit: reviewToEdit})
				this.fetchReviews()
			} catch (e) {
				console.log('some saveReview error')
			} finally {
				this.setUnrededReviews()
			}
			this.reviews.forEach(element => {
				if(element.id === reviewToEdit.id){
					element.text = reviewToEdit.text
					element.answer = reviewToEdit.answer
				}
			});
			this.showSpinner = false
		},
		setUnrededReviews(){
			let num = 0
			this.reviews.forEach(element => {
				if(element.show === 0){
					num++
				}
			});
			this.$store.commit('countMenuNums/UPDATE_REVIEWS', num);
		},
		

	}
}

</script>

<style lang="scss" scoped>
	.reviewTextarea{
		resize: none;
   		min-height: 150px;
		width: 100%;
	}
	.answerTextarea{
		resize: none;
   		min-height: 100px;
		width: 100%;
	}
</style>