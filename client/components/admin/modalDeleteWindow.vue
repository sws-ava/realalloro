<template>
	<div
		@click.stop="hideDeleteModal"
		v-if="showDeleteModal"
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
		showDeleteModal:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		hideDeleteModal(){
			this.$emit('hideDeleteModal', false)
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
			max-width: 400px;
			border-radius: 15px;
		}
	}


</style>