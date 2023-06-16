<template>
  <div>
    <div
      class="page-hero-section division"
      style="background-image: url(/images/contacts-page.jpg)"
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
                              {{ $t("static.mainPage") }}
                            </nuxt-link>
                          </li>
                          <li class="breadcrumb-item active">
                            {{ $t("static.menuTitle") }}
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Title -->
              <h2 class="h2-xl">{{ $t("static.menuTitle") }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 50px">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <loading v-if="isLoading" />

            <div class="menuList menu_all">
              <vsa-list :init-active="false" :auto-collapse="false">
                <vsa-item v-for="menuItem in menuItems" :key="menuItem.id">
                  <vsa-heading>
                    <div class="row">
                      <div class="col-12">
                        <h3 class="h3-md red-color">
                          <a href="javascript:void(0)">
                            {{ menuItem.title }}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </vsa-heading>

                  <vsa-content>
                    <template v-if="menuItem.id == 4">
                      <menu-item-no-images :menuItems="menuItem.goods" />
                    </template>
                    <template v-else>
                      <menu-item :menuItems="menuItem.goods" />
                    </template>
                  </vsa-content>
                </vsa-item>
              </vsa-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuItem from "@/components/front/menu/menuItem.vue";
import menuItemNoImages from "@/components/front/menu/menuItemNoImages.vue";
import loading from "@/components/front/loading.vue";
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";
// import VueFaqAccordion from 'vue-faq-accordion'

import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from "vue-simple-accordion";
// import 'vue-simple-accordion/dist/vue-simple-accordion.css';

// import TransitionExpand from '@/components/TransitionExpand.vue'

export default {
  layout: "front",
  components: {
    menuItem,
    menuItemNoImages,
    loading,
    // VueFaqAccordion
    // TransitionExpand
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
  },
  head() {
    return {
      title:
        this.$i18n.t("static.menuTitle") +
        " ::  " +
        this.$i18n.t("static.siteName"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$i18n.t("static.menuTitle"),
        },
      ],
    };
  },

  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  data() {
    return {
      menuItems: [],
      // menuPhotos: [],
      isLoading: false,
      imagesBaseUrl: "",
    };
  },
  async fetch() {
    try {
      this.isLoading = true;
      this.imagesBaseUrl = process.env.imagesBaseUrl + "storage/";
      let locale = this.$i18n.t("static.locale");

      this.menuItems = await fetch(
        process.env.imagesBaseUrl + "api/getMenu?locale=" + locale
      ).then((res) => res.json());

      // this.menuPhotos = await fetch(
      //   process.env.imagesBaseUrl + 'api/getMenuPhotos'
      // ).then(res => res.json())
      this.isLoading = false;
    } catch (e) {}
  },
};
</script>


<style>
h3 {
  margin-bottom: 20px;
}
.paperMenuPhoto {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
}
.vsa-item__trigger {
  border: none;
  outline: none;
  background: none;
}
</style>

