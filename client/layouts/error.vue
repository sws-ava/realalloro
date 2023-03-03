<template>
    <div>
		<div 
			class="page-hero-section division"
			style="background-image: url(/images/contacts-page.jpg);"
		>
			<div class="container">	
				<div class="row">	
					<div class="col-lg-10 offset-lg-1">
						<div class="hero-txt text-center white-color">

							<!-- Breadcrumb -->
							<div id="breadcrumb">
								<div class="row">						
									<div class="col">
										<div class="breadcrumb-nav">
											<nav aria-label="breadcrumb">
												<ol class="breadcrumb">
													<li class="breadcrumb-item">
							
							<nuxt-link 
								:to="localePath('mainPage')"
								class="footer-logo"
							>
								{{$t('static.mainPage')}}
							</nuxt-link>
							</li>
													<li class="breadcrumb-item active">
							{{$t('static.page_not_found')}}
							</li>
												</ol>
											</nav>
										</div>
									</div>
								</div> 
							</div>

							<!-- Title -->
							<h2 class="h2-xl">{{$t('static.page_not_found')}}</h2>

						</div>
					</div>	
				</div>	  
			</div>	  
		</div>	
		<div class="margin-top: 50px;">
			<div class="container">
				<div class="row">
					<div class="col-12 text-center" style="margin-top: 50px;">
						<h3 class="h3-xl">{{$t('static.page_not_found')}}</h3>
						<div class="back">
							<nuxt-link 
								:to="localePath('mainPage')"
							>
								{{$t('static.to_site')}}
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    layout: 'front' // you can set a custom layout for the error page
  }
</script>

<style lang="scss" scoped>
.back{
	margin-top: 40px;
	margin-bottom: 240px;
	a{
		color: #f7be27;
		transition: all 0.25s ease-in-out;
		display: block;
		font-weight: 600;
		font-size: 22px;
		&:hover{
			scale: 1.05;
		}
	}
}
</style>