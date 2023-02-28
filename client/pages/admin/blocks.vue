<template>
  <div>
    <spinner v-if="showSpinner" />
    <div class="row mb-4">
      <div class="col-12">Редактирование статичных блоков на сайте</div>
    </div>
    <form @submit.prevent>
      <div class="row">
          <div class="form-group col-lg-6">
            <small class="form-text text-muted">Адрес на русском</small>
            <input
              v-model="ru.address"
              class="form-control"
              type="text"
            >
          </div>
          <div class="form-group col-lg-6">
            <small class="form-text text-muted">Адрес на украинском</small>
            <input
              v-model="ua.address"
              class="form-control"
              type="text"
            >
          </div>
          <div class="form-group col-6">
            <small class="form-text text-muted">Телефон 1 по шаблону "(068) 168 96 95"</small>
            <input
              v-model="ru.phone1"
              class="form-control"
              type="text"
            >
          </div>
          <div class="form-group col-6">
            <small class="form-text text-muted">Телефон 1 по шаблону "+380681689695"</small>
            <input
              v-model="ru.phone1full"
              class="form-control"
              type="text"
            >
          </div>
          <div class="form-group col-6">
            <small class="form-text text-muted">Телефон 2 по шаблону "(063) 877 78 51"</small>
            <input
              v-model="ru.phone2"
              class="form-control"
              type="text"
            >
          </div>
          <div class="form-group col-6">
            <small class="form-text text-muted">Телефон 3 по шаблону "+380638777851"</small>
            <input
              v-model="ru.phone2full"
              class="form-control"
              type="text"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <small class="form-text text-muted">Рабочие часы</small>
            <input
              v-model="ru.workHours"
              class="form-control"
              type="text"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <small class="form-text text-muted">E-mail</small>
            <input
              v-model="ru.email"
              class="form-control"
              type="text"
            >
          </div>
        </div>
        <div class="row">
          
          <div class="form-group col-lg-12">
            <small class="form-text text-muted">Показывать на сайте информациооные блоки? </small>
            <input
              v-model="ru.showWarning"
              type="checkbox"
            >  
          </div>
          
          <div class="form-group col-lg-12">
            <small class="form-text text-muted">Информационный блок везде вверху страницы ру </small>
            <textarea 
                v-model="ru.warning"
                class="form-control"
                style="min-height: 200px;"
            ></textarea>
          </div>
          <div class="form-group col-lg-12">
            <small class="form-text text-muted">Информационный блок везде вверху страницы укр </small>
            <textarea 
                v-model="ua.warning"
                class="form-control"
                style="min-height: 200px;"
            ></textarea>
          </div>
        </div>











      <div class="row">
        <div class="d-flex justify-content-between col-12">
          <div class="form-group mt-2">
            <button 
              @click="savePage()"
              type="submit" 
              class="btn btn-sm btn-success"
            >
              Сохранить

            </button>
          </div>
          <div class="form-group mt-2">
             <button 
              @click="backToPages()"
              class="btn btn-sm btn-secondary"
             >
              Назад

             </button>
          </div>
        </div>
      </div>
    </form>
  </div>






</template>

<script>



import spinner from '@/components/admin/spinner.vue'
import axios from 'axios'




export default {
  components: {
    spinner,
  },
  layout: 'admin',
  data(){
    return{
      ru: {},
      ua: {},
			showSpinner: false,
    }
  },
  mounted(){
    this.showSpinner = true
    this.fetchPage()
  },
  methods:{
    async fetchPage(){
      try{
        const page = await axios.get('/admin/getBlocks')
        this.ru = page.data.ru[0]
        this.ua = page.data.ua[0]
			} catch (e) {
        console.log('some fetchPage error ')
      }finally{
        this.showSpinner = false
      }
    },
    async savePage(){
		  this.showSpinner = true
      try{
        console.log()
        this.ru.showWarning == true ? this.ru.showWarning = 1 : this.ru.showWarning = 0
        const response = await axios.post('/admin/saveBlocks', {
          ru: this.ru,
          ua: this.ua
        })     
      } catch (e){
        console.log('some savePage error')
      } finally{
		    this.showSpinner = false
      }
    },
    backToPages(){
      this.$router.push('/admin/orders')
    },
  },
}
</script>

<style>

</style>