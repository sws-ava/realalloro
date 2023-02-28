<template>
  <div>
    <h1>{{ $t('static.page_not_found') }}</h1>
	<nuxt-link 
		:to="localePath('mainPage')"
	>
		{{ $t('static.to_site') }}
	</nuxt-link>
  </div>
</template>

<script>
  export default {
    layout: 'front' // you can set a custom layout for the error page
  }
</script>

<style lang="scss" scoped>
	h1{
		margin-top: 100px;
    	margin-bottom: 100px;
	}
	a{
		    color: #e0ca8f;
			font-size: 20px;
	}
</style>