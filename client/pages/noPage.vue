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
                <div class="row">
                  <div class="col-12">
								    <h2 class="h2-xl">{{$t('static.page_not_found')}}</h2>
                    <nuxt-link 
                      :to="localePath('mainPage')"
                      class="footer-logo"
                    >
                      {{$t('static.mainPage')}}
                    </nuxt-link>
                  </div>
                </div>

							</div>
						</div>	
					</div>	  
				</div>	  
			</div>	
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'



export default {
  layout: 'front',



  head: {
    meta: [
      {
        hid: 'description',
        name: 'description',
        // content: this.page.description_ru
      }
    ],
     },
    data() {
      return {
        page: {}
      }
    },
    async fetch() {
      try {
        const res = await axios.post('/getSlugPage', {slug: this.$route.params.id})
        console.log(res.data)
        this.page = res.data
      } catch (e) {
        
      }
    },
    // async fetch() {
    //   this.page = await fetch(
    //     process.env.imagesBaseUrl + 'api/getMainPage'
    //   ).then(res => res.json())
    // }
  }
</script>

