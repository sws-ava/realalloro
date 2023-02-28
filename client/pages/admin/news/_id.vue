<template>
  <div>
    <spinner v-if="showSpinner" />
    <div class="row mb-2">
      <div class="col-12"><h5>Редактирование новости</h5></div>
    </div>
		<nav aria-label="breadcrumb mb-4">
			<ol class="breadcrumb-my">
				<li class="breadcrumb-item">
					<router-link :to="{name: 'dashboard'}">
						Главная
					</router-link>
				</li>
				<li class="breadcrumb-item">
					<router-link :to="{name: 'admin-news'}">
						Новости
					</router-link>
				</li>
			</ol>
		</nav>
		<div class="row">
			<div class="d-flex justify-content-between col-12">
				<div class="form-group mt-2">
					<button 
						v-if="page.show === 1"
						@click="showPage()"
						class="btn btn-sm btn-danger"
					>
						Скрыть категорию

					</button>
					<button 
						v-if="page.show === 0"
						@click="showPage()"
						class="btn btn-sm btn-success"
					>
						Показывать категорию

					</button>
				</div>
			</div>
		</div>
    <form @submit.prevent>
      <div class="row">
        <div class="form-group col-lg-6">
          <small class="form-text text-muted">Новость / Акция</small>
          <select
            v-model="page.cat"
            class="form-control"
          >
            <option value="1">Новости</option>
            <option value="2">Акции</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-lg-6">
          <small class="form-text text-muted">Название страницы на украинском</small>
          <input
            v-model="page.title_ru"
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-6">
          <small class="form-text text-muted">Название страницы на украинском</small>
          <input
            v-model="page.title_ua"
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Описание страницы на русском</small>
          <input
            v-model="page.description_ru"
            class="form-control"
            type="text"
          >
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Описание страницы на украинском</small>
          <input
            v-model="page.description_ua"
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
          <!-- <client-only>
            <quill-editor
              ref="editor"
              v-model="page.content_ru"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </client-only> -->
        </div>
        <div class="form-group col-lg-12">
          <small class="form-text text-muted">Контент страницы на украинском </small>
          <textarea 
              v-model="page.content_ua"
              class="form-control"
              style="min-height: 600px;"
          ></textarea>
          <!-- <client-only>
            <quill-editor
              ref="editor"
              v-model="page.content_ua"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </client-only> -->
        </div>
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
              @click="savePageAndExit()"
              type="submit" 
              class="btn btn-sm btn-primary"
            >
              Сохранить и выйти

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
				<div class="form-group col-lg-12 mt-4 text-left">
					<span 
						@click="showDeleteModal = true"
						class="btn btn-danger btn-sm"
					>
						Удалить новость
					</span>
				</div>
      </div>
    </form>
    <site-images />
		<!-- delete modal -->
		<modal-delete-window
			:showDeleteModal="showDeleteModal"
		>
			<h5 class="text-center mb-4">Удалить новость?</h5>
			<div class="d-flex justify-content-around mt-4">
				<div 
					@click="deleteNews(page.id)"
					class="btn btn-outline-danger btn-sm"
				>
					Удалить
				</div>
				<div 
						@click="showDeleteModal = false"
					class="btn btn-outline-secondary btn-sm"
				>
					Отменить
				</div> 
			</div>
		</modal-delete-window>
  </div>






</template>

<script>



import spinner from '@/components/admin/spinner.vue'
import axios from 'axios'
import ModalDeleteWindow from '@/components/admin/modalDeleteWindow.vue';
import siteImages from '@/components/admin/siteImages.vue'




export default {
  components: {
    spinner,
    ModalDeleteWindow,
    siteImages
  },
  layout: 'admin',
  data(){
    return{
      page: {},
			showSpinner: false,
      showDeleteModal: false, 
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
    this.showSpinner = true
    this.fetchPage()
  },
  methods:{
    async fetchPage(){
      try{
        const page = await axios.get('/admin/fetchNews', {
          params:{
            pageId: this.$route.params.id
          }
        })
        this.page = page.data
			} catch (e) {
        console.log('some fetchPage error ')
      }finally{
        this.showSpinner = false
      }
    },
		async savePage(){
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/saveNews', {page: this.page})
			} catch (e) {
				console.log('save news error')
			}
			this.showSpinner = false
		},
    async deleteNews(id){
      this.showDeleteModal = false
			this.showSpinner = true
			try {
				const response = await axios.post('/admin/deleteNews', {id: id})
        this.backToPages()
			} catch (e) {
				console.log('save news error')
			}
			this.showSpinner = false
    },
    savePageAndExit(){
      this.savePage()
      this.backToPages()
    },
    backToPages(){
      this.$router.push('/admin/news')
    },


    async showPage(){
			this.showSpinner = true
      try {
        const response = await axios.post('/admin/showPage', {page: this.page})
        console.log(response.data)
        this.page.show = response.data
      } catch (e) {
        console.log('some showNews error')
      }
			this.showSpinner = false
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