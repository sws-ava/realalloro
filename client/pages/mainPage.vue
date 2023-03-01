<template>
    <section id="hero-5" class="hero-section">
      <div class="bg-fixed bg-inner division">


        <!-- HERO TEXT -->
        <div class="container">							
          <div class="row">
            <div class="col-md-12">
              <div class="hero-5-txt text-center white-color">

                <!-- Title -->	
                <h2>Pizza</h2>

                <!-- Image -->
                <div class="hero-5-img">
                  <img class="img-fluid" src="images/hero-5-img.png" alt="hero-image">
                </div>

              </div>  
            </div>	 
          </div>	 <!-- End row -->
        </div>	 <!-- END HERO TEXT -->


        <!-- SECTION OVERLAY -->	
        <div class="bg-fixed white-overlay-wave"></div>


      </div>	   <!-- End Inner Content -->
    </section>
    




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

