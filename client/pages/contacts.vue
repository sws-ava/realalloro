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
                                {{$t('contacts.title')}}
                              </li>
												  	</ol>
												</nav>
											</div>
										</div>
									</div> 
								</div>

								<!-- Title -->
								<h2 class="h2-xl">{{$t('contacts.title')}}</h2>

							</div>
						</div>	
					</div>	  
				</div>	  
			</div>		



			<section id="contacts-5" class="wide-80 contacts-section division">	
				<div class="container">
					
          
          <div class="row">
						<div class="col-xl-10 offset-xl-1">
							<div class="row">	
								<div class="col-md-4">
									<div class="cbox-5">
										<h5 class="h5-lg">{{$t('static.addressName')}}</h5>
										<p class="p-md">{{$t('static.address')}}</p>
									</div>
								</div>
								<div class="col-md-4">
									<div class="cbox-5">
										<h5 class="h5-lg">{{ $t('static.workHoursTitle') }}</h5>
										<p class="p-md">
                      {{ $t('static.shortDays') }}: {{ $t('static.workHours') }}
                    </p>
									</div>
								</div>
								<div class="col-md-4">
									<div class="cbox-5">
										<h5 class="h5-lg"> {{$t('static.phones')}}</h5>
										<p class="p-md">
                      <a 
                        class="d-block mt-15 phone"
                        :href="'tel:'+$t('static.phone1full')"
                      >
                        {{$t('static.phone1')}}
                      </a>
                    </p>
									</div>
								</div>
							</div>
			 			</div>
				 	</div>	



					<!-- GOOGLE MAP
					============================================= -->
					<div class="row">
				 		<div class="col-md-12">
					 		<div id="gmap">
								<div class="google-map">
						 			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.838357620288!2d144.95358331497258!3d-37.81725497975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4dd5a05d97%3A0x3e64f855a564844d!2zMTIxIEtpbmcgU3QsIE1lbGJvdXJuZSBWSUMgMzAwMCwg0JDQstGB0YLRgNCw0LvQuNGP!5e0!3m2!1sru!2sua!4v1605805230806!5m2!1sru!2sua" width="600" height="450" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>

						 		</div>
						 	</div>
					 	</div>
					 </div>	


					<!-- SECTION TITLE -->	
					<div 
            v-if="isShowForm"
            class="row"
          >	
						<div class="col-lg-10 offset-lg-1">
							<div class="section-title mb-40 text-center">	

								<h2 class="h2-xl">{{$t('static.formTitle')}}</h2>	

								<p class="p-xl">
                  {{$t('static.formSubtitle')}}
                </p>
									
							</div>	
						</div>
					</div>


					<!-- CONTACT FORM -->	
				 	<div class="row">
				 		<div class="col-lg-10 offset-lg-1">
              <loading v-if="isLoading" />
				 			<div 
                v-if="isShowForm"
                class="form-holder"
              >
								<form 
                  @submit.prevent
                  name="contactform" 
                  class="row contact-form"
                >
																						
                  <div class="col-md-12 col-lg-6">
                    <input 
                      @input="errors.nameError = false"
                      type="text" 
                      name="name" 
                      maxlength="20"
                      class="form-control name"
                      :class="errors.nameError ? 'inputError' : ''"
                      :placeholder="$t('static.yourNamePlaceHolder')"
                      v-model="formInfo.name"
                    > 
                  </div>
                       
                  <div class="col-md-12 col-lg-6">
                    <input 
                      maxlength="13"
                      @input="errors.phoneError = false"
                      type="text" 
                      name="phone" 
                      class="form-control email" 
                      :class="errors.phoneError ? 'inputError' : ''"
                      v-model="formInfo.phone"
                    > 
                  </div>
                          
                  <div class="col-md-12">
                    <textarea 
                      name="message" 
                      class="form-control message" 
                      rows="6" 
                      v-model="formInfo.text"
                      @input="errors.textError = false"
                      :class="errors.textError ? 'inputError' : ''"
                      :placeholder="$t('static.yourMessagePlaceHolder')"
                    ></textarea>
                  </div> 
                                              
                  <div class="col-md-12 mt-5 text-right">  
                    <button 
                      @click="sendContactFeedback"
                      type="submit" 
                      class="btn btn-md btn-red tra-red-hover submit"
                    >
                      {{$t('static.sendLetter')}}
                    </button> 
                  </div>
																							
								</form>	

				 			</div>	
              <div
                style="margin-top: 60px;"
                v-if="isLetterSended"
              >
                <h5 class="h5-sm text-center">
                   {{$t('static.letterSending')}}
                </h5>
                <div 
                  class="text-center c-pointer"
                  @click="sendOneMore"
                >
                   {{$t('static.oneMoreLetter')}}
                </div>
              </div>
              <div
                style="margin-top: 60px;"
                v-if="isLetterError"
              >
                <h5 class="h5-sm text-center">
                  {{$t('static.letterNotSending')}}
                </h5>
                <div 
                  class="text-center c-pointer"
                  @click="sendOneMore"
                >
                   {{$t('static.oneMoreLetter')}}
                </div>
              </div>
				 		</div>	
				 	</div> 	


				</div>
			</section>


  </div>
</template>

<script>

import axios from 'axios'
import loading from '@/components/front/loading.vue'

export default {
  layout: 'front',
  components:{
    loading
  },
  head(){
    return{
      title: this.$i18n.t('contacts.title') + ' ::  ' + this.$i18n.t('static.siteName'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('contacts.description'),
        },
      ]
    }
  },
  data(){
    return{
      formInfo:{
        name: '',
        phone: '+380',
        text: ''
      },
      isLetterSended: false,
      isLetterError: false,
      isShowForm: true,
      isLoading: false,
      errors:{
        nameError: false,
        phoneError: false,
        textError: false
      }
    }
  },
  mounted(){
    
  },
  methods:{
    async sendContactFeedback(){
      const isValidate = this.formValidate()
      if(isValidate){
        try {
          this.isLoading = true
          console.log(this.formInfo)
          const res = await axios.post('/admin/addFeedback', {formInfo: this.formInfo})
          console.log(res.data)

          // if(res.data !== 'ok'){
          //   showSendingErrorHandler()
          // }
          
          this.isLetterSended = true
          this.isLetterError = false
          this.isShowForm = false
          this.clearInputs()
          this.isLoading = false
        } catch (e) {
          console.log(e.response.data)
          this.isLoading = false
          this.isLetterSended = false
          this.isLetterError = true
          this.isShowForm = false
          
        } finally {
          this.isLoading = false
        }
      }

    },
    formValidate(){
      if(!this.formInfo.name){
        this.errors.nameError = true
        return false
      }
      if(this.formInfo.phone.length < 10){
        this.errors.phoneError = true
        return false
      }
      if(this.formInfo.text.length < 5){
        this.errors.textError = true
        return false
      }
      return true
    },
    sendOneMore(){
      this.isLoading = false
      this.isLetterSended = false
      this.isLetterError = false
      this.isShowForm = true
    },
    clearInputs(){
      this.formInfo.name = '',
      this.formInfo.phone = '+380',
      this.formInfo.text = ''
    },
  }
}
</script>

<style lang="scss" scoped>
.inputError{
  border-color: #d01010;
}
.c-pointer{
  cursor: pointer;
  font-weight: 600;
  color: #f7be27;
  transition: all 0.25s ease-in-out;
  &:hover{
    scale: 1.05
  }
}

</style>
