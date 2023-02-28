<template>
	<div class="">
		{{$t('dashboard_title')}}
	</div>
</template>

<script>
export default {
	middleware: 'auth',
	layout: 'admin',
	
	
	head: {
		title: 'dash  title',
		meta: [
		{
			hid: 'description',
			name: 'description',
			content: 'dash description'
		}
		],
	},
}
</script>

<style>

</style>