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
	text-align: revert;
    display: flex;
    justify-content: flex-end;
    grid-gap: 2px;
    gap: 2px;
    margin-right: 60px;
	a{
		color: #fff;
		transition: all 0.25s ease-in-out;
		cursor: pointer;
		&:hover{
			color: #f7be27;
			transition: all 0.25s ease-in-out;
		}
	}
	a + a {
		margin-left: 10px;
	}
}
</style>