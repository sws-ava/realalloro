<template>
  <div> 
    <section 
      class="section-top-50 section-bottom-66 section-lg-top-160 section-lg-bottom-160 inset-left-15 inset-right-15" 
      style="background-image: url(/images/main_images/test-menyu.jpg); background-size: 100%;  margin-bottom: 50px;  background-position-x: 50%; padding-top: 15%; padding-bottom: 15%; background-position-y: 50%;">
      <div class="header-divider">
      <h3 class="text-uppercase font-logo text-regular letter-spacing-200">Меню</h3>
      </div>
    </section>
    <loading v-if="isLoading" />

    <div class="shell menuList menu_all">
      <vsa-list :init-active="false" :auto-collapse="false">
        <vsa-item v-for="(menuItem, idx) in menuItems" :key="menuItem.id">
          <vsa-heading>
            <div class="range">
              <div class="cell-sm-12">
                <h2>
                  <a href='javascript:void(0)'>
                    {{ menuItem.title }}
                  </a>  
                </h2>  
              </div>
            </div>
          </vsa-heading>

          <vsa-content>
            <menu-item
                :menuItems="menuItem.goods"
              />
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
    <!-- <div class="shell">
      <div class="panel-group menu_all" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="range">
          <div
            v-for="(menuItem, idx) in menuItems"
            :key="menuItem.id"
            class="cell-sm-12"
          >
            <div 
              class="" 
              role="tab" 
              :id="'heading-' + idx"
            >
              <h3 class="">
                <a 
                  role="button"  
                  data-toggle="collapse" 
                  :href="'#collapse-' + idx" 
                  aria-expanded="false" 
                  :aria-controls="'collapse-' + idx" 
                  class="collapsed"
                >
                  {{ menuItem.title }}       
                </a>
              </h3>
            </div>
            <div 
              :id="'collapse-' + idx" 
              class="panel-collapse collapse" 
              role="tabpanel" 
              :aria-labelledby="'heading-' + idx" 
              aria-expanded="false" 
              style="height: 40px;"
            >
              <menu-item
                :menuItems="menuItem.goods"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="shell">
        <div v-viewer="{inline: false, navbar: false, title: false, toolbar: true, tooltip: false, movable: true, zoomable: true, rotatable: false, scalable: false, transition: true, fullscreen: false, keyboard: true}">
          
      <div class="range">
          <div 
            v-for="photo in menuPhotos"
            :key="photo.id"
            class="cell-12 cell-sm-6 cell-md-4 cell-lg-3 mb-4"
            style="margin-bottom: 30px;"
          >
            <img
              :src="imagesBaseUrl + photo.path" 
              class="paperMenuPhoto"
            >
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>

import menuItem from '@/components/front/menu/menuItem.vue'
import loading from '@/components/front/loading.vue'
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from "v-viewer"
// import VueFaqAccordion from 'vue-faq-accordion'

import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon
} from 'vue-simple-accordion';
// import 'vue-simple-accordion/dist/vue-simple-accordion.css';

// import TransitionExpand from '@/components/TransitionExpand.vue'

export default {
  layout: 'front',
  components:{
    menuItem,
    loading,
    // VueFaqAccordion
    // TransitionExpand
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon
  },
  head(){
    return{
      title: this.$i18n.t('static.menuTitle') + ' ::  ' + this.$i18n.t('static.siteName'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('static.menuTitle'),
        },
      ]
    }
  },

  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  data(){
    return{
      menuItems: [],
      menuPhotos: [],
      isLoading: false,
      imagesBaseUrl: '',
    }
  },
  async fetch() {
    try {
      this.isLoading = true
      this.imagesBaseUrl = process.env.imagesBaseUrl + 'storage/'
      let locale = this.$i18n.t('static.locale')

      this.menuItems = await fetch(
        process.env.imagesBaseUrl + 'api/getMenu?locale=' + locale
      ).then(res => res.json())

      this.menuPhotos = await fetch(
        process.env.imagesBaseUrl + 'api/getMenuPhotos'
      ).then(res => res.json())
      this.isLoading = false
    } catch (e) {
    }
  },  
}
</script>


<style>
  h3{
    margin-bottom: 20px;
  }
  .paperMenuPhoto{
    width: 100%;
    height: auto;
    object-fit: cover;
    cursor: pointer;
  }
  .vsa-item__trigger{
    border:none;
    outline: none;
    background: none;
  }
</style>

