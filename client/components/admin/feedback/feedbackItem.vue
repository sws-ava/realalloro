<template>
	<div>
		<div class="review-header mb-2">
			<span class="mr-2">
				{{ feedback.name }} {{ feedback.phone_ }}
			</span>
			<div class="review-header__status ">
				<b>
					<span 
						v-if="feedback.isRead" 
						class="green-text"
						>
						Прочитано
					</span>
					<span 
						v-else 
						class="red-text"
					>
						Новое сообщение
					</span>
				</b>
			</div>
		</div>
		<b> {{feedback.date}} </b>
		<div>
			{{ feedback.text }}
		</div>
		<div class="buttons mt-2">
			<div v-if="!feedback.isRead">
				<div 
					@click="feedbackReaded(feedback.id)"
					class="btn btn-outline-primary btn-sm"
				>
					Ознакомились

				</div>
			</div>
			<div v-else>
				<div 
					@click="feedbackNotReaded(feedback.id)"
					class="btn btn-outline-secondary btn-sm"
				>
					Ознакомлены
				</div> 
			</div>
			<div 
				@click="feedbackToDelete(feedback)"
				class="btn btn-outline-danger btn-sm btn-delete"
			>
				Удалить
			</div> 
		</div>
		<hr class="mb-4 mt-4" />
	</div>
</template>
 
<script>
export default {
	props: {
		feedback: {
			id:Number,
			isRead: Boolean,
			name: String,
			phone: String,
			text: String
		},
	},

	data(){
		return{
			
		}
	},

	methods:{
		feedbackReaded(feedbackId){
			this.$emit('feedbackReaded', feedbackId)
		},
		feedbackNotReaded(feedbackId){
			this.$emit('feedbackNotReaded', feedbackId)
		},
		feedbackToDelete(feedback){
			this.$emit("feedbackToDelete", feedback)
		}
	}
}
</script>

<style lang="scss" scoped>
	.review-header{
		display: flex;
		align-items: center;
		&__status{
			margin-left: auto;
			.green-text{
				color: green;
			}
			.red-text{
				color: red;
			}
		}
	}
	.answer{
		max-width: 80%;
		margin-left: auto;
		text-align: right;
		border-radius: 20px;
		background: #f3f0f0;
		padding: 4px 10px;    
		width: max-content;
	}
	.buttons{
		display: flex;
		gap: 10px;
	}
	.star{
		width: 20px;
		fill: #ebeb00;
	}
	.btn-delete{
		margin-left: auto;
	}
</style>