<template>
  <div>
    
    <section 
      class="section-top-50 section-bottom-66 section-lg-top-160 section-lg-bottom-160 inset-left-15 inset-right-15" 
      style="background-image: url(/images/main_images/main.jpg); background-position-x: 50%; padding-top: 15%; padding-bottom: 15%; background-position-y: 50%; background-size:100%;"
    >
      <div class="header-divider">
      <h3 class="text-uppercase font-logo text-regular letter-spacing-200">{{$t('main.title')}}</h3>
      </div>
    </section>
    <div v-html="$t('main.content')"></div>
    <section class="section-bottom-70">
      <div class="shell">
        <hr class="hr-gray offset-top-50">
      </div>
    </section>
    <section class="section-top-50 section-bottom-66 section-lg-top-160 section-lg-bottom-160 inset-left-15 inset-right-15 bg-menu">
      <div class="header-divider">
        <h3 class="text-uppercase font-logo text-regular letter-spacing-200">
          {{ $t('main.ourMenu') }}
        </h3>
        <div class="text-center offset-top-9">
          <ol class="breadcrumb">
            <li>
              <nuxt-link 
                :to="localePath('menu')"
              >
                {{ $t('main.lookAll') }}
              </nuxt-link>
            </li>
          </ol>
        </div>
      </div>
    </section>


    <section class="text-center section-70 section-sm-70 section-sm-bottom-83">
      <div class="shell">
        <div class="images row dishesBlock" v-viewer="{inline: false, navbar: false, title: false, toolbar: true, tooltip: false, movable: false, zoomable: false, rotatable: false, scalable: false, transition: true, fullscreen: false, keyboard: true}">
          <div 
            v-for="(src, idx) in menuImages"
            :key="idx"
            class="col-12 col-md-6 col-lg-4 dishesBlockItem"
          >
            <img
              :src="src"   
              class="dishesImage"
            >
          </div>
        </div>
        <hr class="hr-sealine-gray offset-top-45">
        <hr class="hr-gray offset-top-45">
      </div>
    </section>

		<section class="section-top-50 section-bottom-66 section-lg-top-160 section-lg-bottom-160 inset-left-15 inset-right-15 bg-int">
      <div class="header-divider">
        <h3 class="text-uppercase font-logo text-regular letter-spacing-200">
          {{ $t('main.interior') }}
        </h3>
        <div class="text-center offset-top-9">
          <ol class="breadcrumb">
            <li>
              <nuxt-link 
                :to="localePath('interior')"
              >
                {{ $t('main.lookAll') }}
              </nuxt-link>
            </li>
          </ol>
        </div>
      </div>
    </section>
    <section class="text-center section-50 section-sm-115">
    	<div class="shell">
			<div v-viewer="{inline: false, navbar: false, title: false, toolbar: true, tooltip: false, movable: false, zoomable: false, rotatable: false, scalable: false, transition: true, fullscreen: false, keyboard: true}">
				<div 
					v-for="(arr, index) in galleryImages" 
					:key="index" 
					class="gridGalleryItems"
				>
					<div 
						v-for="(item, idx) in arr"
						:key="idx"	
						class="gridGalleryItem"
					>
						<img :src="imagesBaseUrl + item.path">
					</div>
				</div>
			</div>
        </div>
        <hr class="hr-sealine-gray offset-top-45">
        <hr class="hr-gray offset-top-45">
    </section>





  </div>
</template>

<script>

import axios from 'axios'
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from "v-viewer"
import galleryImages from '@/components/front/gridGallery.vue'

export default {
  layout: 'front',
  components:{
    galleryImages,
  },

  directives: {
    viewer: viewer({
      debug: true,
    }),
    viewer2: viewer({
      debug: true,
    }),
  },
  data() {
    return {
      imagesBaseUrl: '',
      menuImages: [
        "/images/main/01.jpg",
        "/images/main/02.jpg",
        "/images/main/03.jpg",
        "/images/main/04.jpg",
        "/images/main/05.jpg",
        "/images/main/06.jpg",
      ],
      
      galleryImages: [
      [
          {path:"images/main/10.jpg"},
          {path:"images/main/11.jpg"},
          {path:"images/main/12.jpg"},
          {path:"images/main/14.jpg"},
          {path:"images/main/15.jpg"},
          {path:"images/main/13.jpg"},
          {path:"images/main/17.jpg"},
          {path:"images/main/18.jpg"},
          {path:"images/main/16.jpg"},
        ],
      ]
    };
  },

  head(){
    return{
      title: this.$i18n.t('static.siteName'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('main.description'),
        },
      ]
    }
  },
  mounted(){
    this.addView()
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
  },
  methods:{
    async addView(){
      try{
        const view = await axios.post('/addView', { id:1})
      } catch (e) {
        console.log('some addView error ')
      }
    },
    
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }
  }

    
}
</script>


<style lang="scss" scoped>
  .dishesBlock{
    display: flex;
    margin-bottom: 50px;
    flex-wrap: wrap;
    position: relative;
    .dishesBlockItem{
      flex: 1 0 30%;
      margin-bottom: 50px;
      cursor: pointer;
      padding-top: 30%;
      margin-right: 20px;
      margin-left: 20px;
      @media (max-width:767px){
        padding-top: 60%;
        flex: 1 1 45%;
      }
      @media (max-width:600px){
        padding-top: 90%;
        flex: 1 1 90%;
      }
    }
    img{
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .gridGalleryItems {
    cursor: pointer;
    margin-bottom: 20px;
  display: grid;
  grid-template-columns : repeat(12, 1fr);
  grid-template-rows : repeat(11, 1fr);
  grid-gap: 20px;
}
.gridGalleryItem{
  position: relative;
  img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.gridGalleryItem:nth-child(1){
   grid-column-start: 1;
   grid-column-end: 4;
   grid-row-start: 1;
   grid-row-end: 5;
}
.gridGalleryItem:nth-child(2){
   grid-column-start: 4;
   grid-column-end: 10;
   grid-row-start: 1;
   grid-row-end: 5;
   padding-top: 67%;
}
.gridGalleryItem:nth-child(3){
   grid-column-start: 10;
   grid-column-end: 13;
   grid-row-start: 1;
   grid-row-end: 4;
}
.gridGalleryItem:nth-child(4) {
   grid-column-start: 1;
   grid-column-end: 7;
   grid-row-start: 5;
   grid-row-end: 9;
}
.gridGalleryItem:nth-child(5) {
   grid-column-start: 7;
   grid-column-end: 10;
   grid-row-start: 5;
   grid-row-end: 9;
}
.gridGalleryItem:nth-child(6) {
   grid-column-start: 10;
   grid-column-end: 13;
   grid-row-start: 4;
   grid-row-end: 7;
}
.gridGalleryItem:nth-child(7) {
   grid-column-start: 1;
   grid-column-end: 4;
   grid-row-start: 9;
   grid-row-end: 12;
}
.gridGalleryItem:nth-child(8) {
    grid-column-start: 4;
    grid-column-end: 10;
    grid-row-start: 9;
    grid-row-end: 12;
}
.gridGalleryItem:nth-child(9) {
   grid-column-start: 10;
   grid-column-end: 13;
   grid-row-start: 7;
   grid-row-end: 12;
}
@media (max-width: 430px){
  .gridGalleryItems{
    display: block;
  }
  .gridGalleryItem{
    display: block;
    margin-bottom: 20px;
    padding-top: 100%;
  }
} 

</style>

