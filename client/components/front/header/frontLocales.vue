<template>
	<div class="localesHolder">
		<div >
			<nuxt-link :to="switchLocalePath('ru')">RU</nuxt-link>
			<nuxt-link :to="switchLocalePath('ua')">UA</nuxt-link>
		</div>
	</div>
</template>

<script>

		

export default {



}

</script>


<style lang="scss" scoped>
.localesHolder {
	margin-top: 10px; 
	text-align: revert; 
	display: flex; 
	justify-content: flex-end; 
	gap: 6px;
	a + a {
		margin-left: 20px;
	}
}
</style>