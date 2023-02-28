<template>
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
</template>

<script>

import 'viewerjs/dist/viewer.css'
import { directive as viewer } from "v-viewer"

export default {
	layout: 'front',

    directives: {
		viewer: viewer({
			debug: true,
		}),	
    },
	props:{
		galleryImages:{
			type: Array,
			default: []
		}
	},
	async fetch() {
		this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
    },
}
</script>

<style lang="scss" scoped>
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