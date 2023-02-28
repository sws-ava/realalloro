<template>
	<div
		@click.stop="hideEditReviewModal"
		v-if="showEditReviewModal"
		class="modalHolder"
	>
		<div @click.stop class="modalContent">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		showEditReviewModal:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		hideEditReviewModal(){
			this.$emit('hideEditReviewModal', false)
		}
	}

}
</script>
<style lang="scss" scoped>
	.modalHolder{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.85);
		.modalContent{
			padding: 20px;
			background: #fff;
			width: 100%;
			max-width: 700px;
			border-radius: 15px;
		}
	}


</style>