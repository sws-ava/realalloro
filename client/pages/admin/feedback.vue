<template>
	<div>
		<h5>Обратная связь</h5>
		<spinner v-if="showSpinner" />
		<template v-if="feedbacks.length">
			<feedback-item
				v-for="feedback in feedbacks"
				:key="feedback.id"
				:feedback=feedback
				@feedbackReaded="feedbackReaded"
				@feedbackNotReaded="feedbackNotReaded"
				@feedbackToDelete="feedbackToDelete"
			/>
		</template>
		<div
			v-else
			class="text-center mt-4"
		>
			<h5>Новых записей нет</h5>
		</div>
		<modal-delete-window
			:showDeleteModal="showDeleteModal"
			@hideDeleteModal="hideDeleteModal"
		>
			<h5 class="text-center mb-4">Удалить это обращение?</h5>
			<p>
				{{feedbackItemToDelete.text}}
			</p>
			<div class="d-flex justify-content-around mt-4">
				<div 
					@click="feedbackRemove(feedbackItemToDelete)"
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
import feedbackItem from '@/components/admin/feedback/feedbackItem.vue'
import Spinner from '@/components/admin/spinner.vue';
import ModalDeleteWindow from '@/components/admin/modalDeleteWindow.vue';
import axios from 'axios'


export default {
	components: { feedbackItem, Spinner, ModalDeleteWindow },

	middleware: 'auth',
	layout: 'admin',

	data(){
		return{
			feedbacks: [],
			showSpinner:false,
			showDeleteModal: false,
			feedbackItemToDelete : {},
		}
	},
	mounted(){
		this.fetchFeedbacks()
		
	},	
	methods:{
		async fetchFeedbacks(){
			this.showSpinner = true
			try {
				const feed = await axios.get('/admin/getFeedbacks')
				this.feedbacks = feed.data
				this.setUnrededFeedbacks()
			} catch (e) {
				console.log('some fetchFeedbacks error')
			} finally {
				this.showSpinner = false
			}
		},
		async feedbackReaded(feedbackId){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/feedbackReaded', {feedbackId: feedbackId})
				this.fetchFeedbacks()
			} catch (e) {
				console.log('some feedbackReaded error')
			} finally {
			}
		},
		async feedbackNotReaded(feedbackId){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/feedbackNotReaded', {feedbackId: feedbackId})
				this.fetchFeedbacks()
			} catch (e) {
				console.log('some feedbackNotReaded error')
			} finally {
			}
		},
		async feedbackRemove(feedback){
			this.showDeleteModal = false
			this.showSpinner = true
			try {
				this.feedbacks = this.feedbacks.filter(r => r.id !== feedback.id)
				this.setUnrededFeedbacks()
				const response = await axios.post('/admin/feedbackRemove', {feedbackId: feedback.id})
			} catch (e) {
				console.log('some feedbackRemove error')
			} finally {
				this.showSpinner = false
				this.setUnrededFeedbacks()
			}
		},
		hideDeleteModal(){
			this.showDeleteModal = false
		},
		feedbackToDelete(feedback){
			this.feedbackItemToDelete = feedback
			this.showDeleteModal = true
		},
		setUnrededFeedbacks(){
			
			let num = 0
			this.feedbacks.forEach(element => {
				if(element.isRead == 0){
					num++
				}
			});
			this.$store.commit('countMenuNums/UPDATE_FEEDBACKS', num);
		},
		sortFeedbacksByReaded(){
			this.feedbacks = this.feedbacks.sort((a,b) => a.id + b.id)
			this.feedbacks = this.feedbacks.sort((a,b) => a.isRead - b.isRead)

		},
	}
}

</script>

<style lang="scss" scoped>

</style>