<template>
  <div>
    <spinner v-if="showSpinner" />
    <div class="row mb-2">
      <div class="col-12"><h5>Добавление новости</h5></div>
    </div>
    <form @submit.prevent>
      <div class="row">
        <div class="form-group col-lg-6">
          <small class="form-text text-muted">Новость / Акция</small>
          <select
            required
            v-model="page.cat"
            class="form-control"
          >
            <option  value="1">Новости</option>
            <option value="2">Акции</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-lg-6">
          <small class="form-text text-muted">Название страницы на украинском</small>
          <input
            v-model="page.title_ru"
            required
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-6">
          <small class="form-text text-muted">Название страницы на украинском</small>
          <input
            v-model="page.title_ua"
            required
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Описание страницы на русском</small>
          <input
            v-model="page.description_ru"
            required
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Описание страницы на украинском</small>
          <input
            v-model="page.description_ua"
            required
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Контент страницы на русском </small>
          <textarea 
              v-model="page.content_ru"
              class="form-control"
              style="min-height: 600px;"
          ></textarea>
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Контент страницы на украинском </small>
          <textarea 
              v-model="page.content_ua"
              class="form-control"
              style="min-height: 600px;"
          ></textarea>
        </div>
        <div class="d-flex justify-content-between col-12">
          <div class="form-group mt-2">
            <button 
              @click="addPage()"
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
    <site-images />
  </div>






</template>

<script>



import spinner from '@/components/admin/spinner.vue'
import axios from 'axios'
import siteImages from '@/components/admin/siteImages.vue'




export default {
  components: {
    spinner,
    siteImages
  },
  layout: 'admin',
  data(){
    return{
      page: {
        title_ru: '',
        title_ua: '',
        description_ru: '',
        description_ua: '',
        content_ru: '',
        content_ua: '',
        cat: '',
      },
			showSpinner: false,
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            ["showHtml"]
          ],
        }
      }
    }
  },
  computed:{
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted(){
  },
  methods:{
		async addPage(){
			this.showSpinner = true
      if(this.page.title_ru && this.page.title_ua && this.page.description_ru && this.page.description_ua && this.page.cat){
        try {
          const response = await axios.post('/admin/addNews', {page: this.page})
					this.$router.push('/admin/news-edit/'+response.data)
        } catch (e) {
          console.log('save news error')
        }
      }
			this.showSpinner = false
		},
    backToPages(){
      this.$router.push('/admin/news')
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
  },
}
</script>

<style>

</style>