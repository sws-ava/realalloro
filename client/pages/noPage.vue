<template>
  <div class="section-top-50">
    <h2>Страница не найдена</h2>
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

