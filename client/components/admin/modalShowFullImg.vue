<template>
	<div
		@click="hideModal"
		v-if="showModal"
		class="modalHolder"
	>
		<div  class="modalContent">
			<div class="d-flex justify-content-center align-items-center">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		showModal:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		hideModal(){
			this.$emit('hideModal', false)
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
			// background: #fff;
			width: 100%;
			max-width: 80%;
			max-height: 80%;
			// max-width: 400px;
			// border-radius: 15px;
			img{
				width: 100%;
				max-width: 600px;
    			max-height: 600px;
				object-fit: contain;
			}
		}
	}


</style>