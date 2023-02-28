<template>
  <div>
    <h5 class="mb-3">Детали заказа</h5>
    <spinner v-if="showSpinner" />
    

    <div>
      <div class="review-header__status mb-2">
        <b>
          <span v-if="order.status === 1" class="red-text">
            Новый заказ
          </span>
          <!-- <span v-else-if="order.status === 2" class="blue-text">
            Заказ выполняется
          </span> -->
          <span v-else-if="order.status === 2" class="green-text">
            Заказ выполнен
          </span>
          {{order.date}}
        </b>
      </div>
      <div class="review-header mb-2">
        <div class="row">
          <div class="form-group col-lg-5">
            <div class="option-title">Имя:</div>
            <input 
              v-model="order.name" 
              class="form-text w-100 form-control" 
              type="text" 
            />
          </div>
          <div class="form-group col-lg-4">
            <div class="option-title">Телефон:</div>
            <input 
              v-model="order.phone" 
              class="form-text w-100 form-control" 
              type="text" 
            />
          </div>
          <div class="form-group col-lg-3">
            <div class="option-title">Сумма:</div>
            <div class="option-text ">
              <span class="orderTotalTop"> {{ order.total }} </span>грн
            
            </div>
          </div>
          <div v-if="order.address" class="mb-2 col-lg-6 form-group ">
            <span class="option-title">Адрес:</span>
            <input 
              v-model="order.address" 
              class="form-text w-100 form-control" 
              type="text" 
            />
          </div>
          <div v-if="order.address" class="mb-2 col-lg-3 form-group ">
            <span class="option-title">Персон:</span>
            <input 
              v-model="order.persons" 
              class="form-text w-100 form-control" 
              type="number" 
            />
          </div>
          <div class="form-group mb-2 col-12">
            <span class="option-title">Комментарий к заказу:</span>
            <textarea
              v-model="order.comment" 
              style="height: 130px; resize: none;"
              class="form-text w-100 form-control" 
              type="text" 
            ></textarea>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-2 d-flex align-items-center">
        Заказ:
        <span
          @click="showAddOrderItemsModal = true"
          class="btn btn-outline-primary btn-sm ml-auto"
        >
          Добавить блюдо
        </span
        >
      </div>
      <hr class="mb-2 mt-1" />
      <div>
        <div
          v-for="(item, idx) in order.orderItems"
          :key="item.id"
          class="row mb-4
           d-flex align-items-center"
        >
          <div class="col-lg-6">
            {{ idx + 1 }}. 
            <span v-if="item.catName != item.title">
              {{item.catName}}
            </span>
            {{ item.title }} {{ item.weight }} {{ item.weightKind }}
          </div>
		  <div class="col-lg-2 text-right">
			{{ item.price }} грн
		  </div>
          <div class="col-lg plus-minus-holder">
            <div class="plus-minus">
              <span
                @click="decrementOrderItem(item)"
              >
                <font-awesome-icon
                  :icon="['fas', 'minus-circle']"
                  style="width:17px; height: 17px"
                />
              </span>
            </div>
            {{ item.amount }}
            <div class="plus-minus">
              <span
                @click="incrementOrderItem(item)"
              >
                <font-awesome-icon
                  :icon="['fas', 'plus-circle']"
                  style="width:17px; height: 17px"
                />
              </span>
            </div>
          </div>
          <div class="col-lg text-right">
			      {{ (item.price * item.amount) }} грн
			
				<span 
          @click="showRemoveOrderItemModal(item)"
          class="fa-icon-holder"
        >
					<font-awesome-icon
						:icon="['fas', 'trash']"
						style="width:17px; height: 17px"
					/>
				</span>
			</div>
        </div>
      </div>
      <hr class="mb-1 mt-2 mb-4" />
      <div class="row text-right mt-4 mb-4">
        <div class="offset-lg-7 col-lg-5">Сумма: <span class="orderTotal"> {{ order.total }} </span> грн</div>
      </div>
        <div class="d-flex justify-content-between col-12">
          <div class="form-group mt-2">
            <button 
              @click="saveOrder()"
              type="submit" 
              class="btn btn-success"
            >
              Сохранить

            </button>
          </div>
          <div class="form-group mt-2">
            <button 
              @click="saveOrderAndExit()"
              type="submit" 
              class="btn btn-primary"
            >
              Сохранить и выйти

            </button>
          </div>
          <div class="form-group mt-2">
             <button 
              @click="backToOrders()"
              class="btn btn-secondary"
             >
              Назад

             </button>
          </div>
        </div>
      <div class="buttons mt-4">
        <div>
          <div
            @click="changeOrderStatus()"
            v-if="order.status === 1" 
            class="btn btn-outline-success btn-sm"
          >
            Заказ выполнен
          </div>
          <div
            @click="changeOrderStatus()"
            v-else-if="order.status === 2" 
            class="btn btn-outline-secondary btn-sm"
          >
            Заказ не выполнен
          </div>
        </div>
        <div 
          @click="showDeleteOrderModal = true"
          class="btn btn-outline-danger btn-sm btn-delete"
        >
          Удалить заказ
        </div>
      </div>
    </div>
    		<!-- delete subItem modal -->
        <modal-delete-window
          :showDeleteModal="showDeleteModal"
        >
          <h5 class="text-center mb-4">Удалить это блюдо?</h5>
          <div class="d-flex justify-content-around mt-4">
            <div 
              @click="removeOrderItem()"
              class="btn btn-outline-danger btn-sm"
            >
              Удалить
            </div>
            <div 
              @click="hideRemoveOrderItemModal()"
              class="btn btn-outline-secondary btn-sm"
            >
              Отменить
            </div> 
          </div>
        </modal-delete-window>


      		<!-- delete order modal -->
        <modal-delete-window
          :showDeleteModal="showDeleteOrderModal"
        >
          <h5 class="text-center mb-4">Удалить этот заказ?</h5>
          <div class="d-flex justify-content-around mt-4">
            <div 
              @click="removeOrder()"
              class="btn btn-outline-danger btn-sm"
            >
              Удалить
            </div>
            <div 
              @click="showDeleteOrderModal = false"
              class="btn btn-outline-secondary btn-sm"
            >
              Отменить
            </div> 
          </div>
        </modal-delete-window>

      		<!-- add new item to order modal -->
        <modal-delete-window
          :showDeleteModal="showAddOrderItemsModal"
        >
          <h5 class="text-center mb-4">Добавить блюдо к заказу</h5>
          <div class="row">
            <div class="mb-2 col-12 form-group ">
              <span class="option-title">Поиск блюда, мин 2 символа (ру)</span>
              <input 
                v-model="searchDish" 
                @input="fetchDishesByQuery()"
                class="form-text w-100 form-control" 
                type="text" 
              />
            </div>
            <div class="col-12 mt-2 mb-2">
              <b>Итого блюд: {{ totalDishesByQuery }}</b>
            </div>
            <div 
              v-if="searchSpinner"
              class="spinner-border text-primary spinnerItem mt-4 mb-4 mx-auto" 
              role="status"
            >
              <span class="sr-only">Загрузка...</span>
            </div>
          </div>
          <div class="row modalItemsScroll">
            <div v-for="dish in menuItems" :key="dish.id"
              class="col-12 mb-2"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <span v-if="dish.title != dish.title_ru">
                    {{ dish.title }}
                  </span>
                   {{ dish.title_ru }}
                <br>
                {{ dish.weight }} {{ dish.weightKind }} {{ dish.price }}грн
                
                </div>
                <span 
                  @click="addDishToOrderMenuItems(dish)"
                  class="addDish"
                >
                  Добавить
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-around mt-4">
            <div 
              @click="showAddOrderItemsModal = false, menuItems = [], searchDish = '', totalDishesByQuery = 0"
              class="btn btn-outline-secondary btn-sm"
            >
              Отменить
            </div> 
          </div>
        </modal-delete-window>

  </div>
  
</template>

<script>
import Spinner from '@/components/admin/spinner.vue';
import ModalDeleteWindow from '@/components/admin/modalDeleteWindow.vue';
import axios from 'axios';
import { mapActions } from 'vuex'

export default {
  components:{
    Spinner,
    ModalDeleteWindow
  },

  middleware: "auth",
  layout: "admin",

  data() {
    return {
      showSpinner: false,
      searchSpinner: false,
      order: {},
      sameOrderItems:[],
      menuItems:[],
      menuItemToRemove: {},
      showDeleteModal: false,
      showDeleteOrderModal: false,
      showAddOrderItemsModal: false,
      searchDish: '',
      showEditOrderItemsModal: false,
      orderItemToReplace: {},
      totalDishesByQuery: 0,
    };
  },
  mounted(){
    this.fetchOrder()
  },
  methods:{
    async fetchOrder(){
      this.showSpinner = true
      try {
        const response = await axios.post('/admin/getOrder', {orderId: this.$route.params.id})
        this.order = response.data
      } catch (e) {
        console.log('some fetchOrder error')
      }
      this.showSpinner = false
    },
    async incrementOrderItem(orderItem){
      this.showSpinner = true
      this.order.orderItems.forEach(el => {
        if(el.item == orderItem.item){
          el.amount += 1
        }
      })
      this.countTotalSum()
      try {
        const response = await axios.post('/admin/incrementOrderItem', {item:orderItem})
      } catch (e) {
        console.log('some incrementOrderItem error')
      }
      this.showSpinner = false
    },
    async decrementOrderItem(orderItem){
        this.order.orderItems.forEach(el => {
          if(el.item == orderItem.item){
            if(el.amount > 1){
              this.showSpinner = true
              el.amount -= 1
            }
          }
          
        })
        this.countTotalSum()
        try {
          const response = await axios.post('/admin/decrementOrderItem', {item:orderItem})
        } catch (e) {
          console.log('some incrementOrderItem error')
        }
        this.showSpinner = false
    },
    showRemoveOrderItemModal(orderItem){
      this.showDeleteModal = true
      this.menuItemToRemove = orderItem
    },
    hideRemoveOrderItemModal(){
      this.showDeleteModal = false
      this.menuItemToRemove = {}
    },
    async removeOrderItem(){
      this.showSpinner = true
      this.showDeleteModal = false
      this.order.orderItems = this.order.orderItems.filter(a => a.item !== this.menuItemToRemove.item)
      this.countTotalSum()
      try {
        const response = await axios.post('/admin/removeOrderItem', this.menuItemToRemove)
      } catch (e) {
        console.log('some removeOrderItem error')
      }
      this.showSpinner = false
    },
    async removeOrder(){
      try {
        const response = await axios.post('/admin/removeOrder', {order: this.order.id})
      } catch (e) {
        console.log('some removeOrder error')
      }
      this.backToOrders()
    },
    async countTotalSum(){
      let totalSum = 0
      this.order.orderItems.forEach(el => {
        totalSum += el.amount * el.price
      })
      this.order.total = totalSum.toFixed(2)
      try {
        const response = await axios.post('/admin/countOrderTotalSum', {sum: totalSum, order: this.$route.params.id})
        
      } catch (e) {
        console.log('some order countTotalSum error')
      }
    },
    async changeOrderStatus(){
      this.showSpinner = true
      this.order.status == 1 ? this.order.status = 2 : this.order.status = 1
      try {
        const response = await axios.post('/admin/changeOrderStatus', {order: this.order})
        this.getUnreadedOrders()
      } catch (e) {
        console.log('some changeOrderStatus error')
      }
      this.showSpinner = false
    },
    backToOrders(){
			this.$router.push('/admin/orders')
    },
    async saveOrder(){
      this.showSpinner = true
      try {
        const response = await axios.post('/admin/saveOrder', {order: this.order})
        console.log(response.data)
      } catch (e) {
        console.log(e.response.data)
        console.log('saveOrder error')
      }
      this.showSpinner = false
    },
    saveOrderAndExit(){
      this.saveOrder()
      this.backToOrders()
    },
    async fetchDishesByQuery(){
      this.searchSpinner = true
      if(this.searchDish.length > 1 ){
        try {
          const response = await axios.post('/admin/fetchDishesByQuery', {query: this.searchDish})
          this.menuItems = response.data.items
          this.totalDishesByQuery = response.data.query
        } catch (e) {
          console.log('fetchDishesByQuery error')
        }
      }else if(this.searchDish.length == 0 ){
        this.menuItems = []
          this.totalDishesByQuery = 0
      }
      
      this.searchSpinner = false
    },
    async addDishToOrderMenuItems(dish){
      this.showAddOrderItemsModal = false
      this.showSpinner = true
      try {
        const response = await axios.post('/admin/addDishToOrderMenuItems', {dish : dish, order: this.order.id})
        this.order.orderItems.push(response.data)
      } catch (e) {
        console.log('addDishToOrderMenuItems error')
      }
        this.countTotalSum()
        this.searchDish = ''
        this.menuItems = []
        this.showSpinner = false
    },
    async showEditOrderItemsModalHandler(item){
      this.showEditOrderItemsModal = true
      this.orderItemToReplace = item
      try {
        const response = await axios.post('/admin/showSameOrderItemsByCat', {item:item})
        this.sameOrderItems = response.data
      } catch (e) {
        console.log('some showEditOrderItemsModalHandler error')
      }
    },
    
    ...mapActions({
      getUnreadedOrders: 'countMenuNums/getOrders',
    }),
  }
}
</script>

<style lang="scss" scoped>
.review-header {
  // display: flex;
  // align-items:flex-start;
  &__status {
    margin-left: auto;
    .green-text {
      color: green;
    }
    .red-text {
      color: red;
    }
    .blue-text {
      color: blue;
    }
  }
}
.answer {
  max-width: 80%;
  margin-left: auto;
  text-align: right;
  border-radius: 20px;
  background: #f3f0f0;
  padding: 4px 10px;
  width: max-content;
}
.buttons {
  display: flex;
  gap: 10px;
}
.star {
  width: 20px;
  fill: #ebeb00;
}
.btn-delete {
  margin-left: auto;
}
.option-title {
  font-size: 12px;
  display: block;
}
.option-text {
  padding-left: 20px;
}
.plus-minus-holder {
  display: flex;
  align-items: center;
}
.plus-minus {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  cursor: pointer;
  margin: 0 10px;
}
span.edit-item {
  font-size: 12px;
  font-weight: bold;
//   cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.fa-icon{
	cursor: pointer;
}
.fa-icon-holder{
	cursor: pointer;
	svg{
		transition: scale 0.25s ease-in-out;
	}
	&:hover{
		svg{
			scale: 1.1;
		}
	}
}
.orderTotal{
  font-weight: bold;
  font-size: 30px;
}
.orderTotalTop{
  font-weight: bold;
  font-size: 20px;
}
.addDish{
  cursor: pointer;
  color: green;
  &:hover{
    text-decoration: underline;
  }
}
.modalItemsScroll{
  overflow-y: scroll;
  max-height: 500px;
  overflow-x: auto;
}
</style>
