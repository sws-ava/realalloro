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
                                {{$t('static.galleryTitle')}}
                              </li>
												  	</ol>
												</nav>
											</div>
										</div>
									</div> 
								</div>

								<!-- Title -->
								<h2 class="h2-xl">{{$t('static.galleryTitle')}}</h2>

							</div>
						</div>	
					</div>	  
				</div>	  
			</div>
      <loading v-if="isLoading" />	
      <gallery-images 
        :galleryImages="galleryImages"
      />
  </div>
</template>

<script>

import galleryImages from '@/components/front/gridGallery.vue'
import loading from '@/components/front/loading.vue'

export default {
  layout: 'front',
  components:{
    galleryImages,
    loading,
  },
  
  head(){
    return{
      title: this.$i18n.t('static.galleryTitle') + ' ::  ' + this.$i18n.t('static.siteName'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('static.galleryTitle'),
        },
      ]
    }
  },
  data(){
    return{
      galleryImages: [],
      isLoading: false,
    }
  },
	async fetch() {
    this.isLoading = true
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
    this.galleryImages = await fetch(
      process.env.imagesBaseUrl + 'api/getGalleryImages'
    ).then(res => res.json())
    this.isLoading = false
  },
}
</script>



