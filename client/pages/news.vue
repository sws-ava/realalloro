<template>
  <div> 
    <section class="section-top-50 section-bottom-66 section-lg-top-160 section-lg-bottom-160 inset-left-15 inset-right-15" 
    style="background-image: url(/images/main_images/novosti.jpg); background-size:100%; background-position-x: 50%; padding-top: 15%; padding-bottom: 15%; background-position-y: 50%;">
      <div class="header-divider">
      <h3 class="text-uppercase font-logo text-regular letter-spacing-200">
        {{ $t('static.newsTitle')}}
      </h3>
      </div>
    </section>
    

    <section class="section-top-50 section-sm-top-70 text-center text-sm-left">
      <div v-for="item in items" :key="item.id" class="shell">
        <div class="range range-xs-center offset-top-34">
          <div 
            v-html="item.content"
            class="cell-sm-12">
          </div>
          <div class="cell-xs-12 offset-top-42">
            <hr class="hr-sealine-gray">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'front',
  head(){
    return{
      title: this.$i18n.t('static.newsTitle') + ' ::  ' + this.$i18n.t('static.siteName'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('static.newsTitle'),
        },
      ]
    }
  },
  data(){
    return{
      items: [],
    }
  },
  async fetch(){
    let locale = this.$i18n.t('static.locale')
    this.items = await fetch(
      process.env.imagesBaseUrl + 'api/getNews?locale=' + locale
    ).then(items => items.json())
  }

}
</script>



