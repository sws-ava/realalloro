<template>
	<div>
		<div class="review-header mb-2">
			<span class="mr-2">
				{{ review.name }}
			</span>
			<svg 
				v-for="(star,idx) in review.stars" 
				:key="idx" 
				class="star" 
				xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="m15.397 4.687 2.579 5.225a1 1 0 0 0 .753.547l5.766.838a1 1 0 0 1 .554 1.706l-4.173 4.067c-.236.23-.343.561-.288.885l.985 5.743a1 1 0 0 1-1.451 1.054l-5.158-2.712a1.002 1.002 0 0 0-.931 0l-5.158 2.712a1 1 0 0 1-1.451-1.054l.985-5.743a.999.999 0 0 0-.288-.885l-4.173-4.067a1 1 0 0 1 .554-1.706l5.766-.838a1 1 0 0 0 .753-.547L13.6 4.687c.37-.743 1.43-.743 1.797 0z"/></svg>
			<div class="review-header__status ">
				<b>
					<span 
						v-if="review.show" 
						class="green-text"
						>
						Опубликовано
					</span>
					<span 
						v-else 
						class="red-text"
					>
						Ожидает модерации
					</span>
				</b>
			</div>
		</div>
		<b>{{review.date}}</b>
		<div>
			{{ review.text }}
		</div>
		<div 
			v-if="review.answer" 
			class="mt-2 mb-3 answer"
		>
			{{ review.answer }}
		</div>
		<div class="buttons mt-2">
			<div>
				<div 
					v-if="!review.answer"
					@click="editReview(review)"
					class="btn btn-outline-primary btn-sm"
				>
					Ответить
				</div> 
				<div 
					v-else
					@click="editReview(review)"
					class="btn btn-outline-secondary btn-sm"
				>
					Редактировать
				</div> 
				<div 
					v-if="!review.show"
					@click="publishReview(review)"
					class="btn btn-outline-success btn-sm"
				>
					Опубликовать
				</div> 
				<div
					v-else 
					@click="hideReview(review)"
					class="btn btn-outline-success btn-sm"
				>
					Скрыть
				</div> 
			</div>
			<div
				@click="reviewToDelete(review)" 
				class="btn btn-outline-danger btn-sm btn-delete"
			>
				Удалить
			</div> 
		</div>
		<hr class="mb-4 mt-4">
	</div>
</template>

<script>
export default {
	props:{
		review:{
			id: Number,
			date: String,
			stars: Number,
			show: Boolean,
			name: String,
			text: String,
			answer: String
		}
	},

	data(){
		return{
			
		}
	},

	methods:{
		publishReview(review){
			this.$emit('publishReview', review)
		},
		hideReview(review){
			this.$emit('hideReview', review)
		},
		reviewToDelete(review){
			this.$emit('reviewToDelete', review)
		},
		editReview(review){
			this.$emit('editReview', review)
		}
	},

}

</script>

<style lang="scss">

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