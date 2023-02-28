<template>
	<section style="margin-bottom: 30px;" class="copyright offset-top-30 offset-md-top-42">
		<div class="shell">
			<p class="pull-sm-center">© Sushi-Krabi 2019 - {{ currentYear }}</p>
		</div>
	</section>
</template>

<script>

export default {
	data(){
		return{
			currentYear: new Date().getFullYear(),
		}
	},
}

</script>
