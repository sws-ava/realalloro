<template>
  <div> 
    <section class="section-top-50 section-bottom-66 section-lg-top-160 section-lg-bottom-160 inset-left-15 inset-right-15" 
    style="background-image: url(/images/main_images/galereya.jpg); background-size:100%; background-position-x: 50%; padding-top: 15%; padding-bottom: 15%; background-position-y: 50%;">
      <div class="header-divider">
      <h3 class="text-uppercase font-logo text-regular letter-spacing-200">
        {{$t('static.galleryTitle')}}
      </h3>
      </div>
    </section>
    <gallery-images :galleryImages="galleryImages"/>
  </div>
</template>

<script>

import galleryImages from '@/components/front/gridGallery.vue'

export default {
  layout: 'front',
  components:{
    galleryImages,
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
    }
  },
	async fetch() {
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
    this.galleryImages = await fetch(
      process.env.imagesBaseUrl + 'api/getGalleryImages'
    ).then(res => res.json())
  },
}
</script>



