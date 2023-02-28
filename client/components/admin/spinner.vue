<template>
	<div class="spinnerHolder">
		<div class="spinner-border text-primary spinnerItem" role="status">
			<span class="sr-only">Загрузка...</span>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
	.spinnerHolder {
		background: rgba(255, 255, 255, 0.9);
		width: 100%;
		height: 100%;
		display: flex;
		position: absolute;
		opacity: 0.8;
		justify-content: center;
		padding-top: 100px;
		z-index: 2;
	}
</style>